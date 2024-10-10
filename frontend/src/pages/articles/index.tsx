import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";

import axios from "axios"; // beginning of axios implementation.

// Define the interface for the articles returned from the API
interface ApiArticle {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  publication_year: string;
  doi: string;
  claim: string;
  evidence: string;
  summary: string;
  averageRating: number;
  totalRatings: number;
}

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  claim: string;
  evidence: string;
  summary: string;
  averageRating: number;
  totalRatings: number;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  // Creating the headers
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "publication_year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "averageRating", label: "Average Rating" },
    { key: "totalRatings", label: "Total Ratings" },
  ];

  // This is the actual page element that displays the table
  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

// Apparently, getStaticProps is called at runtime so that data can be pre-rendered on an HTML page.
// This getStaticProps is called (revalidated) every 10 seconds.
export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  // Here is where we use axios to call our API endpoint and collect the data.
  try {
    
    // This is the articles index page which is actually accessed when we click the 'view articles' button.
    // So the request is to /articles which corresponds to the @Get('') findAll function in articles.controllers.
    const response = await axios.get<ApiArticle[]>('http://localhost:8082/articles');

    // All of the articles are mapped inside of 'data'. 
    const articles: ArticlesInterface[] = response.data.map((article) => ({
      id: article._id, // Use the _id field directly from the API response
      title: article.title,
      authors: article.authors.join(', '), // Join authors array into a string
      source: article.source,
      publication_year: article.publication_year,
      doi: article.doi,
      claim: article.claim,
      evidence: article.evidence,
      summary: article.summary,
      averageRating: article.averageRating,
      totalRatings: article.totalRatings,
    }));

    return {
      props: {
        articles,
      },
      // Here is where it is told to 'refresh' every 10 seconds.
      revalidate: 10, // Set revalidation time
    };
  } catch (error) {
    console.error('Error fetching articles:', error);

    return {
      props: {
        articles: [], // Return an empty array on error
      },
    };
  }
};

export default Articles;