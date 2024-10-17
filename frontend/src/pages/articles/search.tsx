import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SortableTable from '../../components/table/SortableTable';
import axios from 'axios';  // Use axios for consistency

// Api Article follows the structure of the data returned from the API request. It matches the backends data interface.
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

// This is the interface we use to pass to SortableTable, after the authors have been joined to one string.
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

const SearchPage = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const router = useRouter();
  const { query, category } = router.query; // Capture both query and category from URL

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;

        // Perform category search
        if (category) {
          response = await axios.get<ApiArticle[]>(`http://localhost:8082/articles/search-by-category?category=${category}`);
        }
        // Perform title/year search
        else if (query) {
          const queryString = encodeURIComponent(query.toString());
          if (!isNaN(Number(queryString))) {
            // Search by year
            response = await axios.get<ApiArticle[]>(`http://localhost:8082/articles/search-by-year/${queryString}`);
          } else {
            // Search by title
            response = await axios.get<ApiArticle[]>(`http://localhost:8082/articles/search-by-title?title=${queryString}`);
          }
        }

        // Map the response data to the required format
        if (response && response.data) {
          const data = response.data.map((article): ArticlesInterface => ({
            id: article._id,
            title: article.title,
            authors: article.authors.join(", "),
            source: article.source,
            publication_year: article.publication_year,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
            summary: article.summary,
            averageRating: article.averageRating,
            totalRatings: article.totalRatings,
          }));
          setArticles(data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [query, category]);  // Trigger this effect when the 'query' or 'category' changes

  const headers = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'source', label: 'Source' },
    { key: 'publication_year', label: 'Publication Year' },
    { key: 'doi', label: 'DOI' },
    { key: 'claim', label: 'Claim' },
    { key: 'evidence', label: 'Evidence' },
    { key: 'averageRating', label: 'Average Rating' },
    { key: 'totalRatings', label: 'Total Ratings' },
  ];

  return (
    <div className="container">
      <h1>Search Results</h1>

      {/* Displaying search context */}
      <div className="search-context">
        {category ? (
          <p>Showing results for category: <strong>{category}</strong></p>
        ) : query ? (
          <p>Showing results for query: <strong>{query}</strong></p>
        ) : (
          <p>No search criteria provided.</p>
        )}
      </div>

      {articles.length > 0 ? (
        <SortableTable headers={headers} data={articles} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default SearchPage;