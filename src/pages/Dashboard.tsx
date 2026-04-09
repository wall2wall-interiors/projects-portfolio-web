import { useState } from 'react';
import { motion } from 'motion/react';
import { projects as initialProjects } from '../data/projects';
import { Plus, Edit2, Trash2, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">DASHBOARD</h1>
            <p className="text-muted text-lg">Manage your project portfolio and showcase.</p>
          </div>
          
          <Link 
            to="/dashboard/add"
            className="bg-white text-black px-8 py-4 font-bold flex items-center gap-2 hover:bg-accent transition-all w-fit"
          >
            <Plus size={20} />
            NEW PROJECT
          </Link>
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
                  key={project.id} 
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
                        to={`/project/${project.id}`} 
                        target="_blank"
                        className="p-2 hover:bg-white hover:text-black transition-colors"
                        title="View Live"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button 
                        className="p-2 hover:bg-white hover:text-black transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
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
          
          {filteredProjects.length === 0 && (
            <div className="py-24 text-center border-b border-white/5">
              <p className="text-muted">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
