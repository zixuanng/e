# Design Guidelines: AI Hand Gesture Recognition System

## Design Approach

**Selected Framework:** Material Design with Accessibility Enhancements
**Rationale:** This is a utility-focused accessibility application requiring clear data visualization, real-time feedback, and high usability for judge evaluation. Material Design provides robust patterns for data-dense interfaces with strong visual feedback systems.

## Core Design Principles

1. **Clarity Over Decoration:** Every element serves a functional purpose for real-time gesture evaluation
2. **Accessibility First:** High contrast ratios, large touch targets, clear visual feedback
3. **Real-time Responsiveness:** Immediate visual feedback for gesture recognition events
4. **Judge-Friendly:** Dashboard-style layout optimized for evaluation and scoring

## Typography

**Primary Font:** Inter (Google Fonts)
**Secondary Font:** Roboto Mono (for numerical data, confidence scores)

**Hierarchy:**
- Page Title: 3xl (36px), bold
- Section Headers: xl (20px), semibold
- Gesture Labels: 2xl (24px), bold (for recognized gestures)
- Confidence Scores: lg (18px), medium
- Body Text: base (16px), regular
- UI Labels: sm (14px), medium

## Layout System

**Spacing Units:** Tailwind units of 4, 6, and 8 (p-4, m-6, gap-8, etc.)

**Grid Structure:**
- Two-column desktop layout: 60% webcam feed / 40% data panel
- Single column mobile: stacked vertical layout
- Dashboard cards with consistent 6-unit padding
- 8-unit gaps between major sections

## Component Library

### Primary Components

**Webcam Feed Container**
- Large, centered video display with rounded corners
- Active border pulse during gesture detection
- Overlay gesture label at bottom with semi-transparent background
- Aspect ratio: 4:3 or 16:9 maintained

**Confidence Meter Bars**
- Horizontal progress bars for each gesture class
- Height: 12-16px with rounded ends
- Live animated width based on confidence percentage
- Percentage label right-aligned
- Stack vertically with 4-unit spacing

**Gesture Recognition Card**
- Prominent card displaying current recognized gesture
- Large gesture emoji/icon + text label
- Confidence score prominently displayed
- Subtle pulse animation on successful recognition
- 6-unit padding, elevated shadow

**Statistics Dashboard**
- Grid of metric cards (2-3 columns)
- Each showing: label, large number, small descriptor
- Metrics: Total Recognitions, Average Confidence, Recognition Rate
- Consistent card styling with 4-unit padding

### Navigation & Controls

**Top Header Bar**
- Application title left-aligned
- Control buttons right-aligned (Start/Stop Camera, Enable/Disable Speech)
- Height: 16 units, sticky positioning
- Clean divider line underneath

**Action Buttons**
- Large, rounded buttons (minimum 44px height for accessibility)
- Primary: Start Detection, Enable Speech
- Secondary: Stop, Settings
- Icon + text labels for clarity

### Data Visualization

**Live Prediction Display**
- Real-time updating list of last 5 predictions
- Timestamp + gesture + confidence
- Subtle fade-in animation for new entries
- Monospace font for timestamps

**Confidence Visualization**
- Multi-bar chart showing all 5 gesture classes simultaneously
- Color-coded bars (not by hue, by intensity)
- Clear percentage labels
- Updates at prediction rate (30fps)

### Accessibility Features

**High Contrast Mode Toggle**
- Dedicated button in header
- Switches between standard and high-contrast theme
- Increases border weights and text sizes

**Text-to-Speech Indicator**
- Visual feedback when speech output is active
- Small audio wave animation icon
- Volume control slider

## Animations

**Minimal, Purposeful Only:**
- Confidence bar smooth transitions (300ms ease-out)
- Gesture recognition success pulse (single, 500ms scale)
- New prediction fade-in (200ms)
- NO decorative animations, scroll effects, or background movements

## Images

**No hero images required** - This is a utility application focused on webcam feed and data visualization. The webcam stream IS the primary visual element.

**Icon Set:** Material Icons via CDN for all UI icons (camera, microphone, settings, etc.)

## Layout Specifications

**Desktop Layout (1024px+):**
- Split screen: Webcam (left 60%) | Data Panel (right 40%)
- Data panel contains: Current Gesture Card, Confidence Meters, Statistics, Prediction History
- Fixed header, scrollable data panel if needed

**Tablet Layout (768px-1023px):**
- Webcam full width at top (max 70vh)
- Data cards in 2-column grid below
- Maintained spacing hierarchy

**Mobile Layout (<768px):**
- Single column stack: Header → Webcam → Current Gesture → Confidence Meters → Stats → History
- Webcam limited to 60vh to allow content visibility
- Simplified stats (1 column)

## Interaction Patterns

- Webcam auto-starts on page load with permission prompt
- Real-time gesture updates every 100ms
- Visual pulse on successful high-confidence (>80%) detection
- Speech synthesis triggers automatically on confident gesture recognition
- Clear visual states for: Idle, Detecting, Recognized, Error

## Judge Evaluation Interface

- Clean, uncluttered dashboard view
- All critical metrics visible without scrolling (desktop)
- Export/score buttons in prominent position
- Clear timestamp and session logging for evaluation records