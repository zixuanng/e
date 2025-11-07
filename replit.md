# AI Hand Gesture Recognition System

## Overview

An interactive web application that uses AI to recognize hand gestures in real-time through webcam input. The system translates basic sign language gestures (like "Yes," "No," "Stop," "OK," and "I Love You") into text and provides visual feedback with confidence scores. Designed for accessibility evaluation and demonstration purposes, particularly for judges assessing gesture recognition accuracy and usability in competitive or educational settings.

## Recent Changes (November 7, 2025)

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

### Backend Architecture

**Server Framework:** Express.js with TypeScript

**API Design:**
- RESTful endpoints for session and prediction management
- JSON request/response format
- Session tracking for evaluation metrics
- Date coercion for ISO string to Date conversion

**Key Endpoints:**
- `POST /api/sessions` - Create new recognition session
- `GET /api/sessions` - Retrieve all sessions
- `GET /api/sessions/:id` - Retrieve specific session details
- `PATCH /api/sessions/:id` - Update session statistics and endTime
- `POST /api/predictions` - Log individual gesture predictions
- `GET /api/sessions/:id/predictions` - Retrieve session prediction history

**Storage Layer:**
- In-memory storage implementation (MemStorage class) for development
- Interfaces designed for potential database integration
- Session and prediction data models with TypeScript types

### Database Schema

**Technology:** Designed for PostgreSQL with Drizzle ORM (currently using in-memory storage)

**Tables:**

*Sessions Table:*
- `id` - UUID primary key (auto-generated)
- `startTime` - Timestamp (default: current time)
- `endTime` - Nullable timestamp
- `totalRecognitions` - Integer counter (default: 0)
- `averageConfidence` - Real number for accuracy tracking (default: 0)

*Predictions Table:*
- `id` - UUID primary key (auto-generated)
- `sessionId` - Foreign key reference to sessions
- `timestamp` - Timestamp of prediction (default: current time)
- `gesture` - Text field for recognized gesture name
- `confidence` - Real number (0-1) for prediction confidence

**Schema Validation:**
- Zod schemas for runtime validation with date coercion
- Type-safe insert operations with Drizzle-Zod integration

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

## Production Readiness

### Current Status
- ✅ Core functionality complete and working
- ✅ Session persistence implemented
- ✅ Error handling and logging in place
- ✅ Responsive design for all screen sizes
- ✅ Accessibility features (text-to-speech, high contrast, large fonts)

### Future Enhancements
- UI toast notifications for mutation errors
- Export session data functionality
- Gesture training interface for custom gestures
- Database migration from in-memory to PostgreSQL
- Performance metrics tracking (latency, accuracy over time)
- Multi-user gesture library with save/load capabilities

## Architecture Decisions

1. **In-Memory Storage**: Currently using MemStorage for simplicity, but designed with IStorage interface for easy database migration
2. **Client-Side ML**: TensorFlow.js runs entirely in browser for privacy and reduced latency
3. **Real-time Processing**: Uses requestAnimationFrame for smooth 60fps gesture detection
4. **Mutation Error Handling**: Console logging with potential for UI notifications
5. **Date Handling**: Zod coercion handles ISO string to Date conversion for API flexibility
