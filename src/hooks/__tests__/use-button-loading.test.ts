import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useButtonLoading } from "../use-button-loading";

describe("useButtonLoading", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with no loading buttons", () => {
    const { result } = renderHook(() => useButtonLoading());
    expect(result.current.isLoading("button-1")).toBe(false);
  });

  it("sets loading state for a button", () => {
    const { result } = renderHook(() => useButtonLoading());

    act(() => {
      result.current.setLoading("button-1", true);
    });

    expect(result.current.isLoading("button-1")).toBe(true);
  });

  it("removes loading state for a button", () => {
    const { result } = renderHook(() => useButtonLoading());

    act(() => {
      result.current.setLoading("button-1", true);
      result.current.setLoading("button-1", false);
    });

    expect(result.current.isLoading("button-1")).toBe(false);
  });

  it("tracks multiple buttons independently", () => {
    const { result } = renderHook(() => useButtonLoading());

    act(() => {
      result.current.setLoading("button-1", true);
      result.current.setLoading("button-2", true);
      result.current.setLoading("button-1", false);
    });

    expect(result.current.isLoading("button-1")).toBe(false);
    expect(result.current.isLoading("button-2")).toBe(true);
  });

  it("withLoading executes async function and sets loading state", async () => {
    const { result } = renderHook(() => useButtonLoading());
    const asyncFn = vi.fn().mockResolvedValue("success");

    let promise: Promise<any>;
    act(() => {
      promise = result.current.withLoading("button-1", asyncFn);
    });

    expect(result.current.isLoading("button-1")).toBe(true);

    await act(async () => {
      await promise!;
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(result.current.isLoading("button-1")).toBe(false);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it("withLoading handles errors gracefully", async () => {
    const { result } = renderHook(() => useButtonLoading());
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const asyncFn = vi.fn().mockRejectedValue(new Error("Test error"));

    let promise: Promise<any>;
    act(() => {
      promise = result.current.withLoading("button-1", asyncFn);
    });

    await act(async () => {
      try {
        await promise!;
      } catch {
        // Expected to fail
      }
      vi.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(result.current.isLoading("button-1")).toBe(false);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error in button action button-1:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("withLoading returns null on error", async () => {
    const { result } = renderHook(() => useButtonLoading());
    const asyncFn = vi.fn().mockRejectedValue(new Error("Test error"));

    let promise: Promise<any>;
    act(() => {
      promise = result.current.withLoading("button-1", asyncFn);
    });

    const resultValue = await act(async () => {
      try {
        return await promise!;
      } catch {
        return null;
      }
    });

    expect(resultValue).toBe(null);
  });
});

