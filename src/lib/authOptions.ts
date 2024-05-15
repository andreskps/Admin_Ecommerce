import  { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials!.email,
          password: credentials!.password,
        };

        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        return data;
      },
    }),
  ],
  //   pages: {
  //     signIn: "/auth/login", // si no esta logeado lo mandamos a esta pagina
  //   },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(user);
      // if (user.roles?.includes("admin")) {
      //   return "/admin";
      // }

      // return "/";
      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token = {
          ...token,
          name: user.name,
          roles: user.roles,

          access_token: user.access_token,
        };
      }

      return token;
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.access_token = token.access_token;
        session.user.name = token.name;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
};