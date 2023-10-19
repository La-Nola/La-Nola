import { useContext, useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import { DataContext } from "../../store/context";

const SearchProductList = () => {
  const { productsState, searchValue } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of products to display per page

  // Reseting the current page when switching to another category
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  // Filter regular products based on subcategory
  const filteredProducts = productsState.data;
  console.log(productsState);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalProducts);
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        {productsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Map over the products to display */}
            {productsToDisplay.map((productItem, index) => (
              <ProductCards
                productItem={productItem}
                key={productItem._id}
                index={index}
                subcategory={productItem.subcategory}
              />
            ))}
          </div>
        ) : (
          // If there are no products to display on the current page, show a message.
          <div className="text-center p-40 font-semibold">
            {`Apology! There are no ${searchValue} products available on this page!`}
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          <button
            className="px-2 py-1 border rounded"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-2 py-1 border rounded"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchProductList;
