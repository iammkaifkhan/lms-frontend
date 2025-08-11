import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJs.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );
  const myCourses = useSelector((state) => state?.course?.courseData);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"]
      }
    ]
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255,99,132)"],
        borderColor: ["white"],
        borderWidth: 2
      }
    ]
  };

  const onCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col gap-10 text-white px-4">
        <h1 className="text-center text-2xl sm:text-4xl md:text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* Pie Chart */}
          <div className="flex flex-col items-center gap-6 p-5 shadow-lg rounded-md bg-base-200">
            <div className="w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80">
              <Pie data={userData} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-4 rounded-md shadow-md bg-base-100">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {allUsersCount}
                  </h3>
                </div>
                <FaUsers className="text-yellow-500 text-4xl sm:text-5xl" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-md shadow-md bg-base-100">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Enrolled Users</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {subscribedCount}
                  </h3>
                </div>
                <FaUsers className="text-green-500 text-4xl sm:text-5xl" />
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex flex-col items-center gap-6 p-5 shadow-lg rounded-md bg-base-200">
            <div className="h-60 sm:h-72 md:h-80 w-full relative">
              <Bar className="absolute bottom-0 w-full" data={salesData} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-4 rounded-md shadow-md bg-base-100">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {allPayments?.count}
                  </h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-4xl sm:text-5xl" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-md shadow-md bg-base-100">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-4xl sm:text-5xl" />
              </div>
            </div>
          </div>
        </div>

       {/* Courses Section */}
<div className="w-full flex flex-col gap-6 mb-10">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 text-center sm:text-left">
    <h1 className="text-2xl sm:text-3xl font-semibold">
      Courses Overview
    </h1>
    <button
      onClick={() => navigate("/course/create")}
      className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg w-full sm:w-auto mx-auto sm:mx-0"
    >
      Create new course
    </button>
  </div>


          <div className="overflow-x-auto w-full">
            <table className="table min-w-max">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCourses?.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>
                    <td className="min-w-28">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-80 bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td className="flex items-center gap-2 sm:gap-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-3 sm:px-4 rounded-md font-bold"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course }
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-3 sm:px-4 rounded-md font-bold"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;

