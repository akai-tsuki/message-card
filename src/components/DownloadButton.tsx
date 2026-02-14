import type { CardPreviewHandle } from './CardPreview';
import './DownloadButton.css';

interface DownloadButtonProps {
  canvasRef: React.RefObject<CardPreviewHandle | null>;
}

export default function DownloadButton({ canvasRef }: DownloadButtonProps) {
  const handleDownload = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    // Generate filename with current date
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const filename = `message-card_${year}-${month}-${day}.png`;

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <button onClick={handleDownload} className="download-button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download PNG
    </button>
  );
}
