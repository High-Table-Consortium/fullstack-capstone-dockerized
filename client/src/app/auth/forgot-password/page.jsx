"use client";

import { useRouter } from "next/navigation";
import Forms from "../../../components/Forms";
import { useAuth } from "../../../context/authContent";

const ForgotPasswordPage = () => {
    const router = useRouter();
    const { forgotPassword } = useAuth();

    const forgotPasswordFields = [
        {
            name: "email",
            type: "email",
            label: "Email*",
            placeholder: "Enter your registered email",
            required: true,
        },
    ];

    const validationSchema = {
        email: {
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
        },
    };

    const handleForgotPassword = async (formData) => {
        try {
            await forgotPassword(formData.email);
        } catch (error) {
            console.error("Forgot password error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-4xl font-extrabold text-center text-gray-900">Forgot Password</h2>
                <p className="text-center text-gray-600">Enter your email to reset password</p>
                <Forms
                    fields={forgotPasswordFields}
                    validationSchema={validationSchema}
                    onSubmit={handleForgotPassword}
                    buttonText="Request Reset Link"
                    buttonClassName="w-full py-4 font-bold text-white bg-green-900 rounded-full hover:bg-green-800 focus:ring-4 focus:ring-yellow-300"
                    inputClassName="w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-xl focus:outline-none"
                />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
