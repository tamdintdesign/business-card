import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_CARD,
  STORAGE_KEY,
  isProfileComplete,
} from '../constants/defaultCard';

function readStoredCard() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_CARD, ...JSON.parse(saved) } : { ...DEFAULT_CARD };
  } catch (err) {
    console.error('Failed to read saved card data', err);
    return { ...DEFAULT_CARD };
  }
}

export function useBusinessCard() {
  const [cardInfo, setCardInfo] = useState(readStoredCard);
  const [needsSetup, setNeedsSetup] = useState(() => !isProfileComplete(readStoredCard()));
  const [copyFeedback, setCopyFeedback] = useState('');
  const [saveFeedback, setSaveFeedback] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const feedbackTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isProfileComplete(cardInfo)) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cardInfo));
    } catch (err) {
      console.error('Failed to save card data', err);
    }
  }, [cardInfo]);

  useEffect(() => {
    if (!cardInfo.name) {
      document.title = 'Growth4u Connect';
      return;
    }

    document.title = `${cardInfo.name} | Business Card`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        `Digital business card for ${cardInfo.name} — scan the QR code to save contact details.`
      );
    }
  }, [cardInfo.name]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const showTemporaryFeedback = useCallback((setter, message) => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    setter(message);
    feedbackTimeoutRef.current = setTimeout(() => {
      setter('');
      feedbackTimeoutRef.current = null;
    }, 2000);
  }, []);

  const saveProfile = useCallback(
    (profile) => {
      const next = { ...DEFAULT_CARD, ...cardInfo, ...profile };
      setCardInfo(next);
      setNeedsSetup(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save card data', err);
      }
      showTemporaryFeedback(setSaveFeedback, 'Saved!');
    },
    [cardInfo, showTemporaryFeedback]
  );

  const openSetup = useCallback(() => {
    setNeedsSetup(true);
  }, []);

  const closeSetup = useCallback(() => {
    if (isProfileComplete(cardInfo)) {
      setNeedsSetup(false);
    }
  }, [cardInfo]);

  const showCopyFeedback = useCallback(
    (message) => {
      showTemporaryFeedback(setCopyFeedback, message);
    },
    [showTemporaryFeedback]
  );

  return {
    cardInfo,
    needsSetup,
    copyFeedback,
    saveFeedback,
    showQRModal,
    setShowQRModal,
    saveProfile,
    openSetup,
    closeSetup,
    showCopyFeedback,
  };
}
