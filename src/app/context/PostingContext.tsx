'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the possible categories
export type PostingCategory = 'rideshare' | 'tutoring' | 'recreation' | 'lost-found' | null;

// Define the shape of our context
type PostingContextType = {
  selectedCategory: PostingCategory;
  setSelectedCategory: (category: PostingCategory) => void;
};

// Create context with a default value
const PostingContext = createContext<PostingContextType | undefined>(undefined);

// Provider component
export function PostingProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<PostingCategory>(null);

  return (
    <PostingContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </PostingContext.Provider>
  );
}

// Custom hook to use the posting context
export function usePosting() {
  const context = useContext(PostingContext);
  if (context === undefined) {
    throw new Error('usePosting must be used within a PostingProvider');
  }
  return context;
} 