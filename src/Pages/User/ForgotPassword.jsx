import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      const responsePromise = axiosInstance.post("/user/reset", { email });
      toast.promise(responsePromise, {
        loading: "Sending reset link...",
        success: (res) => res.data?.message || "Reset link sent successfully",
        error: (err) =>
          err?.response?.data?.message || "Failed to send reset link",
      });

      const res = await responsePromise;
      if (res?.data?.success) {
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-black/30 p-6 rounded-lg shadow-lg w-full max-w-sm text-white"
        >
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-2">
            Forgot Password
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 text-center mb-2">
            Enter your email to receive a password reset link.
          </p>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border px-2 py-1 rounded-sm text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-sm sm:text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;

