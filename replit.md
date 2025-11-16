# AI Hand Gesture Recognition System

## Overview

A pure frontend web application that uses AI to recognize hand gestures in real-time through webcam input. The system translates basic sign language gestures (like "Yes," "No," "Stop," "OK," and "I Love You") into text and provides visual feedback with confidence scores. Designed for accessibility evaluation and demonstration purposes, particularly for judges assessing gesture recognition accuracy and usability in competitive or educational settings.

**This is a static site that can be deployed to GitHub Pages, Netlify, Vercel, or any static hosting service.**

## Recent Changes (November 16, 2025)

### Serverless Migration
- ✅ Removed all backend/server code - now 100% frontend only
- ✅ Converted to static site deployable to GitHub Pages
- ✅ All functionality maintained (gesture recognition, stats, history, text-to-speech)
- ✅ Session data now stored in React state (no database needed)
- ✅ Simplified deployment - just build and host static files

## Previous Changes (November 7, 2025)

### Completed Implementation
- ✅ Full TensorFlow.js integration with Google Teachable Machine model
- ✅ Real-time webcam gesture detection with prediction loop
- ✅ Backend API for session and prediction persistence
- ✅ Complete frontend UI with all interactive components
- ✅ Session tracking with statistics (total recognitions, average confidence, recognition rate)
- ✅ Text-to-speech output for recognized gestures
- ✅ Dark/light mode support
- ✅ Responsive design for desktop, tablet, and mobile

### Bug Fixes
- Fixed date handling in session persistence (ISO string to Date conversion)
- Added error logging for all API mutations
- Proper session lifecycle management (create, update, close)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool

**UI Component System:** 
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Material Design principles with accessibility enhancements
- Custom typography using Inter (primary) and Roboto Mono (data display)

**State Management:**
- React hooks for local component state
- TanStack Query (React Query) for server state management and API calls
- Session-based tracking of gesture recognition metrics

**Routing:**
- Wouter for lightweight client-side routing
- Single-page application with minimal route structure

**Layout System:**
- Two-column desktop layout (60% webcam feed / 40% data panel)
- Responsive single-column mobile layout with vertical stacking
- Consistent spacing using Tailwind's spacing units (4, 6, 8)

### AI/ML Layer

**Gesture Recognition:**
- Google Teachable Machine integration via `@teachablemachine/image` library
- TensorFlow.js (`@tensorflow/tfjs`) for client-side model inference
- Pre-trained model hosted at: https://teachablemachine.withgoogle.com/models/BOtrRZ4ho/
- Real-time webcam processing with prediction loop using requestAnimationFrame
- Gesture classes: Yes (👍), No (👎), Stop (✋), OK (👌), I Love You (🤟)

**Prediction Pipeline:**
- Webcam video stream captured via MediaDevices API
- Frame-by-frame analysis through TensorFlow model
- Confidence scores calculated for each gesture class
- Threshold-based gesture detection (>70% for display, >80% for recording)

### Data Management

**State Management:**
- All session data stored in React state (no backend required)
- Statistics calculated in real-time from local state
- Prediction history maintained in component state
- Session lifecycle managed entirely in browser

**Data Persistence:**
- Session data resets on page refresh (intentional for privacy)
- No external database or API calls
- All processing happens client-side

### Component Architecture

**Core Components:**

1. **WebcamFeed** (`client/src/components/WebcamFeed.tsx`)
   - Video capture with MediaDevices API
   - Visual feedback overlay with current gesture and confidence
   - Active border pulse during high-confidence detection (>80%)
   - Error handling for camera permissions

2. **GestureCard** (`client/src/components/GestureCard.tsx`)
   - Large display of current recognized gesture with emoji representation
   - Confidence badge showing percentage
   - Hover elevation for interactive feel

3. **ConfidenceMeter** (`client/src/components/ConfidenceMeter.tsx`)
   - Real-time horizontal progress bars showing confidence levels for all gesture classes
   - Sorted by confidence (highest first)
   - Percentage labels and smooth transitions

4. **PredictionHistory** (`client/src/components/PredictionHistory.tsx`)
   - Scrollable timeline of recent predictions with timestamps
   - Limited to last 10 predictions
   - Monospace font for timestamps

5. **StatsPanel** (`client/src/components/StatsPanel.tsx`)
   - Dashboard metrics displaying:
     - Total recognitions
     - Average confidence percentage
     - Recognition rate (detections per second)

6. **ControlPanel** (`client/src/components/ControlPanel.tsx`)
   - User controls for:
     - Camera toggle (Start/Stop)
     - Speech synthesis toggle
     - Dark/light mode toggle

