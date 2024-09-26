export class CreateArticleDto{
    title: string;
    authors: string;
    source: string;
    publication_year: number;
    doi: string;
    claim: string;
    evidence: string;

    // We dont need to include these as they are calculated/created
    // from within the system.
    // averageRating: number;
    // totalRatings: number;
}