import { useState, useRef } from 'react';
import type { CardData } from './types/CardData';
import type { CardPreviewHandle } from './components/CardPreview';
import { DEFAULT_CARD_DATA } from './constants/cardConfig';
import MessageCardForm from './components/MessageCardForm';
import CardPreview from './components/CardPreview';
import DownloadButton from './components/DownloadButton';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function todayMmDd(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}`;
}

function App() {
  const [cardData, setCardData] = useState<CardData>({ ...DEFAULT_CARD_DATA, date: todayMmDd() });
  const canvasRef = useRef<CardPreviewHandle>(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Message Card Generator</h1>
        <p className="app-subtitle">Create beautiful message cards with custom text and images</p>
      </header>

      <main className="app-main">
        <div className="form-section">
          <MessageCardForm cardData={cardData} onChange={setCardData} />
        </div>

        <div className="preview-section">
          <ErrorBoundary>
            <CardPreview ref={canvasRef} cardData={cardData} />
          </ErrorBoundary>
          <DownloadButton canvasRef={canvasRef} />
        </div>
      </main>
    </div>
  );
}

export default App;
