import { GoogleLensIcon } from "./Icons";
import { photos } from "../data/photos";

export default function GoogleLensModal({ isOpen, onClose, onSelectPhoto }) {
  if (!isOpen) return null;

  return (
    <div className="google-modal-overlay" onClick={onClose}>
      <div
        className="google-lens-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="google-dialog-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="lens-dialog-header">
          <div className="lens-icon-bubble">
            <GoogleLensIcon size={32} />
          </div>
          <h3>Search any image with Google Lens</h3>
          <p>Search visually across all 31 verified memories of her</p>
        </div>

        <div className="lens-dropzone">
          <div className="lens-dropzone-inner">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a73e8"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p>
              Drag an image here or <span>upload a file</span>
            </p>
            <small>Or click any sample photo below to find visual matches</small>
          </div>
        </div>

        <div className="lens-samples-section">
          <h4>Try searching with sample moments:</h4>
          <div className="lens-samples-grid">
            {photos.slice(0, 8).map((photo) => (
              <button
                key={photo.id}
                type="button"
                className="lens-sample-item"
                onClick={() => {
                  onSelectPhoto(photo);
                  onClose();
                }}
              >
                <img src={photo.image} alt={photo.title} loading="lazy" />
                <span>{photo.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
