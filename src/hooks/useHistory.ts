import { useState, useCallback, useRef } from "react";

export function useHistory<T>(initialState: T, maxHistory = 50) {
  const [state, setState] = useState<T>(initialState);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const batchRef = useRef<T | null>(null);

  /** Push current state to history and set new state */
  const set = useCallback(
    (newState: T | ((prev: T) => T)) => {
      setState((prev) => {
        const resolved = typeof newState === "function" ? (newState as (p: T) => T)(prev) : newState;
        past.current = [...past.current.slice(-(maxHistory - 1)), prev];
        future.current = [];
        return resolved;
      });
    },
    [maxHistory]
  );

  /** Set state without pushing to history (for drag intermediate states) */
  const setSilent = useCallback((newState: T) => {
    setState(newState);
  }, []);

  /** Save a snapshot before a batch of silent updates (call on mouseDown) */
  const beginBatch = useCallback(() => {
    setState((prev) => {
      batchRef.current = prev;
      return prev;
    });
  }, []);

  /** Commit the batch: push the saved snapshot to history (call on mouseUp) */
  const commitBatch = useCallback(() => {
    if (batchRef.current !== null) {
      past.current = [...past.current.slice(-(maxHistory - 1)), batchRef.current];
      future.current = [];
      batchRef.current = null;
    }
  }, [maxHistory]);

  const undo = useCallback(() => {
    setState((prev) => {
      if (past.current.length === 0) return prev;
      const previous = past.current[past.current.length - 1];
      past.current = past.current.slice(0, -1);
      future.current = [prev, ...future.current];
      return previous;
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (future.current.length === 0) return prev;
      const next = future.current[0];
      future.current = future.current.slice(1);
      past.current = [...past.current, prev];
      return next;
    });
  }, []);

  const canUndo = past.current.length > 0;
  const canRedo = future.current.length > 0;

  return { state, set, setSilent, beginBatch, commitBatch, undo, redo, canUndo, canRedo };
}
