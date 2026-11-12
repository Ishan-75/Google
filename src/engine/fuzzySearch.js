import {
  similarityPercentage,
  levenshteinDistance,
} from "./levenshtein.js";

function isAdjacentTransposition(a, b) {
  if (a.length !== b.length) return false;

  const differences = [];

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differences.push(i);
    }
  }

  if (differences.length !== 2) return false;

  const [first, second] = differences;

  return (
    second === first + 1 &&
    a[first] === b[second] &&
    a[second] === b[first]
  );
}

export function fuzzyMatch(query, target) {
  if (!query || !target) return false;

  if (query.length < 4 || target.length < 4) {
    return false;
  }

  if (isAdjacentTransposition(query, target)) {
    return true;
  }

  const similarity = similarityPercentage(query, target);
  const distance = levenshteinDistance(query, target);

  const allowedDistance =
    Math.max(query.length, target.length) >= 7 ? 2 : 1;

  return similarity >= 75 && distance <= allowedDistance;
}
