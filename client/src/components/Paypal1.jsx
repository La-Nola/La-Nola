import React, { useContext, useEffect, useRef } from "react";
import { DataContext } from "../store/context";
import { placeOrder } from "../apiCalls/usersApiCalls";

const Paypal = () => {
  const { cartState, usersState, dispatchUsers } = useContext(DataContext);
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
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
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default Paypal;