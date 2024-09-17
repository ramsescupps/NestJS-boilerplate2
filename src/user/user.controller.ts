import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User>{
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe) user: User): Promise<User>{
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user:Partial<User>):Promise<User>{
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string>{
    return this.userService.remove(id);
  }
}
