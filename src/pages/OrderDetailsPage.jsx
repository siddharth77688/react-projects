import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderByIdAPI } from "../services/orderAPI";
import { ORDER_STATUSES } from "../features/orders/orderSlice";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      console.log("Fetching order with ID:", orderId);
      const data = await getOrderByIdAPI(orderId);
      console.log("Order data received:", data);
      setOrder(data);
    } catch (err) {
      console.error("Error loading order:", err);
      console.error("Error response:", err.response);
      setError("Failed to load order: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = useMemo(() => {
    if (!order) return -1;
    const idx = ORDER_STATUSES.indexOf(order.status);
    return idx === -1 ? 0 : idx;
  }, [order]);

  if (loading) {
    return <div className="max-w-3xl mx-auto p-6">Loading order...</div>;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-md p-6 border">
          <div className="text-lg font-semibold mb-2">Error</div>
          <div className="text-gray-700 mb-4">{error}</div>
          <Link to="/orders" className="inline-block text-blue-600 hover:underline">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-md p-6 border">
          <div className="text-lg font-semibold mb-2">Order not found</div>
          <div className="text-gray-700 mb-4">We couldn’t find an order with this ID.</div>
          <Link to="/orders" className="inline-block text-blue-600 hover:underline">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="bg-white rounded-md p-4 border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Order Details</h1>
            <div className="text-sm text-gray-600 mt-1">
              Order Date:{" "}
              <span className="font-medium text-gray-900">
                {order.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-medium text-gray-900">
                {order.status}
              </span>
            </div>
          </div>

          <div className="text-sm">
            Total:{" "}
            <span className="font-semibold">₹{order.totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-4 border">
        <h2 className="text-sm font-semibold mb-3">
          Tracking
        </h2>

        <div className="space-y-3">
          {ORDER_STATUSES.map((status, idx) => {
            const isCompleted = idx <= currentStatusIndex;
            const isCurrent = idx === currentStatusIndex;
            return (
              <div key={status} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      "h-4 w-4 rounded-full border",
                      isCompleted
                        ? "bg-green-500 border-green-500"
                        : "bg-white border-gray-300",
                      isCurrent ? "ring-4 ring-green-100" : "",
                    ].join(" ")}
                  />
                  {idx !== ORDER_STATUSES.length - 1 && (
                    <div
                      className={[
                        "w-px h-6",
                        idx < currentStatusIndex
                          ? "bg-green-500"
                          : "bg-gray-300",
                      ].join(" ")}
                    />
                  )}
                </div>

                <div className="pt-[-2px]">
                  <div
                    className={[
                      "font-medium",
                      isCompleted ? "text-gray-900" : "text-gray-500",
                    ].join(" ")}
                  >
                    {status}
                  </div>
                  {isCurrent && (
                    <div className="text-xs text-gray-500">
                      Current status
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Visual timeline: Order Placed ↓ Processing ↓ Shipped ↓ Out for Delivery ↓ Delivered
        </div>
      </div>

      <div className="bg-white rounded-md p-4 border">
        <h2 className="text-sm font-semibold mb-2">Items</h2>
        <div className="divide-y">
          {order.lines?.map((line) => (
            <div
              key={line.productId}
              className="py-3 flex items-start justify-between gap-4"
            >
              <div>
                <div className="font-medium">{line.productTitle || "Product"}</div>
                <div className="text-sm text-gray-600">Qty: {line.quantity}</div>
              </div>
              <div className="text-sm font-semibold">₹{line.price * line.quantity}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link
            to="/orders"
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

