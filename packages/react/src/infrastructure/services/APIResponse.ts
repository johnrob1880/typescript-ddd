import { Either, Result } from "@typescript-ddd/core";
import { APIErrorMessage } from "./APIErrorMessage";

export type APIResponse<T> = Either<APIErrorMessage, Result<T>>;