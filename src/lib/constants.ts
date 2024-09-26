export enum ResultCode {
    InvalidCredentials  = "INVALID_CREDENTIALS",
    InvalidSubmission   = "INVALID_SUBMISSION",
    UserAlreadyExists   = "USER_ALREADY_EXISTS",
    UnknownError        = "UNKNOWN_ERROR",
    UserCreated         = "USER_CREATED",
    UserLoggedIn        = "USER_LOGGED_I",
    Unauthorized        = "UNAUTHORIZED",
    ChatNotFound        = "CHAT_NOT_FOUND",
	NotFound            = "NotFound",
}

export function getMessageFromCode( code: ResultCode ) {
    switch ( code ) {
        case ResultCode.InvalidCredentials:
            return "Invalid credentials"
        case ResultCode.InvalidSubmission:
            return "Invalid submission"
        case ResultCode.UserAlreadyExists:
            return "User already exists"
        case ResultCode.UnknownError:
            return "Unknown error"
        case ResultCode.UserCreated:
            return "User created"
        case ResultCode.UserLoggedIn:
            return "User logged in"
        case ResultCode.Unauthorized:
            return "Unauthorized"
        case ResultCode.ChatNotFound:
            return "Chat not found"
        case ResultCode.NotFound:
            return "Not found"
        default:
            return "Unknown error"
    }
}