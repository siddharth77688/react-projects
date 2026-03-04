import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-semibold mb-2">
        Order Placed Successfully 
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for shopping with Mobik.
      </p>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
