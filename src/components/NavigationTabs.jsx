import { useState } from "react";

export default function NavigationTabs({
  activeTab,
  onTabChange,
  onFilterTime,
  activeTimeFilter = "Any time",
}) {
  const [showTools, setShowTools] = useState(false);

  const tabs = [
    {
      id: "All",
      label: "All",
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      ),
    },
    {
      id: "Images",
      label: "Images",
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"
          />
        </svg>
      ),
    },
    {
      id: "Videos",
      label: "Videos",
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
          />
        </svg>
      ),
    },
    {
      id: "News",
      label: "News",
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
          />
        </svg>
      ),
    },
    {
      id: "Maps",
      label: "Maps",
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="google-nav-tabs-wrapper">
      <div className="google-nav-tabs-container">
        <nav className="google-nav-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`nav-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="tabs-tools-container">
          <button
            type="button"
            className={`tools-btn ${showTools ? "active" : ""}`}
            onClick={() => setShowTools(!showTools)}
          >
            Tools
          </button>
        </div>
      </div>

      {showTools && (
        <div className="google-tools-bar">
          <div className="tools-bar-inner">
            <div className="tool-dropdown-pill">
              <span className="tool-label">Time:</span>
              <select
                value={activeTimeFilter}
                onChange={(e) => onFilterTime(e.target.value)}
                className="tool-select"
              >
                <option value="Any time">Any time</option>
                <option value="Past year">Past year (2026)</option>
                <option value="Classics">Classic memories (2025)</option>
                <option value="Recent">Recent captures</option>
              </select>
            </div>

            <div className="tool-dropdown-pill">
              <span className="tool-label">Results:</span>
              <span className="tool-value">All results</span>
            </div>

            <div className="tool-dropdown-pill">
              <span className="tool-label">SafeSearch:</span>
              <span className="tool-value">Strict (Only Her ♡)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
