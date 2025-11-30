import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkshopCard } from "../WorkshopCard";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}));

describe("WorkshopCard", () => {
    const mockProps = {
        title: "Test Workshop",
        duration: "1 Day",
        shortDesc: "This is a test workshop description",
        tag: "Popular",
        image: "test-image.jpg",
        imageAlt: "Test Workshop Image",
    };

    it("renders workshop title correctly", () => {
        render(<WorkshopCard {...mockProps} />);
        expect(screen.getByText("Test Workshop")).toBeInTheDocument();
    });

    it("renders workshop duration", () => {
        render(<WorkshopCard {...mockProps} />);
        expect(screen.getByText("1 Day")).toBeInTheDocument();
    });

    it("renders workshop description", () => {
        render(<WorkshopCard {...mockProps} />);
        expect(screen.getByText("This is a test workshop description")).toBeInTheDocument();
    });

    it("renders tag badge when provided", () => {
        render(<WorkshopCard {...mockProps} />);
        expect(screen.getByText("Popular")).toBeInTheDocument();
    });

    it("does not render tag badge when not provided", () => {
        const { tag, ...propsWithoutTag } = mockProps;
        render(<WorkshopCard {...propsWithoutTag} />);
        expect(screen.queryByText("Popular")).not.toBeInTheDocument();
    });

    it("renders certificate text", () => {
        render(<WorkshopCard {...mockProps} />);
        expect(screen.getByText("Certificate")).toBeInTheDocument();
    });

    it("renders image with correct alt text", () => {
        render(<WorkshopCard {...mockProps} />);
        const image = screen.getByAltText("Test Workshop Image");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "test-image.jpg");
    });

    it("uses title as alt text when imageAlt is not provided", () => {
        const { imageAlt, ...propsWithoutAlt } = mockProps;
        render(<WorkshopCard {...propsWithoutAlt} />);
        const image = screen.getByAltText("Test Workshop");
        expect(image).toBeInTheDocument();
    });

    it("renders without image when image prop is not provided", () => {
        const { image, ...propsWithoutImage } = mockProps;
        render(<WorkshopCard {...propsWithoutImage} />);
        expect(screen.queryByAltText("Test Workshop Image")).not.toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
        const { container } = render(<WorkshopCard {...mockProps} />);
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("bg-card", "rounded-2xl");
    });
});
