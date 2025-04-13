'use client';

import { useState, useEffect } from 'react';
import styles from './NewPostPopup.module.css';
import { PostingCategory, usePosting } from '../context/PostingContext';

interface NewPostPopupProps {
  isOpen: boolean;
  onClose: () => void;
  category: PostingCategory;
}

export default function NewPostPopup({ isOpen, onClose, category }: NewPostPopupProps) {
  const { setSelectedCategory } = usePosting();
  const [selectedValue, setSelectedValue] = useState<PostingCategory>(category || 'rideshare');
  
  // Update the selected value when the category changes
  useEffect(() => {
    if (category) {
      setSelectedValue(category);
    }
  }, [category]);
  
  // We don't need this redirect anymore - it's now handled in the page components
  // with proper initial load checks
  
  // Don't render if not open
  if (!isOpen) return null;

  // Handle category change in dropdown
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as PostingCategory;
    
    // Only update if we have a valid category (prevents null values)
    if (newCategory) {
      setSelectedValue(newCategory);
      setSelectedCategory(newCategory); // Update the global context
    }
  };
  
  // Get display name for the selected category
  const getCategoryDisplayName = (cat: PostingCategory) => {
    switch (cat) {
      case 'rideshare':
        return 'Rideshare';
      case 'tutoring':
        return 'Tutoring';
      case 'recreation':
        return 'Recreation';
      case 'lost-found':
        return 'Lost & Found';
      default:
        return 'Select a category';
    }
  };
  
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h2>
            Create New {selectedValue ? getCategoryDisplayName(selectedValue) : ''} Post
          </h2>
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
              placeholder={`Enter a title for your ${selectedValue ? getCategoryDisplayName(selectedValue).toLowerCase() : ''} post`}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="post-category">Category</label>
            <select 
              id="post-category" 
              className={styles.formControl}
              value={selectedValue || 'rideshare'}
              onChange={handleCategoryChange}
            >
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
              placeholder={`Describe your ${selectedValue ? getCategoryDisplayName(selectedValue).toLowerCase() : ''} post in detail...`}
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