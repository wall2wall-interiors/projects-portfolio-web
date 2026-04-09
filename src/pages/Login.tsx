import { motion } from 'motion/react';
import LoginForm from '../features/auth/components/LoginForm';

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="w-full max-w-md"
      >
        <LoginForm />
      </motion.div>
    </main>
  );
}
