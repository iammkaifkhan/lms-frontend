import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleVideo = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(addCourseLectures(userInput));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  };

  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
    }
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-5 p-4 sm:p-6 shadow-[0_0_10px_black] w-full max-w-lg rounded-lg">
          {/* Header */}
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-2xl text-green-500 cursor-pointer"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl sm:text-2xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>

          {/* Form */}
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-4 w-full"
          >
            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-2 border rounded"
              value={userInput.title}
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-2 border rounded resize-none overflow-y-auto h-28 sm:h-36"
              value={userInput.description}
            />

            {/* Video Upload */}
            {userInput.videoSrc ? (
              <video
                src={userInput.videoSrc}
                muted
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-lg w-full max-h-64"
              />
            ) : (
              <div className="h-40 sm:h-48 border flex items-center justify-center cursor-pointer rounded">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-base sm:text-lg cursor-pointer"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4,video/x-mp4,video/*"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary py-2 font-semibold text-lg rounded"
            >
              ADD NEW LECTURE
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
