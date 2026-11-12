export default function ImageCard({ photo, onClick, isSelected }) {
  const isLandscape = photo.orientation === "landscape";
  const isSquare = photo.orientation === "square";

  return (
    <article
      className={`google-image-card ${photo.orientation || "portrait"} ${
        isSelected ? "selected" : ""
      }`}
    >
      <button
        type="button"
        className="image-card-thumb-btn"
        onClick={() => onClick(photo)}
        aria-label={`View ${photo.title}`}
      >
        <div
          className={`image-thumb-wrapper ${
            isLandscape ? "landscape" : isSquare ? "square" : "portrait"
          }`}
        >
          <img
            src={photo.image}
            alt={photo.title}
            loading="lazy"
            className="image-thumb"
          />
          <div className="image-hover-overlay">
            <span className="image-res-badge">
              {isLandscape ? "Wide · " : isSquare ? "1:1 · " : ""}
              {photo.resolution || "HD"}
            </span>
          </div>
        </div>

        <div className="image-card-meta">
          <div className="image-source-row">
            <span className="source-globe">🌐</span>
            <span className="source-name">
              {photo.location ? `${photo.location} · ` : ""}
              {photo.source || "google.photos"}
            </span>
          </div>
          <h3 className="image-card-title">{photo.title}</h3>
          <p className="image-card-snippet">{photo.description}</p>
        </div>
      </button>
    </article>
  );
}
