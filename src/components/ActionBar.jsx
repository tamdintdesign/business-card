import { Copy, Download, Share2 } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';

export function ActionBar({ card, copyFeedback, saveFeedback, onCopyFeedback }) {
  const handleCopyContact = async () => {
    const contactText = [
      card.name,
      card.title,
      card.email,
      card.phone,
      card.website,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(contactText);
      onCopyFeedback('Copied to clipboard!');
    } catch {
      onCopyFeedback('Failed to copy');
    }
  };

  const handleShare = async () => {
    const contactText = `Check out ${card.name}'s digital business card: ${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.name}'s Business Card`,
          text: contactText,
        });
      } catch {
        // User cancelled share sheet
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      onCopyFeedback('Link copied to clipboard!');
    } catch {
      onCopyFeedback('Failed to copy link');
    }
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleCopyContact}
          className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-600 transition-colors hover:bg-blue-100"
          title="Copy contact info"
        >
          <Copy size={16} />
          <span>Copy</span>
        </button>
        <button
          type="button"
          onClick={() => downloadVCard(card)}
          className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-600 transition-colors hover:bg-green-100"
          title="Download as vCard"
        >
          <Download size={16} />
          <span>Download</span>
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-xs text-purple-600 transition-colors hover:bg-purple-100"
          title="Share contact"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>

      {(copyFeedback || saveFeedback) && (
        <p className="mt-2 text-center text-xs font-medium text-green-600">
          ✓ {copyFeedback || saveFeedback}
        </p>
      )}
    </>
  );
}
