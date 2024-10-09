import React, { useState } from "react";
import { useRouter } from 'next/router';
import styles from "./Nav.module.scss";

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // Navigate to the search page with a unified query parameter
      router.push(`/articles/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      {children}
      
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <label htmlFor="search" className={styles.searchLabel}>Search: </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter title or publication year"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Go</button>
      </form>
    </nav>
  );
};

export default NavBar;