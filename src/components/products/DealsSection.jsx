import ProductCard from "./ProductCard";

const DealsSection = ({ title, products }) => {
  return (
    <section className="bg-white p-4 rounded-md">
      
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {products.map((product) => (
            <div key={product.id} className="min-w-[200px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default DealsSection;
