import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  authors: string[];

  @IsString()
  category: string;

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

  @IsString()
  summary: string;

  // We dont need to include these as they are calculated/created
  // from within the system.
  // averageRating: number;
  // totalRatings: number;
}
