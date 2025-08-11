import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteCourseLectures,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  const onLectureDelete = async (courseId, lectureId) => {
    await dispatch(deleteCourseLectures({ courseId, lectureId }));
    await dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-8 items-center justify-center min-h-[90vh] py-8 px-4 sm:px-6 lg:px-10 text-white">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-7xl">
            {/* Left: Video Player */}
            <div className="space-y-5 w-full lg:w-1/2 p-3 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures?.[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-t-lg w-full h-56 sm:h-64 md:h-72 lg:h-80"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              />
              <div>
                <h1>
                  <span className="text-yellow-500">Title: </span>
                  {lectures?.[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500">Description: </span>
                  {lectures?.[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* Right: Lectures List */}
            <ul className="w-full lg:w-1/2 p-3 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-lg sm:text-xl text-yellow-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p>Lectures list</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn btn-primary px-3 py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures?.map((lecture, idx) => (
                <li key={lecture._id} className="space-y-2">
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => setCurrentVideo(idx)}
                  >
                    <span>Lecture {idx + 1}: </span>
                    {lecture?.title}
                  </p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() =>
                        onLectureDelete(state?._id, lecture?._id)
                      }
                      className="btn btn-accent px-3 py-1 rounded-md font-semibold text-sm"
                    >
                      Delete lecture
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="btn btn-primary px-3 py-1 rounded-md font-semibold text-sm"
            >
              Add new lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;

