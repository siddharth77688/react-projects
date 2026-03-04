const BannerSlide = ({ image }) => {
  return (
    <div className="w-full h-[280px] md:h-[360px] flex-shrink-0">
      <img
        src={image}
        alt="banner"
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
};

export default BannerSlide;
