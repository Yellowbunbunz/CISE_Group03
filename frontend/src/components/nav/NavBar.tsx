import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "./Nav.module.scss";
import { IoMdArrowDropdown } from "react-icons/io";

const NavBar = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState(''); // For title/year search
  const [searchCategory, setSearchCategory] = useState(''); // For category search
  const [showCategories, setShowCategories] = useState(false); // To toggle category display
  const router = useRouter();
  const categoryRef = useRef<HTMLDivElement>(null); // Ref for category dropdown

  // Static category options
  const categories = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4'];

  // Handle form submission to determine which search to trigger (title/year)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Only perform title/year search manually when "Go" is pressed
    if (searchQuery.trim()) {
      router.push(`/articles/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchCategory(''); // Clear category search
    }
  };

  // Handle category selection change and trigger the category search immediately
  const handleCategoryClick = (category: string) => {
    setSearchCategory(category);
    setSearchQuery(''); // Clear search query when a category is selected
    setShowCategories(false); // Hide category options after selection

    // Perform the category search immediately
    if (category.trim()) {
      router.push(`/articles/search?category=${encodeURIComponent(category)}`);
    }
  };

  // Handle search query change and clear the category selection
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchCategory(''); // Clear category when typing a search query
  };

  // Toggle categories display
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      {children}

      {/* Clickable Label for Category */}
      <div className={styles.categoryContainer} ref={categoryRef}>
        <label htmlFor="category" className={styles.categoryLabel} onClick={toggleCategories}>
          Category
          <IoMdArrowDropdown className={styles.dropdownIcon} />
        </label>

        {/* Display list of categories when the label is clicked */}
        {showCategories && (
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={styles.categoryButton}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSearch} className={styles.searchForm}>
        {/* Search by Title or Year */}
        <label htmlFor="search" className={styles.searchLabel}>Search </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleQueryChange}
          placeholder="Enter title or year"
          className={styles.searchInput}
        />

        {/* Button only for title/year search */}
        <button type="submit" className={styles.searchButton} disabled={!!searchCategory}>
          Go
        </button>
      </form>
    </nav>
  );
};

export default NavBar;