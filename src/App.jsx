import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Mail, Phone, Globe, Edit2, Check, X } from 'react-feather';
import './App.css';

function App() {
  // Configuration - Update these with your information
  const [cardInfo, setCardInfo] = useState({
    name: 'Mustapha Amraoui',
    title: 'Web Designer',
    email: 'mustapha@growth4u.co',
    phone: '+212 721176808',
    website: 'https://growth4u.co',
    profileColor: '#0A84FF', // Apple Blue
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(cardInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(cardInfo);
  };

  const handleSave = () => {
    setCardInfo(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(cardInfo);
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
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
                  onClick={handleEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit card"
                >
                  <Edit2 size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                    title="Save changes"
                  >
                    <Check size={18} className="text-green-500" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Cancel editing"
                  >
                    <X size={18} className="text-red-500" />
                  </button>
                </div>
              )}
            </div>

            {/* QR Code Section - Top */}
            <div className="flex flex-col items-center mb-8">
              <div 
                className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#f5f5f7' }}
              >
                <QRCode
                  value={generateVCard()}
                  size={140}
                  level="H"
                  includeMargin={true}
                  renderAs="canvas"
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-4 font-400">
                Tap to save contact
              </p>
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
