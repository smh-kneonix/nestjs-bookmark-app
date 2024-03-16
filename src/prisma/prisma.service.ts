import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
//logic to connect to database
// prismaClient is class which allow us to connect disconnect and etc...
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }
    clearDb() {
        // transaction make quae of execute for multiple query 
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
