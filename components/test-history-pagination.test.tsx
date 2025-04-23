import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TestHistoryPagination from './test-history-pagination';

describe('TestHistoryPagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should not render pagination if only one page', () => {
    const { container } = render(
      <TestHistoryPagination
        totalItems={5}
        pageSize={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should display correct number of pages for small total', () => {
    render(
      <TestHistoryPagination
        totalItems={25}
        pageSize={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    // Should show 3 pages (25 items with 10 per page = 3 pages)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
  });

  it('should handle navigation to next and previous pages', () => {
    render(
      <TestHistoryPagination
        totalItems={50}
        pageSize={10}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />
    );

    // Navigate to next page
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);

    // Navigate to previous page
    mockOnPageChange.mockClear();
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should handle navigation to first and last pages', () => {
    render(
      <TestHistoryPagination
        totalItems={50}
        pageSize={10}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Navigate to first page
    fireEvent.click(screen.getByLabelText('First page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    // Navigate to last page
    mockOnPageChange.mockClear();
    fireEvent.click(screen.getByLabelText('Last page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('should disable previous buttons on first page', () => {
    render(
      <TestHistoryPagination
        totalItems={30}
        pageSize={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText('First page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
    expect(screen.getByLabelText('Last page')).not.toBeDisabled();
  });

  it('should disable next buttons on last page', () => {
    render(
      <TestHistoryPagination
        totalItems={30}
        pageSize={10}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByLabelText('First page')).not.toBeDisabled();
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Last page')).toBeDisabled();
  });

  it('should handle clicking on a specific page number', () => {
    render(
      <TestHistoryPagination
        totalItems={50}
        pageSize={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should show ellipsis for many pages', () => {
    render(
      <TestHistoryPagination
        totalItems={150}
        pageSize={10}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />
    );

    // Should show first and last page with ellipsis
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(2); // Two ellipses
    expect(screen.getByText('15')).toBeInTheDocument(); // Last page
  });
});
