import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useProjectService = () => {
  return {
    queries: {
      getFeatured: () => useQuery(api.projects.getFeatured),
      getAll: (args: { category?: string } = {}) => useQuery(api.projects.getAll, args),
      getBySlug: (args: { slug: string }) => useQuery(api.projects.getBySlug, args),
      getById: (args: { id: any }) => useQuery(api.projects.getById, args.id ? args : "skip"),
    },
    mutations: {
      create: () => useMutation(api.projects.create),
      update: () => useMutation(api.projects.update),
      remove: () => useMutation(api.projects.remove),
    },
  };
};
