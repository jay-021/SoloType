'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestHistoryPaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  pageSize: number;
  /** Current page (1-based) */
  currentPage: number;
  /** Handler for page changes */
  onPageChange: (page: number) => void;
}

/**
 * Pagination component for test history
 */
export default function TestHistoryPagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: TestHistoryPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Don't render pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of visible page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the start or end
      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
      } else if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - maxVisiblePages + 2);
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis1');
      }

      // Add visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis2');
      }

      // Always include last page if there's more than one page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* First page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      {/* Previous page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page number buttons */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === 'ellipsis1' || pageNumber === 'ellipsis2') {
          return (
            <Button
              key={`${pageNumber}-${index}`}
              variant="outline"
              size="icon"
              disabled
              aria-hidden="true"
            >
              ...
            </Button>
          );
        }

        return (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? 'default' : 'outline'}
            onClick={() => onPageChange(pageNumber as number)}
            aria-label={`Page ${pageNumber}`}
            aria-current={currentPage === pageNumber ? 'page' : undefined}
            className={
              currentPage === pageNumber
                ? 'bg-solo-purple hover:bg-solo-purple-dark'
                : ''
            }
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
