import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log("Profile GitHub: ", profile)

                let userRole = "GitHub User"
                if(profile?.email == "gishnora@gmail.com"){
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_ID,
            clientSecrect: process.env.GITHUB_SECRET,
        }),

        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile)

                let userRole = "Google User";
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecrect: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt ({token, user}) {
            if(user) token.role = user.role
            return token
        },
        async session ({session, token}) {
            if(session?.user) session.user.role = token.role
            return session
        },
    }
};