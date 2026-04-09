import React, { useState, useCallback } from 'react';
import { useUploadThing } from '../../../lib/uploadthing';
import { compressToWebP } from '../../../lib/image-utils';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({ onUploadComplete, maxFiles = 10 }: ImageUploadProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([]);

  const { startUpload, isUploading } = useUploadThing("projectImageUploader", {
    onClientUploadComplete: (res) => {
      const urls = res.map(f => f.url);
      onUploadComplete(urls);
      setPreviews([]);
    },
    onUploadError: (error) => {
      console.error(error);
      alert("Upload failed. Please try again.");
    },
  });

  const onSelectFiles = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);
    try {
      const compressedFiles = await Promise.all(
        files.slice(0, maxFiles).map(f => compressToWebP(f as File))
      );

      // Create previews for these files
      const newPreviews = compressedFiles.map(f => ({
        file: f,
        preview: URL.createObjectURL(f)
      }));
      setPreviews(newPreviews);

      // Start the upload
      await startUpload(compressedFiles);
    } catch (err) {
      console.error(err);
      alert("Error processing images.");
    } finally {
      setIsCompressing(false);
    }
  }, [maxFiles, startUpload]);

  return (
    <div className="space-y-4">
      <div 
        className={`relative border-2 border-dashed border-white/10 p-12 flex flex-col items-center justify-center transition-all ${isUploading || isCompressing ? 'opacity-50 pointer-events-none' : 'hover:border-white/20 cursor-pointer'}`}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={onSelectFiles}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        
        {isUploading || isCompressing ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-white" size={32} />
            <p className="text-xs uppercase tracking-widest text-muted">
              {isCompressing ? 'Compressing to WebP...' : 'Uploading to Wall2Wall...'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <Upload size={20} className="text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click or drag to upload</p>
              <p className="text-[10px] uppercase tracking-widest text-muted mt-1">Images will be compressed to WebP automatically</p>
            </div>
          </div>
        )}
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((p, idx) => (
            <div key={idx} className="aspect-square relative group">
              <img 
                src={p.preview} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Loader2 className="animate-spin text-white" size={20} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
