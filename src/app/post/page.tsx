'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePosting } from '../context/PostingContext';
import styles from './post.module.css';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';

export default function PostPage() {
  const { selectedCategory } = usePosting();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  // Redirect to home if no category is selected
  useEffect(() => {
    if (!selectedCategory) {
      router.push('/');
    }
  }, [selectedCategory, router]);

  if (!selectedCategory) {
    return null; // Return nothing during the redirect
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

  const handleCategorySelect = (category: string) => {
    // Navigate to the selected category
    router.push(`/?category=${category}`);
    setShowDropdown(false);
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
          
          <button className={styles.newPostButton}>
            + New Post
          </button>
        </div>
      </header>

      <CardGrid columns={4}>
        <Card 
          title="Post 1" 
          date={new Date().toISOString()} // Today
        >
          <p>This is the content of Post Hello my name is jeff isn&apos;t that strange? blah blah blah cool post yep that is everything</p>
        </Card>
        <Card 
          title="Post 2" 
          date={(() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday.toISOString();
          })()}
        >
          <p>This is the content of Post 2</p>
        </Card>
        <Card 
          title="Post 3" 
          date={(() => {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return lastMonth.toISOString();
          })()}
        >
          <p>This is the content of Post 3</p>
        </Card>
        <Card 
          title="Post 4" 
          date={(() => {
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return lastYear.toISOString();
          })()}
        >
          <p>This is the content of Post 4</p>
        </Card>
      </CardGrid>
    </div>
  );
} 