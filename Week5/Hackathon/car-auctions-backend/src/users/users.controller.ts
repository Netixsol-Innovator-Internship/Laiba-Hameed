import { Controller, Get, NotFoundException, Param, Put, Body, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Post(':id/wishlist')
  async addToWishlist(@Param('id') id: string, @Body() body: { auctionId: string }): Promise<User> {
    const updatedUser = await this.usersService.addToWishlist(id, body.auctionId);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id/wishlist/:auctionId')
  async removeFromWishlist(
    @Param('id') id: string,
    @Param('auctionId') auctionId: string
  ): Promise<User> {
    const updatedUser = await this.usersService.removeFromWishlist(id, auctionId);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
}
