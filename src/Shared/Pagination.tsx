import { Button, ButtonGroup } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageClick }) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageClick(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ButtonGroup spacing="1">
      <Button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => handleClick(page)}
          colorScheme={page === currentPage ? 'blue' : 'gray'}
          variant={page === currentPage ? 'solid' : 'outline'}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
