import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const ManagePagination = ({ currentPage, pageCount, handlePageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    let displayedPageNumbers;
    if (pageCount <= 7) {
        displayedPageNumbers = pageNumbers;
    } else {
        const firstPage = Math.max(1, currentPage - 2);
        const lastPage = Math.min(pageCount, firstPage + 6);
        displayedPageNumbers = pageNumbers.slice(firstPage - 1, lastPage);
    }

    return (
        <Pagination>
            {currentPage > 0 && (
                <PaginationItem>
                    <PaginationLink
                        previous
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                </PaginationItem>
            )}
            {displayedPageNumbers.map((page) => (
                <PaginationItem key={page} active={currentPage === page - 1}>
                    <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(page - 1)}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            ))}
            {currentPage < pageCount - 1 && (
                <PaginationItem>
                    <PaginationLink
                        next
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </PaginationItem>
            )}
        </Pagination>
    );
};

export default ManagePagination;
