import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_CARD, STORAGE_KEY } from '../constants/defaultCard';

function readStoredCard() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_CARD, ...JSON.parse(saved) } : DEFAULT_CARD;
  } catch (err) {
    console.error('Failed to read saved card data', err);
    return DEFAULT_CARD;
  }
}

export function useBusinessCard() {
  const [cardInfo, setCardInfo] = useState(readStoredCard);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(cardInfo);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [saveFeedback, setSaveFeedback] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const feedbackTimeoutRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cardInfo));
    } catch (err) {
      console.error('Failed to save card data', err);
    }
  }, [cardInfo]);

  useEffect(() => {
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

  const startEditing = useCallback(() => {
    setEditData({ ...cardInfo });
    setIsEditing(true);
  }, [cardInfo]);

  const saveEdits = useCallback(() => {
    setCardInfo((current) => ({ ...current, ...editData }));
    setIsEditing(false);
    showTemporaryFeedback(setSaveFeedback, 'Saved!');
  }, [editData, showTemporaryFeedback]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditData(cardInfo);
  }, [cardInfo]);

  const updateField = useCallback((field, value) => {
    setEditData((current) => ({ ...current, [field]: value }));
  }, []);

  const showCopyFeedback = useCallback(
    (message) => {
      showTemporaryFeedback(setCopyFeedback, message);
    },
    [showTemporaryFeedback]
  );

  return {
    cardInfo,
    isEditing,
    editData,
    copyFeedback,
    saveFeedback,
    showQRModal,
    setShowQRModal,
    startEditing,
    saveEdits,
    cancelEditing,
    updateField,
    showCopyFeedback,
  };
}
