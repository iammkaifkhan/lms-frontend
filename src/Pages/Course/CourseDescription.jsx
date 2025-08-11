import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-8 px-4 sm:px-8 md:px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6 w-full max-w-6xl">
          {/* Left Column */}
          <div className="space-y-5">
            <img
              className="w-full h-52 sm:h-64 object-cover rounded"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-lg sm:text-xl gap-2 sm:gap-0">
                <p className="font-semibold text-center sm:text-left">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures :
                  </span>{" "}
                  {state?.numberOfLectures}
                </p>

                <p className="font-semibold text-center sm:text-left">
                  <span className="text-yellow-500 font-bold">
                    Instructor :
                  </span>{" "}
                  {state?.createdBy}
                </p>
              </div>

              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", { state: { ...state } })
                  }
                  className="bg-yellow-600 text-lg sm:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-red-600 text-lg sm:text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-500 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2 text-lg sm:text-xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 text-center md:text-left">
              {state?.title}
            </h1>
            <p className="text-yellow-500 font-semibold">
              Course description :
            </p>
            <p className="leading-relaxed">{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;

