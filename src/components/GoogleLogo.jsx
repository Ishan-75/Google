export default function GoogleLogo({ compact = false, onClick }) {
  if (compact) {
    return (
      <button
        type="button"
        className="google-logo-btn compact"
        onClick={onClick}
        aria-label="Google home"
      >
        <img
          src="/images/googlelogo_92x30.png"
          alt="Google"
          width="92"
          height="30"
          className="google-natural-logo compact"
          decoding="async"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="google-logo-btn"
      onClick={onClick}
      aria-label="Google"
    >
      <img
        src="/images/googlelogo_272x92.png"
        alt="Google"
        width="272"
        height="92"
        className="google-natural-logo"
        decoding="async"
      />
    </button>
  );
}
