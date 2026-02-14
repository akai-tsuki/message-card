import type { CardData } from '../types/CardData';
import ImageUpload from './ImageUpload';
import './MessageCardForm.css';

const FONT_OPTIONS = {
  japanese: [
    { value: 'Noto Sans JP', label: 'Noto Sans JP' },
    { value: 'Noto Serif JP', label: 'Noto Serif JP' },
    { value: 'Klee One', label: 'Klee One' },
    { value: 'Zen Kaku Gothic New', label: 'Zen Kaku Gothic New' },
    { value: 'Shippori Mincho', label: 'Shippori Mincho' },
  ],
  latin: [
    { value: 'Arial', label: 'Arial' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Courier New', label: 'Courier New' },
  ],
};

function FontSelect({ id, value, onChange }: { id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <select id={id} value={value} onChange={onChange} className="form-input font-select">
      <optgroup label="日本語 (Google Fonts)">
        {FONT_OPTIONS.japanese.map(({ value: v, label }) => (
          <option key={v} value={v} style={{ fontFamily: v }}>{label}</option>
        ))}
      </optgroup>
      <optgroup label="欧文 (System)">
        {FONT_OPTIONS.latin.map(({ value: v, label }) => (
          <option key={v} value={v} style={{ fontFamily: v }}>{label}</option>
        ))}
      </optgroup>
    </select>
  );
}

interface MessageCardFormProps {
  cardData: CardData;
  onChange: (data: CardData) => void;
}

export default function MessageCardForm({ cardData, onChange }: MessageCardFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 30);
    onChange({ ...cardData, title: value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...cardData, to: e.target.value });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 200);
    onChange({ ...cardData, message: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d/]/g, '');

    // Auto-insert slash after 2 digits
    if (value.length === 2 && !value.includes('/')) {
      value = value + '/';
    }

    // Limit to mm/dd format (5 characters)
    if (value.length <= 5) {
      onChange({ ...cardData, date: value });
    }
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...cardData, from: e.target.value });
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...cardData, backgroundColor: e.target.value });
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...cardData, fontFamily: e.target.value });
  };

  const handleTitleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...cardData, titleFontFamily: e.target.value });
  };

  const handleFontSizeChange = (key: keyof typeof cardData.fontSizes, value: number) => {
    onChange({ ...cardData, fontSizes: { ...cardData.fontSizes, [key]: value } });
  };

  const handleImageChange = (imageData: string | null) => {
    onChange({ ...cardData, image: imageData });
  };

  return (
    <form className="message-card-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
          <span className="char-count">{cardData.title.length}/30</span>
        </label>
        <input
          id="title"
          type="text"
          value={cardData.title}
          onChange={handleTitleChange}
          className="form-input"
          placeholder="Thanks Card"
          maxLength={30}
        />
      </div>

      <div className="form-group">
        <label htmlFor="to" className="form-label">
          To (Recipient)
        </label>
        <input
          id="to"
          type="text"
          value={cardData.to}
          onChange={handleToChange}
          className="form-input"
          placeholder="John Doe"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message
          <span className="char-count">{cardData.message.length}/200</span>
        </label>
        <textarea
          id="message"
          value={cardData.message}
          onChange={handleMessageChange}
          className="form-textarea"
          placeholder="Write your message here... (max 5 lines)"
          rows={5}
          maxLength={200}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date (mm/dd)
          </label>
          <input
            id="date"
            type="text"
            value={cardData.date}
            onChange={handleDateChange}
            className="form-input"
            placeholder="12/25"
            pattern="[0-9]{2}/[0-9]{2}"
          />
        </div>

        <div className="form-group">
          <label htmlFor="from" className="form-label">
            From (Sender)
          </label>
          <input
            id="from"
            type="text"
            value={cardData.from}
            onChange={handleFromChange}
            className="form-input"
            placeholder="Jane Smith"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="titleFontFamily" className="form-label">
            Title Font
          </label>
          <FontSelect id="titleFontFamily" value={cardData.titleFontFamily} onChange={handleTitleFontFamilyChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fontFamily" className="form-label">
            Other Font
          </label>
          <FontSelect id="fontFamily" value={cardData.fontFamily} onChange={handleFontFamilyChange} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="backgroundColor" className="form-label">
          Background Color
        </label>
        <div className="color-picker-row">
          <input
            id="backgroundColor"
            type="color"
            value={cardData.backgroundColor}
            onChange={handleBackgroundColorChange}
            className="color-picker-input"
          />
          <span className="color-picker-value">{cardData.backgroundColor}</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Font Sizes (px)</label>
        <div className="font-size-grid">
          {(
            [
              { key: 'title', label: 'Title' },
              { key: 'to', label: 'To' },
              { key: 'message', label: 'Message' },
              { key: 'date', label: 'Date' },
              { key: 'from', label: 'From' },
            ] as const
          ).map(({ key, label }) => (
            <div key={key} className="font-size-item">
              <label htmlFor={`fs-${key}`} className="font-size-label">{label}</label>
              <input
                id={`fs-${key}`}
                type="number"
                min={8}
                max={60}
                value={cardData.fontSizes[key]}
                onChange={(e) => handleFontSizeChange(key, Number(e.target.value))}
                className="font-size-input"
              />
            </div>
          ))}
        </div>
      </div>

      <ImageUpload onImageChange={handleImageChange} currentImage={cardData.image} />
    </form>
  );
}
