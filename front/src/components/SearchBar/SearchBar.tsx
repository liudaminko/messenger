import React, { useState, useContext } from "react";
import styles from "./SearchBar.module.css";
import { useSearch } from "../../SearchContext";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { searchTerm, isSearchActive, setIsSearchActive } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
    setIsSearchActive(!isSearchActive);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.container}>
      {!inputValue && !isFocused && !isSearchActive && (
        <img
          src="./search.png"
          alt="Search Icon"
          className={styles.searchIcon}
        />
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search"
        className={styles.input}
      />
      {(inputValue || isFocused || isSearchActive) && (
        <img
          src="./close.png"
          alt="Close Icon"
          className={styles.closeIcon}
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default SearchBar;
