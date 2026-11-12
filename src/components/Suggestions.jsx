export default function Suggestions({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className="suggestions-list" role="listbox">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion}
          className="suggestion-item"
          onClick={() => onSelect(suggestion)}
          role="option"
        >
          <span className="suggestion-text">{suggestion}</span>
        </li>
      ))}
    </ul>
  );
}
