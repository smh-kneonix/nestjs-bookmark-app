import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
// import { Request } from 'express';
// signup(@Req() req: Request): object {
// console.log(req.body);

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // 'signup'
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signup(@Body() dto: AuthDto): object {
        return this.authService.signup(dto);
    }

    //
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto): object {
        return this.authService.signin(dto);
    }
}
