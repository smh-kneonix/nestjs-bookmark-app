import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    async createBookmark(userid: number, dto: CreateBookmarkDto) {
        const newBookmark = await this.prisma.bookmark.create({
            data: {
                userid,
                ...dto,
            },
        });
        return newBookmark;
    }

    getBookmarks(userid: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userid,
            },
        });
    }

    getBookmarkById(userid: number, bookmarkId: number) {
        return this.prisma.bookmark.findFirst({
            where: {
                userid,
                id: bookmarkId,
            },
        });
    }

    editBookmarkById(userid: number, bookmarkId: number, dto: EditBookmarkDto) {
        return this.prisma.bookmark.update({
            where: {
                userid,
                id: bookmarkId,
            },
            data: {
                ...dto,
            },
        });
    }

    deleteBookmarkById(userid: number, bookmarkId: number) {
        return this.prisma.bookmark.delete({
            where: {
                userid,
                id: bookmarkId,
            },
        });
    }
}
