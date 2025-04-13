'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePosting } from '../context/PostingContext';
import styles from './post.module.css';

export default function PostPage() {
  const { selectedCategory } = usePosting();
  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>{getCategoryTitle()} Postings</h1>
      </header>


    </div>
  );
} 