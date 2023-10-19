import React, { useContext, useState } from "react";
import { DataContext } from "../store/context";
import { emptyCart, deleteItemById } from "../apiCalls/cartsApiCalls";
import { Link } from "react-router-dom";
import Paypal from "./Paypal";

function ShoppingCart() {
  // Using CartContext
  const { cartState, dispatchCart, usersState } = useContext(DataContext);
  const [isCheckout, setIsCheckout] = useState(false);

  // Function to remove an item from the cart
  const handleRemoveItem = async (productId) => {
    const cartID = usersState.user?.cartId;

    await deleteItemById(dispatchCart, cartID, productId);
  };

  // Function to empty the cart
  const handleDelete = async (e) => {
    e.target.classList.add("hidden");
    e.target.previousSibling.classList.remove("hidden");
    await emptyCart(dispatchCart, usersState.user.cartId);
  };

  function handleClick(e) {
    e.target.classList.add("hidden");
    e.target.nextSibling.classList.remove("hidden");
    setTimeout(function () {
      e.target.classList.remove("hidden");
      e.target.nextSibling.classList.add("hidden");
      return;
    }, 3000);
  }

  const handleCheckout = () => {
    setIsCheckout(!isCheckout);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartState.items.forEach((item) => {
      if (item.productType !== "Kidsclothes") {
        totalPrice += parseFloat(item.product.price) * item.quantity;
      } else {
        let newQuantity = 0;
        item.size.map((ele) => (newQuantity += parseFloat(ele.quantity)));
        totalPrice += parseFloat(item.product.price) * newQuantity;
      }
    });
    return totalPrice;
  };

  // Adding the shipping cost as variable for the final order cost
  const shippingCost = 3.99;
  const totalIncludingShipping =
    cartState.items.length > 0 ? shippingCost + calculateTotalPrice() : 0; // Calculate the total price including shipping
  const totalDisplay = `${totalIncludingShipping.toFixed(2)}`;
  cartState.totalPrice = totalIncludingShipping;

  const clearCart = async () => {
    setIsCheckout(false); // Close the PayPal section if it's open
    await emptyCart(dispatchCart, usersState.user.cartId);
  };

  return (
    <div className="items-center py-24 bg-gray-50 font-poppins  ">
      <div className="justify-center bg-stone-200  drop-shadow-2xl flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
        <h2 className="mb-10 text-4xl font-bold text-center">
          Einkaufswagen · {cartState.items.length}
        </h2>
        {cartState.length === 0 ? (
          <p>Shopping cart is empty. No items in the cart.</p>
        ) : (
          <>
            {cartState?.items.map((item, index) => (
              <div key={item.product._id} className="mb-10">
                <div className="relative flex flex-wrap items-center pb-2 mb-1 -mx-1 border-b border-gray-700 xl:justify-between border-opacity-40">
                {/* extra div ↓↓↓ for testing  */}
                  <div className="flex flex-start">
                  </div>

                  <div className="bg-secondary w-36 mb-4 rounded-2xl">
                    <img
                      src={item.product.images.cloudinary}
                      alt=""
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </div>


                  <p className="block mb-1 ml-4 text-xl font-bold ">

                    {item.product.productName}
                  </p>
                  {/* ---quantity & sizes section---- */}
                  <div >
                    {item.productType === "Kidsclothes"
                      ? item.size.map((ele, index) => (
                          <div
                            key={index}
                            className="text-md font-medium w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0"
                          >

                        <div className=" flex items-center px-4 ml-20 border border-gray-300 rounded-md">
                              <h2 className=" font-medium" >Größe:</h2>
                              <p className="ml-5 text-primary ">

                                {ele.quantity} Stk x {ele.size}
                              </p>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {/* -------div */}
                  {/* ---Menge---- */}
                  <div className=" mr-40 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0 flex justify-end sm:justify-center">
                    {item.productType !== "Kidsclothes" ? (
                      <div className=" flex items-center">
                        <h2 className="ml-36 mr-2 font-medium">
                          Menge:
                        </h2>

                        <div className=" inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md">
                          <p className="w-12 gb-green-200 px-2 py-2 text-center border-0 rounded-md">

                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {/* ------- */}
                  {/* ---remove button---- */}
                  <div className="w-full px-4 mb-6 xl:w-auto xl:mb-0 xl:mt-0 flex justify-end sm:justify-center">
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="inline-block px-8 py-4 font-bold text-white uppercase bg-secondary rounded-md hover:bg-yellow-600"
                    >
                      entfernen
                    </button>
                  </div>
                  {/* ------- */}
                  {/* --Item price----- */}
                  <div className="w-full px-4 xl:w-auto flex justify-end">

                    <p className="text-xl font-bold text-yellow-900   ">

                      <span>
                        {item.productType === "Kidsclothes"
                          ? item.size.reduce(
                              (acc, curr) => acc + curr.quantity,
                              0
                            ) * item.product.price
                          : item.product.price * item.quantity}
                        .00 €
                      </span>
                    </p>
                  </div>
                  {/* ------- */}
                </div>
              </div>
            ))}
            {/*    second section pricing template */}
            <div className="mb-10">
              <div className="px-10 py-3 bg-gray-100 rounded-md ">
                <div className="flex justify-between ">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold ">{calculateTotalPrice()} €</span>
                </div>
              </div>
              {/* Shipping */}
              {cartState.items.length > 0 && (
                <div className="px-10 py-3 rounded-md">
                  <div className="flex justify-between text-gray-400">
                    <span className="font-medium">Shipping</span>
                    <span className="font-bold ">3.99 €</span>
                  </div>
                </div>
              )}
              {/* Shipping END*/}
              {/* Tax */}
              {cartState.items.length > 0 && (
                <div className="px-10 py-3 bg-gray-100 rounded-md ">
                  <div className="flex justify-between ">
                    <span className="font-medium">Tax</span>
                    <span className="font-bold ">00.00 €</span>
                  </div>
                </div>
              )}
              {/* Tax END*/}
              {/* Order Total */}
              <div className="px-10 py-3 rounded-full">
                <div className="flex justify-between">
                  <span className="text-base font-bold md:text-xl ">
                    Zu Bezahlen:
                  </span>
                  <span className="font-extrabold ">{totalDisplay} €</span>
                </div>
              </div>
            </div>
            {/* Order Total END*/}
          </>
        )}
        {/* Third section Continue Shopping */}

        <div className=" h-full text-center mx-10 flex  flex-wrap items-center">
          <div className="h-full flex-col sm:flex-row sm:flex-wrap sm:justify-between w-full flex items-center">
          <button
            onClick={handleClick}
            className="my-10 mr-4 px-4 py-4 font-bold text-center text-white uppercase transition duration-200 bg-red-800 rounded-md hover:bg-yellow-600 "
          >
            WARENKORB LÖSCHEN
          </button>
          <button
            onClick={handleDelete}
            className="my-10  hidden w-full px-8 py-4 font-bold text-center text-white uppercase transition  duration-200 bg-red-800 rounded-md md:w-auto hover:bg-yellow-600"
          >
            SICHER?
          </button>
            <Link
              to="/"
              className="px-6 py-4 mr-4 font-bold text-center uppercase transition duration-200 bg-gray-100 border rounded-md  hover:bg-gray-200"
            >
              Weiter einkaufen
            </Link>

          <div className="mt-8 mr-4 invisible">


          {isCheckout ? <Paypal clearCart={clearCart} /> : null}
          </div>
            <button
              onClick={handleCheckout}
              className="my-10 px-8 py-4 mr-4 font-bold text-center text-white uppercase transition duration-200 bg-secondary rounded-md hover:bg-yellow-600 "
            >
              {isCheckout ? "Zurück" : "Zur Kasse"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;