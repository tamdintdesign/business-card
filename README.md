# Mobile Business Card Web App

A beautiful, mobile-first web application that displays your business card with a QR code. People can scan the QR code to instantly add your contact information to their phone.

## Features

✨ **Mobile-First Design** - Optimized for viewing on smartphones  
📱 **Responsive Layout** - Works seamlessly on all screen sizes  
🎨 **Professional Styling** - Built with Tailwind CSS for a modern look  
📲 **QR Code Generator** - Automatically generates a vCard QR code with all your contact info  
⚡ **Fast & Lightweight** - Built with React and Vite for optimal performance  
📧 **Contact Links** - Click on email, phone, or website for direct actions  

## Customization

Edit [src/App.jsx](src/App.jsx) to update your information:

```javascript
const [cardInfo] = useState({
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  website: 'https://yourwebsite.com',
  profileColor: '#3B82F6', // Change to your preferred color
});
```

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher with npm)
  - [Download Node.js](https://nodejs.org/)

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd ~/Documents/AI-BC
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Customize your business card:**
   - Open [src/App.jsx](src/App.jsx)
   - Update the `cardInfo` object with your personal information
   - Choose your preferred `profileColor` (use any hex color code)

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build files will be generated in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a repository on GitHub
2. Push your code to the repository
3. Configure GitHub Pages in repo settings to deploy from `dist/` folder
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Connect your GitHub repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`
4. Your site will be auto-deployed

### Option 3: Vercel (Free)
1. Import your project to Vercel
2. It will automatically detect it's a Vite React app
3. Your site will be live at your custom domain

## How QR Code Works

The QR code encodes your contact information in vCard format (v3.0), which is the international standard for digital business cards. When someone scans the QR code with their phone camera or a QR code reader:

- **iOS**: Opens a prompt to save contact
- **Android**: Opens a prompt to save contact
- **Desktop**: Can be decoded to see contact info

## Project Structure

```
├── src/
│   ├── App.jsx          # Main component with business card
│   ├── App.css          # Component styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── .gitignore          # Git ignore rules
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **QR Code React** - QR code generation library

## Troubleshooting

### npm install fails
- Make sure Node.js is installed: `node --version`
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Port 5173 is already in use
- The dev server will automatically try the next available port
- Alternatively, specify a different port: `npm run dev -- --port 3000`

### QR Code not displaying
- Make sure all dependencies are installed: `npm install`
- Clear browser cache and refresh
- Check browser console for any errors

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, refer to:
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
