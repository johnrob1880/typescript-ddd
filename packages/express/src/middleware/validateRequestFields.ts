import * as express from "express";
import { Guard } from "@typescript-ddd/core";

type ValidateRequestOptions = {
  required?: string[];
};

export function validateRequestFields(options: ValidateRequestOptions) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { body } = req;
    const { required = [] } = options;
    const errors: Record<string, string> = {};
    let isValid = true;

    required.forEach((key) => {
      const value = `${body[key]}`;
      const guardedResult = Guard.againstNullOrUndefined(value, key);
      if (!guardedResult.succeeded) {
        isValid = false;
        errors[key] = guardedResult.message ?? "This field is required";
      }
    });

    if (!isValid) {
      res.send({ succeeded: false, message: "Validation failed", errors });
    } else {
      next();
    }
  };
}
