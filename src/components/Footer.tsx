import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="px-6 py-24 md:px-12 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">
            LET'S BUILD SOMETHING<br />EXTRAORDINARY.
          </h2>
          <a 
            href="mailto:hello@wall2wall.com" 
            className="text-xl md:text-2xl font-medium border-b border-white hover:pb-2 transition-all"
          >
            hello@wall2wall.com
          </a>
        </div>
        
        <div className="flex flex-col justify-end md:items-end gap-4 text-muted">
          <p>© 2024 WALL2WALL INTERIORS</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <Link to="/login" className="hover:text-white transition-colors">Team</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
