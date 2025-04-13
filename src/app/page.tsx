'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 250); // fades header out

  return (
    <main className={styles['main-container']}>

      {/* Header (fades out on scroll) */}
      <header className={styles.header} style={{ opacity }}>
        <div className={styles['logo-container']}>
          <div className={styles['logo-image']}>
            <Image 
              src="/slug-icon.png" 
              alt="Slug Icon" 
              width={50} 
              height={50}
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
            Where Santa Cruz Comes Together — rideshare, tutoring, lost & found, and more.
          </h2>
        </div>
        <div className={styles['scrollCue']}>↓ Scroll to explore ↓</div>
      </section>

      {/* Categories Section */}
      <section className={styles['categorySection']}>
        <div className={styles['services-grid']}>

          {/* Rideshare */}
          <div className={styles['service-card']}>
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/RideshareLogo.png" alt="Rideshare" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Rideshare</h3>
            </div>
          </div>

          {/* Tutoring */}
          <div className={styles['service-card']}>
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/TutoringLogo.png" alt="Tutoring" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Tutoring</h3>
            </div>
          </div>

          {/* Recreation */}
          <div className={styles['service-card']}>
            <div className={styles['service-card-inner']}>
              <div className={styles['service-icon']}>
                <Image src="/images/RecreationLogo.png" alt="Recreation" width={96} height={96} />
              </div>
              <h3 className={styles['service-title']}>Recreation</h3>
            </div>
          </div>

          {/* Lost & Found */}
          <div className={styles['service-card']}>
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
    </main>
  );
}