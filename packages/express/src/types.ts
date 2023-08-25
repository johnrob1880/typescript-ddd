import { Request } from "express";
import { UniqueEntityId } from "typescript-ddd";

export interface AuthUser {
    id: UniqueEntityId;
    token?: string | null;
}

export interface AuthRequest extends Request {
    user?: AuthUser;
}