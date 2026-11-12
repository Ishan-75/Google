import { useEffect, useState } from "react";
import { GoogleMicIcon } from "./Icons";

export default function VoiceSearchModal({ isOpen, onClose, onQuerySubmit }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setListening(false);
      setTranscript("");
      return;
    }

    setListening(true);
    let recognition = null;

    // Check for native SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
          if (event.results[current].isFinal) {
            setTimeout(() => {
              onQuerySubmit(text);
              onClose();
            }, 600);
          }
        };

        recognition.onerror = () => {
          setListening(false);
        };

        recognition.onend = () => {
          setListening(false);
        };

        recognition.start();
      } catch {
        setListening(false);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.abort();
        } catch {}
      }
    };
  }, [isOpen, onClose, onQuerySubmit]);

  if (!isOpen) return null;

  function handleQuickVoice(text) {
    setTranscript(text);
    setTimeout(() => {
      onQuerySubmit(text);
      onClose();
    }, 400);
  }

  return (
    <div className="google-modal-overlay" onClick={onClose}>
      <div
        className="google-voice-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="google-dialog-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="voice-dialog-content">
          <p className="voice-status-title">
            {transcript
              ? transcript
              : listening
              ? "Listening..."
              : "Microphone paused"}
          </p>

          <div
            className={`voice-mic-circle ${
              listening ? "listening-active" : ""
            }`}
          >
            <div className="voice-ripple ring-1" />
            <div className="voice-ripple ring-2" />
            <div className="voice-mic-core">
              <GoogleMicIcon size={40} />
            </div>
          </div>

          <p className="voice-hint">
            Say something like <em>"Silukuu"</em>, <em>"cute smile"</em> or{" "}
            <em>"saree"</em>
          </p>

          <div className="voice-chips">
            <button onClick={() => handleQuickVoice("silukuu")}>
              "Silukuu"
            </button>
            <button onClick={() => handleQuickVoice("cute smile")}>
              "Cute smile"
            </button>
            <button onClick={() => handleQuickVoice("saree elegance")}>
              "Saree elegance"
            </button>
            <button onClick={() => handleQuickVoice("all photos")}>
              "All photos"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
