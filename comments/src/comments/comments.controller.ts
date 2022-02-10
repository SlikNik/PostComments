import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('posts/:id/comments')
  async postComments(@Param('id') id: number) {
    return this.commentsService.find({
      where: {
        post_id: id,
      },
    });
  }

  @Post('comments')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('comments')
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('comments:id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(+id);
  }

  @Patch('comments:id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(+id);
  }
}
