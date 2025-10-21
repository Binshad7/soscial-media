// ===============================
//  USER MODULE
// ===============================
export const USER_MESSAGE = {
    LOGIN: {
        SUCCESS: "Login successful.",
        INVALID_CREDENTIALS: "Invalid email or password.",
        UNAUTHORIZED: "You are not authorized to perform this action.",
        FORBIDDEN: "The client does not have permission to access the resource.",
    },

    REGISTER: {
        EMAIL_REQUIRED: "Email is required.",
        PASSWORD_REQUIRED: "Password is required.",
        CONFIRM_PASSWORD_REQUIRED: "Confirm password is required for registration.",
        CONFIRM_PASSWORD_NOT_MATCH: "Confirm password does not match with password.",
        USER_ALREADY_EXISTS: "A user with this email already exists.",
        REGISTRATION_SUCCESS: "User registered successfully.",
        USERNAME_REQUIRED: "User name is required for registration.",
    },

    PROFILE: {
        NOT_FOUND: "The requested user was not found.",
        UPDATE_SUCCESS: "User profile updated successfully.",
    },
};

// ===============================
//  COMMON / SYSTEM MESSAGES
// ===============================
export const COMMON_MESSAGE = {
    SUCCESS: "Operation completed successfully.",
    BAD_REQUEST: "Bad request. Please check your input.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    FORBIDDEN: "Access forbidden.",
    NOT_FOUND: "The requested resource was not found.",
    SERVER_ERROR: "Something went wrong. Please try again later.",
};

// ===============================
// FOLLOW MODULE
// ===============================
export const FOLLOW_MESSAGE = {
    REQUEST: {
        SEND_SUCCESS: "Follow request sent successfully.",
        SEND_FAILED: "Failed to send follow request.",
        ALREADY_SENT: "Follow request already sent.",
        SELF_FOLLOW: "You cannot follow yourself.",
        RECEIVER_NOT_FOUND: "Receiver user not found.",
    },
    ACCEPT: {
        SUCCESS: "Follow request accepted successfully.",
        FAILED: "Failed to accept follow request.",
    },
    REMOVE: {
        SUCCESS: "Unfollowed successfully.",
        FAILED: "Failed to unfollow user.",
    },
};

// ===============================
// HTTP STATUS MESSAGES (OPTIONAL)
// ===============================
export const HTTP_MESSAGE = {
    OK: "Request completed successfully.",
    CREATED: "Resource created successfully.",
    BAD_REQUEST: "Bad request. Please verify your input.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "Forbidden access.",
    NOT_FOUND: "Requested resource not found.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
};
