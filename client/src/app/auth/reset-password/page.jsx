"use client";

import { useRouter } from "next/navigation";
import Forms from "../../../components/Forms";
import Link from "next/link";
import { useAuth } from "../../../context/authContent";

const ResetPasswordPage = () => {
    const router = useRouter();
    const { resetPassword } = useAuth();

    const resetPasswordFields = [
        {
            name: "password",
            type: "password",
            label: "New Password*",
            placeholder: "Enter a new password",
            required: true,
        },
        {
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password*",
            placeholder: "Confirm your new password",
            required: true,
        },
    ];

    const validationSchema = {
        password: {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters long" },
        },
        confirmPassword: {
            required: "Please confirm your password",
        },
    };

    const handleResetPassword = async (formData) => {
        try {
            await resetPassword(formData.password);
            router.push("/auth/signin");
        } catch (error) {
            console.error("Reset password error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-4xl font-extrabold text-center text-gray-900">Reset Password</h2>
                <p className="text-center text-gray-600">Enter a new password to reset</p>
                <Forms
                    fields={resetPasswordFields}
                    validationSchema={validationSchema}
                    onSubmit={handleResetPassword}
                    buttonText="Reset Password"
                    buttonClassName="w-full py-4 font-bold text-white bg-green-900 rounded-full hover:bg-green-800 focus:ring-4 focus:ring-yellow-300"
                    inputClassName="w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-xl focus:outline-none"
                />
                <p className="mt-6 text-sm text-center text-gray-500">
                    Remembered your password?{" "}
                    <Link href="/auth/signin" className="font-bold text-yellow-500 hover:text-green-800">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPasswordPage;