import React from 'react';

const Pagination = ({ pager, getResults }) => (
  <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
    <div>
      <p className="text-sm leading-5 text-blue-700">
        Showing {pager.startIndex + 1} to {pager.endIndex + 1} of{' '}
        {pager.totalItems} results
      </p>
    </div>
    <div>
      <nav className="relative z-0 inline-flex shadow-sm">
        {pager.currentPage > pager.startPage && (
          <div>
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:bg-blue-700 hover:text-white focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              onClick={() => getResults(pager.currentPage - 1)}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <div>
          {pager.pages.length > 1 &&
            pager.pages.map(page => {
              const classes =
                pager.currentPage === page
                  ? '-ml-px relative inline-flex cursor-not-allowed items-center px-4 py-2 border border-gray-300 bg-blue-700 text-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150'
                  : '-ml-px relative inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-blue-700 hover:text-white';

              return (
                <button
                  key={page}
                  className={classes}
                  onClick={() => getResults(page)}
                  disabled={pager.currentPage === page}
                >
                  {page}
                </button>
              );
            })}
        </div>
        {pager.currentPage < pager.endPage && (
          <div>
            <button
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:bg-blue-700 hover:text-white focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              onClick={() => getResults(pager.currentPage + 1)}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </nav>
    </div>
  </div>
);

export default Pagination;
