import React from "react";
import {useState} from "react";
import "./Pagination.css";




const PaginationComp =({perPageUser , totalUser , handlePageChange}) => {

 const [currentPage , setCurrentPage] = useState(1)
 const allPageNumbers =[]
 const totalPage = Math.ceil(totalUser / perPageUser)

 for (let i=1 ; i <= totalPage ; i++) {
    allPageNumbers.push(i)
 }

    return (
        <>
            <ul className="pagination">
                <>
                <div className="pagination-display"
                onClick={() => {handlePageChange(1);
                                setCurrentPage(1)}}>
                &laquo;
                </div>

                <div className="pagination-display"
                 onClick={() => { if (currentPage - 1 > 0) {
                  handlePageChange(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              &lsaquo;
            </div>
            </>

            <>
            {allPageNumbers.map((number) => (
              <div
                key={number}
                className={
                  currentPage === number
                    ? "pagination-display-selected"
                    : "pagination-display"
                }
                onClick={() => {
                  handlePageChange(number);
                    setCurrentPage(number);
                }}
              >
                {number}
              </div>
            ))}
            
            </>

            <>
                <div className="pagination-display"
                 onClick={() => { if (currentPage + 1 <= allPageNumbers.length) {
                  handlePageChange(currentPage + 1);
                    setCurrentPage(currentPage + 1);
                  }
                }}
                >
                 &rsaquo;
                </div>

                <div className="pagination-display"
                 onClick={() => {
                  handlePageChange(allPageNumbers[allPageNumbers.length - 1]);
                  setCurrentPage(allPageNumbers[allPageNumbers.length - 1])}}
                
            >
             &raquo;
            </div>
            </>

            </ul>
      
        </>
    )
}


export default PaginationComp;
