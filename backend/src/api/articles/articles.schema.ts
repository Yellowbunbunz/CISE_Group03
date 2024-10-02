import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
    @Prop({ required: true})
    title: string;

    @Prop({ required: true})
    authors: string[]; // CHANGED TO STRING[] NOTE

    @Prop({ required: true})
    source: string;

    @Prop({ required: true})
    publication_year: number;

    @Prop({ required: true})
    doi : string;

    @Prop({ required: true })
    claim: string;

    @Prop ({ required : true})
    evidence: string;

    @Prop ({ type: Number, default: 0})
    averageRating: number;

    @Prop ({ type: Number, default: 0})
    totalRatings: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);