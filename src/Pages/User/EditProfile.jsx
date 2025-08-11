import { useDispatch, useSelector } from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayout';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from 'react-icons/ai';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.data?._id);

  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", () => {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadedImage
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserData());
    navigate("/user/profile");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 sm:p-6 text-white w-full max-w-sm shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-xl sm:text-2xl font-semibold">
            Edit Profile
          </h1>

          {/* Avatar Upload */}
          <label htmlFor="avatar" className="cursor-pointer">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                alt="Preview"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full m-auto object-cover"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 sm:w-28 sm:h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="avatar"
            name="avatar"
            accept=".jpg, .png, .svg, .jpeg"
          />

          {/* Full Name Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-base sm:text-lg font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border rounded-sm"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-base sm:text-lg cursor-pointer"
          >
            Update Profile
          </button>

          {/* Go Back Link */}
          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 text-sm sm:text-base">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;