**Component Communication:**
- Props-based data flow from parent (Home page) to child components
- Callback functions for user interactions
- Refs for direct DOM manipulation (video element access)

### Real-time Features

**Webcam Processing:**
- Continuous prediction loop checking gesture every animation frame
- Automatic gesture change detection with debouncing
- Performance optimizations to prevent excessive re-renders

**Text-to-Speech:**
- Web Speech API integration for accessibility
- Automatic announcement of recognized gestures when enabled
- Adjustable speech rate (1.2x speed)

**Visual Feedback:**
- Animated border pulse on high-confidence detection (>80%)
- Real-time confidence bar updates with smooth transitions
- Gesture emoji display with immediate updates

**Session Persistence:**
- Automatic session creation when camera starts
- Real-time updates of session statistics after each gesture
- Session closure with endTime when camera stops
- All predictions saved with sessionId reference

## External Dependencies

### Third-Party Services

**Google Teachable Machine:**
- Model hosting and serving infrastructure
- Image classification model endpoint
- Required for gesture recognition functionality

### Key Libraries

**UI Framework:**
- React 18+ for component architecture
- Wouter for routing
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- Shadcn UI component library

**Machine Learning:**
- `@teachablemachine/image` - Google's pre-trained model interface
- `@tensorflow/tfjs` - Client-side ML inference engine

**Form & Validation:**
- React Hook Form with Zod resolvers for form handling
- Zod for schema validation and date coercion

**Data Fetching:**
- TanStack Query (React Query) for API state management
- Native Fetch API for HTTP requests

**Database (Configured for future use):**
- `@neondatabase/serverless` - Neon PostgreSQL driver
- Drizzle ORM for type-safe database queries
- Drizzle Kit for schema migrations

**Development Tools:**
- Vite for fast development and optimized builds
- TypeScript for type safety
- ESBuild for server-side bundling

### Browser APIs

- MediaDevices API (getUserMedia) for webcam access
- Web Speech API for text-to-speech synthesis
- RequestAnimationFrame for prediction loop timing
- LocalStorage for dark mode preference persistence

## Development Workflow

### Running the Application
1. Start the development server: `npm run dev`
2. The app will be available at http://localhost:5000
3. Allow camera permissions when prompted
4. Click "Start Camera" to begin gesture detection

### Testing Notes
- Camera permissions required for full functionality
- WebGL support needed for TensorFlow.js
- Automated tests limited by camera/WebGL requirements in test environments
- Manual testing recommended for full gesture recognition flow

## Deployment

### Building for Production
```bash
npm run build
```

The static files will be generated in `dist/public/` directory containing:
- `index.html` - Main HTML file
- `assets/` - JavaScript and CSS bundles

### Deploying to GitHub Pages

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Push the dist/public folder to GitHub:**
   ```bash
   git add dist/public -f
   git commit -m "Add production build"
   git push origin main
   ```

3. **Configure GitHub Pages:**
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /dist/public
   - Save

4. **Your site will be live at:** `https://yourusername.github.io/repository-name/`

### Deploying to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=dist/public --prod
   ```

   Or drag and drop the `dist/public` folder to Netlify's web interface.

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

   When prompted, set the output directory to `dist/public`.

### Camera Permissions

**Important:** Modern browsers require HTTPS for camera access. All the deployment platforms above (GitHub Pages, Netlify, Vercel) provide automatic HTTPS, so your webcam will work properly once deployed.

For local development, `localhost` is treated as secure, so camera access works without HTTPS.

## Production Readiness

### Current Status
- ✅ 100% client-side - no server required
- ✅ Deployable to any static hosting service
- ✅ All features working (gesture recognition, stats, history, text-to-speech)
- ✅ Responsive design for all screen sizes
- ✅ Accessibility features (text-to-speech, high contrast)
- ✅ HTTPS-compatible for camera access

### Future Enhancements
- Export session data as JSON/CSV
- Gesture training interface for custom gestures
- LocalStorage persistence for session history
- Performance metrics tracking (latency, accuracy over time)
- PWA support for offline use

## Architecture Decisions

1. **Pure Frontend**: No backend required - all processing happens in browser for privacy and simplicity
2. **Client-Side ML**: TensorFlow.js runs entirely in browser for privacy and reduced latency
3. **Real-time Processing**: Uses requestAnimationFrame for smooth 60fps gesture detection
4. **Static Hosting**: Can be deployed to GitHub Pages, Netlify, Vercel, or any static host
5. **Zero Cost Hosting**: No server costs - completely free to host
