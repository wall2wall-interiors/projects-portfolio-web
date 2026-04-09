import { createUploadthing, type FileRouter } from "uploadthing/express";
import { UploadThingError } from "uploadthing/server";
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

const f = createUploadthing();

export const uploadRouter = {
  projectImageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req, res }) => {
      return { uploadedAt: Date.now() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.ufsUrl);
      return { url: file.ufsUrl, key: file.key };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const UploadButton = generateUploadButton<UploadRouter>();
export const UploadDropzone = generateUploadDropzone<UploadRouter>();
