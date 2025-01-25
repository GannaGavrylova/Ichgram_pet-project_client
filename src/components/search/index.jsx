import styles from "./search.module.css";
import { useEffect, useState, useCallback } from "react";
import API from "../../utils/app.js";
import { debounce } from "lodash";

function Search({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await API.get(`/search/users?query=${query}`);
        setSearchResults(response.data.data || []);
      } catch (error) {
        console.error("Error durign search:", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Остановка всплытия, чтобы окно не закрывалось
      >
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        {isLoading && <p>Loading...</p>}
        <ul className={styles.resultsList}>
          {Array.isArray(searchResults) &&
            searchResults.map((user) => (
              <li key={user.id} className={styles.resultItem}>
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className={styles.profileImage}
                />
                <span>{user.username}</span>
              </li>
            ))}
        </ul>
        <button onClick={onClose} className={styles.closeButton}>
          clouse
        </button>
      </div>
    </div>
  );
}

export default Search;
