import { motion } from 'motion/react';
import { useProjects } from '../features/projects/hooks/use-projects';
import ProjectCard from '../features/projects/components/ProjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  }
};

export default function Home() {
  const { getFeaturedProjects, getAllProjects } = useProjects();
  const { projects: featuredProjects, isLoading: loadingFeatured } = getFeaturedProjects();
  const { projects: allProjects, isLoading: loadingAll } = getAllProjects();

  const otherProjects = allProjects?.filter(p => !p.featured) ?? [];

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-32">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-5xl"
        >
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-12">
            WE DESIGN<br />
            <span className="text-muted/40 italic">SPACES</span> THAT<br />
            TELL STORIES.
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl font-light leading-relaxed">
            Wall2Wall is a boutique interior design studio dedicated to creating 
            minimalist, high-end environments that balance raw industrial elements 
            with modern sophistication.
          </p>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 md:px-12 mb-48">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-muted">Featured Projects</h2>
          <div className="h-[1px] flex-1 bg-white/10 mx-8 mb-2" />
          <p className="text-xs font-medium text-muted">01 — 02</p>
        </div>
        
        {loadingFeatured ? (
          <div className="h-64 flex items-center justify-center text-muted">Loading featured works...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredProjects?.map((project) => (
              <div key={project._id}>
                <ProjectCard project={project as any} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Project Grid */}
      <section className="px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-muted">All Works</h2>
          <div className="h-[1px] flex-1 bg-white/10 mx-8 mb-2" />
          <p className="text-xs font-medium text-muted">03 — 06</p>
        </div>

        {loadingAll ? (
          <div className="h-64 flex items-center justify-center text-muted">Loading gallery...</div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherProjects.map((project) => (
              <motion.div key={project._id} variants={itemVariants}>
                <ProjectCard project={project as any} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
