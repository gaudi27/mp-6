 
import SignInButton from "@/components/SignInButton";
import UserProfile from "@/components/UserProfile";
 
export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ name?: string; username?: string; email?: string; avatar?: string }>;
}) {
    const params = await searchParams;
    const isLoggedIn = !!params.username;
 
    return (
        <main>
            {isLoggedIn ? (
                <UserProfile
                    name={params.name || ""}
                    username={params.username || ""}
                    email={params.email || ""}
                    avatar={params.avatar || ""}
                />
            ) : (
                <SignInButton />
            )}
        </main>
    );
}