import { useEffect, useState } from "react";

export default function Lightbox({
  photo,
  allPhotos = [],
  onClose,
  onSelectPhoto,
}) {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, allPhotos]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const prevPhoto =
    currentIndex > 0
      ? allPhotos[currentIndex - 1]
      : allPhotos[allPhotos.length - 1];
  const nextPhoto =
    currentIndex < allPhotos.length - 1
      ? allPhotos[currentIndex + 1]
      : allPhotos[0];

  function handlePrev() {
    if (prevPhoto && onSelectPhoto) onSelectPhoto(prevPhoto);
  }

  function handleNext() {
    if (nextPhoto && onSelectPhoto) onSelectPhoto(nextPhoto);
  }

  function handleShare() {
    navigator.clipboard?.writeText(window.location.origin + photo.image);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const relatedPhotos = allPhotos
    .filter((p) => p.id !== photo.id && (p.category === photo.category || Math.random() > 0.5))
    .slice(0, 6);

  return (
    <div className="google-preview-modal-overlay" onClick={onClose}>
      <div
        className="google-image-preview-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar */}
        <div className="preview-top-bar">
          <div className="preview-source-info">
            <span className="source-globe-icon">🌐</span>
            <span className="preview-source-domain">
              {photo.source || "google.photos"}
            </span>
            <span className="preview-date-badge">· {photo.date}</span>
          </div>

          <div className="preview-top-actions">
            <button
              type="button"
              className="preview-close-btn"
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content body: Image on left, details on right */}
        <div className="preview-body">
          <div className="preview-image-section">
            <button
              type="button"
              className="nav-arrow-btn left"
              onClick={handlePrev}
              title="Previous photo (←)"
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div className="preview-image-container">
              <img
                src={photo.image}
                alt={photo.title}
                className="preview-main-img"
              />
            </div>

            <button
              type="button"
              className="nav-arrow-btn right"
              onClick={handleNext}
              title="Next photo (→)"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>

          <div className="preview-details-section">
            <div className="preview-header-meta">
              <span className="preview-category-tag">{photo.category}</span>
              <h2 className="preview-title">{photo.title}</h2>
              <p className="preview-desc">{photo.description}</p>
            </div>

            {/* Google Style Action Buttons */}
            <div className="preview-action-row">
              <a
                href={photo.image}
                target="_blank"
                rel="noreferrer"
                className="google-visit-btn"
              >
                <span>Visit image</span>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                  />
                </svg>
              </a>

              <button
                type="button"
                className="google-secondary-btn"
                onClick={handleShare}
              >
                <span>{copied ? "✓ Copied!" : "Share"}</span>
              </button>

              <button
                type="button"
                className={`google-secondary-btn save-btn ${
                  isSaved ? "saved" : ""
                }`}
                onClick={() => setIsSaved(!isSaved)}
              >
                <span>{isSaved ? "♥ Saved" : "♡ Save"}</span>
              </button>
            </div>

            {/* Metadata specs */}
            <div className="preview-specs-box">
              <div className="spec-row">
                <span className="spec-label">Image resolution</span>
                <span className="spec-val">{photo.resolution || "HD"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Capture Date</span>
                <span className="spec-val">{photo.date || "2026"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Tags</span>
                <span className="spec-val">
                  {(photo.keywords || []).slice(0, 4).join(", ")}
                </span>
              </div>
            </div>

            {/* Related Images strip */}
            <div className="preview-related-strip">
              <h4 className="related-title">Related memories</h4>
              <div className="related-thumbs-grid">
                {relatedPhotos.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="related-thumb-btn"
                    onClick={() => onSelectPhoto(item)}
                    title={item.title}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
