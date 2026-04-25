"use client";


type Props = {
    name: string;
    username: string;
    email: string;
    avatar: string;
};
 
export default function UserProfile({ name, username, email, avatar }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 mt-20">
 

            {avatar && (
                <img
                    src={avatar}
                    alt={`${name}'s profile picture`}
                    className="w-24 h-24 rounded-full border-4 border-gray-900"
                />
            )}
 

            {name && <h2 className="text-2xl font-bold">{name}</h2>}
 

            {username && <p className="text-gray-500">@{username}</p>}
 
            {email && <p className="text-gray-600">{email}</p>}

            <button
                onClick={() => { window.location.href = "/"; }}
                className="mt-4 px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white"
            >
                Sign out
            </button>
        </div>
    );
}