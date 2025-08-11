import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", () => {
        setUserInput({
          ...userInput,
          previewImage: fileReader.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.previewImage
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[100vh] px-4">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-full max-w-3xl my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
          </Link>
          <h1 className="text-center text-2xl font-bold">
            Create New Course
          </h1>

          {/* Responsive grid: 1 col on small, 2 cols on medium+ */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side */}
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer block">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      className="w-full h-44 object-cover border rounded"
                    />
                  ) : (
                    <div className="w-full h-44 flex items-center justify-center border rounded text-center px-2">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpeg, .jpg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border rounded"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter course instructor"
                  className="bg-transparent px-2 py-1 border rounded"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter course category"
                  className="bg-transparent px-2 py-1 border rounded"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter course description"
                  className="bg-transparent px-2 py-1 border h-24 rounded resize-none overflow-y-auto"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            type="submit"
            className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;

