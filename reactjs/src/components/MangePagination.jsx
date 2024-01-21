import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ManagePagination = ({ currentPage, pageCount, handlePageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            {pageNumbers.map((page) => (
                <PaginationItem
                    key={page}
                    active={currentPage === page - 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(page - 1)}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    );
};

export default ManagePagination;
