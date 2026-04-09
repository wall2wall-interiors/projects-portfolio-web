import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, X, Upload, Star, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onSuccess?: () => void;
  onCancel?: () => void;
  title: string;
  subtitle: string;
  submitLabel: string;
}

export default function ProjectForm({ 
  initialData, 
  onSubmit, 
  onSuccess,
  onCancel,
  title, 
  subtitle, 
  submitLabel 
}: ProjectFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Residential',
    year: initialData?.year || new Date().getFullYear(),
    client: initialData?.client || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    youtubeUrl: initialData?.youtubeUrl || '',
    featured: initialData?.featured || false,
    thumbnail: initialData?.thumbnail || ''
  });

  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        slug: initialData.slug,
        category: initialData.category,
        year: initialData.year,
        client: initialData.client,
        location: initialData.location,
        description: initialData.description,
        youtubeUrl: initialData.youtubeUrl || '',
        featured: !!initialData.featured,
        thumbnail: initialData.thumbnail
      });
      setImages(initialData.images || []);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        year: Number(formData.year),
        images,
        thumbnail: formData.thumbnail || images[0]
      });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (url: string) => {
    setImages(images.filter(img => img !== url));
    if (formData.thumbnail === url) {
      setFormData({ ...formData, thumbnail: images.find(img => img !== url) || '' });
    }
  };

  const handleUploadComplete = (urls: string[]) => {
    setImages(prev => [...prev, ...urls]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({
      ...formData,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4 uppercase">{title}</h1>
        <p className="text-muted text-lg">{subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted border-b border-white/10 pb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted">Project Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="e.g. Minimalist Loft"
              />
              <p className="text-[10px] text-muted italic ml-1">
                Slug: <span className="text-white/60">{formData.slug}</span>
              </p>
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
              <label className="text-[10px] uppercase tracking-widest text-muted">Year</label>
              <input 
                type="number" 
                required
                value={formData.year}
                onChange={e => setFormData({...formData, year: Number(e.target.value)})}
                className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="2024"
              />
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
              required
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
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted border-b border-white/10 pb-4">Project Gallery</h2>
          
          <ImageUpload onUploadComplete={handleUploadComplete} />

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {images.map((url, index) => (
                <div key={index} className="aspect-square relative group">
                  <img src={url} alt="" className="w-full h-full object-cover rounded-sm" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnail: url })}
                      className={`p-2 rounded-full transition-colors ${formData.thumbnail === url ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      title="Set as Thumbnail"
                    >
                      <Star size={18} fill={formData.thumbnail === url ? "currentColor" : "none"} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => removeImage(url)}
                      className="p-2 bg-white/10 text-white hover:bg-red-500 rounded-full transition-colors"
                      title="Remove Image"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {formData.thumbnail === url && (
                    <div className="absolute top-2 left-2 bg-white text-black text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter">COVER</div>
                  )}
                </div>
              ))}
            </div>
          )}
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
            disabled={isSubmitting}
            className="flex-1 bg-white text-black font-bold py-6 hover:bg-accent transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin" size={20} />}
            {submitLabel}
          </button>
          <button 
            type="button"
            onClick={onCancel || (() => navigate('/dashboard'))}
            className="px-12 border border-white/10 font-bold py-6 hover:bg-white/5 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
