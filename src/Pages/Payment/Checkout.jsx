import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import { toast } from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BiRupee } from "react-icons/bi";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: { color: "#F37254" },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const load = async () => {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center px-4 text-white"
      >
        <div className="w-full max-w-sm sm:max-w-md flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative bg-black/30">
          <h1 className="bg-yellow-600 w-full text-center py-4 text-lg sm:text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center py-6">
            <p className="text-sm sm:text-base">
              This purchase will allow you to access all available courses of our
              platform for{" "}
              <span className="text-yellow-600 font-bold block">
                1 Year duration
              </span>
              All the existing and newly launched courses will also be available.
            </p>

            <p className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499</span> only
            </p>

            <div className="text-gray-300 text-xs sm:text-sm">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions apply *</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-b-lg w-full text-lg sm:text-xl font-bold py-3"
          >
            Buy now
          </button>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;

