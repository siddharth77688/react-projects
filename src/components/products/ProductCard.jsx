import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 ASYNC SAFETY GUARD (MANDATORY)
  if (!product || !product.id) return null;

  const { id, title, price, image } = product;

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="bg-white rounded-md shadow-sm p-4 hover:shadow-md transition cursor-pointer"
    >
      {/* Image */}
      <div className="h-40 flex items-center justify-center mb-3">
        <img
          src={image}
          alt={title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm text-gray-700 line-clamp-2 mb-1">
        {title}
      </h3>

      {/* Price */}
      <div className="font-semibold text-gray-900">
        ₹{price}
      </div>

      {/* Add to Cart */}
      <button
        onClick={(e) => {
          e.stopPropagation();          // 🔥 PREVENT NAVIGATION
          dispatch(addToCart(product));
        }}
        className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
