import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-none">
            LET'S<br />
            TALK.
          </h1>
          <p className="text-xl text-muted max-w-md font-light leading-relaxed mb-12">
            Have a project in mind or want to collaborate? Use the form or 
            reach out directly via our contact details.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">Email</p>
                <p className="text-lg">hello@wall2wall.design</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">Phone</p>
                <p className="text-lg">+1 (305) 555-0123</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">Studio</p>
                <p className="text-lg text-pretty max-w-xs">
                  890 Design District Ave, Suite 402<br />
                  Miami, FL 33137
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12"
        >
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted">Project Type</label>
              <select className="w-full bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors appearance-none">
                <option className="bg-background">Residential</option>
                <option className="bg-background">Commercial</option>
                <option className="bg-background">Hospitality</option>
                <option className="bg-background">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted">Message</label>
              <textarea 
                className="w-full bg-transparent border-b border-white/20 pb-4 h-32 resize-none focus:outline-none focus:border-white transition-colors"
                placeholder="Tell us about your project..."
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-6 flex items-center justify-center gap-2 group hover:bg-accent transition-all"
            >
              SEND INQUIRY
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
