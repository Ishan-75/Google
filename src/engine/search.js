import { normalizeText, tokenize } from "./normalize.js";
import { fuzzyMatch } from "./fuzzySearch.js";
import { rankResults } from "./rankResults.js";

const ALL_INTENT_KEYWORDS = new Set([
  "all",
  "photos",
  "photo",
  "images",
  "image",
  "gallery",
  "everything",
  "all photos",
  "all images",
  "*",
]);

// Deterministic MurmurHash-style PRNG shuffle so distinct queries produce distinct varieties
function getSeededShuffle(array, query) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < query.length; i++) {
    h = Math.imul(h ^ query.charCodeAt(i), 16777619);
  }

  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    const j = Math.abs(h) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getTokenScore(query, target) {
  if (!query || !target) return 0;
  const normalizedTarget = normalizeText(target);
  const normalizedQuery = normalizeText(query);

  if (normalizedQuery === normalizedTarget) return 100;
  if (normalizedTarget.startsWith(normalizedQuery)) return 85;
  if (normalizedQuery.startsWith(normalizedTarget)) return 80;
  if (normalizedTarget.includes(normalizedQuery)) return 70;
  if (normalizedQuery.includes(normalizedTarget)) return 65;

  if (fuzzyMatch(normalizedQuery, normalizedTarget)) return 50;

  return 0;
}

function getPhotoScore(photo, queryTokens) {
  const searchableFields = [
    photo.title,
    photo.description,
    ...(photo.keywords || []),
    ...(photo.aliases || []),
    photo.category || "",
    photo.date || "",
    photo.source || "",
    photo.location || "",
  ].map(normalizeText);

  let totalScore = 0;
  let matchesCount = 0;

  for (const queryToken of queryTokens) {
    let tokenBest = 0;

    for (const field of searchableFields) {
      if (!field) continue;
      const fullFieldScore = getTokenScore(queryToken, field);
      if (fullFieldScore > tokenBest) tokenBest = fullFieldScore;

      const fieldTokens = tokenize(field);
      for (const target of fieldTokens) {
        const score = getTokenScore(queryToken, target);
        if (score > tokenBest) tokenBest = score;
      }
    }

    if (tokenBest > 0) {
      matchesCount++;
      totalScore += tokenBest;
    }
  }

  if (matchesCount === 0) return 0;

  const averageMatchScore = totalScore / queryTokens.length;
  const matchRatio = matchesCount / queryTokens.length;

  return averageMatchScore * (0.5 + 0.5 * matchRatio);
}

// Ensure results contain a healthy mix of orientations (portrait, landscape, square)
function balanceOrientations(rankedResults, allPhotos) {
  if (rankedResults.length === 0) return [];

  const hasLandscape = rankedResults.some((p) => p.orientation === "landscape");
  const hasPortrait = rankedResults.some((p) => p.orientation === "portrait");

  let balanced = [...rankedResults];

  // If missing landscape, find top landscape photos and interleave
  if (!hasLandscape && rankedResults.length < allPhotos.length) {
    const landscapes = allPhotos.filter((p) => p.orientation === "landscape");
    if (landscapes.length > 0) {
      balanced.splice(1, 0, landscapes[0]);
      if (landscapes[1]) balanced.splice(4, 0, landscapes[1]);
    }
  }

  // If missing portrait, find top portraits
  if (!hasPortrait && rankedResults.length < allPhotos.length) {
    const portraits = allPhotos.filter((p) => p.orientation === "portrait");
    if (portraits.length > 0) {
      balanced.splice(1, 0, portraits[0]);
    }
  }

  // Deduplicate
  const seen = new Set();
  return balanced.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

export function searchPhotos(query, photos) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery || ALL_INTENT_KEYWORDS.has(normalizedQuery)) {
    return photos.map((p) => ({ ...p, score: 100 }));
  }

  const queryTokens = tokenize(normalizedQuery);
  if (queryTokens.length === 0) {
    return photos.map((p) => ({ ...p, score: 100 }));
  }

  const scoredResults = photos
    .map((photo) => ({
      ...photo,
      score: getPhotoScore(photo, queryTokens),
    }))
    .filter((photo) => photo.score >= 25);

  if (scoredResults.length > 0) {
    const ranked = rankResults(scoredResults, normalizedQuery);
    return balanceOrientations(ranked, photos);
  }

  // Distinct seed-based shuffle for unfamiliar queries so different names show different results!
  const shuffled = getSeededShuffle(photos, normalizedQuery);

  const portraits = shuffled.filter((p) => p.orientation === "portrait");
  const landscapes = shuffled.filter((p) => p.orientation === "landscape");
  const squares = shuffled.filter((p) => p.orientation === "square");

  const varied = [
    portraits[0],
    landscapes[0],
    portraits[1],
    portraits[2],
    landscapes[1] || squares[0],
    portraits[3],
    squares[0] || landscapes[2],
    portraits[4],
  ].filter(Boolean);

  const seen = new Set();
  return varied
    .filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .map((p, idx) => ({ ...p, score: 75 - idx * 3 }));
}

export function getSuggestions(query, photos) {
  const normalizedQuery = normalizeText(query);

  const POPULAR_SUGGESTIONS = [
    "what is a PN junction diode",
    "pn junction diode working principle",
    "diode circuit symbol",
    "puducherry university",
    "no.2 adi shankar street",
    "bao bao",
    "ammu kutty",
    "silukuu",
    "periya siluku",
    "saree elegance",
    "all photos",
  ];

  if (!normalizedQuery) {
    return POPULAR_SUGGESTIONS.slice(0, 6);
  }

  const allKeywords = [
    ...POPULAR_SUGGESTIONS,
    ...photos.flatMap((photo) => [
      photo.title,
      ...(photo.keywords || []),
      ...(photo.aliases || []),
      photo.category,
      photo.location,
    ]),
  ].filter(Boolean);

  const unique = [...new Set(allKeywords.map(normalizeText))];

  const prefixMatches = unique.filter((word) =>
    word.startsWith(normalizedQuery)
  );
  const substringMatches = unique.filter(
    (word) => !word.startsWith(normalizedQuery) && word.includes(normalizedQuery)
  );

  return [...prefixMatches, ...substringMatches].slice(0, 8);
}
