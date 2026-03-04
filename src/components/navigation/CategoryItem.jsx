const CategoryItem = ({ label }) => {
  return (
    <div className="flex flex-col items-center min-w-[80px] cursor-pointer">
      <div className="w-12 h-12 bg-gray-200 rounded-full mb-1" />
      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
    </div>
  );
};

export default CategoryItem;
