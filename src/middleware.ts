import NextAuth from "next-auth";
import authConfig from "./sdk/auth/auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware() {});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
