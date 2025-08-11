import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast";
import { isEmail } from '../Helpers/regexMatcher'
import axiosInstance from "../Helpers/axiosInstance";

const Contact = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!userInput.email || !userInput.message || !userInput.name) {
            toast.error("All fields are mandatory");
            return;
        }
        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }
        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            toast.error("Operation failed...");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen px-4">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-full max-w-md sm:max-w-lg shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-xl sm:text-2xl font-bold">Contact Us</h1>

                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-semibold">Name</label>
                        <input
                            className="bg-transparent border px-2 py-2 rounded-sm w-full"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            className="bg-transparent border px-2 py-2 rounded-sm w-full"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="message" className="font-semibold">Message</label>
                        <textarea
                            className="resize-none min-h-[120px] sm:min-h-[150px] bg-transparent border px-2 py-2 rounded-sm w-full"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-base sm:text-lg cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact



