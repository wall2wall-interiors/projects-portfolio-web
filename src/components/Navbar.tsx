import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 mix-blend-difference"
    >
      <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white">
        WALL2WALL
      </Link>
      
      <div className="flex gap-8 text-sm font-medium tracking-widest text-white/70 uppercase">
        <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
    </motion.nav>
  );
}
