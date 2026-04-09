import express from "express";
import cors from "cors";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./src/lib/uploadthing";

const app = express();
app.use(cors());

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  })
);

const PORT = process.env.UPLOADTHING_PORT || 4000;
app.listen(PORT, () => {
  console.log(`UploadThing server listening on port ${PORT}`);
});
