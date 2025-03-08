/**
 * Public routes - accessible for both authenticated and non-authenticated users
 * These routes don't require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  //   "/posts/",
  //   "/profile/",
  "/about",
  "/privacy",
  "/terms",
];

/**
 * Auth routes - redirect to dashboard if user is already logged in
 * These routes are accessible only for non-authenticated users
 * @type {string[]}
 */

export const authRoutes = ["/", "/login", "/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after successful login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/feed";
