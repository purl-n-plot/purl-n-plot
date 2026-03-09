import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHistory } from "@/hooks/useHistory";

describe("useHistory", () => {
  it("initializes with the given state", () => {
    const { result } = renderHook(() => useHistory("initial"));
    expect(result.current.state).toBe("initial");
  });

  it("updates state with set()", () => {
    const { result } = renderHook(() => useHistory(0));
    act(() => result.current.set(5));
    expect(result.current.state).toBe(5);
  });

  it("can undo and redo", () => {
    const { result } = renderHook(() => useHistory(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    expect(result.current.state).toBe(2);

    act(() => result.current.undo());
    expect(result.current.state).toBe(1);

    act(() => result.current.undo());
    expect(result.current.state).toBe(0);

    act(() => result.current.redo());
    expect(result.current.state).toBe(1);
  });

  it("undo does nothing when no history", () => {
    const { result } = renderHook(() => useHistory("only"));
    act(() => result.current.undo());
    expect(result.current.state).toBe("only");
  });

  it("redo does nothing when no future", () => {
    const { result } = renderHook(() => useHistory("only"));
    act(() => result.current.redo());
    expect(result.current.state).toBe("only");
  });

  it("set() clears redo history", () => {
    const { result } = renderHook(() => useHistory(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    act(() => result.current.undo());
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.set(3));
    expect(result.current.canRedo).toBe(false);
  });

  it("setSilent does not push to history", () => {
    const { result } = renderHook(() => useHistory(0));
    act(() => result.current.setSilent(99));
    expect(result.current.state).toBe(99);
    expect(result.current.canUndo).toBe(false);
  });

  it("batch: beginBatch + setSilent + commitBatch creates one undo step", () => {
    const { result } = renderHook(() => useHistory(0));
    act(() => result.current.beginBatch());
    act(() => result.current.setSilent(1));
    act(() => result.current.setSilent(2));
    act(() => result.current.setSilent(3));
    act(() => result.current.commitBatch());
    expect(result.current.state).toBe(3);

    // Single undo should go back to 0
    act(() => result.current.undo());
    expect(result.current.state).toBe(0);
  });

  it("respects maxHistory limit", () => {
    const { result } = renderHook(() => useHistory(0, 3));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    act(() => result.current.set(3));
    act(() => result.current.set(4));
    // Only 3 undos should be possible
    act(() => result.current.undo());
    act(() => result.current.undo());
    act(() => result.current.undo());
    act(() => result.current.undo()); // should do nothing
    expect(result.current.state).toBe(1);
  });
});
