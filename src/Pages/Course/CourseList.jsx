import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const loadCourses = async () => {
    await dispatch(getAllCourses());
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-4 sm:px-8 md:px-20 flex flex-col gap-10 text-white">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-5">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>

        <div className="mb-10 flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-14">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;

