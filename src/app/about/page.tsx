'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src="/images/landscapeshotucsc.jpg" 
          alt="Santa Cruz Background" 
          fill 
          priority 
          className={styles.backgroundImage}
        />
      </div>

      {/* Content Overlay */}
      <div className={styles.content}>
        <h1 className={styles.title}>About CruzConnect</h1>
        <p className={styles.description}>
          CruzConnect is your go-to platform for connecting with other students and locals in Santa Cruz.
          Whether you’re looking for a rideshare to the airport, want to find a lost item, organize a soccer match, 
          or get help with tutoring — this is the place to do it.
        </p>
        <p className={styles.description}>
          Our goal is to bring the UCSC community closer together through easy, helpful, and fun interactions.
        </p>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    </main>
  );
}
