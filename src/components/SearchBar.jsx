import { useState, useRef, useEffect } from "react";
import {
  SearchIcon,
  GoogleMicIcon,
  GoogleLensIcon,
  ClockHistoryIcon,
} from "./Icons";

export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
  suggestions,
  onSelectSuggestion,
  onOpenVoice,
  onOpenLens,
  compact = false,
  autoFocus = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setIsFocused(false);
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      onSelectSuggestion(suggestions[selectedIndex]);
    } else {
      onSearch();
    }
  }

  function handleKeyDown(event) {
    if (!isFocused || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (event.key === "Escape") {
      setIsFocused(false);
    }
  }

  const showDropdown = isFocused && suggestions && suggestions.length > 0;

  return (
    <div
      ref={wrapperRef}
      className={`search-wrapper ${compact ? "compact" : ""} ${
        showDropdown ? "has-suggestions" : ""
      }`}
    >
      <form
        className={`search-bar ${showDropdown ? "expanded-top" : ""}`}
        onSubmit={handleSubmit}
      >
        <span className="search-icon-wrapper" onClick={() => inputRef.current?.focus()}>
          <SearchIcon size={compact ? 18 : 20} color="#9aa0a6" />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            setSelectedIndex(-1);
            if (!isFocused) setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder=""
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus={autoFocus}
          aria-label="Search"
        />

        {query && (
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              onQueryChange("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            title="Clear"
          >
            ✕
          </button>
        )}

        {query && <div className="search-divider" />}

        <button
          type="button"
          className="search-tool-btn mic-btn"
          onClick={onOpenVoice}
          title="Search by voice"
          aria-label="Search by voice"
        >
          <GoogleMicIcon size={compact ? 20 : 22} />
        </button>

        <button
          type="button"
          className="search-tool-btn lens-btn"
          onClick={onOpenLens}
          title="Search by image"
          aria-label="Search by image"
        >
          <GoogleLensIcon size={compact ? 20 : 22} />
        </button>

        {compact && (
          <button
            type="submit"
            className="header-search-submit"
            title="Search"
            aria-label="Search"
          >
            <SearchIcon size={18} color="#4285F4" />
          </button>
        )}
      </form>

      {showDropdown && (
        <div className="google-suggestions-dropdown">
          <div className="suggestions-divider" />
          <ul className="suggestions-list" role="listbox">
            {suggestions.map((item, index) => (
              <li
                key={item}
                className={`suggestion-item ${
                  index === selectedIndex ? "selected" : ""
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectSuggestion(item);
                  setIsFocused(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <span className="suggestion-icon">
                  <ClockHistoryIcon size={16} color="#9aa0a6" />
                </span>
                <span className="suggestion-text">
                  {renderHighlightedText(item, query)}
                </span>
              </li>
            ))}
          </ul>

          {!compact && (
            <div className="dropdown-action-buttons">
              <button
                type="button"
                className="google-btn"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSearch();
                  setIsFocused(false);
                }}
              >
                Google Search
              </button>
              <button
                type="button"
                className="google-btn"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectSuggestion("beautiful");
                  setIsFocused(false);
                }}
              >
                I'm Feeling Lucky
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function renderHighlightedText(text, query) {
  if (!query) return text;
  const q = query.toLowerCase();
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);

  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);

  return (
    <>
      {before}
      <strong>{match}</strong>
      {after}
    </>
  );
}
