import express  from "express";
import { Application } from "express";
import { AuthUser, AuthRequest } from "../types";

type AuthOptions = {
    validateToken: (token: string) => Promise<boolean>;
    resolveAuthUser: (token: string) => Promise<AuthUser>;
}

type AppOptions = {
  port: number;
  controllers: any;
  base?: string;
  middlewares?: any;
  useViews?: boolean;
  viewEngine?: string;
  usePublic?: boolean;
  auth?: AuthOptions;
};

export class App {
  public app: Application;
  public port: number;
  private options: AppOptions;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.options = options;

    this.middlewares(options.middlewares);
    this.routes(options.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middlewares: {
    forEach: (arg0: (middleware: any) => void) => void;
  }) {

    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });

    // Adds the user to the request if a token is present.
    if (this.options?.auth) {
        this.app.use(async (req: AuthRequest, res, next) => {
            const authToken = req.headers["authorization"];

            if (authToken !== undefined) {

                const isTokenValid = await this.options?.auth?.validateToken(authToken);

                if (isTokenValid) {
                    const user = await this.options?.auth?.resolveAuthUser(authToken);
                    req.user = user;
                }
            }

            next();
        })
    }
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use(`${this.options?.base ?? "/"}`, controller.router);
    });
  }

  private assets() {
    if (this.options?.usePublic) {
      this.app.use(express.static("public"));
    }
    if (this.options?.useViews) {
      this.app.use(express.static("views"));
    }
  }

  private template() {
    if (this.options?.useViews) {
      this.app.set("view engine", this.options?.viewEngine ?? "pug");
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on localhost:${this.port}`);
    });
  }
}