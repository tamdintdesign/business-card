import { useCallback, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Check, Edit2, X } from 'lucide-react';
import { useBusinessCard } from './hooks/useBusinessCard';
import { generateVCard } from './utils/vcard';
import { QRModal } from './components/QRModal';
import { ActionBar } from './components/ActionBar';
import { ContactFields } from './components/ContactFields';
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  const {
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
  } = useBusinessCard();

  return (
    <div className="flex h-full min-h-screen w-full items-stretch justify-center bg-white">
      {showSplash && (
        <SplashScreen
          name={cardInfo.name}
          accentColor={cardInfo.profileColor}
          onFinish={handleSplashFinish}
        />
      )}

      <div
        className={`flex w-full max-w-md flex-col transition-all duration-500 ease-out ${
          showSplash
            ? 'translate-y-3 scale-[0.98] opacity-0'
            : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        {showQRModal && (
          <QRModal card={cardInfo} onClose={() => setShowQRModal(false)} />
        )}

        <div className="flex min-h-screen w-full flex-1 flex-col bg-white">
          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <div className="mb-4 flex justify-end">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={startEditing}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  title="Edit card"
                >
                  <Edit2 size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={saveEdits}
                    className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-green-700 transition-colors hover:bg-green-100"
                    title="Save changes"
                  >
                    <Check size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-red-700 transition-colors hover:bg-red-100"
                    title="Cancel editing"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mb-8 flex flex-col items-center">
              <button
                type="button"
                className="cursor-pointer rounded-2xl p-5 transition-transform duration-300 hover:scale-105"
                style={{ backgroundColor: '#f5f5f7' }}
                onClick={() => setShowQRModal(true)}
                title="Click to expand QR code"
                aria-label="Expand QR code"
              >
                <QRCodeCanvas
                  value={generateVCard(cardInfo)}
                  size={160}
                  level="H"
                  includeMargin
                />
              </button>
              <p className="mt-4 text-center text-xs font-normal text-gray-400">
                Tap to expand • Scan to save contact
              </p>

              <ActionBar
                card={cardInfo}
                copyFeedback={copyFeedback}
                saveFeedback={saveFeedback}
                onCopyFeedback={showCopyFeedback}
              />
            </div>

            <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            <div className="mb-8 text-center">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(event) => updateField('title', event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Title"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {cardInfo.name}
                  </h1>
                  <p
                    className="mt-3 text-base font-medium tracking-wide"
                    style={{ color: cardInfo.profileColor }}
                  >
                    {cardInfo.title}
                  </p>
                </>
              )}
            </div>

            <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            <ContactFields
              card={cardInfo}
              isEditing={isEditing}
              editData={editData}
              onFieldChange={updateField}
            />

            <div className="mt-auto space-y-2 pt-10 text-center">
              <p className="text-sm font-normal text-gray-400">Growth4u Connect</p>
              <p className="text-xs font-light text-gray-300">
                Developed with ❤️ by Growth4u
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
