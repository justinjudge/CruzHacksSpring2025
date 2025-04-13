'use client';

import { useState, useEffect, FormEvent } from 'react';
import styles from './NewPostPopup.module.css';
import { PostingCategory, usePosting } from '../context/PostingContext';

interface NewPostPopupProps {
  isOpen: boolean;
  onClose: () => void;
  category: PostingCategory;
  onPostCreated?: () => void;
}

export default function NewPostPopup({ isOpen, onClose, category, onPostCreated }: NewPostPopupProps) {
  const { setSelectedCategory } = usePosting();
  const [selectedValue, setSelectedValue] = useState<PostingCategory>(category || 'rideshare');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Update the selected value when the category changes
  useEffect(() => {
    if (category) {
      setSelectedValue(category);
    }
  }, [category]);
  
  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setContact('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);
  
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

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category: selectedValue,
          description,
          contact,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Close the popup immediately after successful post creation
      onClose();
      
      // Call the onPostCreated callback if provided
      if (onPostCreated) {
        onPostCreated();
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      setIsSubmitting(false);
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
        
        <form onSubmit={handleSubmit}>
          <div className={styles.popupContent}>
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="post-title">Title</label>
              <input 
                type="text" 
                id="post-title" 
                className={styles.formControl} 
                placeholder={`Enter a title for your ${selectedValue ? getCategoryDisplayName(selectedValue).toLowerCase() : ''} post`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="post-category">Category</label>
              <select 
                id="post-category" 
                className={styles.formControl}
                value={selectedValue || 'rideshare'}
                onChange={handleCategoryChange}
                required
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="post-contact">Contact Information</label>
              <input 
                type="text" 
                id="post-contact" 
                className={styles.formControl} 
                placeholder="How can people reach you?"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.popupFooter}>
            <button 
              type="button"
              className={styles.cancelButton} 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 