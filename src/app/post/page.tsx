'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePosting, PostingCategory } from '../context/PostingContext';
import styles from './post.module.css';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import NewPostPopup from '../components/NewPostPopup';

export default function PostPage() {
  const { selectedCategory, setSelectedCategory } = usePosting();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewPostPopup, setShowNewPostPopup] = useState(false);
  const initialLoadRef = useRef(true);

  // Redirect to home only on initial load if no category is selected
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      if (!selectedCategory) {
        router.push('/');
      }
    }
  }, [selectedCategory, router]);

  // If there's still no category after initial load check, return null
  if (!selectedCategory) {
    return null;
  }

  // Get the display title based on the selected category
  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'rideshare':
        return 'Rideshare';
      case 'tutoring':
        return 'Tutoring';
      case 'recreation':
        return 'Recreation';
      case 'lost-found':
        return 'Lost & Found';
      default:
        return '';
    }
  };

  const handleCategorySelect = (category: PostingCategory) => {
    // Set the selected category in context
    if (category) {
      setSelectedCategory(category);
      setShowDropdown(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          
          <div className={styles.titleContainer}>
            <div 
              className={styles.titleDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <h1 className={styles.title}>{getCategoryTitle()} Postings</h1>
              <span className={styles.dropdownArrow}>▼</span>
              
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <div 
                    className={styles.dropdownItem} 
                    onClick={() => handleCategorySelect('rideshare')}
                  >
                    Rideshare
                  </div>
                  <div 
                    className={styles.dropdownItem} 
                    onClick={() => handleCategorySelect('tutoring')}
                  >
                    Tutoring
                  </div>
                  <div 
                    className={styles.dropdownItem} 
                    onClick={() => handleCategorySelect('recreation')}
                  >
                    Recreation
                  </div>
                  <div 
                    className={styles.dropdownItem} 
                    onClick={() => handleCategorySelect('lost-found')}
                  >
                    Lost & Found
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className={styles.newPostButton}
            onClick={() => setShowNewPostPopup(true)}
          >
            + New Post
          </button>
        </div>
      </header>

      <CardGrid columns={4}>
        {/* Example posts for the selected category */}
        <Card 
          title={`${getCategoryTitle()} Post 1`} 
          date={new Date().toISOString()} // Today
        >
          <p>This is a {getCategoryTitle()} post example. Content will depend on the selected category.</p>
        </Card>
        <Card 
          title={`${getCategoryTitle()} Post 2`} 
          date={(() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday.toISOString();
          })()}
        >
          <p>Another {getCategoryTitle()} post from yesterday. Looking for people interested in this topic.</p>
        </Card>
        <Card 
          title={`${getCategoryTitle()} Post 3`} 
          date={(() => {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return lastMonth.toISOString();
          })()}
        >
          <p>An older {getCategoryTitle()} post from last month still relevant.</p>
        </Card>
        <Card 
          title={`${getCategoryTitle()} Post 4`} 
          date={(() => {
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return lastYear.toISOString();
          })()}
        >
          <p>A classic {getCategoryTitle()} post from last year that people still reference.</p>
        </Card>
      </CardGrid>

      {/* New Post Popup */}
      <NewPostPopup 
        isOpen={showNewPostPopup} 
        onClose={() => setShowNewPostPopup(false)}
        category={selectedCategory}
      />
    </div>
  );
} 