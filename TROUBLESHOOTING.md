# 🔧 Ball and Wall - Deployment Troubleshooting Guide

## 🚨 Common Issues and Solutions

### Issue 1: GitHub Actions Build Failure
**Error**: `npm error could not determine executable to run`

**Cause**: Grunt not found in GitHub Actions environment

**Solution**: ✅ **FIXED** - Updated workflow to use `npm run grunt-build` instead of `npx grunt build`

### Issue 2: Bower Permission Errors
**Error**: `EACCES: permission denied`

**Solution**:
```bash
npx bower install --allow-root
```

### Issue 3: Node.js Version Issues
**Error**: `Module not found` or build failures

**Solution**:
- Use Node.js v14 or higher
- Check version: `node --version`
- Update if needed: `nvm install 18 && nvm use 18`

### Issue 4: Missing Dependencies
**Error**: `Cannot find module` errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npx bower install --allow-root
```

### Issue 5: Grunt Build Failures
**Error**: `Warning: Task "build" not found`

**Solution**:
```bash
# Install Grunt locally
npm install grunt grunt-cli

# Run build
npx grunt build
```

## 🛠️ Debugging Steps

### 1. Check Local Build
```bash
# Test locally first
npm run build

# Verify output
ls -la index.html dist/output.min.js
```

### 2. Check GitHub Actions Logs
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Click on the failed workflow
4. Check the build step logs

### 3. Verify Package.json Scripts
```json
{
  "scripts": {
    "build": "npm run install-deps && npm run grunt-build",
    "install-deps": "npm install && npx bower install --allow-root",
    "grunt-build": "npx grunt build"
  }
}
```

### 4. Test Individual Steps
```bash
# Step 1: Install dependencies
npm install
npx bower install --allow-root

# Step 2: Run Grunt
npx grunt build

# Step 3: Verify output
ls -la index.html dist/
```

## 🔍 GitHub Actions Workflow Fixes

### Fixed Workflow (`.github/workflows/build.yml`)
```yaml
name: Build and Test

on:
  push:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: |
        npm install
        npx bower install --allow-root
        
    - name: Build project
      run: npm run build  # Uses package.json scripts
        
    - name: Verify build output
      run: |
        ls -la index.html
        ls -la dist/output.min.js
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 2: GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use the `dist/` folder as source
3. Build will be automatic

### Option 3: Manual Upload
```bash
# Build locally
npm run build

# Upload these files to any static host:
# - index.html
# - levels-editor.html
# - dist/ folder
# - img/ folder
# - css/ folder
```

## 📊 Build Verification

### Successful Build Output
```
✅ Build completed successfully!

📁 Generated files:
   - index.html (3,137 bytes)
   - levels-editor.html (3,200 bytes)
   - dist/output.min.js (295,490 bytes)
   - dist/*.css files (159,530 bytes total)
```

### File Structure After Build
```
ball-and-wall/
├── index.html              # Main game
├── levels-editor.html      # Level editor
├── dist/
│   ├── output.min.js      # Minified JavaScript
│   ├── *.css              # Minified CSS files
│   └── fonts.css          # Font styles
├── img/                   # Game assets
└── css/                   # Source CSS
```

## 🆘 Getting Help

### If Build Still Fails
1. **Check Node.js version**: `node --version` (should be v14+)
2. **Clear cache**: `npm cache clean --force`
3. **Fresh install**: Delete `node_modules` and reinstall
4. **Check logs**: Look for specific error messages
5. **Test locally**: Run `npm run build` on your machine first

### Contact Support
- Check GitHub Issues in the repository
- Review GitHub Actions logs
- Test the build process locally
- Verify all dependencies are installed

---

**🎯 The main issue was using `npx grunt build` instead of `npm run grunt-build` in GitHub Actions. This has been fixed!**
