# Mobile Business Card Web App

A mobile-first web app that displays a digital business card with a scannable vCard QR code.

## Features

- Mobile-first full-screen layout
- Editable contact fields with localStorage persistence
- vCard QR code (tap to expand)
- Copy, download (.vcf), and share actions
- Splash screen
- Built with React 19, Vite, and Tailwind CSS

## Customization

Edit [src/constants/defaultCard.js](src/constants/defaultCard.js):

```javascript
export const DEFAULT_CARD = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  website: 'https://yourwebsite.com',
  profileColor: '#0A84FF',
};
```

## Setup

Prerequisites: Node.js 20+ and npm.

```bash
cd business-card
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

Production output is written to `dist/`. On GitHub Pages the base path is `/business-card/`.

## Project Structure

```
src/
  App.jsx
  main.jsx
  index.css
  constants/defaultCard.js
  hooks/useBusinessCard.js
  utils/vcard.js
  components/
    SplashScreen.jsx
    QRModal.jsx
    ActionBar.jsx
    ContactFields.jsx
```

## Technologies

- React 19
- Vite 6
- Tailwind CSS 3
- qrcode.react
- lucide-react

## How the QR Code Works

The QR encodes a vCard 3.0 payload. Scanning with a phone camera usually prompts saving the contact on iOS and Android.

## Android APK

This project includes a Capacitor Android wrapper.

**This Mac cannot build the APK locally** (no Java / Android SDK). Use one of these:

### Option A — GitHub Actions (recommended)

1. Push these changes to GitHub.
2. Open the repo → **Actions** → **Build Android APK** → **Run workflow**.
3. When it finishes, download the **growth4u-connect-debug** artifact (contains `app-debug.apk`).
4. Copy the APK to your phone and open it to install (enable “Install unknown apps” if asked).

### Option B — Android Studio on your computer

1. Install [Android Studio](https://developer.android.com/studio).
2. Run:

```bash
npm run cap:sync
npm run cap:open
```

3. In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.

## License

MIT
