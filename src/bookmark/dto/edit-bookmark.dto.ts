import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsString()
    link?: string;
}
