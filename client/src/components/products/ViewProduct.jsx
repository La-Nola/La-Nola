import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/context";
import { addCartItem } from "../../apiCalls/cartsApiCalls";
import ProductColor from "./ProductColor";

function ViewProduct() {
  // Get product data from location state
  const { showSalePrice, ...productItem } = useLocation().state;
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  // Destructure product data and add default values for 'colors' and 'sizes'
  const {
    _id,
    category,
    productName,
    price,
    images,
    colors = [], // setting to an empty array if there isn't any colors
    sizes = [], // setting to an empty array if there isn't any sizes
    stock,
    isSale,
    description,
    material,
  } = productItem;

  const salePrice = showSalePrice
    ? (price - (price * isSale) / 100).toFixed(2)
    : null; // Calculate sale price if showSalePrice is true

  const toUpperCaseCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  // Extract the lower bound of the price range (need to change in the BE)
  const [quantity, setQuantity] = useState(1);
  // State to store the selected size
  const [selectedSize, setSelectedSize] = useState("");
  // State to manage the warning message visibility
  const [showWarning, setShowWarning] = useState(false);
  // Set the maximum quantity
  const [maxQuantity] = useState(stock); //! need to implement setMaxQuantity later
  // Access the DataContext for managing the shopping cart state
  const { usersState, dispatchCart, setSearchState, setSearchValue } =
    useContext(DataContext);
  // State to store a temporary message when the quantity changes
  const [quantityChangeMessage, setQuantityChangeMessage] = useState("");

  setSearchState(false);
  setSearchValue("");
  // Function to handle size selection
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setShowWarning(false); // Reset the warning when a size is selected
  };
  // Function to handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
      setQuantityChangeMessage(`Menge aktualisiert auf ${newQuantity}`);
      setTimeout(() => {
        setQuantityChangeMessage(""); // Clearing the message after a short delay
      }, 1500);
    }
  };
  const handleCart = async () => {
    if (!usersState.isLoggedIn) {
      navigate("/login");
      return;
    }
    // Check if a size is required and whether a size is selected
    if (sizes.length > 0 && !selectedSize) {
      setShowWarning(true); // set true to show friendly warning message to the user
      setTimeout(() => {
        setShowWarning(false); // Hide the warning message after a few seconds
      }, 3000);
      return; // Exiting here to prevent adding to the cart
    }
    // Checking if the chosen quantity not exceeding the our stock
    if (quantity > maxQuantity) {
      setShowWarning(true); // green friendly message notifying the user about the quantity that been increase once he/she clicks the increase button!
      setTimeout(() => {
        setShowWarning(false); // Hiding that warning after few seconds
      }, 3000);
      return; // Exiting here to prevent adding to the cart
    }

    // If all checks are pass and good to go, then we add the item to the cart
    const cartItem = {
      size: selectedSize,
      product: _id,
      productType: toUpperCaseCategory,
      quantity: quantity,
      price: price,
    };
    await addCartItem(dispatchCart, cartItem, usersState.user.cartId);
    // Set the toast message
    setToast("Artikel zum Einkaufswagen hinzugefügt!");

    // Hide the toast after a few seconds
    setTimeout(() => {
      setToast(null);
    }, 1000);
  };

  return (
    <section className="overflow-hidden bg-gray-100 py-11 font-poppins">
      {toast && (
        <div className="fixed top-36 right-0 p-4 px-8 rounded-lg shadow-lg bg-gradient-to-r from-stone-200 to-stone-400 text-brown-600 flex items-center">
          <p className="text-lg text-gray-900 font-semibold">{toast}</p>
        </div>
      )}
      <div className="max-w-6xl bg-stone-200 rounded-lg shadow-2xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2 grid place-items-center">
            {/* overflow-hidden sticky top-0 z--50  */}
            <div>
              {" "}
              <div className="relative object-fit:cover mb-6 lg:mb-10 lg:h-2/4">
                <img
                  src={images.cloudinary}
                  alt={productName}
                  className="object-cover w-96 h-5/6 bg-black lg:h-full rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {productName}
                </h2>

                {category !== "candle" ? (
                  <article className="text-gray-800 mt-6">
                    {description}{" "}
                    <span className="block mt-4"> {material} </span>
                  </article>
                ) : (
                  <article className="mt-8">
                    Jede Kerze wird mit Liebe zum Detail für dich angefertigt.
                    Verwendet werden durchgefärbte Kerzen mit einer langen
                    Brenndauer. Die Kerzen werden mit deinem individuellen Motiv
                    mit Wachs beklebt, so dass die Kerze natürlich und ohne
                    Einschränkungen abbrennen kann.
                  </article>
                )}
                <p className="text-gray-800 mt-8 font-bold text-2xl">
                  {/* conditional rendering for the items on sale */}
                  {showSalePrice ? (
                    <>
                      <span className="line-through ">{price} €</span>
                      <span className="text-red-800 ml-4">{salePrice} €</span>
                    </>
                  ) : (
                    `${price} €`
                  )}
                </p>
                <div className="flex flex-col mt-8">
                  <div className="flex items-center">
                    <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                      Farbe:{colors.join(", ")}
                    </h2>
                  </div>
                  <div className="flex items-center mt-4">
                    <ProductColor colors={colors} />
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  {sizes.length > 0 && (
                    <div className="flex items-center mt-4">
                      <label className="mb-2"></label>
                      <select
                        value={selectedSize}
                        onChange={handleSizeChange}
                        className="px-2 py-2 border rounded text-lg w-full"
                      >
                        <option value="">Größe auswählen</option>
                        {sizes.map((size, index) => (
                          <option key={index} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="w-32 mt-8">
                  <label
                    htmlFor=""
                    className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                  >
                    Menge
                  </label>
                  <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                    <button
                      className="w-10 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700  hover:bg-gray-400"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <span className="m-auto text-2xl font-thin">-</span>
                    </button>
                    <div className="flex items-center justify-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 text-md">
                      {quantity}
                    </div>
                    <button
                      className="w-10 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400  hover:text-gray-700 hover:bg-gray-400"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 10}
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
                {quantityChangeMessage && (
                  <p className="text-green-500 mt-2">{quantityChangeMessage}</p>
                )}
                <div className="flex flex-wrap items-center -mx-4 mt-6">
                  <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <button
                      className="flex items-center justify-center w-full p-4  text-white  bg-secondary rounded-md "
                      onClick={handleCart}
                    >
                      Warenkorb legen
                    </button>
                  </div>
                  <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                    <button className="flex items-center justify-center w-full p-4  text-white  bg-secondary rounded-md ">
                      Sofort bezahlen
                    </button>
                  </div>
                  {showWarning && (
                    <p className="text-red-500 mt-2">
                      Bitte wählen Sie eine Größe und Menge aus, bevor Sie es in
                      den Warenkorb legen.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ViewProduct;
