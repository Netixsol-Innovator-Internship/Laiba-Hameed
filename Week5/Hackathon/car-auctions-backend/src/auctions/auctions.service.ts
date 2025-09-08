import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Auction, AuctionDocument } from './schemas/auction.schema';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { Car, CarDocument } from 'src/cars/schemas/car.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuctionsService {
  private readonly logger = new Logger(AuctionsService.name);

  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>,
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notificationsService: NotificationsService,
  ) { }

  // Create Auction
  async createAuction(dto: CreateAuctionDto) {
    const now = new Date();
    const start = dto.startTime ? new Date(dto.startTime) : now;
    const end = new Date(dto.endTime);

    if (start < now) throw new BadRequestException('Start time cannot be in the past');
    if (end <= start) throw new BadRequestException('End time must be after start time');

    const car = await this.carModel.findById(dto.car);
    if (!car) throw new BadRequestException('Car not found');
    if ((car as any).isSold) throw new BadRequestException('Car is already sold');

    const activeAuction = await this.auctionModel.findOne({ car: dto.car, status: 'Live' });
    if (activeAuction) throw new BadRequestException('Car already has an active auction');

    const startingBid = dto.startingBid;
    const minIncrement = dto.minIncrement ?? Math.ceil(startingBid / 100);

    const auction = new this.auctionModel({
      car: dto.car,
      seller: dto.seller,
      startTime: start,
      endTime: end,
      startingBid,
      currentBid: startingBid,
      minIncrement,
      status: 'Live',
    });

    const savedAuction = await auction.save();

    // Add auction to seller's myCars
    await this.userModel.findByIdAndUpdate(
      dto.seller,
      { $addToSet: { myCars: savedAuction._id } },
      { new: true }
    );


    // Notify all users about auction start
    await this.notificationsService.notifyAllUsers(
      `Auction for car ${savedAuction.car} has started!`,
      savedAuction._id as Types.ObjectId,
      'Auction',
    );

    return savedAuction;
  }

  // Place bid
  async placeBid(auctionId: string, userId: string, amount: number) {
    const auction = await this.auctionModel.findById(auctionId).exec();
    if (!auction) throw new BadRequestException('Auction not found');

    const now = new Date();
    if (auction.status !== 'Live') throw new BadRequestException('Auction is not active');
    if (now < auction.startTime || now > auction.endTime)
      throw new BadRequestException('Bid outside auction time window');
    if (userId === auction.seller.toString()) throw new BadRequestException('Seller cannot bid');
    if (auction.bidders.length === 0 && amount < auction.startingBid)
      throw new BadRequestException('First bid must be >= starting bid');
    if (amount < auction.currentBid + auction.minIncrement)
      throw new BadRequestException('Bid must be at least currentBid + minIncrement');

    auction.currentBid = amount;
    auction.totalBids += 1;
    auction.bidders.push({ user: new Types.ObjectId(userId), amount, timestamp: now });

    const saved = await auction.save();

    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { bids: auction._id } },
      { new: true }
    );

    // Notify seller about new bid
    await this.notificationsService.notifyUser(
      auction.seller.toString(),
      `New bid of ${amount} placed on your auction`,
      auction._id as Types.ObjectId,
      'Bid',
    );

    return saved;
  }

  // Automatic status updates
  @Cron(CronExpression.EVERY_MINUTE)
  async updateAuctionStatuses() {
    const now = new Date();

    // Pending -> Live (optional if you have PENDING auctions)
    const pendingToLive = await this.auctionModel.updateMany(
      { status: 'Pending', startTime: { $lte: now } },
      { $set: { status: 'Live' } },
    );
    if (pendingToLive.modifiedCount > 0)
      this.logger.log(`Activated ${pendingToLive.modifiedCount} auctions`);

    // Live -> Sold Out or Ended
    const liveAuctions = await this.auctionModel.find({ status: 'Live', endTime: { $lte: now } });
    for (const auction of liveAuctions) {
      if (auction.bidders.length > 0) {
        // Auction has bids → Sold Out
        auction.winner = auction.bidders[auction.bidders.length - 1].user;
        auction.status = 'Sold Out';
        await auction.save();

        // Mark car as sold
        await this.carModel.findByIdAndUpdate(auction.car, { isSold: true });

        // Notify winner
        await this.notificationsService.notifyUser(
          auction.winner.toString(),
          `🎉 You won the auction for car ${auction.car}!`,
          auction._id as Types.ObjectId,
          'Auction',
        );

        // Notify seller
        await this.notificationsService.notifyUser(
          auction.seller.toString(),
          `✅ Your auction was won by user ${auction.winner}`,
          auction._id as Types.ObjectId,
          'Auction',
        );
      } else {
        // Auction had no bids → Ended
        auction.status = 'Ended';
        await auction.save();

        // Notify seller only
        await this.notificationsService.notifyUser(
          auction.seller.toString(),
          `⚠️ Your auction for car ${auction.car} ended with no bids.`,
          auction._id as Types.ObjectId,
          'Auction',
        );
      }

      // Notify all users that auction closed
      await this.notificationsService.notifyAllUsers(
        `Auction for car ${auction.car} has ended!`,
        auction._id as Types.ObjectId,
        'Auction',
      );

      this.logger.log(`Closed auction ${auction._id} with status ${auction.status}`);
    }

  }

  // Get all auctions
  async findAll(status?: string) {
    const query = status ? { status } : {};
    return this.auctionModel.find(query).populate('car seller winner bidders.user').exec();
  }

  // Get auction by ID
  async findById(id: string) {
    const auction = await this.auctionModel.findById(id).populate('car seller winner bidders.user').exec();
    if (!auction) throw new BadRequestException('Auction not found');
    return auction;
  }
}
