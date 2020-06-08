/**
 * These are prepended to keys stored in redis so that users cannot use a token
 * for something other than it's inteded purpose.
 */
export const confirmUserPrefix = "user-confirmation:";
export const forgotPasswordPrefix = "forgot-password:";
