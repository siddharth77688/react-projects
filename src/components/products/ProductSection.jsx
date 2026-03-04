import ProductCard from "./ProductCard";

const ProductSection = ({ title, products }) => {
  return (
    <section className="bg-white p-4 rounded-md">
      
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
};

export default ProductSection;
