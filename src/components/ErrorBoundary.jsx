import { Component } from 'react';
import { useLanguage } from './LanguageContext.jsx';
import { Button } from './ui/Button.tsx';

// Catches render crashes (e.g. a typo in the hand-edited data files) and
// shows a friendly translated message instead of a blank white page.
class ErrorBoundaryInner extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Page crashed:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-6xl mb-6" aria-hidden="true">💿</p>
            <h1 className="text-3xl font-serif font-bold mb-3">{t.somethingWentWrong}</h1>
            <p className="text-muted-foreground mb-8">{t.errorHint}</p>
            <Button
              onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
              className="px-8"
            >
              {t.backHome}
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Class components can't use hooks, so translations come in via this wrapper
export const ErrorBoundary = ({ children }) => {
  const { t } = useLanguage();
  return <ErrorBoundaryInner t={t}>{children}</ErrorBoundaryInner>;
};
