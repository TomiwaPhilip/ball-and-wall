#!/bin/bash

# Ball and Wall - Automated Build Script
# This script automates the entire build process for deployment

set -e  # Exit on any error

echo "🎮 Ball and Wall - Automated Build Process"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Install bower dependencies
echo "📦 Installing bower dependencies..."
npx bower install --allow-root

# Run Grunt build
echo "🔨 Running Grunt build..."
npx grunt build

# Check if build was successful
if [ -f "index.html" ] && [ -f "dist/output.min.js" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Output files:"
    echo "   - index.html"
    echo "   - levels-editor.html"
    echo "   - dist/output.min.js"
    echo "   - dist/*.css"
    echo ""
    echo "🚀 Ready for deployment!"
    echo "   You can now:"
    echo "   1. Deploy to Vercel: vercel --prod"
    echo "   2. Serve locally: npm run preview"
    echo "   3. Open index.html in your browser"
else
    echo "❌ Build failed! Check the output above for errors."
    exit 1
fi
