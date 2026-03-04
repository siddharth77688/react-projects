import CategoryItem from "./CategoryItem";

const categories = [
  "Grocery",
  "Mobiles",
  "Fashion",
  "Electronics",
  "Home",
  "Appliances",
  "Travel",
  "Top Offers",
  "Beauty",
  "Two Wheelers"
];

const CategoryNavbar = () => {
  return (
    <div className="bg-white border-b">
      <div className="overflow-x-auto">
        <div className="flex gap-6 px-6 py-3">
          {categories.map((cat) => (
            <CategoryItem key={cat} label={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
