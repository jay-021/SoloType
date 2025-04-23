# SoloType Custom Hooks

This directory contains custom React hooks that encapsulate reusable stateful logic for the SoloType application.

## Available Hooks

### `useTestHistory`

A hook to fetch and manage typing test history from the API.

```tsx
const [{ results, isLoading, error }, { refreshHistory }] = useTestHistory();
```

**Returns:**

- `results`: Array of test result records
- `isLoading`: Boolean indicating whether data is being fetched
- `error`: Error message if there was a problem with fetching data
- `refreshHistory`: Function to manually refresh the test history data

**Example:**

```tsx
import { useTestHistory } from '@/hooks/use-test-history';

function TestHistoryComponent() {
  const [{ results, isLoading, error }, { refreshHistory }] = useTestHistory();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refreshHistory}>Refresh History</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            WPM: {result.wpm} - Accuracy: {result.accuracy}%
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### `useTestResultsFilter`

A hook to filter test results by duration, rank, or date range.

```tsx
const [
  filteredResults,
  filters,
  { setDurationFilter, setRankFilter, setDateRange, clearFilters },
] = useTestResultsFilter(results);
```

**Parameters:**

- `results`: Array of test result records to filter

**Returns:**

- `filteredResults`: Array of filtered test result records
- `filters`: Current filter state (duration, rank, dateFrom, dateTo)
- Actions: `setDurationFilter`, `setRankFilter`, `setDateRange`, `clearFilters`

**Example:**

```tsx
import { useTestHistory } from '@/hooks/use-test-history';
import { useTestResultsFilter } from '@/hooks/use-test-results-filter';

function FilterableTestHistory() {
  // Get all test results
  const [{ results, isLoading, error }] = useTestHistory();

  // Filter the results
  const [
    filteredResults,
    filters,
    { setDurationFilter, setRankFilter, setDateRange, clearFilters },
  ] = useTestResultsFilter(results);

  return (
    <div>
      <div className="filters">
        <select
          value={filters.duration || ''}
          onChange={(e) =>
            setDurationFilter(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">All Durations</option>
          <option value="0.5">30 seconds</option>
          <option value="1">1 minute</option>
          <option value="2">2 minutes</option>
        </select>

        <select
          value={filters.rank || ''}
          onChange={(e) => setRankFilter(e.target.value || null)}
        >
          <option value="">All Ranks</option>
          <option value="e">E Rank</option>
          <option value="d">D Rank</option>
          <option value="c">C Rank</option>
          <option value="b">B Rank</option>
          <option value="a">A Rank</option>
          <option value="s">S Rank</option>
        </select>

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="results">
        {filteredResults.map((result) => (
          <div key={result.id}>{/* Result display */}</div>
        ))}
      </div>
    </div>
  );
}
```

### `useTimer`

A hook to manage a countdown timer with start, pause, and stop functionality.

```tsx
const [
  { timeLeft, isActive, startTime, elapsedTime },
  { start, pause, stop, formatTime },
] = useTimer({ duration: 5, onComplete: handleComplete });
```

**Parameters:**

- `duration`: Duration in minutes
- `onComplete`: Callback function to execute when timer completes

**Returns:**

- `timeLeft`: Current time left in seconds
- `isActive`: Whether the timer is currently active
- `startTime`: Start time timestamp (for calculating elapsed time)
- `elapsedTime`: Elapsed time in milliseconds
- `start`: Function to start the timer
- `pause`: Function to pause the timer
- `stop`: Function to stop and reset the timer
- `formatTime`: Function to format seconds to mm:ss display

### `useTypingStats`

A hook to calculate and manage typing statistics.

```tsx
const [
  { wpm, accuracy, correctChars, totalChars, wordsTyped, typingSpeed },
  { updateCharacterCounts, addWordsTyped, resetStats, calculateFinalStats },
] = useTypingStats({
  isActive: true,
  startTime: Date.now(),
  elapsedTime: 5000,
});
```

**Parameters:**

- `isActive`: Whether the test is currently active
- `startTime`: Starting timestamp in milliseconds
- `elapsedTime`: Total elapsed time in milliseconds

**Returns:**

- Stats: `wpm`, `accuracy`, `correctChars`, `totalChars`, `wordsTyped`, `typingSpeed`
- Actions: `updateCharacterCounts`, `addWordsTyped`, `resetStats`, `calculateFinalStats`

### `useTypingTexts`

A hook to manage typing text content for the typing test.

```tsx
const [
  {
    currentText,
    currentTextIndex,
    totalCharacters,
    completedCharacters,
    progress,
    testTexts,
  },
  { moveToNextText, resetTexts, updateProgress },
] = useTypingTexts({
  rank: 'e',
  duration: 1,
  isActive: true,
  onTextComplete: handleTextComplete,
});
```

**Parameters:**

- `rank`: Selected rank for text difficulty
- `duration`: Test duration in minutes
- `isActive`: Whether test is currently active
- `onTextComplete`: Callback when text is completed

**Returns:**

- Text state: `currentText`, `currentTextIndex`, `totalCharacters`, `completedCharacters`, `progress`, `testTexts`
- Actions: `moveToNextText`, `resetTexts`, `updateProgress`

### `useKeyboard`

A hook to handle keyboard events and track active keys.

```tsx
const [activeKeys, { handleKeyDown, handleKeyUp, clearActiveKeys }] =
  useKeyboard({
    onEnterPressed: startTest,
    onKeyPressed: handleKey,
  });
```

**Parameters:**

- `onEnterPressed`: Callback when the Enter key is pressed
- `onKeyPressed`: Callback for any key press

**Returns:**

- `activeKeys`: Array of currently active key names
- `handleKeyDown`: Function to handle keydown events
- `handleKeyUp`: Function to handle keyup events
- `clearActiveKeys`: Function to clear all active keys

### `useTypingTest`

A main hook that orchestrates all typing test functionality, combining the above hooks.

```tsx
const [testState, testControls] = useTypingTest({
  onTypingSpeedChange: setGlobalTypingSpeed,
  onTestComplete: handleTestComplete,
  autoSaveResults: true,
});
```

**Parameters:**

- `onTypingSpeedChange`: Callback when typing speed changes
- `onTestComplete`: Callback when the test is completed
- `autoSaveResults`: Whether to automatically save results when test completes

**Returns:**

- `testState`: Comprehensive test state including all settings, typing state, stats, and text data
- `testControls`: Complete set of actions for controlling the test

## Best Practices

1. **Use the return value destructuring pattern** for clarity:

```tsx
const [state, actions] = useCustomHook();
```

2. **Include proper TypeScript interfaces** for all hook parameters and return values.

3. **Write unit tests** for all hooks using `@testing-library/react-hooks`.
