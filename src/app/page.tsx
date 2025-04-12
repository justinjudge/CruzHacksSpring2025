'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles['main-container']}>
      {/* Header with navbar */}
      <header className={styles.header}>
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

      {/* Hero section with background image */}
      <div className={styles['hero-section']}>
        <Image
          src="/santa-cruz-aerial.jpg"
          alt="Santa Cruz Aerial View"
          fill
          className={styles['background-image']}
          priority
        />
        <div className={styles['hero-content']}>
          <h2 className={styles['hero-tagline']}>Where Santa Cruz Comes Together.</h2>
          
          {/* Service icons */}
          <div className={styles['services-grid']}>
            {/* Rideshare */}
            <div className={styles['service-card']}>
              <div className={styles['service-card-inner']}>
                <div className={styles['service-icon']}>
                  <Image 
                    src="/rideshare-icon.png" 
                    alt="Rideshare" 
                    width={96} 
                    height={96}
                  />
                </div>
                <h3 className={styles['service-title']}>Rideshare</h3>
              </div>
            </div>
            
            {/* Tutoring */}
            <div className={styles['service-card']}>
              <div className={styles['service-card-inner']}>
                <div className={styles['service-icon']}>
                  <Image 
                    src="/tutoring-icon.png" 
                    alt="Tutoring" 
                    width={96} 
                    height={96}
                  />
                </div>
                <h3 className={styles['service-title']}>Tutoring</h3>
              </div>
            </div>
            
            {/* Recreation */}
            <div className={styles['service-card']}>
              <div className={styles['service-card-inner']}>
                <div className={styles['service-icon']}>
                  <Image 
                    src="/recreation-icon.png" 
                    alt="Recreation" 
                    width={96} 
                    height={96}
                  />
                </div>
                <h3 className={styles['service-title']}>Recreation</h3>
              </div>
            </div>
            
            {/* Lost & Found */}
            <div className={styles['service-card']}>
              <div className={styles['service-card-inner']}>
                <div className={styles['service-icon']}>
                  <Image 
                    src="/lost-found-icon.png" 
                    alt="Lost & Found" 
                    width={96} 
                    height={96}
                  />
                </div>
                <h3 className={styles['service-title']}>Lost & Found</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links section */}
      <footer className={styles.footer}>
        <div className={styles['footer-container']}>
          <div className={styles['footer-columns']}>
            {/* Lost & Found Links */}
            <div className={styles['footer-column']}>
              <h3 className={styles['footer-heading']}>Lost & Found</h3>
              <ul className={styles['footer-links']}>
                <li><Link href="/lost-found/general" className={styles['footer-link']}>General</Link></li>
                <li><Link href="/lost-found/cowell-stevenson" className={styles['footer-link']}>Cowell & Stevenson</Link></li>
                <li><Link href="/lost-found/rachel-carson-oakes" className={styles['footer-link']}>Rachel Carson & Oakes</Link></li>
                <li><Link href="/lost-found/crown-merrill" className={styles['footer-link']}>Crown & Merrill</Link></li>
              </ul>
            </div>
            
            {/* Tutoring Links */}
            <div className={styles['footer-column']}>
              <h3 className={styles['footer-heading']}>Tutoring</h3>
              <ul className={styles['footer-links']}>
                <li><Link href="/tutoring/bsoe" className={styles['footer-link']}>BSOE</Link></li>
                <li><Link href="/tutoring/physics" className={styles['footer-link']}>Physics</Link></li>
                <li><Link href="/tutoring/psychology" className={styles['footer-link']}>Psychology</Link></li>
                <li><Link href="/tutoring/math" className={styles['footer-link']}>Math</Link></li>
              </ul>
            </div>
            
            {/* Rideshare Links */}
            <div className={styles['footer-column']}>
              <h3 className={styles['footer-heading']}>Rideshare</h3>
              <ul className={styles['footer-links']}>
                <li><Link href="/rideshare/split-uber" className={styles['footer-link']}>Split An Uber</Link></li>
                <li><Link href="/rideshare/join-carpool" className={styles['footer-link']}>Join A Carpool</Link></li>
                <li><Link href="/rideshare/propose" className={styles['footer-link']}>Propose New Rideshare</Link></li>
              </ul>
            </div>
            
            {/* Recreation Links */}
            <div className={styles['footer-column']}>
              <h3 className={styles['footer-heading']}>Recreation</h3>
              <ul className={styles['footer-links']}>
                <li><Link href="/recreation/sports" className={styles['footer-link']}>Sports</Link></li>
                <li><Link href="/recreation/weightlifting" className={styles['footer-link']}>Weightlifting</Link></li>
                <li><Link href="/recreation/hiking" className={styles['footer-link']}>Hiking</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
