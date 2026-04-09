import { motion } from 'motion/react';

export default function About() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-32">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.9] mb-12"
          >
            THE<br />
            <span className="text-muted/40 italic">STUDIO</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl md:text-4xl font-light leading-snug tracking-tight"
          >
            Wall2Wall is an award-winning design agency specializing in 
            high-end residential and commercial interiors. Based in Miami, 
            we work globally with clients who value minimalism and 
            intentional living.
          </motion.p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32 items-center">
          <motion.div 
             initial={{ x: -40, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
              alt="Studio space" 
              className="w-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          <div className="space-y-8">
            <h2 className="text-xs font-medium tracking-[0.3em] uppercase text-muted">Our Philosophy</h2>
            <p className="text-lg text-muted leading-relaxed">
              We believe that space should be felt, not just seen. Our approach 
              is reductive but not cold. We subtract the unnecessary to reveal 
              the essential, using materiality and light as our primary tools.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Every project is a collaboration between the architect's vision, 
              the client's needs, and the soul of the site.
            </p>
          </div>
        </section>

        <section className="border-t border-white/10 pt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl font-display font-bold mb-2">12+</p>
            <p className="text-xs uppercase tracking-widest text-muted">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold mb-2">150</p>
            <p className="text-xs uppercase tracking-widest text-muted">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold mb-2">24</p>
            <p className="text-xs uppercase tracking-widest text-muted">International Awards</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold mb-2">08</p>
            <p className="text-xs uppercase tracking-widest text-muted">Designers</p>
          </div>
        </section>
      </div>
    </main>
  );
}
