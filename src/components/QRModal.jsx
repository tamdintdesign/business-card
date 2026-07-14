import { useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { generateVCard } from '../utils/vcard';

export function QRModal({ card, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-lg flex-col items-center rounded-3xl bg-white p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="qr-modal-title" className="mb-4 text-xl font-bold text-gray-900">
          Scan to Save Contact
        </h2>
        <div className="mb-6 rounded-2xl bg-gray-50 p-6">
          <QRCodeCanvas
            value={generateVCard(card)}
            size={280}
            level="H"
            includeMargin
          />
        </div>
        <p className="mb-4 text-center text-sm text-gray-600">
          Hold your camera steady and point at the QR code
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
