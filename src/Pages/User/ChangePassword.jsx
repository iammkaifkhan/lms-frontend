import { useState, useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formType, setFormType] = useState("change"); // change | forgot
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    email: "",
  });

  useEffect(() => {
    if (location.state?.mode === "forgot") {
      setFormType("forgot");
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiCall;

      if (formType === "change") {
        if (!inputs.oldPassword || !inputs.newPassword) {
          toast.error("Both old and new password are required");
          return;
        }
        apiCall = axiosInstance.post("/user/change-password", {
          oldPassword: inputs.oldPassword,
          newPassword: inputs.newPassword,
        });
      } else if (formType === "forgot") {
        if (!inputs.email) {
          toast.error("Email is required");
          return;
        }
        apiCall = axiosInstance.post("/user/reset", { email: inputs.email });
      }

      toast.promise(apiCall, {
        loading: "Processing...",
        success: (res) => res.data?.message || "Success",
        error: (err) => err?.response?.data?.message || "Failed",
      });

      const res = await apiCall;
      if (res?.data?.success) {
        setInputs({ oldPassword: "", newPassword: "", email: "" });
        if (formType === "change") navigate("/user/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
        <div className="bg-black/30 p-6 rounded-lg shadow-lg w-full max-w-sm text-white">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-4">
            {formType === "change" ? "Change Password" : "Forgot Password"}
          </h1>

          {/* Tabs */}
          <div className="flex justify-around mb-4">
            <button
              className={`px-3 py-1 rounded text-sm sm:text-base ${
                formType === "change" ? "bg-yellow-600" : "bg-gray-700"
              }`}
              onClick={() => setFormType("change")}
            >
              Change
            </button>
            <button
              className={`px-3 py-1 rounded text-sm sm:text-base ${
                formType === "forgot" ? "bg-yellow-600" : "bg-gray-700"
              }`}
              onClick={() => setFormType("forgot")}
            >
              Forgot
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {formType === "change" && (
              <>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={inputs.oldPassword}
                  onChange={handleChange}
                  className="bg-transparent border px-2 py-1 rounded-sm text-sm sm:text-base"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={inputs.newPassword}
                  onChange={handleChange}
                  className="bg-transparent border px-2 py-1 rounded-sm text-sm sm:text-base"
                />
              </>
            )}

            {formType === "forgot" && (
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={handleChange}
                className="bg-transparent border px-2 py-1 rounded-sm text-sm sm:text-base"
              />
            )}

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-sm sm:text-lg cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;




