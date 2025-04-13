'use client';

import { useState } from 'react';
import styles from './NewPostPopup.module.css';
import { PostingCategory } from '../context/PostingContext';

interface NewPostPopupProps {
  isOpen: boolean;
  onClose: () => void;
  category: PostingCategory;
}

export default function NewPostPopup({ isOpen, onClose, category }: NewPostPopupProps) {
  // Don't render if not open
  if (!isOpen) return null;

  // Form state would go here in a real implementation
  
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h2>Create New Post</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close popup"
          >
            ×
          </button>
        </div>
        
        <div className={styles.popupContent}>
          <div className={styles.formGroup}>
            <label htmlFor="post-title">Title</label>
            <input 
              type="text" 
              id="post-title" 
              className={styles.formControl} 
              placeholder="Enter a title for your post"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="post-category">Category</label>
            <select 
              id="post-category" 
              className={styles.formControl}
              defaultValue={category || ''}
            >
              <option value="" disabled>Select a category</option>
              <option value="rideshare">Rideshare</option>
              <option value="tutoring">Tutoring</option>
              <option value="recreation">Recreation</option>
              <option value="lost-found">Lost & Found</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="post-description">Description</label>
            <textarea 
              id="post-description" 
              className={styles.formControl} 
              rows={5} 
              placeholder="Describe your post in detail..."
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="post-contact">Contact Information</label>
            <input 
              type="text" 
              id="post-contact" 
              className={styles.formControl} 
              placeholder="How can people reach you?"
            />
          </div>
        </div>
        
        <div className={styles.popupFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submitButton}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
} 