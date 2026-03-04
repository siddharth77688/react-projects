const SkeletonCard = () => {
  return (
    <div className="bg-white p-4 rounded-md animate-pulse">
      <div className="h-40 bg-gray-200 mb-3 rounded" />
      <div className="h-4 bg-gray-200 mb-2 rounded" />
      <div className="h-4 bg-gray-200 w-1/2 rounded" />
    </div>
  );
};

export default SkeletonCard;
