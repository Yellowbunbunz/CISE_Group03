import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article, ArticleDocument } from "./articles.schema";
import { CreateArticleDto } from "./create-article.dto";

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    ) {}


    // fetch all articles
    async findAll(): Promise<Article[]> {
        return this.articleModel.find().exec();
    }

    // fetch articles by 'title'
    async findByTitle(title: string) : Promise<Article[]> {
        //  case-insensitive search
        return this.articleModel.find({ title: { $regex: title, $options: 'i'} }).exec();
    }

    // fetch articles by publication year
    async findByPublicationYear(year: number) : Promise<Article[]> {
        return this.articleModel.find({ publication_year: year }).exec();
    }

    //fetch articles by their category.
    async findByCategory(cat: string)  : Promise<Article[]> {
        return this.articleModel.find({category: cat}).exec();
    }

    // this function finds an article based on the _id assigned by MongoDB. 
    // users wont use this one as searching via an ID like: 12bufiub12431341@fwefe is weird, but good for testing.
    async findOne(id: string): Promise<Article> {
        return this.articleModel.findById(id).exec();
    }

    // Create a new article
    async create(CreateArticleDto: CreateArticleDto): Promise<Article> {
        const newArticle = new this.articleModel({
            ...CreateArticleDto,    // ... 'spread operator' is used to copy the fields from the DTO to the newArticle.
            averageRating: 0,       // new articles have no total or average ratings yet.
            totalRatings: 0
        });
        return newArticle.save();
    }

    // update article by ID
    // this will probably be used when we update ratings for articles. 
    async update(id: string, article: Partial<Article>): Promise<Article> {
        return this.articleModel.findByIdAndUpdate(id, article, { new: true}).exec();
    }

    // delete an article by ID
    async delete(id: string): Promise<Article> {
        return this.articleModel.findByIdAndDelete(id).exec();
    }
}