import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { lastValueFrom } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private httpService: HttpService,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const response = await lastValueFrom(
        this.httpService.get(
          `http://localhost:8001/api/posts/${post.id}/comments`,
        ),
      );
      post[i] = {
        ...post,
        comments: response.data,
      };
    }
    return posts;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(+id);
  }
}
