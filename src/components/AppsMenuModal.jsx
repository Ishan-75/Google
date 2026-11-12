export default function AppsMenuModal({ isOpen, onClose, onSelectApp }) {
  if (!isOpen) return null;

  const apps = [
    { name: "Search", icon: "🔍", color: "#4285F4", action: "home" },
    { name: "Photos (31)", icon: "🖼️", color: "#EA4335", action: "photos" },
    { name: "Memories", icon: "💖", color: "#FBBC05", action: "memories" },
    { name: "HeartMaps", icon: "📍", color: "#34A853", action: "maps" },
    { name: "LoveMail", icon: "💌", color: "#EA4335", action: "mail" },
    { name: "Moments", icon: "🎬", color: "#4285F4", action: "videos" },
    { name: "Keep Notes", icon: "📝", color: "#FBBC05", action: "notes" },
    { name: "Calendar", icon: "📅", color: "#4285F4", action: "calendar" },
    { name: "Our Vault", icon: "🔒", color: "#34A853", action: "vault" },
  ];

  return (
    <>
      <div className="google-menu-backdrop" onClick={onClose} />
      <div
        className="google-apps-dropdown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="apps-grid-container">
          {apps.map((app) => (
            <button
              key={app.name}
              type="button"
              className="google-app-tile"
              onClick={() => {
                onSelectApp(app.action);
                onClose();
              }}
            >
              <div
                className="app-tile-icon"
                style={{ backgroundColor: `${app.color}15` }}
              >
                <span>{app.icon}</span>
              </div>
              <span className="app-tile-label">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
