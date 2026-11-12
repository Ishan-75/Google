import { useState, useMemo } from "react";
import ImageCard from "./ImageCard";
import { SparkleIcon, SearchIcon } from "./Icons";
import { videos } from "../data/videos.js";
import { locations } from "../data/locations.js";
import { isDiodeQuery, diodeData } from "../data/diodeData.js";
import DiodeDiagram from "./DiodeDiagram";

export default function SearchResults({
  results,
  allPhotos,
  query,
  activeTab,
  onSelectPhoto,
  onTabChange,
  onSelectQuery,
}) {
  const [expandedPaaIndex, setExpandedPaaIndex] = useState(0);
  const [selectedFilterChip, setSelectedFilterChip] = useState("All");
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  const isDiode = isDiodeQuery(query);

  // Dynamic search duration calculation for authentic Google feel
  const searchTime = useMemo(() => {
    if (isDiode) return "0.34";
    const qLen = query ? query.length : 6;
    return (0.16 + (qLen % 4) * 0.03).toFixed(2);
  }, [query, isDiode]);

  // Dynamic filter chips
  const filterChips = useMemo(() => {
    if (isDiode) {
      return [
        { id: "All", label: "All" },
        { id: "working", label: "Working Principle" },
        { id: "depletion", label: "Depletion Region" },
        { id: "forward", label: "Forward Bias" },
        { id: "reverse", label: "Reverse Bias" },
        { id: "vi_graph", label: "V-I Graph" },
        { id: "applications", label: "Applications" },
      ];
    }
    return [
      { id: "All", label: `All (${results.length})` },
      { id: "portrait", label: "Portrait Moments" },
      { id: "landscape", label: "Wide / Landscape" },
      { id: "beauty", label: "Beauty & Radiance" },
      { id: "mood", label: "Moods & Expressions" },
      { id: "traditional", label: "Saree & Traditional" },
      { id: "personality", label: "Smiles & Joy" },
    ];
  }, [results.length, isDiode]);

  const filteredResults = useMemo(() => {
    if (isDiode) return results;
    if (selectedFilterChip === "All") return results;
    if (selectedFilterChip === "portrait" || selectedFilterChip === "landscape") {
      return results.filter((p) => p.orientation === selectedFilterChip);
    }
    return results.filter((photo) => photo.category === selectedFilterChip);
  }, [results, selectedFilterChip, isDiode]);

  // Featured photo for knowledge panel (top matching result for THIS query)
  const featuredPhoto = results[0] || allPhotos[0];

  // Dynamic Knowledge Panel Details based on searched query
  const entityMeta = useMemo(() => {
    const q = (query || "Silukuu").toLowerCase();

    if (q.includes("ammu") || q.includes("kutty")) {
      return {
        title: "Ammu Kutty",
        subtitle: "The Cutest Human Being on Planet Earth ♡",
        overview:
          "Known affectionately as Ammu Kutty. Documented across verified photographs capturing her innocent charm, cheerful laughter, and heartwarming expressions that melt hearts instantly.",
        superpower: "Being effortlessly adorable 24 hours a day",
        mood: "99% Sweetness, 1% Demanding attention",
      };
    }
    if (q.includes("periya siluku") || q.includes("angry") || q.includes("mood")) {
      return {
        title: "Periya Siluku",
        subtitle: "Dangerously Cute Mood Specialist",
        overview:
          "The alter-ego when hunger or fatigue strikes. Characterized by dramatic pouts, crossed arms, and an irresistible charm that commands immediate chocolate deliveries.",
        superpower: "Looking 100x cuter even while pretending to be mad",
        mood: "50% Dramatic Grump, 50% Soft cuddles",
      };
    }
    if (q.includes("saree") || q.includes("traditional") || q.includes("penmai")) {
      return {
        title: "Traditional Elegance",
        subtitle: "Saree Queen of Puducherry",
        overview:
          "Draped in classic sarees and festive silk, she embodies pure poise and grace. Every pleat and smile represents timeless South Indian royalty.",
        superpower: "Commanding undivided attention without uttering a word",
        mood: "100% Regal Queen",
      };
    }
    if (q.includes("azhagi") || q.includes("beauty") || q.includes("beautiful")) {
      return {
        title: "Azhagii",
        subtitle: "Natural Radiance & Timeless Beauty",
        overview:
          "Widely recognized for her sparkling eyes and radiant warmth. Indexed with 31 high-resolution memories proving natural beauty needs no filters.",
        superpower: "Lighting up every photograph she is in",
        mood: "Pure grace and elegance",
      };
    }
    return {
      title: query ? capitalize(query) : "Silukuu",
      subtitle: "The Most Beautiful Girl in the Universe",
      overview:
        "Widely regarded as the definition of grace, sweetness, and charm. Documented through 31 verified high-resolution photographs showcasing heartwarming laughs, festive traditional sarees, and unforgettable memories.",
      superpower: "Melting hearts with a single smile",
      mood: "99% Sunshine, 1% Dramatic Pout",
    };
  }, [query]);

  // People Also Ask Questions
  const paaQuestions = useMemo(() => {
    if (isDiode) {
      return diodeData.paa;
    }
    const name = query ? capitalize(query) : "Siluku";
    return [
      {
        q: `Why is she called ${name}?`,
        a: `Because her natural charm is smoother than pure mulberry silk. Her warmth, sweetness, and presence make every single day feel extraordinary.`,
      },
      {
        q: "Where in Puducherry are her special places?",
        a: "Her special map index includes No. 2, Adi Shankar Street in Lawspet, Pondicherry University campus in Kalapet, and Bao Bao in White Town for delicious date food.",
      },
      {
        q: "How many photos and orientations exist in this collection?",
        a: "Exactly 31 authenticated photos including portrait, landscape, and square captures spanning from 2025 to 2026.",
      },
      {
        q: "What is the best way to make her smile?",
        a: "Give her undivided attention, listen to her talk about her day, feed her favorite food at Bao Bao, and remind her that she is the prettiest girl on planet Earth.",
      },
      {
        q: "Is there anyone prettier in the world?",
        a: "Google Search Engine Algorithms have parsed over 100 billion indexed entities: Result 404 Prettier Not Found. She remains undefeated at #1.",
      },
    ];
  }, [query, isDiode]);

  // Related Searches
  const relatedSearches = useMemo(() => {
    if (isDiode) {
      return diodeData.relatedSearches;
    }
    const base = query ? query.toLowerCase() : "silukuu";
    return [
      `${base} cute smile hd`,
      `${base} saree diwali photos`,
      "no.2 adi shankar street lawspet",
      "puducherry university campus memories",
      "bao bao puducherry food date",
      "ammu kutty candid expressions",
      "silukuu 31 photos collection",
      "how to make her laugh non-stop",
    ];
  }, [query, isDiode]);

  // Organic Web Results
  const organicWebResults = useMemo(() => {
    if (isDiode) {
      return diodeData.organicResults;
    }
    const term = query ? capitalize(query) : "Silukuu";
    return [
      {
        domain: "silukupedia.org",
        url: `https://www.silukupedia.org/entry/${encodeURIComponent(query || "silukuu")}`,
        title: `${term} — The Official Encyclopedia of Cuteness & Elegance`,
        snippet: `Nov 12, 2026 — Comprehensive archive of ${term}. Features 31 authenticated photographic captures, detailed mood documentation, traditional saree looks, and heartfelt memories across Puducherry.`,
        sitelinks: [
          { label: "Photo Gallery (31)", query: "all photos" },
          { label: "Puducherry Memories", query: "puducherry" },
          { label: "Saree & Traditional", query: "saree" },
          { label: "Ammu Kutty Moments", query: "ammu kutty" },
        ],
      },
      {
        domain: "puducherry-diaries.org",
        url: `https://puducherry-diaries.org/places/lawspet-and-university`,
        title: `Special Spots in Puducherry: Lawspet, University & Bao Bao`,
        snippet: `Documenting our most cherished locations: from No. 2, Adi Shankar Street in Lawspet to Pondicherry University campus strolls and Bao Bao food dates.`,
      },
      {
        domain: "google.photos",
        url: `https://photos.google.com/share/special-31-moments`,
        title: `${term} Special Collection: 31 Unforgettable Memories (HD)`,
        snippet: `High-resolution photo album containing moments from 2025 to 2026. Featuring genuine laughs, candid selfies, Diwali saree elegance, and morning serenity.`,
      },
      {
        domain: "daily-sunshine.org",
        url: `https://daily-sunshine.org/research/her-smile-index`,
        title: `Scientifically Proven: Looking At Her Photos Increases Dopamine by 300%`,
        snippet: `Leading researchers confirm that a single glimpse of her radiant smile significantly reduces stress and restores happiness instantly. 100% success rate documented.`,
      },
    ];
  }, [query, isDiode]);

  // Active location for Maps tab
  const activeLocation = locations[activeLocationIndex] || locations[0];

  return (
    <div className="google-results-container">
      {/* Search statistics line */}
      <div className="search-stats-line">
        {isDiode
          ? diodeData.stats
          : `About ${results.length} results (${searchTime} seconds)`}
      </div>

      {/* Filter chips bar */}
      <div className="filter-chips-scroller">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={`filter-chip-btn ${
              selectedFilterChip === chip.id ? "active" : ""
            }`}
            onClick={() => setSelectedFilterChip(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* ========================================================
          TAB 1: ALL RESULTS
          ======================================================== */}
      {activeTab === "All" && (
        <div className="serp-layout-grid">
          {/* Main Left Column (Google Web Results) */}
          <div className="serp-main-column">
            {/* Google AI Overview Banner */}
            <div className="google-ai-overview-card">
              <div className="ai-overview-header">
                <div className="ai-badge">
                  <SparkleIcon size={18} color="#1a73e8" />
                  <span className="ai-label">AI Overview</span>
                </div>
              </div>
              <div className="ai-overview-text">
                {isDiode ? (
                  <>
                    <p style={{ marginBottom: "10px" }}>
                      A <strong>p–n junction diode</strong> is a two-terminal
                      semiconductor device that allows electric current to flow in
                      only one direction (forward bias) while blocking it in the
                      opposite direction (reverse bias). It is formed by joining a{" "}
                      <strong>p-type semiconductor</strong> (rich in holes) with an{" "}
                      <strong>n-type semiconductor</strong> (rich in electrons) within
                      a single crystal.
                    </p>
                    <div className="diode-ai-keypoints">
                      <p><strong>Key Operating Principles:</strong></p>
                      <ul style={{ paddingLeft: "18px", margin: "6px 0 10px", lineHeight: "1.6" }}>
                        <li>
                          <strong>Depletion Layer:</strong> Near the junction, free electrons and holes recombine, leaving behind immobile ionized donor and acceptor atoms. This creates a region devoid of mobile charge carriers.
                        </li>
                        <li>
                          <strong>Barrier Potential:</strong> The internal electric field creates a built-in potential barrier of approximately <strong>0.7 V for Silicon (Si)</strong> and <strong>0.3 V for Germanium (Ge)</strong> at 300 K.
                        </li>
                        <li>
                          <strong>Forward Bias:</strong> Anode connected to positive, Cathode to negative; reduces the barrier width and permits heavy forward current.
                        </li>
                        <li>
                          <strong>Reverse Bias:</strong> Anode connected to negative, Cathode to positive; widens depletion layer, blocking current except for a negligible reverse saturation current (I₀).
                        </li>
                      </ul>
                      <p style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.04)", padding: "6px 10px", borderRadius: "4px" }}>
                        Shockley Diode Equation: <strong>I = I₀ · (e^(qV / ηkT) − 1)</strong>
                      </p>
                    </div>
                    <div className="ai-citations-row">
                      {diodeData.aiOverview.citations.map((c, i) => (
                        <span key={i} className="citation-pill">{c}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>{entityMeta.title}</strong> is documented as the
                      sweetest, most charming individual in the universe. Key
                      attributes include her heartwarming smile, radiant eyes, and
                      occasional adorable mood swings. The verified archive contains{" "}
                      <strong>{results.length} high-resolution moments</strong>{" "}
                      including portrait and landscape orientations, traditional
                      saree looks, and candid moments in Puducherry.
                    </p>
                    <div className="ai-citations-row">
                      <span className="citation-pill">
                        ✓ {results.length} verified memories
                      </span>
                      <span className="citation-pill">✓ 100% authentic charm</span>
                      <span className="citation-pill">✓ Puducherry &amp; Lawspet</span>
                      <span className="citation-pill">✓ Forever loved</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Embedded Images Pack */}
            <div className="serp-image-pack-card">
              <div className="image-pack-header">
                <h3 className="image-pack-title">
                  <SearchIcon size={16} color="#202124" />
                  <span>Images for {query || "PN junction diode"}</span>
                </h3>
                <button
                  type="button"
                  className="view-all-images-link"
                  onClick={() => onTabChange("Images")}
                >
                  View all ({isDiode ? 5 : results.length}) →
                </button>
              </div>

              {isDiode ? (
                <div className="diode-diagrams-grid">
                  {diodeData.diagrams.map((d) => (
                    <div key={d.id} className="diode-diagram-card">
                      <div className="diode-diagram-visual">
                        <DiodeDiagram type={d.type} height={130} />
                      </div>
                      <span className="diode-diagram-title">{d.title}</span>
                      <small className="diode-diagram-caption">{d.caption}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="image-pack-grid-varied">
                  {results.slice(0, 5).map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      className={`image-pack-item-varied ${photo.orientation || "portrait"}`}
                      onClick={() => onSelectPhoto(photo)}
                    >
                      <img src={photo.image} alt={photo.title} loading="lazy" />
                      <span className="image-pack-item-badge">
                        {photo.orientation === "landscape" ? "Wide" : "HD"}
                      </span>
                      <span className="image-pack-item-title">{photo.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* People Also Ask (PAA) */}
            <div className="paa-card">
              <h3 className="paa-heading">People also ask</h3>
              <div className="paa-accordion">
                {paaQuestions.map((item, index) => {
                  const isOpen = expandedPaaIndex === index;
                  return (
                    <div
                      key={item.q}
                      className={`paa-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        className="paa-question-btn"
                        onClick={() =>
                          setExpandedPaaIndex(isOpen ? -1 : index)
                        }
                      >
                        <span>{item.q}</span>
                        <span className="paa-arrow">{isOpen ? "▲" : "▼"}</span>
                      </button>
                      {isOpen && (
                        <div className="paa-answer-content">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Organic Web Search Results */}
            <div className="organic-results-list">
              {organicWebResults.map((item, index) => (
                <article key={index} className="organic-result-item">
                  <div className="result-site-meta">
                    <span className="result-site-favicon">
                      {isDiode ? "⚡" : "🌐"}
                    </span>
                    <div className="result-site-details">
                      <span className="result-site-name">{item.domain}</span>
                      <span className="result-site-url">{item.url}</span>
                    </div>
                    <button
                      type="button"
                      className="result-menu-dots"
                      title="About this result"
                    >
                      ⋮
                    </button>
                  </div>

                  <h2 className="result-title">
                    <a
                      href={item.url}
                      target={isDiode ? "_blank" : "_self"}
                      rel="noreferrer"
                      onClick={(e) => {
                        if (!isDiode) {
                          e.preventDefault();
                          if (results[index % results.length]) {
                            onSelectPhoto(results[index % results.length]);
                          }
                        }
                      }}
                    >
                      {item.title}
                    </a>
                  </h2>

                  <p className="result-snippet">{item.snippet}</p>

                  {item.sitelinks && (
                    <div className="result-sitelinks-grid">
                      {item.sitelinks.map((link) => (
                        <button
                          key={link.label}
                          type="button"
                          className="sitelink-btn"
                          onClick={() => onSelectQuery(link.query)}
                        >
                          <span className="sitelink-title">{link.label}</span>
                          <span className="sitelink-hint">
                            Explore {link.query}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Related Searches */}
            <div className="related-searches-card">
              <h3 className="related-heading">Related searches</h3>
              <div className="related-searches-grid">
                {relatedSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="related-search-pill"
                    onClick={() => onSelectQuery(item)}
                  >
                    <SearchIcon size={16} color="#5f6368" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Pagination */}
            <div className="google-pagination-container">
              <div className="pagination-wordmark">
                <span className="g-blue">G</span>
                <span className="g-red active">o</span>
                <span className="g-yellow">o</span>
                <span className="g-blue">o</span>
                <span className="g-green">o</span>
                <span className="g-red">o</span>
                <span className="g-yellow">o</span>
                <span className="g-blue">o</span>
                <span className="g-green">g</span>
                <span className="g-blue">l</span>
                <span className="g-red">e</span>
              </div>
              <div className="pagination-numbers">
                <span className="page-num active">1</span>
                <span className="page-num">2</span>
                <span className="page-num">3</span>
                <span className="page-num">4</span>
                <span className="page-num">5</span>
                <button
                  type="button"
                  className="pagination-next-btn"
                  onClick={() => onTabChange("Images")}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Knowledge Panel */}
          <aside className="serp-knowledge-panel">
            {isDiode ? (
              <div className="knowledge-card">
                <div className="diode-knowledge-banner">
                  <DiodeDiagram type="junction" height={160} />
                </div>

                <div className="knowledge-header">
                  <h2 className="knowledge-title">
                    {diodeData.knowledgePanel.title}
                  </h2>
                  <p className="knowledge-subtitle">
                    {diodeData.knowledgePanel.subtitle}
                  </p>
                </div>

                <div className="knowledge-overview">
                  <p>{diodeData.knowledgePanel.overview}</p>
                </div>

                <div className="knowledge-attributes-table">
                  {diodeData.knowledgePanel.attributes.map((attr, i) => (
                    <div key={i} className="attr-row">
                      <span className="attr-label">{attr.label}</span>
                      <span className="attr-value">{attr.value}</span>
                    </div>
                  ))}
                </div>

                <div className="knowledge-actions">
                  <button
                    type="button"
                    className="knowledge-action-btn primary"
                    onClick={() => onTabChange("Images")}
                  >
                    📊 View Circuit Diagrams
                  </button>
                  <button
                    type="button"
                    className="knowledge-action-btn"
                    onClick={() => onSelectQuery("v-i characteristics of pn junction diode")}
                  >
                    📈 V-I Curve
                  </button>
                </div>

                <div className="knowledge-related-people">
                  <h4>Related semiconductor devices</h4>
                  <div className="diode-related-devices-list">
                    {diodeData.knowledgePanel.relatedTopics.map((top, i) => (
                      <div key={i} className="diode-topic-row">
                        <strong>{top.name}</strong>
                        <small>{top.category}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="knowledge-card">
                {/* Header Image */}
                <div
                  className="knowledge-banner"
                  onClick={() => onSelectPhoto(featuredPhoto)}
                >
                  <img
                    src={featuredPhoto.image}
                    alt={featuredPhoto.title}
                    className="knowledge-main-img"
                  />
                  <span className="knowledge-photo-count">
                    {results.length} Photos
                  </span>
                  <span className="knowledge-orient-badge">
                    {featuredPhoto.orientation}
                  </span>
                </div>

                <div className="knowledge-header">
                  <h2 className="knowledge-title">{entityMeta.title}</h2>
                  <p className="knowledge-subtitle">{entityMeta.subtitle}</p>
                </div>

                <div className="knowledge-overview">
                  <p>{entityMeta.overview}</p>
                </div>

                <div className="knowledge-attributes-table">
                  <div className="attr-row">
                    <span className="attr-label">Special place</span>
                    <span className="attr-value">
                      {featuredPhoto.location || "Lawspet, Puducherry"}
                    </span>
                  </div>
                  <div className="attr-row">
                    <span className="attr-label">Nicknames</span>
                    <span className="attr-value">
                      Ammu, Siluku, Azhagi, Penmai, Cutie
                    </span>
                  </div>
                  <div className="attr-row">
                    <span className="attr-label">Superpower</span>
                    <span className="attr-value">{entityMeta.superpower}</span>
                  </div>
                  <div className="attr-row">
                    <span className="attr-label">Mood gauge</span>
                    <span className="attr-value">{entityMeta.mood}</span>
                  </div>
                  <div className="attr-row">
                    <span className="attr-label">Relationship</span>
                    <span className="attr-value">
                      Permanently occupies Ishan's heart ♡
                    </span>
                  </div>
                  <div className="attr-row">
                    <span className="attr-label">Indexed moments</span>
                    <span className="attr-value">
                      {results.length} HD captures
                    </span>
                  </div>
                </div>

                <div className="knowledge-actions">
                  <button
                    type="button"
                    className="knowledge-action-btn primary"
                    onClick={() => onTabChange("Images")}
                  >
                    🖼️ View {results.length} Photos
                  </button>
                  <button
                    type="button"
                    className="knowledge-action-btn"
                    onClick={() => onTabChange("Maps")}
                  >
                    📍 View Locations
                  </button>
                </div>

                {/* People also search for */}
                <div className="knowledge-related-people">
                  <h4>People also search for</h4>
                  <div className="related-people-grid">
                    {results.slice(1, 5).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="related-person-item"
                        onClick={() => onSelectPhoto(p)}
                      >
                        <img src={p.image} alt={p.title} />
                        <span>{p.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ========================================================
          TAB 2: IMAGES
          ======================================================== */}
      {activeTab === "Images" && (
        <div className="google-images-view">
          {isDiode ? (
            <div className="diode-images-tab-grid">
              {diodeData.diagrams.map((d) => (
                <div key={d.id} className="diode-image-tab-card">
                  <div className="diode-diagram-container">
                    <DiodeDiagram type={d.type} height={180} />
                  </div>
                  <div className="diode-image-tab-meta">
                    <h4>{d.title}</h4>
                    <p>{d.caption}</p>
                    <span className="diode-source-badge">⚡ electronics-tutorials.ws</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="images-masonry-grid-natural">
              {filteredResults.map((photo) => (
                <ImageCard
                  key={photo.id}
                  photo={photo}
                  onClick={onSelectPhoto}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 3: VIDEOS
          ======================================================== */}
      {activeTab === "Videos" && (
        <div className="google-videos-view">
          <h2 className="tab-section-heading">Videos</h2>

          {isDiode ? (
            <div className="videos-list">
              <div className="video-list-row-real">
                <div className="diode-video-thumb">
                  <DiodeDiagram type="symbol" height={120} />
                  <span className="video-duration-pill">12:45</span>
                </div>
                <div className="video-row-meta">
                  <h3>P-N Junction Diode - Working, Forward &amp; Reverse Bias</h3>
                  <span className="video-channel-name">Physics Wallah / NPTEL Electronics · 1.4M views</span>
                  <p>Comprehensive video lesson on semiconductor electronics, barrier potential, and hole-electron recombination at the junction.</p>
                </div>
              </div>

              <div className="video-list-row-real">
                <div className="diode-video-thumb">
                  <DiodeDiagram type="vi_curve" height={120} />
                  <span className="video-duration-pill">08:20</span>
                </div>
                <div className="video-row-meta">
                  <h3>V-I Characteristics of P-N Junction Diode Experiment</h3>
                  <span className="video-channel-name">Science &amp; Engineering Labs · 850K views</span>
                  <p>Detailed experimental setup determining knee voltage (0.7V for Si) and reverse breakdown behavior.</p>
                </div>
              </div>
            </div>
          ) : videos.length === 0 ? (
            <div className="videos-empty-state-box">
              <div className="video-empty-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="#1a73e8"
                  strokeWidth="1.5"
                >
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>

              <h3>No videos added yet</h3>
              <p className="video-empty-subtitle">
                This section is ready for you to add real videos anytime!
              </p>

              <div className="video-instructions-card">
                <h4>How to add your videos:</h4>
                <ol>
                  <li>
                    Place your video files (e.g. <code>myvideo.mp4</code>) into the folder:
                    <div className="code-pill">public/videos/</div>
                  </li>
                  <li>
                    Open <code>src/data/videos.js</code> and add your video entry:
                    <pre className="code-block">
{`export const videos = [
  {
    id: 1,
    title: "Our special video moment",
    videoUrl: "/videos/myvideo.mp4",
    thumbnail: "/images/photo1.jpg",
    duration: "0:45",
    date: "November 2026",
    description: "A beautiful memory together."
  }
];`}
                    </pre>
                  </li>
                </ol>
                <div className="video-ready-status">
                  ✓ <code>public/videos/</code> folder is created and waiting for your videos.
                </div>
              </div>
            </div>
          ) : (
            <div className="videos-list">
              {videos.map((vid) => (
                <div key={vid.id} className="video-list-row-real">
                  <div className="video-real-player-wrap">
                    <video
                      controls
                      poster={vid.thumbnail}
                      src={vid.videoUrl}
                      className="real-video-element"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="video-row-meta">
                    <h3>{vid.title}</h3>
                    <span className="video-channel-name">
                      Personal Memory · {vid.duration} · {vid.date}
                    </span>
                    <p>{vid.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 4: NEWS
          ======================================================== */}
      {activeTab === "News" && (
        <div className="google-news-view">
          <h2 className="tab-section-heading">Top Stories</h2>
          <div className="news-cards-grid">
            {isDiode ? (
              <>
                <article className="news-card">
                  <div className="news-card-body">
                    <span className="news-source">SEMICONDUCTOR TODAY · 3 hours ago</span>
                    <h3>Next-Generation Gallium Nitride Diodes Surpass Silicon Efficiency Limits</h3>
                    <p>
                      Researchers demonstrate ultra-low forward resistance and nanosecond reverse recovery in power semiconductor diodes.
                    </p>
                  </div>
                  <div style={{ background: "#e8f0fe", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <DiodeDiagram type="symbol" height={120} />
                  </div>
                </article>

                <article className="news-card">
                  <div className="news-card-body">
                    <span className="news-source">IEEE SPECTRUM · 1 day ago</span>
                    <h3>How Modern Quantum Tunneling Diodes Enable Sub-Terahertz Signal Detection</h3>
                    <p>
                      Breakthrough in barrier potential engineering opens new frontiers for 6G communication and wireless sensing.
                    </p>
                  </div>
                  <div style={{ background: "#fef7e0", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <DiodeDiagram type="junction" height={120} />
                  </div>
                </article>
              </>
            ) : (
              <>
                <article className="news-card">
                  <div className="news-card-body">
                    <span className="news-source">PUDUCHERRY CHRONICLE · 2 hours ago</span>
                    <h3>{entityMeta.title} Officially Declared Prettiest Person in Town</h3>
                    <p>
                      {query} in her sleep mode continues to shatter
                      cuteness records across Puducherry and beyond.
                    </p>
                  </div>
                  <img src={allPhotos[7]?.image || allPhotos[0]?.image} alt="News 1" />
                </article>

                <article className="news-card">
                  <div className="news-card-body">
                    <span className="news-source">DAILY HAPPINESS · 5 hours ago</span>
                    <h3>Boyfriend Caught Staring at Her Photos For The 100th Time Today</h3>
                    <p>
                      "I was just checking the Google search results," says Ishan.
                      Eyewitnesses confirm genuine awe and a wide smile.
                    </p>
                  </div>
                  <img src={allPhotos[1]?.image} alt="News 2" />
                </article>

                <article className="news-card">
                  <div className="news-card-body">
                    <span className="news-source">FOOD &amp; DATING GUIDE · 1 day ago</span>
                    <h3>Bao Bao &amp; Lawspet Ranked as the Top Romantic Spots in Puducherry</h3>
                    <p>
                      A study of unforgettable smiles confirms that memories made in
                      Puducherry with her are irreplaceable.
                    </p>
                  </div>
                  <img src={allPhotos[16]?.image || allPhotos[17]?.image} alt="News 3" />
                </article>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: MAPS (PUDUCHERRY LOCATIONS)
          ======================================================== */}
      {activeTab === "Maps" && (
        <div className="google-maps-full-view">
          {/* Location selector pills */}
          <div className="maps-location-pills-row">
            {locations.map((loc, idx) => (
              <button
                key={loc.id}
                type="button"
                className={`location-tab-pill ${
                  activeLocationIndex === idx ? "active" : ""
                }`}
                onClick={() => setActiveLocationIndex(idx)}
              >
                <span>📍</span>
                <strong>{loc.name}</strong>
                <small>({loc.area})</small>
              </button>
            ))}
          </div>

          <div className="maps-split-container">
            {/* Left: Place Detail Card */}
            <div className="maps-place-detail-panel">
              <div className="place-header">
                <span className="place-category-badge">{activeLocation.category}</span>
                <h2 className="place-title">{activeLocation.name}</h2>
                <span className="place-rating">{activeLocation.rating}</span>
                <p className="place-full-address">
                  📍 {activeLocation.fullAddress}
                </p>
                <span className="place-hours">⏰ {activeLocation.openHours}</span>
              </div>

              <div className="place-actions-toolbar">
                <a
                  href={activeLocation.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="place-btn-primary"
                >
                  🧭 Directions (Google Maps)
                </a>
                <button
                  type="button"
                  className="place-btn-secondary"
                  onClick={() => alert("Saved directly in our permanent favorites ♡")}
                >
                  ★ Save
                </button>
                <button
                  type="button"
                  className="place-btn-secondary"
                  onClick={() => {
                    navigator.clipboard?.writeText(activeLocation.fullAddress);
                    alert("Address copied to clipboard!");
                  }}
                >
                  📋 Copy Address
                </button>
              </div>

              <div className="place-description-block">
                <h4>About this special place</h4>
                <p>{activeLocation.description}</p>
              </div>

              {/* Photos taken here */}
              <div className="place-photos-strip">
                <h4>Memories captured here</h4>
                <div className="place-photos-grid">
                  {allPhotos
                    .filter((p) => activeLocation.photos.includes(p.id))
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="place-photo-btn"
                        onClick={() => onSelectPhoto(p)}
                        title={p.title}
                      >
                        <img src={p.image} alt={p.title} />
                        <span>{p.title}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Google Reviews */}
              <div className="place-reviews-section">
                <h4>Google Reviews</h4>
                <div className="reviews-list">
                  {activeLocation.reviews.map((rev, i) => (
                    <div key={i} className="review-item">
                      <div className="review-author-line">
                        <strong>{rev.author}</strong>
                        <span className="review-stars">★★★★★</span>
                        <span className="review-time">{rev.time}</span>
                      </div>
                      <p className="review-text">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Embedded Interactive Map */}
            <div className="maps-embed-panel">
              <iframe
                title={activeLocation.name}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeLocation.lng - 0.015}%2C${activeLocation.lat - 0.015}%2C${activeLocation.lng + 0.015}%2C${activeLocation.lat + 0.015}&layer=mapnik&marker=${activeLocation.lat}%2C${activeLocation.lng}`}
                className="maps-iframe-view"
              />
              <div className="map-floating-place-badge">
                <span className="red-pin">📍</span>
                <div>
                  <strong>{activeLocation.name}</strong>
                  <small>{activeLocation.area}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function capitalize(text) {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
