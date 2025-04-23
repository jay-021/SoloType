import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from './use-timer';

describe('useTimer', () => {
  beforeEach(() => {
    // Setup mock for timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Cleanup after each test
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 1,
      })
    );

    const [timerState, _] = result.current;

    expect(timerState.timeLeft).toBe(0);
    expect(timerState.isActive).toBe(false);
    expect(timerState.startTime).toBe(0);
    expect(timerState.elapsedTime).toBe(0);
  });

  it('should start the timer when start() is called', () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 1,
      })
    );

    // Mock Date.now() to return a fixed value
    const mockNow = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => mockNow);

    act(() => {
      const [_, controls] = result.current;
      controls.start();
    });

    const [timerState, _] = result.current;

    expect(timerState.isActive).toBe(true);
    expect(timerState.timeLeft).toBe(60); // 1 minute = 60 seconds
    expect(timerState.startTime).toBe(mockNow);
  });

  it('should decrement timeLeft every second', () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 1,
      })
    );

    act(() => {
      const [_, controls] = result.current;
      controls.start();
    });

    // Fast-forward timer by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0].timeLeft).toBe(59);

    // Fast-forward timer by another second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0].timeLeft).toBe(58);
  });

  it('should call onComplete when timer reaches zero', () => {
    const onCompleteMock = vi.fn();

    const { result } = renderHook(() =>
      useTimer({
        duration: 0.05, // 3 seconds (0.05 minutes)
        onComplete: onCompleteMock,
      })
    );

    act(() => {
      const [_, controls] = result.current;
      controls.start();
    });

    // Fast-forward to almost complete
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current[0].timeLeft).toBe(1);
    expect(onCompleteMock).not.toHaveBeenCalled();

    // Fast-forward to completion
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0].timeLeft).toBe(0);
    expect(result.current[0].isActive).toBe(false);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('should stop the timer when stop() is called', () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 1,
      })
    );

    act(() => {
      const [_, controls] = result.current;
      controls.start();
    });

    expect(result.current[0].isActive).toBe(true);

    act(() => {
      const [_, controls] = result.current;
      controls.stop();
    });

    expect(result.current[0].isActive).toBe(false);
    expect(result.current[0].timeLeft).toBe(0);
  });

  it('should format time correctly', () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 1,
      })
    );

    const [_, controls] = result.current;

    expect(controls.formatTime(65)).toBe('1:05');
    expect(controls.formatTime(126)).toBe('2:06');
    expect(controls.formatTime(3599)).toBe('59:59');
    expect(controls.formatTime(0)).toBe('0:00');
  });
});
