#!/bin/bash

# Ball and Wall - Deployment Script
# This script handles the complete deployment process

set -e  # Exit on any error

echo "🎮 Ball and Wall - Deployment Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_status "Node.js is available (version: $(node --version))"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "npm is available (version: $(npm --version))"

# Install npm dependencies
print_status "Installing npm dependencies..."
npm install

# Install bower dependencies
print_status "Installing bower dependencies..."
npx bower install --allow-root

# Run Grunt build
print_status "Running Grunt build..."
npm run grunt-build

# Verify build output
print_status "Verifying build output..."
if [ -f "index.html" ] && [ -f "dist/output.min.js" ]; then
    print_status "Build completed successfully!"
    echo ""
    echo "📁 Generated files:"
    echo "   - index.html ($(wc -c < index.html) bytes)"
    echo "   - levels-editor.html ($(wc -c < levels-editor.html) bytes)"
    echo "   - dist/output.min.js ($(wc -c < dist/output.min.js) bytes)"
    echo "   - dist/*.css files"
    echo ""
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Deployment options:"
    echo "   1. Vercel: vercel --prod"
    echo "   2. Local: npm run preview"
    echo "   3. Static host: Upload all files"
else
    print_error "Build failed! Check the output above for errors."
    exit 1
fi
