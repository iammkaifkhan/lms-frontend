import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomePageImage from "../Assets/Images/homePageMainImage.png";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 sm:px-8 md:px-16 py-10 min-h-[90vh] text-white">
        
        {/* Left Section: Text */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
            Find our best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 sm:gap-6">
            <Link to="/courses">
              <button className="w-full sm:w-auto bg-yellow-500 px-5 py-3 rounded-md font-semibold text-base sm:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="w-full sm:w-auto border border-yellow-500 px-5 py-3 rounded-md font-semibold text-base sm:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={HomePageImage}
            alt="homepage image"
            className="max-w-full h-auto"
          />
        </div>

      </div>
    </HomeLayout>
  );
};

export default HomePage;


