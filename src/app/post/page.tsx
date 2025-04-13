'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePosting, PostingCategory } from '../context/PostingContext';
import styles from './post.module.css';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import NewPostPopup from '../components/NewPostPopup';
import { Post } from '../api/posts/route';
import GeminiChat from '../components/GeminiChat';


export default function PostPage() {
  const { selectedCategory, setSelectedCategory } = usePosting();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewPostPopup, setShowNewPostPopup] = useState(false);
  const initialLoadRef = useRef(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      if (!selectedCategory) {
        router.push('/');
      }
    }
  }, [selectedCategory, router]);

  useEffect(() => {
    if (selectedCategory) {
      fetchPosts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchPosts = async (category: PostingCategory) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch(`/api/posts?category=${category}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch posts');
      }

      setPosts(data.data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedCategory) return null;

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'rideshare': return 'Rideshare';
      case 'tutoring': return 'Tutoring';
      case 'recreation': return 'Recreation';
      case 'lost-found': return 'Lost & Found';
      default: return '';
    }
  };

  const handleCategorySelect = (category: PostingCategory) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>

          <div className={styles.titleContainer}>
            <div 
              className={styles.titleDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <h1 className={styles.title}>{getCategoryTitle()} Postings</h1>
              <span className={styles.dropdownArrow}>▼</span>

              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  {['rideshare', 'tutoring', 'recreation', 'lost-found'].map((cat) => (
                    <div
                      key={cat}
                      className={styles.dropdownItem}
                      onClick={() => handleCategorySelect(cat as PostingCategory)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </div>
                  ))}
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

      {/* Main Display */}
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading posts...</div>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <div className={styles.error}>{error}</div>
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyContainer}>
          <div className={styles.empty}>
            No {getCategoryTitle()} posts yet. Be the first to create one!
          </div>
        </div>
      ) : (
        <CardGrid columns={4}>
          <div>
              <GeminiChat />
          </div>

          {posts.map((post) => (
            <Card 
              key={post._id?.toString() || post.title}
              title={post.title}
              date={post.dateCreated?.toString() || new Date().toISOString()}
            >
              <p>{post.description}</p>
              {post.contact && (
                <p className={styles.contactInfo}>
                  <strong>Contact:</strong> {post.contact}
                </p>
              )}
            </Card>
          ))}
        </CardGrid>
      )}

      {/* New Post Popup */}
      <NewPostPopup 
        isOpen={showNewPostPopup} 
        onClose={() => {
          setShowNewPostPopup(false);
          fetchPosts(selectedCategory);
        }}
        onPostCreated={() => fetchPosts(selectedCategory)}
        category={selectedCategory}
      />
    </div>
  );
}
