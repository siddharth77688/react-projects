import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../features/cart/cartSelectors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearCart } from "../features/cart/cartSlice";
import { createOrder } from "../features/orders/orderSlice";

const PaymentPage = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);

    // 🔁 Mock gateway delay
    setTimeout(() => {
      dispatch(
        createOrder({
          items: cartItems,
          totalAmount,
          orderDate: new Date().toISOString(),
          status: "Placed",
        })
      );
      dispatch(clearCart()); // clear cart after success
      navigate("/order-success");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md">
      <h1 className="text-xl font-semibold mb-4">Payment</h1>

      <p className="mb-4">
        Amount to Pay: <strong>₹{totalAmount}</strong>
      </p>

      <div className="space-y-2 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          UPI
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit / Debit Card
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>

      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
      >
        {processing ? "Processing..." : `Pay ₹${totalAmount}`}
      </button>
    </div>
  );
};

export default PaymentPage;
