import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";

import axios from "axios"; // beginning of axios implementation.

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  claim: string;
  evidence: string;
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
    { key: "averageRating", label: "Average Rating"},
    { key: "totalRatings", label: "Total Ratings"},
  ];

  // this is the actual page element that displays the table
  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

// Apparently getStaticProps is called at runtime so that data can be pre-rendered on an html page.
// this getStaticProps is called (revalidated) every 10 seconds.
export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  
  // here is where we use axios to call our api endpoint and collect the data.
  try {
    // this is the articles index page which is actually accessed when we click the 'view articles' button.
    // so the request is to /articles which corresponds to the @Get('') findAll function in articles.controllers.
    const response = await axios.get('http://localhost:8082/articles');


    const articles = response.data.map((article: any) => ({
      id: article._id,
      title: article.title,
      authors: article.authors,
      source: article.source,
      publication_year: article.publication_year,
      doi: article.doi,
      claim: article.claim,
      evidence: article.evidence,
      averageRating: article.averageRating,
      totalRatings: article.totalRatings,
    }));

    return {
      props: {
        articles,
      },

      // Here is where it is told to 'refresh' every 10 seconds.
      revalidate: 10,
    }
  } catch (error) {
    console.error('Error fetching articles:', error);

    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Articles;