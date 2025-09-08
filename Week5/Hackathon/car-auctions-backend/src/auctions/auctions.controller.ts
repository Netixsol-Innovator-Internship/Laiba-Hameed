import { Body, Controller, Post, Param, Patch, Get, Query } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post('start')
  async createAuction(@Body() dto: CreateAuctionDto) {
    return this.auctionsService.createAuction(dto);
  }

  @Post(':id/bid')
  async placeBid(@Param('id') id: string, @Body('userId') userId: string, @Body('amount') amount: number) {
    return this.auctionsService.placeBid(id, userId, amount);
  }

  @Get()
  async getAll(@Query('status') status?: string) {
    return this.auctionsService.findAll(status);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.auctionsService.findById(id);
  }
}
