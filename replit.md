# AI Hand Gesture Recognition System

## Overview

An interactive web application that uses AI to recognize hand gestures in real-time through webcam input. The system translates basic sign language gestures (like "Yes," "No," "Stop," "OK," and "I Love You") into text and provides visual feedback with confidence scores. Designed for accessibility evaluation and demonstration purposes, particularly for judges assessing gesture recognition accuracy and usability in competitive or educational settings.

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
- Pre-trained model hosted externally, loaded at runtime
- Real-time webcam processing with prediction loop using requestAnimationFrame
- Gesture classes: Yes (👍), No (👎), Stop (✋), OK (👌), I Love You (🤟)

**Prediction Pipeline:**
- Webcam video stream captured via MediaDevices API
- Frame-by-frame analysis through TensorFlow model
- Confidence scores calculated for each gesture class
- Threshold-based gesture detection (typically >80% confidence for visual feedback)

### Backend Architecture

**Server Framework:** Express.js with TypeScript

**API Design:**
- RESTful endpoints for session and prediction management
- JSON request/response format
- Session tracking for evaluation metrics

**Key Endpoints:**
- `POST /api/sessions` - Create new recognition session
- `GET /api/sessions/:id` - Retrieve session details
- `PATCH /api/sessions/:id` - Update session statistics
- `POST /api/predictions` - Log individual gesture predictions
- `GET /api/predictions/session/:sessionId` - Retrieve session prediction history

**Storage Layer:**
- In-memory storage implementation (MemStorage class) for development
- Interfaces designed for potential database integration
- Session and prediction data models with TypeScript types

### Database Schema

**Technology:** PostgreSQL with Drizzle ORM (configured but not yet fully integrated)

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
- Zod schemas for runtime validation
- Type-safe insert operations with Drizzle-Zod integration

### Component Architecture

**Core Components:**

1. **WebcamFeed** - Video capture with MediaDevices API, visual feedback overlay, active border pulse during high-confidence detection
2. **GestureCard** - Large display of current recognized gesture with emoji representation and confidence badge
3. **ConfidenceMeter** - Real-time horizontal progress bars showing confidence levels for all gesture classes
4. **PredictionHistory** - Scrollable timeline of recent predictions with timestamps
5. **StatsPanel** - Dashboard metrics displaying total recognitions, average confidence, and recognition rate
6. **ControlPanel** - User controls for camera toggle, speech synthesis, and theme switching

**Component Communication:**
- Props-based data flow from parent (Home page) to child components
- Callback functions for user interactions (camera toggle, speech control)
- Refs for direct DOM manipulation (video element access)

### Real-time Features

**Webcam Processing:**
- Continuous prediction loop checking gesture every animation frame
- Automatic gesture change detection with debouncing
- Performance optimizations to prevent excessive re-renders

**Text-to-Speech:**
- Web Speech API integration for accessibility
- Automatic announcement of recognized gestures
- Toggle control for enabling/disabling audio feedback

**Visual Feedback:**
- Animated border pulse on high-confidence detection (>80%)
- Real-time confidence bar updates
- Gesture emoji display with immediate updates

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

**Machine Learning:**
- `@teachablemachine/image` - Google's pre-trained model interface
- `@tensorflow/tfjs` - Client-side ML inference engine

**Form & Validation:**
- React Hook Form with Zod resolvers for form handling
- Zod for schema validation

**Data Fetching:**
- TanStack Query (React Query) for API state management
- Native Fetch API for HTTP requests

**Database (Configured):**
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
- LocalStorage (potential use for theme/preferences)