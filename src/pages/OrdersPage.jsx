import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectOrders } from "../features/orders/orderSelectors";

const OrdersPage = () => {
  const orders = useSelector(selectOrders);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <div className="text-sm text-gray-600">
          Total: {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-md p-6 text-gray-700">
          You don’t have any orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-md shadow-sm border p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-sm text-gray-600">
                    Order Date:{" "}
                    <span className="font-medium text-gray-900">
                      {new Date(order.orderDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Status:{" "}
                    <span className="font-medium text-gray-900">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    Total:{" "}
                    <span className="font-semibold">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                  >
                    View Details / Track Order
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-sm font-semibold mb-2">
                  Products
                </h2>
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-3 flex items-start justify-between gap-4"
                    >
                      <div>
                        <div className="font-medium">
                          {item.product.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

