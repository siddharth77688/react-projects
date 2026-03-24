import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectSelectedProduct,
  selectProductLoading,
} from "../features/products/productSelectors";
import { fetchProductById } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const loading = useSelector(selectProductLoading);

  // 🔥 FETCH SPECIFIC PRODUCT
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // ⏳ Still loading
  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  // ❌ Only AFTER loading
  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md grid md:grid-cols-2 gap-6">
      {/* Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[350px] object-contain"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-xl font-semibold mb-2">
          {product.title}
        </h1>

        <div className="text-2xl font-bold mb-4">
          ₹{product.price}
        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
