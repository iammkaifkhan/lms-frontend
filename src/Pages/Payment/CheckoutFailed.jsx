import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

const CheckoutFailed = () => {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 text-white">
        <div className="w-full max-w-sm sm:max-w-md flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative bg-black/30">
          <h1 className="bg-red-600 w-full py-4 text-lg sm:text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">
            Payment Failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-4 py-6">
            <div className="text-center space-y-2">
              <h2 className="text-base sm:text-lg font-semibold">
                Oops! Your payment failed
              </h2>
              <p className="text-sm sm:text-base">Please try again later</p>
            </div>

            <RxCrossCircled className="text-red-600 text-5xl" />
          </div>

          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 rounded-b-lg w-full text-center text-base sm:text-xl font-semibold cursor-pointer py-3"
          >
            Try Again
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutFailed;

