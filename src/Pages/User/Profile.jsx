import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { toast } from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);

  const handleCancellation = async () => {
    toast("Initiating Cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/");
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="my-10 flex flex-col gap-5 rounded-lg p-4 sm:p-6 text-white w-full max-w-sm shadow-[0_0_10px_black]">
          {/* Profile Image */}
          <img
            src={userData?.avatar?.secure_url}
            alt="User Avatar"
            className="w-32 sm:w-40 m-auto rounded-full border border-black"
          />

          {/* Name */}
          <h3 className="text-lg sm:text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-y-2 text-sm sm:text-base">
            <p>Email:</p>
            <p className="break-all">{userData?.email}</p>
            <p>Role:</p>
            <p>{userData?.role}</p>
            <p>Subscription:</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/changepassword"
              className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 text-center"
            >
              Change Password
            </Link>
            <Link
              to="/user/editprofile"
              className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 text-center"
            >
              Edit Profile
            </Link>
          </div>

          {/* Cancel Subscription */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;

