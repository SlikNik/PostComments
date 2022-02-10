import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentRepository.save(createCommentDto);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async find(options: FindManyOptions): Promise<Comment[]> {
    return await this.commentRepository.find(options);
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentRepository.findOne(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: number): Promise<any> {
    return this.commentRepository.delete(id);
  }
}
