import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Simple Error Boundary to catch React render errors
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#ef4444', backgroundColor: '#020617', height: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: 24, marginBottom: 20 }}>System Crash</h1>
          <p>The application encountered a critical error.</p>
          <pre style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 10, marginTop: 20, color: '#f1f5f9', overflow: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: 20, padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}
          >
            Reload Application
          </button>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    console.log("Forex Mastery: Booting...");
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log("Forex Mastery: Render initiated.");
  } catch (err) {
    console.error("Critical Boot Error:", err);
    rootElement.innerHTML = `<div style="color:red; padding:20px;">Boot Failed: ${err}</div>`;
  }
} else {
  console.error("Root element not found");
}