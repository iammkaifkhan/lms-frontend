import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 text-white">
        <div className="w-full max-w-sm sm:max-w-md flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative bg-black/30">
          <h1 className="bg-green-500 w-full py-4 text-lg sm:text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">
            Payment Successful
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-4 py-6">
            <div className="text-center space-y-2">
              <h2 className="text-base sm:text-lg font-semibold">
                Welcome to the Pro Bundle
              </h2>
              <p className="text-sm sm:text-base">
                Now you can enjoy access to all our courses.
              </p>
            </div>

            <AiFillCheckCircle className="text-green-500 text-5xl" />
          </div>

          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 rounded-b-lg w-full text-center text-base sm:text-xl font-semibold cursor-pointer py-3"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutSuccess;

