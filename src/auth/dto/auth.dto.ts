import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
// here we need class
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string
}