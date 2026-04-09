import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';

export default function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    year: new Date().getFullYear().toString(),
    client: '',
    location: '',
    description: '',
    youtubeUrl: '',
    featured: false
  });

  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    alert('Project saved successfully (UI Mock)');
    navigate('/dashboard');
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-muted hover:text-white transition-colors mb-12 uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">NEW PROJECT</h1>
          <p className="text-muted text-lg">Add a new masterpiece to the Wall2Wall showcase.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Info */}
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted border-b border-white/10 pb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted">Project Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                  placeholder="e.g. Minimalist Loft"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors appearance-none"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Hospitality">Hospitality</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted">Client</label>
                <input 
                  type="text" 
                  value={formData.client}
                  onChange={e => setFormData({...formData, client: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                  placeholder="Client Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted">Location</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted border-b border-white/10 pb-4">Project Content</h2>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted">Description</label>
              <textarea 
                rows={6}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Describe the project vision and execution..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted">YouTube URL (Optional)</label>
              <input 
                type="url" 
                value={formData.youtubeUrl}
                onChange={e => setFormData({...formData, youtubeUrl: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </section>

          {/* Images */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Project Gallery</h2>
              <button 
                type="button"
                onClick={addImageField}
                className="text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors"
              >
                <Plus size={14} /> Add Image URL
              </button>
            </div>
            
            <div className="space-y-4">
              {images.map((url, index) => (
                <div key={index} className="flex gap-4">
                  <input 
                    type="url" 
                    value={url}
                    onChange={e => updateImage(index, e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <button 
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-4 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              
              {images.length === 0 && (
                <div className="py-12 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-muted">
                  <Upload size={32} className="mb-4 opacity-20" />
                  <p className="text-sm">No images added yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Settings */}
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted border-b border-white/10 pb-4">Settings</h2>
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${formData.featured ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/40'}`}>
                {formData.featured && <div className="w-2 h-2 bg-black" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={formData.featured}
                onChange={e => setFormData({...formData, featured: e.target.checked})}
              />
              <span className="text-sm font-medium uppercase tracking-widest">Feature this project on home page</span>
            </label>
          </section>

          <div className="pt-12 border-t border-white/10 flex gap-4">
            <button 
              type="submit"
              className="flex-1 bg-white text-black font-bold py-6 hover:bg-accent transition-all uppercase tracking-widest"
            >
              Publish Project
            </button>
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-12 border border-white/10 font-bold py-6 hover:bg-white/5 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
