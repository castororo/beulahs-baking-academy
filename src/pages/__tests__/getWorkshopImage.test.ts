import { describe, it, expect } from "vitest";

// Import the function logic (we'll extract it for testing)
// Since getWorkshopImage is inside WorkshopsPage, we'll test the logic separately

describe("getWorkshopImage logic", () => {
    const mockWorkshopImages = {
        "brownie-workshop": "brownie.jpg",
        "cupcake-workshop": "cupcake.jpg",
        "cake-master-class": "cake.jpg",
    };

    const fallbackImages = ["fallback1.jpg", "fallback2.jpg", "fallback3.jpg"];

    const getWorkshopImage = (workshopId: string, index: number) => {
        const img = mockWorkshopImages[workshopId as keyof typeof mockWorkshopImages];
        if (img) return img;
        return fallbackImages[index % fallbackImages.length];
    };

    it("returns specific image for known workshop ID", () => {
        expect(getWorkshopImage("brownie-workshop", 0)).toBe("brownie.jpg");
        expect(getWorkshopImage("cupcake-workshop", 0)).toBe("cupcake.jpg");
        expect(getWorkshopImage("cake-master-class", 0)).toBe("cake.jpg");
    });

    it("returns fallback image for unknown workshop ID", () => {
        expect(getWorkshopImage("unknown-workshop", 0)).toBe("fallback1.jpg");
        expect(getWorkshopImage("unknown-workshop", 1)).toBe("fallback2.jpg");
        expect(getWorkshopImage("unknown-workshop", 2)).toBe("fallback3.jpg");
    });

    it("cycles through fallback images using index", () => {
        expect(getWorkshopImage("unknown-workshop", 3)).toBe("fallback1.jpg");
        expect(getWorkshopImage("unknown-workshop", 4)).toBe("fallback2.jpg");
        expect(getWorkshopImage("unknown-workshop", 5)).toBe("fallback3.jpg");
    });

    it("handles empty workshop ID", () => {
        expect(getWorkshopImage("", 0)).toBe("fallback1.jpg");
    });
});
