export default function DiodeDiagram({ type, width = "100%", height = 180 }) {
  if (type === "symbol") {
    return (
      <svg
        viewBox="0 0 320 160"
        width={width}
        height={height}
        style={{ background: "#ffffff", display: "block" }}
      >
        {/* Anode Wire */}
        <line x1="30" y1="80" x2="120" y2="80" stroke="#202124" strokeWidth="3" />
        <text x="30" y="65" fill="#1a73e8" fontSize="13" fontWeight="bold">Anode (+)</text>

        {/* Diode Triangle */}
        <polygon points="120,40 120,120 180,80" fill="#1a73e8" stroke="#174ea6" strokeWidth="2" />

        {/* Cathode Bar */}
        <line x1="180" y1="40" x2="180" y2="120" stroke="#ea4335" strokeWidth="5" />

        {/* Cathode Wire */}
        <line x1="180" y1="80" x2="280" y2="80" stroke="#202124" strokeWidth="3" />
        <text x="220" y="65" fill="#ea4335" fontSize="13" fontWeight="bold">Cathode (−)</text>

        {/* Current Arrow */}
        <line x1="110" y1="140" x2="190" y2="140" stroke="#34a853" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="110" y="155" fill="#34a853" fontSize="11" fontWeight="bold">Forward Current Direction</text>
      </svg>
    );
  }

  if (type === "junction") {
    return (
      <svg
        viewBox="0 0 360 160"
        width={width}
        height={height}
        style={{ background: "#f8fafd", display: "block" }}
      >
        {/* P Region */}
        <rect x="20" y="30" width="120" height="100" fill="#e8f0fe" stroke="#1a73e8" strokeWidth="2" />
        <text x="65" y="55" fill="#1a73e8" fontSize="15" fontWeight="bold">P-Type</text>
        <text x="45" y="80" fill="#174ea6" fontSize="11">Majority: Holes (⊕)</text>
        <text x="40" y="105" fill="#5f6368" fontSize="11">Immobile: Acceptors (−)</text>

        {/* Depletion Region */}
        <rect x="140" y="30" width="80" height="100" fill="#fef7e0" stroke="#f29900" strokeWidth="2" strokeDasharray="4 2" />
        <text x="144" y="22" fill="#e37400" fontSize="11" fontWeight="bold">Depletion Layer</text>
        <text x="148" y="70" fill="#d93025" fontSize="11">− − − | + + +</text>
        <text x="146" y="95" fill="#b06000" fontSize="10">Built-in Barrier</text>
        <text x="156" y="112" fill="#202124" fontSize="10" fontWeight="bold">V₀ ≈ 0.7 V</text>

        {/* N Region */}
        <rect x="220" y="30" width="120" height="100" fill="#fce8e6" stroke="#ea4335" strokeWidth="2" />
        <text x="265" y="55" fill="#d93025" fontSize="15" fontWeight="bold">N-Type</text>
        <text x="238" y="80" fill="#c5221f" fontSize="11">Majority: Electrons (⊖)</text>
        <text x="238" y="105" fill="#5f6368" fontSize="11">Immobile: Donors (+)</text>

        {/* Junction Label */}
        <line x1="180" y1="28" x2="180" y2="132" stroke="#202124" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }

  if (type === "forward") {
    return (
      <svg
        viewBox="0 0 340 160"
        width={width}
        height={height}
        style={{ background: "#ffffff", display: "block" }}
      >
        {/* Forward bias diagram */}
        <rect x="40" y="30" width="110" height="70" fill="#e8f0fe" stroke="#1a73e8" strokeWidth="2" />
        <text x="80" y="55" fill="#1a73e8" fontSize="13" fontWeight="bold">P (+)</text>

        <rect x="150" y="30" width="30" height="70" fill="#fef7e0" stroke="#f29900" strokeWidth="1" strokeDasharray="2 2" />
        <text x="152" y="22" fill="#e37400" fontSize="9">Narrowed</text>

        <rect x="180" y="30" width="110" height="70" fill="#fce8e6" stroke="#ea4335" strokeWidth="2" />
        <text x="225" y="55" fill="#ea4335" fontSize="13" fontWeight="bold">N (−)</text>

        {/* Circuit loop */}
        <path d="M40,65 L15,65 L15,135 L140,135" fill="none" stroke="#202124" strokeWidth="2" />
        <path d="M290,65 L315,65 L315,135 L180,135" fill="none" stroke="#202124" strokeWidth="2" />

        {/* Battery + - */}
        <line x1="140" y1="120" x2="140" y2="150" stroke="#1a73e8" strokeWidth="3" />
        <text x="135" y="115" fill="#1a73e8" fontSize="12" fontWeight="bold">+</text>
        <line x1="160" y1="126" x2="160" y2="144" stroke="#ea4335" strokeWidth="3" />
        <text x="158" y="115" fill="#ea4335" fontSize="12" fontWeight="bold">−</text>
        <line x1="160" y1="135" x2="180" y2="135" stroke="#202124" strokeWidth="2" />

        <text x="100" y="90" fill="#34a853" fontSize="11" fontWeight="bold">Forward Current Flow (I_F) ➔</text>
      </svg>
    );
  }

  if (type === "reverse") {
    return (
      <svg
        viewBox="0 0 340 160"
        width={width}
        height={height}
        style={{ background: "#ffffff", display: "block" }}
      >
        {/* Reverse bias diagram */}
        <rect x="40" y="30" width="90" height="70" fill="#e8f0fe" stroke="#1a73e8" strokeWidth="2" />
        <text x="75" y="55" fill="#1a73e8" fontSize="13" fontWeight="bold">P (−)</text>

        <rect x="130" y="30" width="80" height="70" fill="#fef7e0" stroke="#f29900" strokeWidth="2" strokeDasharray="3 2" />
        <text x="135" y="22" fill="#d93025" fontSize="10" fontWeight="bold">Widened Barrier</text>
        <text x="138" y="70" fill="#5f6368" fontSize="9">Current Blocked</text>

        <rect x="210" y="30" width="90" height="70" fill="#fce8e6" stroke="#ea4335" strokeWidth="2" />
        <text x="245" y="55" fill="#ea4335" fontSize="13" fontWeight="bold">N (+)</text>

        {/* Battery with reversed polarity */}
        <path d="M40,65 L15,65 L15,135 L140,135" fill="none" stroke="#202124" strokeWidth="2" />
        <path d="M300,65 L325,65 L325,135 L180,135" fill="none" stroke="#202124" strokeWidth="2" />

        <line x1="140" y1="126" x2="140" y2="144" stroke="#ea4335" strokeWidth="3" />
        <text x="135" y="115" fill="#ea4335" fontSize="12" fontWeight="bold">−</text>
        <line x1="160" y1="120" x2="160" y2="150" stroke="#1a73e8" strokeWidth="3" />
        <text x="158" y="115" fill="#1a73e8" fontSize="12" fontWeight="bold">+</text>
        <line x1="160" y1="135" x2="180" y2="135" stroke="#202124" strokeWidth="2" />

        <text x="110" y="90" fill="#d93025" fontSize="11">Only leakage current (I₀ ≈ 0)</text>
      </svg>
    );
  }

  // V-I Characteristics Curve
  return (
    <svg
      viewBox="0 0 340 180"
      width={width}
      height={height}
      style={{ background: "#ffffff", display: "block" }}
    >
      {/* Axes */}
      <line x1="40" y1="90" x2="310" y2="90" stroke="#5f6368" strokeWidth="1.5" />
      <text x="290" y="80" fill="#202124" fontSize="11" fontWeight="bold">+V_F (Volts)</text>
      <text x="42" y="80" fill="#5f6368" fontSize="10">−V_R</text>

      <line x1="170" y1="15" x2="170" y2="165" stroke="#5f6368" strokeWidth="1.5" />
      <text x="175" y="25" fill="#202124" fontSize="11" fontWeight="bold">+I_F (mA)</text>
      <text x="175" y="160" fill="#5f6368" fontSize="10">−I_R (µA)</text>

      {/* Forward Curve */}
      <path
        d="M170,90 Q215,90 225,82 Q235,70 245,25"
        fill="none"
        stroke="#1a73e8"
        strokeWidth="2.5"
      />
      {/* Knee Voltage */}
      <line x1="225" y1="90" x2="225" y2="82" stroke="#ea4335" strokeWidth="1.5" strokeDasharray="2 2" />
      <text x="210" y="105" fill="#ea4335" fontSize="10" fontWeight="bold">V_knee = 0.7V (Si)</text>

      {/* Reverse Curve */}
      <path
        d="M170,90 L95,93 L95,150"
        fill="none"
        stroke="#d93025"
        strokeWidth="2"
      />
      {/* Breakdown */}
      <text x="45" y="145" fill="#d93025" fontSize="10">Breakdown (V_BR)</text>
    </svg>
  );
}

