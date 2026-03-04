import HeroCarousel from "../components/carousel/HeroCarousel";
import DealsSection from "../components/products/DealsSection";
import ProductSection from "../components/products/ProductSection";
import SkeletonCard from "../components/ui/SkeletonCard";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectFilteredProducts,
  selectProductLoading,
} from "../features/products/productSelectors";
import { fetchProducts } from "../features/products/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const loading = useSelector(selectProductLoading);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="space-y-6">
      {/* <HeroCarousel /> */}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <DealsSection title="Top Deals" products={products} />
          <ProductSection title="Top Rated Products" products={products} />
        </>
      ) : (
        <p className="text-center text-gray-500">
          No products match your search
        </p>
      )}
    </div>
  );
};

export default HomePage;
