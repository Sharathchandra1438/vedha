import { Component, type ErrorInfo, type ReactNode } from "react";
import { Home, RotateCw } from "lucide-react";

interface Props {
  children: ReactNode;
  /** When this value changes (e.g. the route), a previous error is cleared and the page renders again. */
  resetKey?: string;
}

interface State {
  error: Error | null;
}

/**
 * Safety net for page rendering. Without it, any runtime error unmounts the whole React tree
 * and the visitor is left staring at a blank white screen. With it, the header and footer stay
 * and the visitor gets a clear way to recover.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render:", error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-background px-4 pb-20 pt-36 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Something went wrong</h1>
          <p className="mt-3 text-muted-foreground">
            This page didn't load properly. Please try again — it usually works on a second try.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => window.location.reload()} className="btn-primary">
              <RotateCw size={16} /> Reload page
            </button>
            <a href="/" className="btn-outline">
              <Home size={16} /> Go to Home
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorBoundary;
