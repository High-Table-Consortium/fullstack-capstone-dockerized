"use client";

import { useRouter } from "next/navigation";
import Forms from "../../../components/Forms";
import { useAuth } from "../../../context/authContent";

const VerifyEmailPage = () => {
    const router = useRouter();
    const { verifyEmail } = useAuth();

    const verifyEmailFields = [
        {
            name: "code",
            type: "text",
            label: "Verification Code*",
            placeholder: "Enter the code sent to your email",
            required: true,
        },
    ];

    const validationSchema = {
        code: {
            required: "Verification code is required",
        },
    };

    const handleVerifyEmail = async (formData) => {
        try {
            await verifyEmail(formData.code);
            router.push("/auth/signin");
        } catch (error) {
            console.error("Email verification error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-4xl font-extrabold text-center text-gray-900">Verify Email</h2>
                <p className="text-center text-gray-600">Enter the code sent to your email</p>
                <Forms
                    fields={verifyEmailFields}
                    validationSchema={validationSchema}
                    onSubmit={handleVerifyEmail}
                    buttonText="Verify Email"
                    buttonClassName="w-full py-4 font-bold text-white bg-green-900 rounded-full hover:bg-green-800 focus:ring-4 focus:ring-yellow-300"
                    inputClassName="w-full px-4 py-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-xl focus:outline-none"
                />
            </div>
        </div>
    );
};

export default VerifyEmailPage;
