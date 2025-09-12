import React from 'react';
import { ChatbotWidget } from '../components/ChatbotWidget';

// PUBLIC_INTERFACE
export default function ChatbotPage() {
  /** Dedicated page view for chatbot for accessibility */
  return (
    <div className="grid">
      <div className="container">
        <h2 style={{marginTop:0}}>Assistant</h2>
        <div className="helper">Use the floating assistant button at bottom-right to chat. You can ask for recommendations or tips to improve your profile.</div>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <a className="btn secondary" href="/recommendations">Recommendations</a>
          <a className="btn secondary" href="/profile">Profile</a>
          <a className="btn secondary" href="/internships">Browse Internships</a>
        </div>
      </div>
      {/* Keeping widget available here as well */}
      <div style={{height: 400}} />
    </div>
  );
}
