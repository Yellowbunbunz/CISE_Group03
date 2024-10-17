import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
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
    async findAll(): Promise<Article[]>{
        return this.articlesService.findAll();
    }

    // Search by Title
    @Get('search-by-title')
    async findByTitle(@Query('title') title: string): Promise<Article[]> {
        return this.articlesService.findByTitle(title);
    }

    // Search by title
    @Get('search-by-year/:year')
    async findByPublicationYear(@Param('year') year:number): Promise<Article[]> {
        return this.articlesService.findByPublicationYear(year);
    }

    // Search by category
    @Get('search-by-category')
    async findByCategory(@Query('category') category: string): Promise<Article[]> {
        return this.articlesService.findByCategory(category);
    }

    //Get functions to allow users to search for articles either by title or by publication year
    @Get('search')
    async search(@Query('query') query: string): Promise<Article[]> {
        const titleQuery = query; // Assume the entire input can be a title or year
        const yearQuery = parseInt(query, 10); // Try to parse the input as a year

        if (!isNaN(yearQuery)) {
            // If the input is a valid year, search by year
            return this.articlesService.findByPublicationYear(yearQuery);
        } else {
            // Otherwise, search by title
            return this.articlesService.findByTitle(titleQuery);
        }
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
    async update(@Param('id') id: string, @Body() article: Partial<CreateArticleDto>): Promise<Article> {
        return this.articlesService.update(id, article);
    }

    // delete an article by id
    async delete(@Param('id') id: string): Promise<Article> {
        return this.articlesService.delete(id);
    }
}