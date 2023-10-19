import { useContext, useState } from "react";
import ProductCards from "../../products/ProductCards";
import { DataContext } from "../../../store/context";
import { useParams } from "react-router-dom";

const NewCollection = ({ product }) => {
  const { subcategory } = useParams();
  const { productsState } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; //? Number of products to display per page

  // Filtering products (newProduct) boolean true
  const filteredNewProducts = productsState[product].data?.filter(
    (productItem) => productItem.newProduct === true
  );

  const totalNewProducts = filteredNewProducts.length;
  const totalPages = Math.ceil(totalNewProducts / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalNewProducts);
  const newProductsToDisplay = filteredNewProducts.slice(startIndex, endIndex);

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
      {newProductsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Map over the new products to display */}
          {newProductsToDisplay.map((productItem, index) => (
            <ProductCards
              productItem={productItem}
              key={productItem._id}
              index={index}
              subcategory={subcategory}
            />
          ))}
        </div>
      ) : (
        // If there are no new products to display on the current page, show a message.
        <div className="text-center p-40 font-semibold">
          {`Entschuldigung! Auf dieser Seite sind keine ${subcategory}-Produkte verfügbar!`}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-2">
          <button
            className="w-24 text-white hover:opacity-80 rounded-lg bg-secondary"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Vorherige
          </button>
          <span className="p-3 px-9">
            Seite {currentPage} von {totalPages}
          </span>
          <button
            className=" w-24 text-white hover:opacity-80 rounded-lg bg-secondary"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Weiter
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCollection;
