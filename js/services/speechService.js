/**
 * SPEECH SERVICE MODULE
 * Handles Text-to-Speech (read-aloud) and Speech-to-Text (voice input)
 * with robust, honest fallbacks when browser speech services are unavailable.
 */

class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.isSpeaking = false;
    this.isListening = false;
    this.activeSpeakerButton = null;

    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      } catch (err) {
        console.warn("Speech recognition initialization error:", err);
        this.recognition = null;
      }
    }
  }

  /**
   * Reads text aloud using Web Speech API
   * @param {string} text - text to speak
   * @param {string} langCode - 'en', 'hi', or 'mr'
   * @param {HTMLElement} [triggerBtn] - optional button element to toggle visual playing state
   * @param {Function} [onEndCallback] - callback when speech finishes
   */
  speakText(text, langCode = 'hi', triggerBtn = null, onEndCallback = null) {
    if (!this.synth) {
      this.showVoiceNotification(
        "Audio voice output is not supported in this browser environment. Please read the on-screen card.",
        "आवाज आउटपुट इस ब्राउज़र में समर्थित नहीं है। कृपया स्क्रीन पर पढ़ें।"
      );
      return;
    }

    // If currently speaking this same utterance, toggle stop
    if (this.isSpeaking) {
      this.stopSpeaking();
      if (this.activeSpeakerButton === triggerBtn) {
        return;
      }
    }

    try {
      this.synth.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);

      // Select regional locale
      if (langCode === 'hi') {
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9; // Slightly slower for clarity
      } else if (langCode === 'mr') {
        utterance.lang = 'mr-IN';
        utterance.rate = 0.9;
      } else {
        utterance.lang = 'en-IN';
        utterance.rate = 0.95;
      }

      this.isSpeaking = true;
      this.activeSpeakerButton = triggerBtn;
      if (triggerBtn) {
        triggerBtn.classList.add('is-speaking');
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        if (triggerBtn) {
          triggerBtn.classList.remove('is-speaking');
        }
        this.activeSpeakerButton = null;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        this.isSpeaking = false;
        if (triggerBtn) {
          triggerBtn.classList.remove('is-speaking');
        }
        this.activeSpeakerButton = null;
        // Don't crash; notify user politely
      };

      this.synth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      this.isSpeaking = false;
      if (triggerBtn) {
        triggerBtn.classList.remove('is-speaking');
      }
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    if (this.activeSpeakerButton) {
      this.activeSpeakerButton.classList.remove('is-speaking');
      this.activeSpeakerButton = null;
    }
  }

  /**
   * Starts prototype speech recognition with explicit fallback modal
   * @param {string} langCode - 'en', 'hi', or 'mr'
   * @param {Function} onResult - callback with recognized string
   * @param {Function} onFallbackNeeded - callback to open manual fallback dialog
   */
  startVoiceInput(langCode = 'hi', onResult = null, onFallbackNeeded = null) {
    if (!this.recognition) {
      if (onFallbackNeeded) {
        onFallbackNeeded("not_supported");
      }
      return;
    }

    try {
      if (langCode === 'hi') {
        this.recognition.lang = 'hi-IN';
      } else if (langCode === 'mr') {
        this.recognition.lang = 'mr-IN';
      } else {
        this.recognition.lang = 'en-IN';
      }

      this.isListening = true;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        this.isListening = false;
        const transcript = event.results[0][0].transcript;
        if (onResult) {
          onResult(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("Voice recognition error:", event.error);
        this.isListening = false;
        if (onFallbackNeeded) {
          onFallbackNeeded(event.error);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    } catch (err) {
      console.warn("Failed to start speech recognition:", err);
      this.isListening = false;
      if (onFallbackNeeded) {
        onFallbackNeeded("exception");
      }
    }
  }

  showVoiceNotification(msgEn, msgHi) {
    const toast = document.getElementById('global-toast');
    if (toast) {
      toast.textContent = msgHi || msgEn;
      toast.classList.add('visible');
      setTimeout(() => {
        toast.classList.remove('visible');
      }, 4000);
    } else {
      alert(msgEn);
    }
  }
}

// Global instance
const speechService = new SpeechService();
