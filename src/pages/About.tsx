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
            <span className="text-muted/40 italic">PARTNER</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl md:text-4xl font-light leading-snug tracking-tight"
          >
            Wall 2 Wall is an industry leader in interior design and development. 
            From Thrissur to Dubai, we create benchmarks for stunning interiors 
            and elegant decor, backed by over 7 years of mastery.
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
              We believe in a perfect blend of art and quality. Our approach is 
              comprehensive—from meticulous design and material selection to 
              expert procurement and final execution. We don't just decorate 
              spaces; we craft environments that reflect our clients' unique 
              aspirations.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              With 100+ projects completed across Kerala and Dubai, our team 
              remains committed to providing unmatched value for both luxury 
              and budget-friendly interiors.
            </p>
          </div>
        </section>

        <section className="border-t border-white/10 pt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl font-display font-bold mb-2">07+</p>
            <p className="text-xs uppercase tracking-widest text-muted">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold mb-2">100+</p>
            <p className="text-xs uppercase tracking-widest text-muted">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold mb-2">100%</p>
            <p className="text-xs uppercase tracking-widest text-muted">Customer Satisfaction</p>
          </div>
          <div>
            <p className="text-4xl font-display font-bold mb-2">500+</p>
            <p className="text-xs uppercase tracking-widest text-muted">Products Sold</p>
          </div>
        </section>
      </div>
    </main>
  );
}
