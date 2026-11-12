export default function ProfileMenuModal({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="google-menu-backdrop" onClick={onClose} />
      <div
        className="google-profile-dropdown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-header">
          <div className="profile-avatar-large">S</div>
          <div className="profile-details">
            <span className="profile-name">Siluku & Ishan</span>
            <span className="profile-email">forever@love-search.org</span>
          </div>
        </div>

        <div className="profile-status-badge">
          <span>💖</span> Permanently signed in with love
        </div>

        <div className="profile-actions-list">
          <button
            type="button"
            className="profile-action-btn"
            onClick={onToggleDarkMode}
          >
            <span>{darkMode ? "☀️ Light theme" : "🌙 Dark theme"}</span>
            <span className="profile-toggle-state">
              {darkMode ? "On" : "Off"}
            </span>
          </button>

          <a
            href="#memories"
            className="profile-action-btn"
            onClick={onClose}
          >
            <span>📜 View Relationship History</span>
          </a>

          <a
            href="#settings"
            className="profile-action-btn"
            onClick={onClose}
          >
            <span>⚙️ Search Preferences</span>
          </a>
        </div>

        <div className="profile-footer-links">
          <span>Privacy Policy</span>
          <span>·</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </>
  );
}
