import { useState, useMemo, useEffect } from "react";
import { photos } from "./data/photos";
import { searchPhotos, getSuggestions } from "./engine/search";

import HomePage from "./components/HomePage";
import ResultsHeader from "./components/ResultsHeader";
import NavigationTabs from "./components/NavigationTabs";
import SearchResults from "./components/SearchResults";
import Lightbox from "./components/Lightbox";
import VoiceSearchModal from "./components/VoiceSearchModal";
import GoogleLensModal from "./components/GoogleLensModal";
import AppsMenuModal from "./components/AppsMenuModal";
import ProfileMenuModal from "./components/ProfileMenuModal";

import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTimeFilter, setActiveTimeFilter] = useState("Any time");

  // Modals
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [lensOpen, setLensOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sync body theme
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Results calculation
  const rawResults = useMemo(() => {
    const q = submittedQuery || (hasSearched ? query : "");
    return searchPhotos(q, photos);
  }, [submittedQuery, hasSearched, query]);

  // Apply time filters if any
  const results = useMemo(() => {
    if (activeTimeFilter === "Past year") {
      return rawResults.filter((p) => (p.date || "").includes("2026"));
    }
    if (activeTimeFilter === "Classics") {
      return rawResults.filter((p) => (p.date || "").includes("2025"));
    }
    return rawResults;
  }, [rawResults, activeTimeFilter]);

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    return getSuggestions(query, photos);
  }, [query]);

  function handleSearch() {
    const cleaned = query.trim() || "all photos";
    setSubmittedQuery(cleaned);
    setHasSearched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectSuggestion(text) {
    setQuery(text);
    setSubmittedQuery(text);
    setHasSearched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFeelingLucky() {
    const randomIndex = Math.floor(Math.random() * photos.length);
    const luckyPhoto = photos[randomIndex];
    setSelectedPhoto(luckyPhoto);
  }

  function goHome() {
    setQuery("");
    setSubmittedQuery("");
    setHasSearched(false);
    setActiveTab("All");
    setSelectedPhoto(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAppAction(action) {
    if (action === "home") {
      goHome();
    } else if (action === "photos" || action === "images") {
      setSubmittedQuery("all photos");
      setQuery("all photos");
      setHasSearched(true);
      setActiveTab("Images");
    } else if (action === "maps") {
      setSubmittedQuery("where is her heart");
      setQuery("where is her heart");
      setHasSearched(true);
      setActiveTab("Maps");
    } else if (action === "videos" || action === "moments") {
      setSubmittedQuery("moments");
      setQuery("moments");
      setHasSearched(true);
      setActiveTab("Videos");
    } else {
      handleSelectSuggestion("silukuu");
    }
  }

  return (
    <div className={`google-app ${darkMode ? "dark-theme" : ""}`}>
      {!hasSearched ? (
        <HomePage
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          onOpenVoice={() => setVoiceOpen(true)}
          onOpenLens={() => setLensOpen(true)}
          onOpenApps={() => setAppsOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSubmittedQuery("all photos");
            setHasSearched(true);
          }}
          onFeelingLucky={handleFeelingLucky}
          darkMode={darkMode}
        />
      ) : (
        <div className="google-results-page-layout">
          <ResultsHeader
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            onOpenVoice={() => setVoiceOpen(true)}
            onOpenLens={() => setLensOpen(true)}
            onOpenApps={() => setAppsOpen(true)}
            onOpenProfile={() => setProfileOpen(true)}
            onGoHome={goHome}
          />

          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onFilterTime={setActiveTimeFilter}
            activeTimeFilter={activeTimeFilter}
          />

          <main className="results-content-wrap">
            <SearchResults
              results={results}
              allPhotos={photos}
              query={submittedQuery}
              activeTab={activeTab}
              onSelectPhoto={setSelectedPhoto}
              onTabChange={setActiveTab}
              onSelectQuery={handleSelectSuggestion}
            />
          </main>
        </div>
      )}

      {/* Lightbox / Google Images Split-View Panel */}
      <Lightbox
        photo={selectedPhoto}
        allPhotos={photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={setSelectedPhoto}
      />

      {/* Voice Search Simulation Modal */}
      <VoiceSearchModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onQuerySubmit={(text) => handleSelectSuggestion(text)}
      />

      {/* Google Lens Visual Search Modal */}
      <GoogleLensModal
        isOpen={lensOpen}
        onClose={() => setLensOpen(false)}
        onSelectPhoto={(photo) => {
          setSelectedPhoto(photo);
          handleSelectSuggestion(photo.title);
        }}
      />

      {/* 9-Dot App Launcher Dropdown */}
      <AppsMenuModal
        isOpen={appsOpen}
        onClose={() => setAppsOpen(false)}
        onSelectApp={handleAppAction}
      />

      {/* Profile & Dark Mode Dropdown */}
      <ProfileMenuModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    </div>
  );
}

export default App;
