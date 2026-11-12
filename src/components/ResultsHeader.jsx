import GoogleLogo from "./GoogleLogo";
import SearchBar from "./SearchBar";
import { AppsGridIcon, SettingsIcon } from "./Icons";

export default function ResultsHeader({
  query,
  onQueryChange,
  onSearch,
  suggestions,
  onSelectSuggestion,
  onOpenVoice,
  onOpenLens,
  onOpenApps,
  onOpenProfile,
  onGoHome,
}) {
  return (
    <header className="google-results-header">
      <div className="results-header-content">
        <div className="header-logo-area">
          <GoogleLogo compact onClick={onGoHome} />
        </div>

        <div className="header-search-area">
          <SearchBar
            compact
            query={query}
            onQueryChange={onQueryChange}
            onSearch={onSearch}
            suggestions={suggestions}
            onSelectSuggestion={onSelectSuggestion}
            onOpenVoice={onOpenVoice}
            onOpenLens={onOpenLens}
          />
        </div>

        <div className="header-actions-area">
          <button
            type="button"
            className="header-icon-btn"
            onClick={onOpenProfile}
            title="Quick settings"
            aria-label="Quick settings"
          >
            <SettingsIcon size={20} />
          </button>

          <button
            type="button"
            className="header-icon-btn"
            onClick={onOpenApps}
            title="Google apps"
            aria-label="Google apps"
          >
            <AppsGridIcon size={20} />
          </button>

          <button
            type="button"
            className="profile-avatar-btn compact"
            onClick={onOpenProfile}
            title="Google Account"
            aria-label="Google Account"
          >
            <span className="avatar-initial">S</span>
          </button>
        </div>
      </div>
    </header>
  );
}
