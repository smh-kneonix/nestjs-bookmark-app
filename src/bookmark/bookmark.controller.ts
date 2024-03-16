import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Get()
    getBookmarks(@GetUser('id') userid: number) {
        return this.bookmarkService.getBookmarks(userid);
    }

    // Get/bookmarks/3
    @Get(':id')
    getBookmarkById(
        @GetUser('id') userid: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.getBookmarkById(userid, bookmarkId);
    }

    @Patch(":id")
    editBookmarkById(
        @GetUser('id') userid: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,
    ) {
        return this.bookmarkService.editBookmarkById(userid,bookmarkId, dto);
    }

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userid: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.deleteBookmarkById(userid, bookmarkId);
    }
}
