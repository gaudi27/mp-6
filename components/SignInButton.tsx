"use client";

 
export default function SignInButton() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <h2 className="text-2xl font-bold">Welcome</h2>
            <p className="text-gray-600">Sign in to see your account information.</p>
 
            <button
                onClick={() => { window.location.href = "/api/auth?action=signin"; }}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
            >
                Sign in with GitHub
            </button>
        </div>
    );
}
 