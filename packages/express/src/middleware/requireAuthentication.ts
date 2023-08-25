import * as express from "express";
import { AuthRequest } from "../types";

export function requireAuthentication() {
  return (
    req: AuthRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!req.user) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
  };
}
