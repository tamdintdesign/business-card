import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Mail, Phone, Globe, Edit2, Check, X, Copy, Download, Share2 } from 'react-feather';
import './App.css';

const STORAGE_KEY = 'businessCardInfo';

function App() {
  // Configuration - Update these with your information
  const defaultCard = {
    name: 'Oumaima Essaid',
    title: 'Traffic Manager',
    email: 'oumaima@growth4u.co',
    phone: '+212 624-089740',
    website: 'https://growth4u.co',
    profileColor: '#0A84FF', // Apple Blue
  };

  const [cardInfo, setCardInfo] = useState(() => {
    try {
      const savedCard = window.localStorage.getItem(STORAGE_KEY);
      return savedCard ? JSON.parse(savedCard) : defaultCard;
    } catch (err) {
      console.error('Failed to read saved card data', err);
      return defaultCard;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(cardInfo);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [saveFeedback, setSaveFeedback] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    setEditData(cardInfo);
  }, [cardInfo]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cardInfo));
    } catch (err) {
      console.error('Failed to save card data', err);
    }
  }, [cardInfo]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...cardInfo });
  };

  const handleSave = () => {
    setCardInfo((current) => ({ ...current, ...editData }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(editData));
    setIsEditing(false);
    setSaveFeedback('Saved!');
    setTimeout(() => setSaveFeedback(''), 2000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(cardInfo);
  };

  const handleInputChange = (field, value) => {
    setEditData((current) => ({ ...current, [field]: value }));
  };

  // Copy contact info to clipboard
  const handleCopyContact = async () => {
    const contactText = `${cardInfo.name}\n${cardInfo.title}\n${cardInfo.email}\n${cardInfo.phone}\n${cardInfo.website}`;
    try {
      await navigator.clipboard.writeText(contactText);
      setCopyFeedback('Copied to clipboard!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      setCopyFeedback('Failed to copy');
    }
  };

  // Download vCard file
  const handleDownloadVCard = () => {
    const vcard = generateVCard();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vcard));
    element.setAttribute('download', `${cardInfo.name.replace(/\s+/g, '_')}.vcf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Share contact
  const handleShare = async () => {
    const contactText = `Check out ${cardInfo.name}'s digital business card: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardInfo.name}'s Business Card`,
          text: contactText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy share link
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopyFeedback('Link copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 2000);
      } catch (err) {
        setCopyFeedback('Failed to copy link');
      }
    }
  };

  // Generate vCard format for QR code (includes all contact information)
  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${cardInfo.name}
TITLE:${cardInfo.title}
TEL:${cardInfo.phone}
EMAIL:${cardInfo.email}
URL:${cardInfo.website}
END:VCARD`;
    return vcard;
  };

  return (
    <div className="min-h-screen min-w-screen w-full h-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* QR Code Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-lg w-full">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Scan to Save Contact</h2>
              <div 
                className="p-6 rounded-2xl bg-gray-50 mb-6"
              >
                <QRCode
                  value={generateVCard()}
                  size={280}
                  level="H"
                  includeMargin={true}
                  renderAs="canvas"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mb-4">
                Hold your camera steady and point at the QR code
              </p>
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-500 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Business Card */}
        <div className="w-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl sm:rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Card Content */}
          <div className="p-6 sm:p-8">
            {/* Edit Button */}
            <div className="flex justify-end mb-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit card"
                >
                  <Edit2 size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition-colors"
                    title="Save changes"
                  >
                    <Check size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-700 transition-colors"
                    title="Cancel editing"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* QR Code Section - Top */}
            <div className="flex flex-col items-center mb-8">
              <div 
                className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-105"
                style={{ backgroundColor: '#f5f5f7' }}
                onClick={() => setShowQRModal(true)}
                title="Click to expand QR code"
              >
                <QRCode
                  value={generateVCard()}
                  size={160}
                  level="H"
                  includeMargin={true}
                  renderAs="canvas"
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-4 font-400">
                Tap to expand • Scan to save contact
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={handleCopyContact}
                  className="flex items-center gap-2 px-3 py-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                  title="Copy contact info"
                >
                  <Copy size={16} />
                  <span>Copy</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="flex items-center gap-2 px-3 py-2 text-xs bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                  title="Download as vCard"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-2 text-xs bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"
                  title="Share contact"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>

              {/* Save/Copy Feedback */}
              {(copyFeedback || saveFeedback) && (
                <p className="text-center text-xs text-green-600 mt-2 font-500">
                  ✓ {copyFeedback || saveFeedback}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

            {/* Profile Section */}
            <div className="text-center mb-8">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-bold"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-base font-500"
                    placeholder="Title"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-700 text-gray-900 tracking-tight">
                    {cardInfo.name}
                  </h1>
                  <p
                    className="text-base font-500 mt-3 tracking-wide"
                    style={{ color: cardInfo.profileColor }}
                  >
                    {cardInfo.title}
                  </p>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center group transition-all duration-200">
                <Mail 
                  size={20}
                  className="mr-4 transition-transform group-hover:scale-110 flex-shrink-0"
                  style={{ color: cardInfo.profileColor }}
                />
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Email"
                  />
                ) : (
                  <a
                    href={`mailto:${cardInfo.email}`}
                    className="text-gray-600 text-sm hover:text-gray-900 break-all flex-1 font-400"
                  >
                    {cardInfo.email}
                  </a>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center group transition-all duration-200">
                <Phone 
                  size={20}
                  className="mr-4 transition-transform group-hover:scale-110 flex-shrink-0"
                  style={{ color: cardInfo.profileColor }}
                />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Phone"
                  />
                ) : (
                  <a
                    href={`tel:${cardInfo.phone}`}
                    className="text-gray-600 text-sm hover:text-gray-900 font-400"
                  >
                    {cardInfo.phone}
                  </a>
                )}
              </div>

              {/* Website */}
              <div className="flex items-center group transition-all duration-200">
                <Globe 
                  size={20}
                  className="mr-4 transition-transform group-hover:scale-110 flex-shrink-0"
                  style={{ color: cardInfo.profileColor }}
                />
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Website"
                  />
                ) : (
                  <a
                    href={cardInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-sm hover:text-gray-900 break-all flex-1 font-400"
                  >
                    {cardInfo.website.replace('https://', '').replace('http://', '')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-gray-400 text-sm font-400">Growth4u Connect</p>
          <p className="text-gray-300 text-xs font-300">Developed with ❤️ by Growth4u</p>
        </div>
      </div>
    </div>
  );
}

export default App;
