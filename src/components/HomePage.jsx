import GoogleLogo from "./GoogleLogo";
import SearchBar from "./SearchBar";
import { AppsGridIcon } from "./Icons";

export default function HomePage({
  query,
  onQueryChange,
  onSearch,
  suggestions,
  onSelectSuggestion,
  onOpenVoice,
  onOpenLens,
  onOpenApps,
  onOpenProfile,
  onSelectTab,
  onFeelingLucky,
  darkMode,
}) {
  return (
    <div className={`google-home ${darkMode ? "dark-theme" : ""}`}>
      {/* Top Header */}
      <header className="home-top-nav">
        <div className="home-nav-left">
          <a href="#about" onClick={(e) => { e.preventDefault(); onSelectSuggestion("silukuu"); }}>
            About
          </a>
          <a href="#store" onClick={(e) => { e.preventDefault(); onSelectSuggestion("all photos"); }}>
            Store
          </a>
        </div>

        <div className="home-nav-right">
          <a
            href="#mail"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onSelectSuggestion("memories");
            }}
          >
            Gmail
          </a>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onSelectTab("Images")}
          >
            Images
          </button>

          <button
            type="button"
            className="icon-circle-btn"
            onClick={onOpenApps}
            title="Google apps"
            aria-label="Google apps"
          >
            <AppsGridIcon size={20} />
          </button>

          <button
            type="button"
            className="profile-avatar-btn"
            onClick={onOpenProfile}
            title="Google Account"
            aria-label="Google Account"
          >
            <span className="avatar-initial">I</span>
          </button>
        </div>
      </header>

      {/* Main Center Area */}
      <main className="home-center">
        <div className="logo-container">
          <GoogleLogo onClick={() => onSelectSuggestion("silukuu")} />
        </div>

        <div className="home-search-container">
          <SearchBar
            query={query}
            onQueryChange={onQueryChange}
            onSearch={onSearch}
            suggestions={suggestions}
            onSelectSuggestion={onSelectSuggestion}
            onOpenVoice={onOpenVoice}
            onOpenLens={onOpenLens}
            autoFocus
          />
        </div>

        <div className="home-action-buttons">
          <button
            type="button"
            className="google-action-btn"
            onClick={onSearch}
          >
            Google Search
          </button>

          <button
            type="button"
            className="google-action-btn"
            onClick={onFeelingLucky}
          >
            I'm Feeling Lucky
          </button>
        </div>

        <div className="home-languages-line">
          Google offered in:{" "}
          <button
            type="button"
            className="lang-link"
            onClick={() => onSelectSuggestion("azhagii")}
          >
            தமிழ்
          </button>{" "}
          <button
            type="button"
            className="lang-link"
            onClick={() => onSelectSuggestion("penmai")}
          >
            हिन्दी
          </button>{" "}
          <button
            type="button"
            className="lang-link"
            onClick={() => onSelectSuggestion("silukuu")}
          >
            తెలుగు
          </button>{" "}
          <button
            type="button"
            className="lang-link"
            onClick={() => onSelectSuggestion("saree")}
          >
            English
          </button>
        </div>
      </main>

      {/* Google Footer */}
      <footer className="google-home-footer">
        <div className="footer-country">India</div>
        <div className="footer-links-row">
          <div className="footer-links-left">
            <a href="#about" onClick={(e) => { e.preventDefault(); onSelectSuggestion("silukuu"); }}>
              About
            </a>
            <a href="#advertising" onClick={(e) => { e.preventDefault(); onSelectSuggestion("cute smile"); }}>
              Advertising
            </a>
            <a href="#business" onClick={(e) => { e.preventDefault(); onSelectSuggestion("saree"); }}>
              Business
            </a>
            <a href="#howsearchworks" onClick={(e) => { e.preventDefault(); onSelectSuggestion("all photos"); }}>
              How Search works
            </a>
          </div>

          <div className="footer-links-right">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); onSelectSuggestion("sweetheart"); }}>
              Privacy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); onSelectSuggestion("forever"); }}>
              Terms
            </a>
            <button
              type="button"
              className="footer-link-btn"
              onClick={onOpenProfile}
            >
              Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
