'use client';

import { useEffect, useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePosting, PostingCategory } from './context/PostingContext';
import styles from './page.module.css';
import NewPostPopup from './components/NewPostPopup';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const { setSelectedCategory } = usePosting();
  const [showNewPostPopup, setShowNewPostPopup] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<PostingCategory>('rideshare');

  useEffect(() => {
    const handleScroll = () => {
      // Log to verify scrolling is happening
      const newScrollY = window.scrollY;
      console.log('scrollY:', newScrollY);
      setScrollY(newScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle the hidden class when scrollY is greater than, say, 20
  const headerClasses = `${styles.header} ${scrollY > 20 ? styles['header-hidden'] : ''}`;

  const handleServiceClick = (category: PostingCategory) => {
    if (category) {
      setSelectedCategory(category);
      router.push('/post');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, category: PostingCategory) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleServiceClick(category);
    }
  };

  const handleNewPost = (category: PostingCategory = 'rideshare') => {
    setCurrentCategory(category);
    setShowNewPostPopup(true);
  };

  return (
    <main className={styles['main-container']}>
      {/* Fixed header that slides off with scroll */}
      <header className={headerClasses}>
      <div className={styles['logo-container']}>
          <h1 className={styles['logo-text']}>CruzConnect</h1>
          <div className={styles['logo-image']}>
            <Image 
              src="/images/CruzConnectLogo.png" 
              alt="Slug Icon" 
              fill
              className={styles['cruz-logo']} 
            />
          </div>
        </div>
        <nav className={styles['nav-menu']}>
          <Link href="/" className={styles['sign-in-button']}>Sign In</Link>
          <Link href="/" className={styles['nav-link']}>Home</Link>
          <Link href="/about" className={styles['nav-link']}>About</Link>
          <Link href="/" className={styles['nav-link']}>Contact Us</Link>
        </nav>
      </header>

      {/* Hero Section with background image */}
      <section className={styles['hero-section']}>
        <Image
          src="/images/landscapeshotucsc.jpg"
          alt="Santa Cruz Aerial View"
          fill
          className={styles['background-image']}
          priority
        />
        <div className={styles['hero-content']}>
          <h2 className={styles['hero-tagline']}>Where Santa Cruz Comes Together</h2>
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
                <Image src="/images/LostAndFoundLogo.png" alt="Lost & Found" width={111} height={110} />
              </div>
              <h3 className={styles['service-title']}>Lost & Found</h3>
            </div>
          </div>

        </div>
      </section>

      {/* Footer (funny lol) */}
      <footer className={styles.footer}>
        <div className={styles['footer-columns']}>
          {/* Left Column */}
          <div>
            <h3 className={styles['footer-heading']}>CruzConnect</h3>
            <p>Connecting the Santa Cruz community.</p>
          </div>

          {/* Middle Column */}
          <div>
            <h3 className={styles['footer-heading']}>Links</h3>
            <ul className={styles['footer-links']}>
              <li><Link href="/about" className={styles['footer-link']}>About</Link></li>
              <li><Link href="/post" className={styles['footer-link']}>Post Listings</Link></li>
            </ul>
          </div>

          {/* Right Column */}
          <div className={styles['footer-right']}>
            <h3 className={styles['footer-heading']}>Contact</h3>
            <p>Email: cruzconnect@ucsc.edu</p>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles['footer-bottom']}>
          <p>© {new Date().getFullYear()} CruzConnect. All rights reserved.</p>
          <span className={styles['made-in-sc']}>Made with 💛 in Santa Cruz.</span>
        </div>
      </footer>


      {/* Floating New Post Button */}
      <button 
        className={styles.floatingNewPostButton}
        onClick={() => handleNewPost()}
        aria-label="Create new post"
      >
        +
      </button>

      {/* New Post Popup */}
      <NewPostPopup 
        isOpen={showNewPostPopup} 
        onClose={() => setShowNewPostPopup(false)}
        category={currentCategory}
      />
    </main>
  );
}