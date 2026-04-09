import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { registerRoutes } from "@mzedstudio/uploadthingtrack";
import { components } from "./_generated/api";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "./uploadRouter";
import { httpAction } from "./_generated/server";

const http = httpRouter();

auth.addHttpRoutes(http);
registerRoutes(http, components.uploadthingFileTracker);

http.route({
  path: "/api/uploadthing",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    return await createRouteHandler({
      router: uploadRouter,
      config: {
        token: process.env.UPLOADTHING_TOKEN,
      },
    })(request);
  }),
});

http.route({
  path: "/api/uploadthing",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    return await createRouteHandler({
      router: uploadRouter,
      config: {
        token: process.env.UPLOADTHING_TOKEN,
      },
    })(request);
  }),
});

export default http;
