import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export default function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <Link to={`/project/${project.id}`} className="group block relative overflow-hidden">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className={`relative aspect-[4/5] ${large ? 'md:aspect-[16/9]' : ''} overflow-hidden bg-zinc-900`}
      >
        <img 
          src={project.thumbnail} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <p className="text-xs font-medium tracking-widest uppercase text-white/60 mb-2">
            {project.category} — {project.year}
          </p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
            {project.title}
          </h3>
        </div>
      </motion.div>
      
      <div className="mt-4 flex justify-between items-start md:hidden">
        <div>
          <h3 className="font-display font-bold text-lg">{project.title}</h3>
          <p className="text-sm text-muted">{project.category}</p>
        </div>
      </div>
    </Link>
  );
}
