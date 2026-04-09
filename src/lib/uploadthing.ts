import { generateUploadButton, generateUploadDropzone, generateReactHelpers } from "@uploadthing/react";
import type { UploadRouter } from "../../convex/uploadRouter";

// Helper to derive the Convex Site URL from the API URL
const getConvexSiteUrl = () => {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) return "";
  try {
    const url = new URL(convexUrl);
    // Replace .convex.cloud with .convex.site
    return `https://${url.hostname.replace('.convex.cloud', '.convex.site')}`;
  } catch (e) {
    return "";
  }
};

export const UploadButton = generateUploadButton<UploadRouter>({
  url: `${getConvexSiteUrl()}/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone<UploadRouter>({
  url: `${getConvexSiteUrl()}/api/uploadthing`,
});

export const { useUploadThing, uploadFiles } = generateReactHelpers<UploadRouter>({
  url: `${getConvexSiteUrl()}/api/uploadthing`,
});
