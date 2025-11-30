import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseCard } from "../CourseCard";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("CourseCard", () => {
  const mockProps = {
    title: "Test Course",
    duration: "1 Day",
    shortDesc: "This is a test course description",
    tag: "Popular",
    image: "test-image.jpg",
    imageAlt: "Test Course Image",
  };

  it("renders course title correctly", () => {
    render(<CourseCard {...mockProps} />);
    expect(screen.getByText("Test Course")).toBeInTheDocument();
  });

  it("renders course duration", () => {
    render(<CourseCard {...mockProps} />);
    expect(screen.getByText("1 Day")).toBeInTheDocument();
  });

  it("renders course description", () => {
    render(<CourseCard {...mockProps} />);
    expect(screen.getByText("This is a test course description")).toBeInTheDocument();
  });

  it("renders tag badge when provided", () => {
    render(<CourseCard {...mockProps} />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("does not render tag badge when not provided", () => {
    const { tag, ...propsWithoutTag } = mockProps;
    render(<CourseCard {...propsWithoutTag} />);
    expect(screen.queryByText("Popular")).not.toBeInTheDocument();
  });

  it("renders certificate text", () => {
    render(<CourseCard {...mockProps} />);
    expect(screen.getByText("Certificate")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<CourseCard {...mockProps} />);
    const image = screen.getByAltText("Test Course Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("uses title as alt text when imageAlt is not provided", () => {
    const { imageAlt, ...propsWithoutAlt } = mockProps;
    render(<CourseCard {...propsWithoutAlt} />);
    const image = screen.getByAltText("Test Course");
    expect(image).toBeInTheDocument();
  });

  it("renders without image when image prop is not provided", () => {
    const { image, ...propsWithoutImage } = mockProps;
    render(<CourseCard {...propsWithoutImage} />);
    expect(screen.queryByAltText("Test Course Image")).not.toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<CourseCard {...mockProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("bg-card", "rounded-2xl");
  });
});

