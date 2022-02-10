import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'SlikNik11',
      database: 'comment_ms',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommentsModule,
  ],
})
export class AppModule {}
