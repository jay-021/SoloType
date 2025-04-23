/**
 * Custom hook to handle keyboard events and track active keys
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

export interface KeyboardHandlers {
  /** Handler for keydown events */
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  /** Handler for keyup events */
  handleKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  /** Clear all active keys */
  clearActiveKeys: () => void;
}

export interface UseKeyboardOptions {
  /** Callback when the Enter key is pressed */
  onEnterPressed?: () => void;
  /** Callback for any key press (optional) */
  onKeyPressed?: (key: string) => void;
}

/**
 * Hook for handling keyboard events and tracking active keys
 *
 * @param options - Configuration options
 * @returns Active keys array and keyboard event handlers
 */
export function useKeyboard(
  options: UseKeyboardOptions = {}
): [string[], KeyboardHandlers] {
  const { onEnterPressed, onKeyPressed } = options;
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // Use a ref to track active keys for callbacks without dependency issues
  const activeKeysRef = useRef<string[]>([]);

  // Update ref when state changes
  useEffect(() => {
    activeKeysRef.current = activeKeys;
  }, [activeKeys]);

  /**
   * Handle key down events
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key.toLowerCase();

      // Handle Enter key special case
      if (key === 'enter' && onEnterPressed) {
        e.preventDefault();
        onEnterPressed();
        return;
      }

      // Call the general key pressed callback if provided
      if (onKeyPressed) {
        onKeyPressed(key);
      }

      // Add key to active keys if not already present
      setActiveKeys((prev) => {
        if (!prev.includes(key)) {
          const updated = [...prev, key];
          activeKeysRef.current = updated;
          return updated;
        }
        return prev;
      });
    },
    [onEnterPressed, onKeyPressed]
  );

  /**
   * Handle key up events
   */
  const handleKeyUp = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();

    // Remove key from active keys
    setActiveKeys((prev) => {
      const updated = prev.filter((k) => k !== key);
      activeKeysRef.current = updated;
      return updated;
    });
  }, []);

  /**
   * Clear all active keys
   */
  const clearActiveKeys = useCallback(() => {
    setActiveKeys([]);
    activeKeysRef.current = [];
  }, []);

  return [
    activeKeys,
    {
      handleKeyDown,
      handleKeyUp,
      clearActiveKeys,
    },
  ];
}
