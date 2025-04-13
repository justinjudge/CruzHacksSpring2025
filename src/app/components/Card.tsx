'use client';

import { ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  date?: string; // ISO 8601 format date string (optional)
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Card({ title, date, children, onClick, className }: CardProps) {
  // Format the date based on how recent it is
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if date is valid
    if (isNaN(date.getTime())) return null;
    
    // Today: show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Yesterday: show "Yesterday"
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // This year but not today or yesterday: show day month
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
    
    // Last year or before: show year
    return date.getFullYear().toString();
  };

  const formattedDate = formatDate(date);
  
  return (
    <div 
      className={`${styles.card} ${className || ''}`} 
      onClick={onClick}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {formattedDate && <span className={styles.date}>{formattedDate}</span>}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
} 