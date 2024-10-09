import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SortableTable from '../../components/table/SortableTable';
import axios from 'axios';  // Use axios for consistency

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
  const { query } = router.query; // Get the search query from URL

  useEffect(() => {
    const fetchArticles = async () => {
      if (query) {
        try {
          let response;
          const queryString = encodeURIComponent(query.toString()); // Encode the query for URL

          // Check if the query is a number (publication year) or not (title)
          if (!isNaN(Number(queryString))) {
            // If the query is a number, search by publication year
            response = await axios.get(`http://localhost:8082/articles/search-by-year/${queryString}`);
          } else {
            // If not a number, search by title
            response = await axios.get(`http://localhost:8082/articles/search-by-title?title=${queryString}`);
          }

          // Map the response data to the required format
          const data = response.data.map((article: any) => ({
            id: article._id,
            title: article.title,
            authors: article.authors.join(', '),
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
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    };

    fetchArticles();
  }, [query]);  // Trigger this effect when the 'query' changes

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
      <h1>Search Results for: {query}</h1>

      {articles.length > 0 ? (
        <SortableTable headers={headers} data={articles} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default SearchPage;
