export { auth } from "./auth";

export const config = {
  matcher: ["/((?!^/auth).*)", "/((?!^/$).*)"],
};
