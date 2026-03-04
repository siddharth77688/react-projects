import { useState } from "react";
import BannerSlide from "./BannerSlide";

const banners = [
  "https://via.placeholder.com/1500x400?text=Banner+1",
  "https://via.placeholder.com/1500x400?text=Banner+2",
  "https://via.placeholder.com/1500x400?text=Banner+3"
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative overflow-hidden bg-white">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((img, index) => (
          <BannerSlide key={index} image={img} />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setCurrent((prev) =>
            prev === banners.length - 1 ? 0 : prev + 1
          )
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default HeroCarousel;
