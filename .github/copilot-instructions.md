# Mobile Business Card Web App - Project Setup Guide

## Overview
This is a React + Vite + Tailwind CSS project for a mobile-first business card web app with QR code generation.

## Project Status
- ✅ Project structure created
- ⏳ Awaiting Node.js installation and npm dependencies setup
- ⏳ Ready for customization

## Getting Started

### Step 1: Install Node.js
Node.js is required to run this project. If you haven't installed it yet:

**Option A: Download from nodejs.org (Recommended)**
1. Visit https://nodejs.org
2. Download the LTS (Long Term Support) version
3. Follow the installation instructions for macOS
4. Verify installation: Open terminal and run `node --version`

**Option B: Use a Package Manager**
- If you have MacPorts: `sudo port install nodejs20`
- Other options available at https://nodejs.org/en/download/package-manager

### Step 2: Install Dependencies
Once Node.js is installed, run:
```bash
cd ~/Documents/AI-BC
npm install
```

### Step 3: Customize Your Business Card
Edit `src/App.jsx` and update the `cardInfo` object with:
- Your name
- Your title/position
- Your email address
- Your phone number
- Your website
- Your preferred color (hex code)

### Step 4: Start Development Server
```bash
npm run dev
```
Your app will be available at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
```
This creates optimized files in the `dist/` folder ready for deployment.

## Key Files to Customize

| File | Purpose |
|------|---------|
| [src/App.jsx](../src/App.jsx) | **MAIN FILE** - Update your contact info and choose your brand color here |
| [index.html](../index.html) | HTML template - Update title and meta tags if needed |
| [tailwind.config.js](../tailwind.config.js) | Theme configuration - Customize colors and fonts |

## Dependencies Installed

- `react` - UI framework
- `react-dom` - React DOM rendering
- `qrcode.react` - QR code generation
- `vite` - Build tool
- `tailwindcss` - CSS framework

## npm Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build locally
```

## Architecture

The app is a simple single-page application:
- **App.jsx**: Main component with business card UI and QR code generation
- **App.css**: Component-specific styles
- **index.css**: Global Tailwind and base styles
- **main.jsx**: React entry point
- **index.html**: HTML template

## QR Code Details

The QR code encodes contact information using the **vCard 3.0 format**, which is:
- Universally supported on iOS, Android, and desktop
- Compatible with all standard phone QR code readers
- Automatically saves to contacts when scanned

## Customization Tips

1. **Change Colors**: Update `profileColor` in `src/App.jsx` to any hex color
2. **Update Fields**: Add or remove contact fields in the JSX
3. **Adjust Layout**: Tailwind CSS classes can be modified for different layouts
4. **Responsive Design**: Already optimized for mobile (375px) to large screens

## Deployment Options

1. **GitHub Pages**: Free, automatic deployments
2. **Netlify**: Free tier with custom domain support
3. **Vercel**: Optimized for React projects, free tier available
4. **Traditional host**: Deploy the `dist/` folder contents

See [README.md](../README.md) for detailed deployment instructions.

## Troubleshooting

**"npm: command not found"**
- Node.js is not installed. Follow Step 1 above.

**Port 5173 already in use**
- The dev server will try the next available port automatically
- Or specify port: `npm run dev -- --port 3000`

**QR code not showing**
- Run `npm install` to ensure dependencies are installed
- Refresh browser cache

**Module not found errors**
- Delete `node_modules` folder
- Run `npm install` again

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Edit your contact info in `src/App.jsx`
4. ✅ Run `npm run dev`
5. ✅ Test on your phone (open on network if mobile)
6. ✅ Deploy when ready

Enjoy your mobile business card! 🚀
