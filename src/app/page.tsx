'use client';

import { useEffect, useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePosting, PostingCategory } from './context/PostingContext';
import styles from './page.module.css';
import NewPostPopup from './components/NewPostPopup';

import clientPromise from "../lib/mongodb";
import type { GetServerSidePropsContext } from 'next'


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const { setSelectedCategory } = usePosting();
  const [showNewPostPopup, setShowNewPostPopup] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 250); // fades header out

  // Function to handle service card click
  const handleServiceClick = (category: PostingCategory) => {
    setSelectedCategory(category);
    router.push('/post');
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, category: PostingCategory) => {
    // Trigger click on Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleServiceClick(category);
    }
  };

  // Handle opening the new post popup with a specific category

  return (
    <main className={styles['main-container']}>

      {/* Header (fades out on scroll) */}
      <header className={styles.header} style={{ opacity }}>
        <div className={styles['logo-container']}>
          <div className={styles['logo-image']}>
            <Image 
              src="/images/CruzConnectLogo.png" 
              alt="Slug Icon" 
              fill
              className={styles['cruz-logo']} 
            />
          </div>
          <h1 className={styles['logo-text']}>CruzConnect</h1>
        </div>
        <nav className={styles['nav-menu']}>
          <Link href="/" className={styles['nav-link']}>Home</Link>
          <Link href="/about" className={styles['nav-link']}>About</Link>
          <Link href="/contact" className={styles['nav-link']}>Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <Image
          src="/images/santa-cruz-aerial.jpg"
          alt="Santa Cruz Aerial View"
          fill
          className={styles['background-image']}
          priority
        />
        <div className={styles['hero-content']}>
          <h2 className={styles['hero-tagline']}>
            Where Santa Cruz Comes Together
          </h2>
        </div>
        <div className={styles['scrollCue']}>↓ Scroll to explore ↓</div>
      </section>

      {/* Categories Section */}
      <section className={styles['categorySection']}>
        <div className={styles['services-grid']}>

          {/* Rideshare */}
          <div 
            className={styles['service-card']} 
            onClick={() => handleServiceClick('rideshare')}
            onKeyDown={(e) => handleKeyDown(e, 'rideshare')}
            role="button"
            tabIndex={0}
            aria-label="Go to Rideshare postings"
          >
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/RideshareLogo.png" alt="Rideshare" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Rideshare</h3>
            </div>
          </div>

          {/* Tutoring */}
          <div 
            className={styles['service-card']}
            onClick={() => handleServiceClick('tutoring')}
            onKeyDown={(e) => handleKeyDown(e, 'tutoring')}
            role="button"
            tabIndex={0}
            aria-label="Go to Tutoring postings"
          >
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/TutoringLogo.png" alt="Tutoring" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Tutoring</h3>
            </div>
          </div>

          {/* Recreation */}
          <div 
            className={styles['service-card']}
            onClick={() => handleServiceClick('recreation')}
            onKeyDown={(e) => handleKeyDown(e, 'recreation')}
            role="button"
            tabIndex={0}
            aria-label="Go to Recreation postings"
          >
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/RecreationLogo.png" alt="Recreation" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Recreation</h3>
            </div>
          </div>

          {/* Lost & Found */}
          <div 
            className={styles['service-card']}
            onClick={() => handleServiceClick('lost-found')}
            onKeyDown={(e) => handleKeyDown(e, 'lost-found')}
            role="button"
            tabIndex={0}
            aria-label="Go to Lost & Found postings"
          >
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/LostAndFoundLogo.png" alt="Lost & Found" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Lost & Found</h3>
            </div>
          </div>

        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer className={styles.footer}>
        <div className={styles['footer-container']}>
          <div className={styles['footer-columns']}>
            {/* Your footer content here */}
          </div>
        </div>
      </footer>

      {/* Floating New Post Button */}
      <button 
        className={styles.floatingNewPostButton}
        onClick={() => setShowNewPostPopup(true)}
        aria-label="Create new post"
      >
        +
      </button>

      {/* New Post Popup */}
      <NewPostPopup 
        isOpen={showNewPostPopup} 
        onClose={() => setShowNewPostPopup(false)}
        category={null}
        />
    </main>
  );
}