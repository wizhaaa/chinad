import React, { useState, useEffect, useRef } from "react";

import { useCartContext } from "../CartContext";

const Paypal = (props) => {
  const { orderTotal, setAmountPaid } = props;

  const { orderPaid, setOrderPaid } = useCartContext();

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const paypal = useRef();
  const [paidFor, setPaidFor] = useState(false);
  console.log(typeof orderTotal);
  let paypalTotal = orderTotal;
  paypalTotal = formatter.format(paypalTotal + 0.5);
  console.log("new total is : ", paypalTotal);

  console.log(paypalTotal);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "China Delight Online Order",
                amount: {
                  currency_code: "USD",
                  value: paypalTotal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("successful order: " + order);
          setOrderPaid(true);
          setAmountPaid(paypalTotal);
        },
        onError: (err) => {
          console.log(err);
          alert("Sorry, something went wrong...");
        },
      })
      .render(paypal.current);
  }, [orderTotal]);

  return (
    <div>
      {" "}
      {orderPaid ? null : (
        <div>
          <div ref={paypal}></div>
        </div>
      )}
    </div>
  );
};

export default Paypal;
