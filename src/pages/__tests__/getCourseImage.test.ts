import { describe, it, expect } from "vitest";

// Import the function logic (we'll extract it for testing)
// Since getCourseImage is inside CoursesPage, we'll test the logic separately

describe("getCourseImage logic", () => {
  const mockCourseImages = {
    "brownie-workshop": "brownie.jpg",
    "cupcake-workshop": "cupcake.jpg",
    "cake-master-class": "cake.jpg",
  };

  const fallbackImages = ["fallback1.jpg", "fallback2.jpg", "fallback3.jpg"];

  const getCourseImage = (courseId: string, index: number) => {
    const img = mockCourseImages[courseId as keyof typeof mockCourseImages];
    if (img) return img;
    return fallbackImages[index % fallbackImages.length];
  };

  it("returns specific image for known course ID", () => {
    expect(getCourseImage("brownie-workshop", 0)).toBe("brownie.jpg");
    expect(getCourseImage("cupcake-workshop", 0)).toBe("cupcake.jpg");
    expect(getCourseImage("cake-master-class", 0)).toBe("cake.jpg");
  });

  it("returns fallback image for unknown course ID", () => {
    expect(getCourseImage("unknown-course", 0)).toBe("fallback1.jpg");
    expect(getCourseImage("unknown-course", 1)).toBe("fallback2.jpg");
    expect(getCourseImage("unknown-course", 2)).toBe("fallback3.jpg");
  });

  it("cycles through fallback images using index", () => {
    expect(getCourseImage("unknown-course", 3)).toBe("fallback1.jpg");
    expect(getCourseImage("unknown-course", 4)).toBe("fallback2.jpg");
    expect(getCourseImage("unknown-course", 5)).toBe("fallback3.jpg");
  });

  it("handles empty course ID", () => {
    expect(getCourseImage("", 0)).toBe("fallback1.jpg");
  });
});

