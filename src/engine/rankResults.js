import { normalizeText, tokenize } from "./normalize.js";

export function rankResults(results, query) {
  const normalizedQuery = normalizeText(query);
  const queryTokens = tokenize(normalizedQuery);

  return [...results]
    .map((photo) => {
      let boost = 0;
      const titleNorm = normalizeText(photo.title);
      const locNorm = normalizeText(photo.location || "");

      // Exact title match gets a large boost
      if (titleNorm === normalizedQuery) boost += 50;
      else if (titleNorm.includes(normalizedQuery)) boost += 30;

      // Location match
      if (locNorm && locNorm.includes(normalizedQuery)) boost += 25;

      // Title tokens match
      for (const token of queryTokens) {
        if (titleNorm.includes(token)) boost += 15;
      }

      return {
        ...photo,
        score: (photo.score || 50) + boost,
      };
    })
    .sort((a, b) => b.score - a.score);
}
