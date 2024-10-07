import React, { useState } from "react";
import styles from '../../styles/table.module.scss';

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {

  // logic for selecting article state and POPUP window.
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false); // originally set to false.

  // rowclick function
  const handleRowClick = (article: any) => {
    setSelectedArticle (article);
    setPopupVisible (true);
  };

  // close popup function
  const closePopup = () => {
    setPopupVisible(false);
    setSelectedArticle(null);
  };

  // returning entire table html content.
  return (
    <>
    <table className = {styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} onClick={() => handleRowClick(row)}

          /* Row highlighting check */
          className={selectedArticle === row ? styles.highlightedRow : ""}> 
            {headers.map((header) => (
              <td key={header.key}>{row[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

  {isPopupVisible && selectedArticle && (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <div className={styles.popupTitle}>
          <h3>{selectedArticle.title}</h3>
          <button className={styles.closeButton} onClick={closePopup}>Close</button>
        </div>
        
        <div className={styles.popupMetadata}>
          <p>Author: {selectedArticle.authors}</p>
          <p>Published Year: {selectedArticle.publication_year}</p>
          <p>Rating: {selectedArticle.averageRating}</p>
          <p>Total Ratings: {selectedArticle.totalRatings}</p>
        </div>

        <div className={styles.popupRating}>
          <span>5.0</span>
          <div className={styles.stars}>
            {/* Star ratings. 
                In the future I will turn the star ratings into buttons that can send rating information to the backend */}
            ★★★★★
          </div>
        </div>

        <div className={styles.popupContentText}>
          <h3>Summary:</h3>
          <p>{selectedArticle.summary}</p>
        </div>
      </div>
  </div>
)}


  </>
  )
}

export default SortableTable;
