import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { registerRoutes } from "@mzedstudio/uploadthingtrack";
import { components } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);
registerRoutes(http, components.uploadthingFileTracker);

export default http;
