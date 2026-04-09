import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    navigate('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold tracking-tighter mb-4">TEAM ACCESS</h1>
          <p className="text-muted">Enter your credentials to manage Wall2Wall projects.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
              placeholder="name@wall2wall.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black font-bold py-4 flex items-center justify-center gap-2 group hover:bg-accent transition-all"
          >
            SIGN IN
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors">
            Back to Showcase
          </button>
        </div>
      </motion.div>
    </main>
  );
}
