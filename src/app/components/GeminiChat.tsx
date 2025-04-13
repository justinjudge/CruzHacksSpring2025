'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI('AIzaSyBnacuuFFoHAEetGdavPFZjAFRXJDrFwIk');

export default function GeminiChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(input);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      console.error(err);
      setResponse('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#1a1a2e',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'default',
      padding: '1.25rem',
      border: '1px solid rgba(255, 215, 0, 0.1)',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#FFD700', margin: 0 }}>Get Advice from Gemini AI</h3>
        <span style={{
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.7)',
          padding: '0.25rem 0.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '4px'
        }}>
          AI
        </span>
      </div>
    
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '0.75rem',
          background: '#2b2b40',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '6px',
          color: 'white'
        }}
      />
    
      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          backgroundColor: '#FFD700',
          color: '#1a1a2e',
          fontWeight: 600,
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
    
      {response && (
        <div style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          <strong style={{ color: '#FFD700' }}>Gemini:</strong> {response}
        </div>
      )}
    </div>
    
    
  );
}
