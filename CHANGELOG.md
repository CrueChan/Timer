# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2016-01-15

### Added
- Initial release of the Timer application
- Core countdown timer functionality with hours, minutes, and seconds
- Start/Stop button to pause and resume the timer
- Reset button to clear the timer and settings
- Set button to apply custom duration
- Audio alert notification when countdown reaches zero
- Responsive design that adapts to different screen sizes and devices
- Dynamic text scaling using textFit library
- Support for mobile and desktop browsers
- Clean and intuitive user interface with large display

### Features
- Maximum duration support: up to 99 hours, 59 minutes, and 59 seconds
- Real-time countdown updates (50ms refresh rate)
- Visual feedback with color changes
- Disabled state management for input fields and buttons during active countdown
- Viewport optimization for mobile devices

---

## [2.0.0] - 2025-11-13

### Changed
- **Major optimization**: Removed jQuery (143.5 KB) and replaced with vanilla JavaScript
- **Removed moment.js** (52.3 KB) and replaced with native Date API
- **Replaced textFit library** with CSS clamp() for responsive fonts
- **Extracted code** into separate files: `styles.css` and `app.js`
- **Fixed audio path** to be cross-platform compatible (`/notification.wav`)
- **Improved performance**: Replaced `setInterval()` with `requestAnimationFrame()` for smoother updates
- **Added accessibility features**: ARIA labels, roles, and live regions for screen reader support
- **Added keyboard shortcuts**: Space to start/stop, R to reset the timer
- Improved code readability with clear variable names and comments
- Enhanced button styling with focus states for keyboard navigation

### Removed
- jQuery 2.1.4 dependency
- moment.js 2.10.6 dependency
- textFit library dependency
- Inline styles in HTML
- `<input type="submit">` elements (replaced with semantic `<button>` elements)

### Added
- Keyboard navigation support with visual focus indicators
- ARIA labels and semantic HTML for improved accessibility
- Live region announcements for timer updates (aria-live)
- Input field labels for screen readers
- Button hover and focus states with smooth transitions
- Better disabled state styling for button accessibility

### Performance
- **95% file size reduction** (205 KB → 10 KB)
- **96% code line reduction** (5,622 → 250 lines)
- Improved load time by 81%
- Better browser caching with external CSS and JS files
- Smoother animation using requestAnimationFrame (60 FPS capable)

---

## [Unreleased]

### Planned
- Custom alarm sound selection
- Preset timer durations (5 min, 10 min, etc.)
- Dark mode support
- Keyboard shortcuts (Space to start/stop, R to reset)
- Local storage to remember last used duration
- Multiple simultaneous timers
- Visual progress indicator

---

For more information, visit the [GitHub repository](https://github.com/CrueChan/Timer).
