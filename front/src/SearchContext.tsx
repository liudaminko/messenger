import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, isSearchActive, setIsSearchActive }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
