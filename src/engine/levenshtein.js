
export function levenshteinDistance(str1, str2) {
  const rows = str1.length + 1;
  const cols = str2.length + 1;

  const matrix = Array.from(
    { length: rows },
    () => Array(cols).fill(0)
  );

  // Initialize first column
  for (let i = 0; i < rows; i++) {
    matrix[i][0] = i;
  }

  // Initialize first row
  for (let j = 0; j < cols; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost =
        str1[i - 1] === str2[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // Deletion
        matrix[i][j - 1] + 1,      // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

export function similarityPercentage(str1, str2) {
  if (str1 === str2) return 100;

  const maxLength = Math.max(str1.length, str2.length);

  if (maxLength === 0) return 100;

  const distance = levenshteinDistance(str1, str2);

  return Math.round(
    (1 - distance / maxLength) * 100
  );
}
