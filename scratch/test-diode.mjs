import { isDiodeQuery } from "../src/data/diodeData.js";

const testQueries = [
  "what is a PN junction diode",
  "pn junction diode",
  "diode",
  "diode symbol",
  "what is the circuit of a diode",
  "semiconductor diode",
  "forward bias and reverse bias",
  "ammu kutty",
  "silukuu",
  "saree",
  "no.2 adi shankar street",
  "bao bao",
];

for (const q of testQueries) {
  console.log(`Query "${q}" -> isDiode: ${isDiodeQuery(q)}`);
}

