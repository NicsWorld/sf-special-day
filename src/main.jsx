import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#f4d068', backgroundColor: '#0b0c10', fontFamily: 'sans-serif', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Operation: Secret SF Day Trip</h1>
          <p style={{ color: '#e63946', marginBottom: '1rem' }}>An error occurred while loading the briefing interface:</p>
          <pre style={{ backgroundColor: '#13141f', padding: '1rem', borderRadius: '8px', overflowX: 'auto', color: '#f1f5f9' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => {
              try { localStorage.clear(); } catch(e) {}
              window.location.reload();
            }}
            style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', background: '#d4af37', color: '#0b0c10', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Reset App Data & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
