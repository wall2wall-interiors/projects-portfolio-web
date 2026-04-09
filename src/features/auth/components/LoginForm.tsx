import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAuthService } from '../api/auth-service';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginWithPassword, signUpWithPassword } = useAuthService();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (flow === "signIn") {
        await loginWithPassword(email, password);
      } else {
        await signUpWithPassword(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold tracking-tighter mb-4">
          {flow === "signIn" ? "TEAM ACCESS" : "CREATE ACCOUNT"}
        </h1>
        <p className="text-muted">
          {flow === "signIn" 
            ? "Enter your credentials to manage Wall2Wall projects." 
            : "Register to start managing your project portfolio."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-muted">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
            placeholder="name@wall2wallinteriors.co.in"
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
          disabled={isLoading}
          className="w-full bg-white text-black font-bold py-4 flex items-center justify-center gap-2 group hover:bg-accent transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              {flow === "signIn" ? "SIGN IN" : "SIGN UP"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button 
          onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors underline underline-offset-4"
        >
          {flow === "signIn" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
        
        <button onClick={() => navigate('/')} className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors">
          Back to Showcase
        </button>
      </div>
    </div>
  );
}
