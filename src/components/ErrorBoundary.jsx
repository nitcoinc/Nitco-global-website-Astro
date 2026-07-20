import React from 'react'

/** React error boundary — wraps subtrees to catch render errors gracefully. */
export default class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info)
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'app_error', error: String(error), stack: info?.componentStack })
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>Please refresh or <a href="/contact/">contact support</a>.</p>
        </div>
      )
    }
    return this.props.children
  }
}
