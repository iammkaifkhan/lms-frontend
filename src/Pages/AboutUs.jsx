// pages/AboutUs.jsx
import HomeLayout from "../Layouts/HomeLayout";
import AboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";

const AboutUs = () => {
  const totalSlides = Array.isArray(celebrities) ? celebrities.length : 0;

  return (
    <HomeLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 pt-10 flex flex-col text-white">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* Text */}
          <section className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-500 font-semibold leading-snug">
              Affordable and quality education
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto lg:mx-0">
              Our goal is to provide affordable and quality education to the
              world. We are providing a platform for aspiring teachers and
              students to share their skills, creativity, and knowledge with
              each other.
            </p>
          </section>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              id="tes1"
              src={AboutMainImage}
              alt="About Us"
              className="drop-shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>

        {/* Carousel Section */}
        {/* Use a centered container with a max width so it looks good on all devices */}
        <div className="carousel w-full max-w-3xl my-12 mx-auto">
          {Array.isArray(celebrities) &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={totalSlides}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;



