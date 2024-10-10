import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './articles.schema';
import { title } from 'process';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // ---------------------------- Get functions ---------------------------- //

  // Get all Articles
  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get('search-by-title')
  async findByTitle(@Query('title') title: string): Promise<Article[]> {
    return this.articlesService.findByTitle(title);
  }

  @Get('search-by-year/:year')
  async findByPublicationYear(@Param('year') year: number): Promise<Article[]> {
    return this.articlesService.findByPublicationYear(year);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  // ---------------------------- Post functions ---------------------------- //

  @Post()
  async create(@Body() CreateArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(CreateArticleDto);
  }

  // Update an article by id.
  // will usually be called when updating a review on an article.
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() article: Partial<CreateArticleDto>,
  ): Promise<Article> {
    return this.articlesService.update(id, article);
  }

  // delete an article by id
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }
}
