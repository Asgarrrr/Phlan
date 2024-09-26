import { CoreMessage } from "ai"
import { ResultCode } from "./constants"

export interface Chat extends Record<string, any> {
    ID          : string
    title       : string
    createdAt   : Date
    userID      : string
    path        : string
    messages    : Message[]
    sharePath  ?: string
}

export interface User extends Record<string, any> {
    ID          : string
    email       : string
    password    : string
    salt        : string
}

export type Message = CoreMessage & {
    ID: string
}

export interface Session {
    user: {
        id      : string
        email   : string
        image  ?: string
        name   ?: string
    }
}

export interface Result {
    type: string
    resultCode: ResultCode
}