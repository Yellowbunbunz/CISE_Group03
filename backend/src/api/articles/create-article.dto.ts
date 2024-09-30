import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArticleDto{
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    authors: string;

    @IsString()
    @IsNotEmpty()
    source: string;

    @IsNumber()
    @IsNotEmpty()
    publication_year: number;

    @IsString()
    @IsNotEmpty()
    doi: string;

    @IsString()
    @IsNotEmpty()
    claim: string;

    @IsString()
    @IsNotEmpty()
    evidence: string;

    // We dont need to include these as they are calculated/created
    // from within the system.
    // averageRating: number;
    // totalRatings: number;
}