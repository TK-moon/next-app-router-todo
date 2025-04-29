import {
  AuthOptions,
  getServerSession as NextAuthGetServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";
import { JWT } from "next-auth/jwt";

export const auth_options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/tasks",
        },
      },
    }),
  ],
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google") {
        return !!profile?.email?.endsWith("@gmail.com");
      }
      return true;
    },
    jwt: async ({ token, account }) => {
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token ?? token.refresh_token;
        token.expires_at = Date.now() + (account.expires_in ?? 3600);
      }

      const is_expired = Date.now() > (token.expires_at ?? 0);
      if (!is_expired) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
};

export const getServerSession = () => NextAuthGetServerSession(auth_options);

interface Token {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  error?: string;
}

async function refreshAccessToken(token: Token): Promise<JWT> {
  try {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    client.setCredentials({ refresh_token: token.refresh_token });

    const { credentials } = await client.refreshAccessToken();

    return {
      ...token,
      refresh_token: credentials.refresh_token ?? undefined,
      access_token: credentials.access_token ?? undefined,
      expires_at: Date.now() + (credentials.expiry_date ?? 3600) * 1000,
    };
  } catch (error) {
    console.error("--------------RefreshAccessTokenError", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
