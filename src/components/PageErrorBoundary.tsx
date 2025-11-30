import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

interface Props {
  children: ReactNode;
  pageName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Lightweight error boundary for individual pages
 * Provides a simpler fallback UI for page-level errors
 */
class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error(`Error in ${this.props.pageName || "page"}:`, error, errorInfo);
    }
  }

  handleGoBack = () => {
    window.history.back();
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <div className="mb-4 flex justify-center">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>

            <h2 className="text-2xl font-bold mb-2 costaline-font">
              {this.props.pageName ? `${this.props.pageName} Error` : "Page Error"}
            </h2>

            <p className="text-muted-foreground mb-6 leansans-regular">
              This page encountered an error. Please try refreshing or go back.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReload}
                variant="outline"
                size="sm"
                className="leansans-regular"
              >
                Refresh Page
              </Button>
              <Button
                onClick={this.handleGoBack}
                variant="ghost"
                size="sm"
                className="leansans-regular"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;

