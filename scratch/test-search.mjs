import { photos } from "../src/data/photos.js";
import { searchPhotos } from "../src/engine/search.js";

const queries = [
  "ammu kutty",
  "silukuu",
  "periya siluku",
  "saree",
  "cute smile",
  "no.2 adi shankar street",
  "puducherry university",
  "bao bao",
  "randomname1",
  "randomname2",
];

for (const q of queries) {
  const res = searchPhotos(q, photos);
  const orients = [...new Set(res.map((p) => p.orientation))].join(", ");
  const topList = res
    .slice(0, 4)
    .map((p) => `${p.id}: ${p.title} (${p.orientation})`)
    .join(" | ");
  console.log(`Query: "${q}" -> ${res.length} results [${orients}]\n  Top: ${topList}\n`);
}
