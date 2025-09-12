import React from 'react';
import { ChatbotWidget } from '../components/ChatbotWidget';

// PUBLIC_INTERFACE
export default function ChatbotPage() {
  /** Dedicated page view for chatbot for accessibility */
  return (
    <div className="grid">
      <div className="container">
        <h2 style={{marginTop:0}}>Assistant</h2>
        <div className="helper">Use the floating assistant button at bottom-right to chat.</div>
      </div>
      {/* Keeping widget available here as well */}
      <div style={{height: 400}} />
    </div>
  );
}
