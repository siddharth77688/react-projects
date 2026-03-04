import { useSelector, useDispatch } from "react-redux";
import {selectCartItems,selectCartTotalAmount,} from "../features/cart/cartSelectors";
import {addToCart,removeFromCart,} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything yet
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">
        My Cart
      </h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h3 className="text-sm font-medium">
                {item.product.title}
              </h3>

              <p className="font-semibold mt-1">
                ₹{item.product.price}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.product.id))
                  }
                  className="px-2 border rounded"
                >
                  Remove
                </button>

                <button
                  onClick={() =>
                    dispatch(addToCart(item.product))
                  }
                  className="px-2 border rounded"
                >
                  +
                </button>

                <span>Qty: {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-lg font-semibold">
          Total: ₹{totalAmount}
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
