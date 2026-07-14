import { useCallback, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Settings } from 'lucide-react';
import { useBusinessCard } from './hooks/useBusinessCard';
import { generateVCard } from './utils/vcard';
import { QRModal } from './components/QRModal';
import { ActionBar } from './components/ActionBar';
import { ContactFields } from './components/ContactFields';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  const {
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
  } = useBusinessCard();

  const accent = cardInfo.profileColor || '#0A84FF';
  const hasProfile = Boolean(cardInfo.name?.trim());

  return (
    <div className="flex h-full min-h-screen w-full items-stretch justify-center bg-white">
      {showSplash && (
        <SplashScreen
          name={cardInfo.name}
          accentColor={accent}
          onFinish={handleSplashFinish}
        />
      )}

      {!showSplash && needsSetup && (
        <OnboardingScreen
          initialValues={cardInfo}
          accentColor={accent}
          onSave={saveProfile}
          onCancel={hasProfile ? closeSetup : undefined}
        />
      )}

      {!showSplash && !needsSetup && (
        <div className="flex w-full max-w-md flex-col animate-[splash-rise_0.45s_ease-out]">
          {showQRModal && (
            <QRModal card={cardInfo} onClose={() => setShowQRModal(false)} />
          )}

          <div className="flex min-h-screen w-full flex-1 flex-col bg-white">
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={openSetup}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  title="Update my info"
                  aria-label="Update my info"
                >
                  <Settings size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {cardInfo.name}
                </h1>
                <p
                  className="mt-3 text-base font-medium tracking-wide"
                  style={{ color: cardInfo.profileColor }}
                >
                  {cardInfo.title}
                </p>
              </div>

              <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              <ContactFields card={cardInfo} />

              <div className="mt-auto space-y-2 pt-10 text-center">
                <p className="text-sm font-normal text-gray-400">Growth4u Connect</p>
                <p className="text-xs font-light text-gray-300">
                  Developed with ❤️ by Growth4u
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
