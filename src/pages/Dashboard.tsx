import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProjects } from '../features/projects/hooks/use-projects';
import { useAuth } from '../features/auth/hooks/use-auth';
import { Plus, Edit2, Trash2, ExternalLink, Search, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectForm from '../features/projects/components/ProjectForm';

export default function Dashboard() {
  const { getAllProjects, deleteProject, createProject, updateProject, getProjectById } = useProjects();
  const { projects: initialProjects, isLoading } = getAllProjects();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const { project: activeProject } = getProjectById(selectedProjectId);

  const projects = initialProjects ?? [];

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const openAddDrawer = () => {
    setDrawerMode('add');
    setSelectedProjectId(null);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (id: string) => {
    setDrawerMode('edit');
    setSelectedProjectId(id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProjectId(null);
  };

  const handleSubmit = async (data: any) => {
    if (drawerMode === 'add') {
      await createProject(data);
    } else if (selectedProjectId) {
      await updateProject({ id: selectedProjectId as any, ...data });
    }
    closeDrawer();
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">DASHBOARD</h1>
            <p className="text-muted text-lg">Manage your project portfolio and showcase.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleLogout}
              className="border border-white/20 text-white px-8 py-4 font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all"
            >
              <LogOut size={20} />
              LOGOUT
            </button>
            <button 
              onClick={openAddDrawer}
              className="bg-white text-black px-8 py-4 font-bold flex items-center gap-2 hover:bg-accent transition-all w-fit"
            >
              <Plus size={20} />
              NEW PROJECT
            </button>
          </div>
        </header>

        {/* Stats / Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-8">
            <p className="text-xs uppercase tracking-widest text-muted mb-2">Total Projects</p>
            <p className="text-4xl font-display font-bold">{projects.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8">
            <p className="text-xs uppercase tracking-widest text-muted mb-2">Featured</p>
            <p className="text-4xl font-display font-bold">{projects.filter(p => p.featured).length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8">
            <p className="text-xs uppercase tracking-widest text-muted mb-2">Categories</p>
            <p className="text-4xl font-display font-bold">{new Set(projects.map(p => p.category)).size}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input 
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-24 text-center">
              <p className="text-muted">Fetching project data...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-medium">Project</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-medium">Category</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-medium">Year</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-medium">Status</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <motion.tr 
                    layout
                    key={project._id} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={project.thumbnail} 
                          alt="" 
                          className="w-12 h-12 object-cover bg-zinc-900"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold">{project.title}</p>
                          <p className="text-xs text-muted">{project.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-sm">{project.category}</td>
                    <td className="py-6 px-4 text-sm">{project.year}</td>
                    <td className="py-6 px-4">
                      {project.featured ? (
                        <span className="text-[10px] bg-white text-black px-2 py-1 font-bold uppercase tracking-tighter">Featured</span>
                      ) : (
                        <span className="text-[10px] border border-white/20 text-muted px-2 py-1 font-bold uppercase tracking-tighter">Standard</span>
                      )}
                    </td>
                    <td className="py-6 px-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          to={`/project/${project.slug}`} 
                          target="_blank"
                          className="p-2 hover:bg-white hover:text-black transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <button 
                          onClick={() => openEditDrawer(project._id)}
                          className="p-2 hover:bg-white hover:text-black transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this project?')) {
                              deleteProject({ id: project._id });
                            }
                          }}
                          className="p-2 hover:bg-red-500 hover:text-white transition-colors text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!isLoading && filteredProjects.length === 0 && (
            <div className="py-24 text-center border-b border-white/5">
              <p className="text-muted">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-background border-l border-white/10 z-[60] overflow-y-auto"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-end mb-8">
                  <button 
                    onClick={closeDrawer}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
                <ProjectForm 
                  title={drawerMode === 'add' ? "New Project" : "Edit Project"}
                  subtitle={drawerMode === 'add' ? "Fill in the details to add a new project." : `Updating details for ${activeProject?.title || 'project'}`}
                  submitLabel={drawerMode === 'add' ? "Publish Project" : "Save Changes"}
                  initialData={drawerMode === 'edit' ? activeProject : undefined}
                  onSubmit={handleSubmit}
                  onCancel={closeDrawer}
                  onSuccess={closeDrawer}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
