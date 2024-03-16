import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';
const PORT = 3333;
const BASE_URL = `http://localhost:${PORT}`;

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    // before all the test start
    beforeAll(async () => {
        // make test module which have app module inside it
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        //create app
        app = moduleRef.createNestApplication();
        // add pipes
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        // start server
        await app.init();
        await app.listen(PORT);
        prisma = app.get(PrismaService);

        await prisma.clearDb();
        pactum.request.setBaseUrl(BASE_URL);
    });
    // after all we close the app
    afterAll(async () => {
        await app.close();
    });

    // auth
    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'test@gmail.com',
            password: 'Aa123456',
        };
        // signup
        describe('Signup', () => {
            it('should response with 201 and signup', () => {
                return pactum
                    .spec()
                    .post(`/auth/signup`)
                    .withBody(dto)
                    .expectStatus(201);
            });
            it('should throw when email is empty', () => {
                return pactum
                    .spec()
                    .post(`/auth/signup`)
                    .withBody({
                        password: dto.password,
                    })
                    .expectStatus(400);
            });
            it('should throw when password is empty', () => {
                return pactum
                    .spec()
                    .post(`/auth/signup`)
                    .withBody({
                        email: dto.email,
                    })
                    .expectStatus(400);
            });
            it('should throw when body is empty', () => {
                return pactum
                    .spec()
                    .post(`/auth/signup`)
                    .withBody({})
                    .expectStatus(400);
            });
        });

        //sign in
        describe('Singin', () => {
            it('should response with 200 and singin', () => {
                return pactum
                    .spec()
                    .post(`/auth/signin`)
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'access_token');
            });
        });
        it('should throw when email is empty', () => {
            return pactum
                .spec()
                .post(`/auth/signin`)
                .withBody({
                    password: dto.password,
                })
                .expectStatus(400);
        });
        it('should throw when password is empty', () => {
            return pactum
                .spec()
                .post(`/auth/signin`)
                .withBody({
                    email: dto.email,
                })
                .expectStatus(400);
        });
        it('should throw when body is empty', () => {
            return pactum
                .spec()
                .post(`/auth/signin`)
                .withBody({})
                .expectStatus(400);
        });
    });

    //user
    describe('Users', () => {
        describe('Get me', () => {
            // HINT: the $ is like normal JS but S stand for store in pactum
            it('get current user', () => {
                return pactum
                    .spec()
                    .get(`/users/me`)
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .expectStatus(200);
            });
        });

        describe('Edit user', () => {
            const dto: EditUserDto = {
                email: 'test@exam.com',
                firstName: 'test',
                lastName: 'test',
            };
            it('should response with 200 and edit user', () => {
                return pactum
                    .spec()
                    .patch('/users')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .withBody({
                        ...dto,
                    })
                    .expectStatus(200)
                    .expectBodyContains(dto.email)
                    .expectBodyContains(dto.firstName)
                    .expectBodyContains(dto.lastName);
            });
        });
    });

    //bookmark
    describe('Bookmarks', () => {
        describe('Get empty bookmark', () => {
            it('should get bookmarks', () => {
                return pactum
                    .spec()
                    .get('/bookmarks')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .expectStatus(200)
                    .expectBody([]);
            });
        });
        describe('Create bookmark', () => {
            const dto: CreateBookmarkDto = {
                title: 'test bookmark',
                description: 'my github account',
                link: 'https://github.com/smh-kneonix',
            };
            it('should create new bookmarks', () => {
                return pactum
                    .spec()
                    .post('/bookmarks')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .withBody(dto)
                    .expectStatus(201);
            });
        });

        describe('Get bookmark by id', () => {
            it('should get bookmarks', () => {
                return pactum
                    .spec()
                    .get('/bookmarks')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .expectStatus(200);
            });
        });

        describe('Edit bookmark by id', () => {
            const dto: EditBookmarkDto = {
                title: 'test title for editing',
                description: 'my linked in link',
                link: 'https://www.linkedin.com/in/s-m-h-mahmodian-03a90a216/',
            };
            it('should edit bookmark', () => {
                return pactum
                    .spec()
                    .patch('/bookmarks/1')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .withBody(dto)
                    .expectStatus(200);
            });
        });
        describe('Delete bookmark by id', () => {
            it('should delete one bookmark by id', () => {
                return pactum
                    .spec()
                    .delete('/bookmarks/1')
                    .withHeaders({
                        Authorization: `Bearer $S{userAt}`,
                    })
                    .expectStatus(200);
            });
        });
    });
});
