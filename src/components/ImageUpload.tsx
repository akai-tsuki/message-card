import { useRef, useState } from 'react';
import { validateImageFile, fileToBase64 } from '../utils/imageUtils';
import './ImageUpload.css';

interface ImageUploadProps {
  onImageChange: (imageData: string | null) => void;
  currentImage: string | null;
}

export default function ImageUpload({ onImageChange, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setPreview(null);
      onImageChange(null);
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setPreview(base64);
      setFileName(file.name);
      setError(null);
      onImageChange(base64);
    } catch {
      setError('Failed to load image');
      setPreview(null);
      onImageChange(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName('');
    setError(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <label className="image-upload-label">Bottom Left Image (Optional)</label>

      <div className="image-upload-area">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          className="image-upload-input"
        />

        {!preview ? (
          <button type="button" onClick={handleClick} className="image-upload-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Choose Image</span>
            <span className="image-upload-hint">PNG, JPG, WebP (Max 5MB)</span>
          </button>
        ) : (
          <div className="image-upload-preview">
            <img src={preview} alt="Preview" className="image-preview-img" />
            <div className="image-preview-info">
              <p className="image-preview-name">{fileName}</p>
              <button type="button" onClick={handleRemove} className="image-remove-button">
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="image-upload-error">{error}</p>}
    </div>
  );
}
