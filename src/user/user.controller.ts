import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Get('me')
    me(@GetUser() user: User) {
        return user;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    @Patch("")
    editUser(@GetUser('id') userid: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userid, dto);
    }
}
