import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "./ProductCards";
import ItemsOnSale from "../homePage/onSaleOrNew/ItemsOnSale";
import { DataContext } from "../../store/context";
import NewCollection from "../homePage/onSaleOrNew/NewCollection";

const ProductsList = ({ product }) => {
  const { subcategory } = useParams();
  const { productsState, searchValue } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of products to display per page

  // Reseting the current page when switching to another category
  useEffect(() => {
    setCurrentPage(1);
  }, [subcategory]);

  // Filter regular products based on subcategory
  const firstFilter = subcategory
    ? subcategory === "hosen"
      ? productsState[product].data?.filter(
          (productItem) =>
            productItem.subcategory === "jerseyhosen" ||
            productItem.subcategory === "kordhosen" ||
            productItem.subcategory === "latzhosen" ||
            productItem.subcategory === "musselinhosen" ||
            productItem.subcategory === "walkhosen"
        )
      : productsState[product].data?.filter(
          (productItem) => productItem.subcategory === subcategory
        )
    : productsState[product].data;

  const filteredProducts = firstFilter?.filter(
    (product) =>
      product.colors?.join().includes(searchValue.toLowerCase()) ||
      product.productName?.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalProducts = filteredProducts?.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalProducts);
  const productsToDisplay = filteredProducts?.slice(startIndex, endIndex);

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
    <div className="container mx-auto px-4 py-8 shadow-2xl bg-gray-100 rounded-2xl mb-1">
      <h1 className="text-secondary text-3xl font-bold mt-10 mb-20 text-center italic">
      La-Nola wird Ihr einzigartiges Stück nachhaltig und mit viel Liebe herstellen.
    </h1>
      {/* Conditionally render SaleProductsList if subcategory is "onSale" or or "new-collection" otherwise render all the products accordingly*/}
      {subcategory === "sale" ? (
        <ItemsOnSale product={product} />
      ) : subcategory === "new-collection" ? (
        <NewCollection product={product} />
      ) : (
        <div>
          {productsToDisplay?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Map over the products to display */}
              {productsToDisplay.map((productItem, index) => (
                <ProductCards
                  productItem={productItem}
                  key={productItem._id}
                  index={index}
                  subcategory={subcategory}
                />
              ))}
            </div>
          ) : (
            // If there are no products to display on the current page, show a message.
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
      )}
    </div>
  );
};

export default ProductsList;
