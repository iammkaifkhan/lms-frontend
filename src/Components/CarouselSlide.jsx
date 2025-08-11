const CarouselSlide = ({ image, title, description, slideNumber, totalSlides }) => {
  const prev = slideNumber === 1 ? totalSlides : slideNumber - 1;
  const next = slideNumber === totalSlides ? 1 : slideNumber + 1;

  return (
    <div
      id={`slide${slideNumber}`}
      className="carousel-item relative w-full min-h-[350px] sm:min-h-[400px] flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-4 px-6 sm:px-10 md:px-20 max-w-xl text-center">
        {/* Image */}
        <img
          src={image}
          alt={title || `slide-${slideNumber}`}
          className="w-28 sm:w-32 md:w-40 rounded-full border-2 border-gray-400 object-cover"
        />

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200">
          {description}
        </p>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {title}
        </h3>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 flex justify-between">
        <a
          href={`#slide${prev}`}
          className="btn btn-circle btn-sm sm:btn-md"
          aria-label="Previous slide"
        >
          ❮
        </a>
        <a
          href={`#slide${next}`}
          className="btn btn-circle btn-sm sm:btn-md"
          aria-label="Next slide"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default CarouselSlide;



