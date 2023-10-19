import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../store/context";
import { placeOrder } from "../apiCalls/usersApiCalls";
import { toast } from "react-toastify";

const Paypal = ({ clearCart }) => {
  const { cartState, usersState, dispatchUsers } = useContext(DataContext);
  const paypal = useRef();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const paypalButtonRef = useRef(null);

  useEffect(() => {
    const createPaypalButton = async () => {
      if (!paypalButtonRef.current) {
        paypalButtonRef.current = window.paypal.Buttons({
          style: { layout: "vertical", tagline: false, fundingicons: true },
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  reference_id: usersState.user.cartId,
                  amount: {
                    currency_code: "EUR",
                    value: cartState.totalPrice,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            placeOrder(order, usersState, dispatchUsers, cartState.items);
            console.log(order);

            toast.success("Vielen Dank für Ihren Einkauf bei La-Nola.");

            clearCart();

            // Set payment success to true
            setPaymentSuccess(true);
          },
          onError: (err) => {
            console.log(err);
          },
        });

        await paypalButtonRef.current.render(paypal.current);
      }
    };

    createPaypalButton();

    return () => {
      if (paypalButtonRef.current) {
        paypalButtonRef.current.close();
      }
    };
  }, [cartState.totalPrice, usersState, dispatchUsers, cartState.items,clearCart]);
  return (
    <div>
      {paymentSuccess && (
        <div className="toast-success">
          Vielen Dank für Ihren Einkauf bei La-Nola.
        </div>
      )}
      <div ref={paypal}></div>
    </div>
  );
};

export default Paypal;
