import { useProjectService } from "../api/project-service";

export const useProjects = () => {
  const { queries, mutations } = useProjectService();

  const getFeaturedProjects = () => {
    const data = queries.getFeatured();
    return {
      projects: data,
      isLoading: data === undefined,
    };
  };

  const getAllProjects = (category?: string) => {
    const data = queries.getAll({ category });
    return {
      projects: data,
      isLoading: data === undefined,
    };
  };

  const getProjectById = (id: any) => {
    const data = queries.getById({ id });
    return {
      project: data,
      isLoading: data === undefined,
    };
  };

  const updateProject = mutations.update();
  const deleteProject = mutations.remove();
  const createProject = mutations.create();

  return {
    getFeaturedProjects,
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
  };
};
