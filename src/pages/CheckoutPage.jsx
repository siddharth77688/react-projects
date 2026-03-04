import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../features/cart/cartSelectors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = () => {
    // Simple validation
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }

    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold">
          No items to checkout
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Address Form */}
      <div className="md:col-span-2 bg-white p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4">
          Delivery Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="street"
            placeholder="Street Address"
            className="border p-2 rounded md:col-span-2"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="pincode"
            placeholder="Pincode"
            className="border p-2 rounded"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary
        </h2>

        <div className="space-y-2 text-sm">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between"
            >
              <span>
                {item.product.title} × {item.quantity}
              </span>
              <span>
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
