import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../LoadingSpinner";

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Loader2: ({ className }: { className?: string }) => (
    <div data-testid="loader-icon" className={className}>
      Loader
    </div>
  ),
}));

describe("LoadingSpinner", () => {
  it("renders spinner with default size", () => {
    render(<LoadingSpinner />);
    const loader = screen.getByTestId("loader-icon");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("h-6", "w-6"); // default md size
  });

  it("renders spinner with small size", () => {
    render(<LoadingSpinner size="sm" />);
    const loader = screen.getByTestId("loader-icon");
    expect(loader).toHaveClass("h-4", "w-4");
  });

  it("renders spinner with large size", () => {
    render(<LoadingSpinner size="lg" />);
    const loader = screen.getByTestId("loader-icon");
    expect(loader).toHaveClass("h-8", "w-8");
  });

  it("renders with custom text", () => {
    render(<LoadingSpinner text="Loading workshops..." />);
    expect(screen.getByText("Loading workshops...")).toBeInTheDocument();
  });

  it("does not render text when not provided", () => {
    render(<LoadingSpinner />);
    expect(screen.queryByText("Loading workshops...")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveClass("custom-class");
  });

  it("applies correct chocolate color class", () => {
    render(<LoadingSpinner />);
    const loader = screen.getByTestId("loader-icon");
    expect(loader).toHaveClass("text-chocolate");
  });
});

