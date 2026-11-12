/**
 * Authentic PN Junction Diode search data for genuine Google SERP experience.
 */

export function isDiodeQuery(query) {
  if (!query) return false;
  const q = query.toLowerCase().trim();
  const diodeTerms = [
    "diode",
    "pn junction",
    "p-n junction",
    "pn junction diode",
    "p-n junction diode",
    "what is a pn junction diode",
    "what is pn junction diode",
    "semiconductor",
    "forward bias",
    "reverse bias",
    "depletion region",
    "depletion layer",
    "barrier potential",
    "anode",
    "cathode",
    "rectifier",
    "diode symbol",
    "v-i characteristics",
    "knee voltage",
    "zener",
    "avalanche",
    "electronics",
    "physics",
  ];

  return diodeTerms.some((term) => q.includes(term));
}

export const diodeData = {
  query: "what is a PN junction diode",
  stats: "About 2,840,000 results (0.34 seconds)",

  aiOverview: {
    title: "AI Overview",
    paragraphs: [
      "A p–n junction diode is a two-terminal semiconductor device that allows electric current to flow in only one direction (forward bias) while blocking it in the opposite direction (reverse bias). It is formed by joining a p-type semiconductor (rich in holes) with an n-type semiconductor (rich in electrons) within a single crystal.",
      "Key Operating Principles:",
      "• Depletion Layer: Near the junction, free electrons and holes recombine, leaving behind uncompensated positive and negative ions. This creates a region free of mobile charge carriers known as the depletion layer.",
      "• Built-in Potential Barrier: The electric field across the depletion region creates a potential barrier of approximately 0.7 V for Silicon (Si) and 0.3 V for Germanium (Ge) at room temperature (300 K).",
      "• Forward Bias: Connecting the positive terminal to the p-side (Anode) and negative terminal to the n-side (Cathode) reduces the barrier width, allowing conventional current to flow once voltage exceeds ~0.7 V.",
      "• Reverse Bias: Connecting positive to the n-side and negative to the p-side widens the depletion layer, permitting only an extremely small reverse saturation current (nA to µA) until breakdown occurs."
    ],
    formula: "Shockley Diode Equation: I = I_0 * (e^(qV / ηkT) - 1)",
    citations: [
      "✓ Semiconductor Physics",
      "✓ Barrier: 0.7V (Si) / 0.3V (Ge)",
      "✓ Unidirectional Rectifier",
      "✓ Depletion Layer Theory"
    ]
  },

  knowledgePanel: {
    title: "p–n diode",
    subtitle: "Semiconductor device",
    overview:
      "A p–n diode is a two-terminal semiconductor device based on the p–n junction. The diode conducts electric current primarily in one direction, functioning as an electrical one-way valve or rectifier.",
    attributes: [
      { label: "Invented by", value: "Russell Ohl (1939, Bell Labs)" },
      { label: "Forward voltage (V_F)", value: "0.7 V (Silicon) / 0.3 V (Germanium)" },
      { label: "Terminals", value: "Anode (p-type, +) · Cathode (n-type, −)" },
      { label: "Key function", value: "Rectification (AC to DC conversion), clipping" },
      { label: "Diode equation", value: "I = I_s · (e^(V / nV_t) − 1)" },
      { label: "Breakdown types", value: "Zener breakdown & Avalanche breakdown" },
      { label: "Common variants", value: "Zener diode, LED, Photodiode, Schottky" }
    ],
    relatedTopics: [
      { name: "Zener diode", category: "Voltage regulation" },
      { name: "LED", category: "Optoelectronics" },
      { name: "Rectifier circuit", category: "Power supply" },
      { name: "Bipolar transistor", category: "Amplification" }
    ]
  },

  diagrams: [
    {
      id: "symbol",
      title: "Diode Circuit Symbol",
      caption: "Anode (A) ➔|— Cathode (K) with forward current arrow",
      type: "symbol"
    },
    {
      id: "junction",
      title: "P-N Junction & Depletion Layer",
      caption: "Holes (p) | Depletion Zone (E-field) | Electrons (n)",
      type: "junction"
    },
    {
      id: "forward",
      title: "Forward Bias (V > 0.7V)",
      caption: "+ to P, − to N: Depletion layer narrows, current flows",
      type: "forward"
    },
    {
      id: "reverse",
      title: "Reverse Bias (V < 0)",
      caption: "+ to N, − to P: Depletion layer widens, current blocked",
      type: "reverse"
    },
    {
      id: "vi_curve",
      title: "V-I Characteristics Curve",
      caption: "Exponential forward current vs reverse breakdown",
      type: "vi_curve"
    }
  ],

  paa: [
    {
      q: "What is the main function of a PN junction diode?",
      a: "The primary function of a PN junction diode is rectification—allowing alternating current (AC) to be converted into direct current (DC) by permitting current flow in only the forward direction while blocking reverse current."
    },
    {
      q: "How does a PN junction work in forward bias?",
      a: "In forward bias, the positive terminal of the power supply is connected to the p-type semiconductor (anode) and the negative terminal to the n-type semiconductor (cathode). When the applied voltage exceeds the barrier potential (0.7V for Silicon), the depletion region shrinks to near zero, enabling rapid recombination of charge carriers and significant current flow."
    },
    {
      q: "What is the difference between a PN junction and a diode?",
      a: "A PN junction is the physical metallurgical interface formed between p-type and n-type semiconductor crystals. A diode is the complete manufactured electronic component with metallic leads (anode and cathode) and protective packaging enclosing that junction."
    },
    {
      q: "What is the barrier potential for silicon and germanium diodes?",
      a: "At room temperature (300 K / 25°C), the built-in barrier potential is approximately 0.7 V for a Silicon PN junction diode and approximately 0.3 V for a Germanium diode."
    },
    {
      q: "What happens to the depletion layer during reverse bias?",
      a: "In reverse bias, the external voltage attracts majority carriers away from the junction (holes toward negative terminal, electrons toward positive terminal). This widens the depletion layer, increases the junction barrier height, and completely stops majority carrier current."
    }
  ],

  organicResults: [
    {
      domain: "byjus.com",
      url: "https://byjus.com/physics/p-n-junction-diode/",
      title: "P-N Junction Diode - Working Principle, Characteristics & Graph",
      snippet:
        "A p-n junction diode is a two-terminal semiconductor device that allows electric current to flow in a single direction. Learn about forward and reverse bias, drift and diffusion current, knee voltage, and V-I characteristics.",
      sitelinks: [
        { label: "Forward Biased Diode", query: "forward bias diode" },
        { label: "Reverse Biased Diode", query: "reverse bias diode" },
        { label: "V-I Characteristics Graph", query: "diode vi characteristics" },
        { label: "Zener Diode Explained", query: "zener diode" }
      ]
    },
    {
      domain: "geeksforgeeks.org",
      url: "https://www.geeksforgeeks.org/p-n-junction-diode/",
      title: "What is a P-N Junction Diode? Symbol, Working & Applications",
      snippet:
        "A P-N Junction Diode is formed when an n-type and a p-type semiconductor material are joined together. The p-side is called the anode and the n-side is called the cathode. Read more about depletion width and applications..."
    },
    {
      domain: "en.wikipedia.org",
      url: "https://en.wikipedia.org/wiki/P%E2%80%93n_diode",
      title: "p–n diode - Wikipedia",
      snippet:
        "A p–n diode is a type of semiconductor diode based on the p–n junction. The diode conducts current in only one direction, and it is made by joining a p-type semiconductor layer to an n-type semiconductor layer inside a crystal."
    },
    {
      domain: "electronics-tutorials.ws",
      url: "https://www.electronics-tutorials.ws/diode/diode_1.html",
      title: "The PN Junction Diode and Characteristic Curves",
      snippet:
        "The PN junction diode is the simplest of all semiconductor devices. It has two active terminals: the Anode (positive) and Cathode (negative). When forward biased, current increases exponentially after knee voltage (0.7V for Silicon)..."
    }
  ],

  relatedSearches: [
    "pn junction diode working principle pdf",
    "v-i characteristics of pn junction diode class 12",
    "difference between forward bias and reverse bias",
    "barrier potential of silicon diode",
    "pn junction diode circuit diagram and symbol",
    "depletion layer in pn junction diode",
    "applications of pn junction diode as rectifier",
    "difference between zener diode and pn junction diode"
  ]
};

