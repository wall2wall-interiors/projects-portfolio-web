import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from '../data/projects';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  usePageTitle(project?.title || 'Project Detail');
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
        <Link to="/">Back Home</Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="bg-background min-h-screen">
      {/* Project Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
          src={project.thumbnail} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/60 mb-4">
              {project.category} — {project.year}
            </p>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8 max-w-4xl">
              {project.title}
            </h1>
            
            {project.youtubeUrl && (
              <a 
                href={project.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Play size={20} fill="currentColor" />
                </div>
                <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Watch Project Film</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Info */}
      <section className="px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Client</p>
              <p className="text-lg font-medium">{project.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Location</p>
              <p className="text-lg font-medium">{project.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Year</p>
              <p className="text-lg font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Category</p>
              <p className="text-lg font-medium">{project.category}</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
            {project.description}
          </p>
          
          {project.youtubeUrl && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <a 
                href={project.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Play size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted group-hover:text-white transition-colors">Watch Film</p>
                  <p className="text-lg font-medium">Project Walkthrough</p>
                </div>
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-12 pb-24 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {project.images.slice(1).map((image, index) => (
            <motion.div 
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`overflow-hidden bg-zinc-900 ${index % 3 === 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/5]'}`}
            >
              <img 
                src={image} 
                alt={`${project.title} detail ${index + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Project Link */}
      <section className="px-6 md:px-12 py-48 border-t border-white/10">
        <Link 
          to={`/project/${nextProject.id}`}
          className="group block text-center"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-muted mb-8 group-hover:text-white transition-colors">Next Project</p>
          <h2 className="text-5xl md:text-9xl font-display font-bold tracking-tighter group-hover:italic transition-all">
            {nextProject.title}
          </h2>
          <div className="mt-12 flex justify-center">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowRight size={32} />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
