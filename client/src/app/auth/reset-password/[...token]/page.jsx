"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Forms from "../../../../components/Forms";
import { useAuth } from "../../../../context/authContent";
import { useToast } from "../../../../hooks/use-toast";
const ResetPasswordPage = ({ params }) => {
    const router = useRouter();
    const { resetPassword, isLoading, error } = useAuth();
    const [token, setToken] = useState(null);
    const { toast } = useToast();
    useEffect(() => {
        // Extract token from URL path
        if (params && params.token) {
            setToken(params.token[0]);
        }
    }, [params]);

    const resetPasswordFields = [
        {
            name: "password",
            type: "password",
            label: "New Password*",
            placeholder: "Enter a new password",
            // required: true,
        },
        {
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password*",
            placeholder: "Confirm your new password",
            // required: true,
        },
    ];

    const validationSchema = {
        password: {
            required: "Password is required",
            minLength: 8,
            message: "Password must be at least 8 characters long",
        },
        confirmPassword: {
            required: "Please confirm your password",
            match: "password",
            message: "Passwords do not match",
        },
    };

    const handleResetPassword = async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                variant: "destructive",
            });
            return;
        }

        if (!token) {
            toast({
                title: "Error",
                description: "Invalid or missing reset token.",
                variant: "destructive",
            });
            return;
        }

        try {
            const success = await resetPassword(token, formData.password);
            if (success) {
                router.push('/auth/signin');
            } else {
                toast({
                    title: "Error",
                    description: error || "Failed to reset password.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Reset password error:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-4xl font-extrabold text-center text-gray-900">Reset Password</h2>
                {!token ? (
                <p className="text-red-500">Invalid or missing reset token. Please check your reset password link.</p>
            ) : (
                <Forms
                    fields={resetPasswordFields}
                    validationSchema={validationSchema}
                    onSubmit={handleResetPassword}
                    buttonText="Reset Password"
                    buttonClassName="w-full py-4 font-bold text-white bg-green-900 rounded-full hover:bg-green-800 focus:ring-4 focus:ring-yellow-300"
                    inputClassName="w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-xl focus:outline-none"
                />
            )}
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