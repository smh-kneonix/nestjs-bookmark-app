import { IsEmail, IsOptional, IsString } from 'class-validator';

// all of these can be optional because user can edit on of them each time
export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;
}
