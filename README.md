# Ball and Wall - Arkanoid Game

A modern Arkanoid-style game built with JavaScript and CreateJS.

## 🚀 Quick Deployment to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/budnix/ball-and-wall)

### Option 2: Manual Deployment

1. **Fork this repository** to your GitHub account
2. **Install Vercel CLI**: `npm i -g vercel`
3. **Deploy**: `vercel --prod`

### Option 3: Automated Build & Deploy

```bash
# Clone the repository
git clone https://github.com/budnix/ball-and-wall.git
cd ball-and-wall

# Run automated build
./build.sh

# Deploy to Vercel
vercel --prod
```

## 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
```bash
# Install dependencies
npm install
npx bower install --allow-root

# Build the project
npm run build

# Serve locally
npm run preview
```

### Available Scripts
- `npm run build` - Build the entire project
- `npm run dev` - Build and serve locally
- `npm run preview` - Serve the built project
- `npm run install-deps` - Install all dependencies

## 📁 Project Structure

```
ball-and-wall/
├── js/app/           # Game source code
├── css/              # Stylesheets
├── img/              # Game assets
├── dist/             # Built files (generated)
├── index.html        # Main game page
├── levels-editor.html # Level editor
├── Gruntfile.js      # Build configuration
├── package.json      # Dependencies and scripts
├── bower.json        # Frontend dependencies
├── vercel.json       # Vercel deployment config
└── build.sh          # Automated build script
```

## 🔧 Build Process

The build process automatically:
1. Installs npm dependencies
2. Installs bower dependencies
3. Concatenates JavaScript files
4. Minifies JavaScript and CSS
5. Processes HTML templates
6. Generates optimized production files

## 🌐 Deployment Options

### Vercel (Recommended)
- **Automatic builds** on git push
- **Global CDN** for fast loading
- **Custom domains** support
- **Zero configuration** needed

### Other Platforms
- **Netlify**: Works with the same build process
- **GitHub Pages**: Use the `dist/` folder
- **Any static host**: Upload the built files

## 🎮 Game Features

- **Multiple episodes** with unique themes
- **Level editor** for creating custom levels
- **Responsive design** for all screen sizes
- **Touch controls** for mobile devices
- **High scores** and progress tracking
- **Sound effects** and music

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build process
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Live Demo](https://ball-and-wall.vercel.app)
- [GitHub Repository](https://github.com/budnix/ball-and-wall)
- [Vercel Dashboard](https://vercel.com/dashboard)