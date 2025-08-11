import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from '../Helpers/regexMatcher'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const getImage = (event) => {
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', () => {
                setPreviewImage(fileReader.result);
            })
        }
    }

    const createNewAccount = async (event) => {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }
        if (!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }
        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6-16 characters long with atleast a number and special character");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));
        if (response.payload.success) {
            navigate("/");
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen px-4">
                <form
                    noValidate
                    onSubmit={createNewAccount}
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-full max-w-md sm:max-w-lg shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-xl sm:text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        type="file"
                        name="image_uploads"
                        className="hidden"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            id="fullName"
                            placeholder="Enter your name..."
                            className="bg-transparent px-2 py-2 border w-full"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            id="email"
                            placeholder="Enter your email..."
                            className="bg-transparent px-2 py-2 border w-full"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            id="password"
                            placeholder="Enter your password..."
                            className="bg-transparent px-2 py-2 border w-full"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-3 font-semibold text-base sm:text-lg cursor-pointer"
                    >
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup

