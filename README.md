# Timer

A simple and easy-to-use web-based countdown timer application.

## Features

- ⏱️ **Customizable Duration** — Set hours, minutes, and seconds independently
- ▶️ **Start/Stop Control** — Pause and resume your timer at any time
- ↻ **Reset Function** — Quickly reset the timer to start over
- 🔔 **Smart Audio Alert** — Web Audio API-powered sound notification (no external files needed)
- 🌍 **Multi-Language Support** — English and Simplified Chinese with auto-detection and language switching
- 🌓 **Dark Mode** — Automatic system preference detection with manual toggle option
- 🎨 **6 Color Themes** — Blue, Purple, Green, Orange, Red, and Cyan color schemes
- 💾 **Persistent Preferences** — Remembers your language, theme mode, and color scheme using localStorage
- 📱 **Responsive Design** — Works seamlessly across desktop, tablet, and mobile devices
- 🎨 **Clean Interface** — Minimal and intuitive user experience with large, easy-to-read display
- ⌨️ **Keyboard Shortcuts** — Space bar to start/stop, R to reset (no mouse needed!)
- ♿ **Accessibility** — Full screen reader support with ARIA labels and keyboard navigation
- ⚡ **High Performance** — Uses requestAnimationFrame for smooth 60 FPS updates

## Demo

Open `index.html` directly in your web browser to use the timer immediately—no installation required.

## Quick Start

### Option 1: Standard Version (Multiple Files)
1. Clone this repository: `git clone https://github.com/CrueChan/Timer.git`
2. Open `index.html` in your web browser
3. Start using the timer right away

### Option 2: Offline Version (Single File - Recommended for Isolated Environments)
Perfect for isolated exam, interview, or competition environments with no internet access:
1. Download `Timer-offline.html` from the repository
2. Open it in any web browser - **no internet or file hosting needed**
3. All features work offline: language switching, dark mode, color themes, audio alerts
4. User preferences are saved locally (survives browser refresh)

**Use Case**: Exam proctors, interview platforms, and competition platforms can distribute this single file to isolated machines.

### Option 3: Online Usage
Host the `index.html` file on any web server or use GitHub Pages for easy access.

## How to Use

1. **Set Duration**: Enter the desired hours, minutes, and seconds in the input fields
2. **Apply Settings**: Click the **SET** button to confirm your duration
3. **Start Timer**: Click the **START** button to begin the countdown
4. **Pause Timer**: Click the **STOP** button to pause (you can resume by clicking START again)
5. **Reset Timer**: Click the **RESET** button to clear the timer and start over

### Keyboard Shortcuts

- **Space Bar**: Start/Stop the timer (when START/STOP button is available)
- **R Key**: Reset the timer (when RESET button is available)

## Project Structure

```
Timer/
├── index.html               # Main HTML entry point (uses separate CSS and JS files)
├── Timer-offline.html       # Single-file offline version (all CSS/JS inlined)
├── styles.css               # Stylesheet with responsive design and CSS variables
├── app.js                   # Application logic (vanilla JavaScript)
├── theme.js                 # Theme management (dark mode + 6 color schemes)
├── i18n.js                  # Internationalization (English + Simplified Chinese)
├── README.md                # Project documentation
├── CHANGELOG.md             # Version history and release notes
└── LICENSE                  # MIT License
```

**Note**: For offline/isolated environments, use `Timer-offline.html` instead. It's a self-contained single file with no dependencies.

## Technical Details

### Dependencies

**Zero external dependencies!** This project uses only vanilla JavaScript and CSS.

Previously used:
- ~~jQuery 2.1.4~~ → Replaced with vanilla JavaScript
- ~~Moment.js~~ → Replaced with native Date API
- ~~textFit~~ → Replaced with CSS `clamp()`

### Core Technologies

- **theme.js** — CSS variable-based theming system with dark/light modes and 6 color schemes
- **i18n.js** — Lightweight internationalization supporting English and Simplified Chinese
- **CSS Variables** — Dynamic theming without runtime performance overhead
- **Web Audio API** — Synthesized sound notification (no external audio files)

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- **File Size**: Only 10 KB total (95% smaller than original 205 KB)
- **Zero Dependencies**: No external libraries to load
- **Update Interval**: 50ms for smooth, accurate countdown display
- **Responsive Fonts**: Uses CSS `clamp()` for automatic scaling without JavaScript
- **Animation**: Uses `requestAnimationFrame()` for smooth 60 FPS updates

### Accessibility

- **Screen Reader Support**: Full ARIA labels and semantic HTML for screen readers
- **Keyboard Navigation**: All controls accessible via keyboard (Tab to navigate, Enter to activate)
- **Keyboard Shortcuts**: Quick shortcuts for common actions (Space to start/stop, R to reset)
- **Visual Focus Indicators**: Clear blue outline on focused elements for keyboard users
- **Disabled State**: Properly marked and visually distinct disabled controls
- **Live Region Updates**: Timer changes announced in real-time to assistive technologies

## Installation & Deployment

### Local Development

**Option 1: Using Python (recommended for quick testing)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

**Option 2: Using Node.js**
```bash
npx http-server
```

**Option 3: Using any other web server**
Just serve the project directory over HTTP.

⚠️ **Note**: Due to CORS restrictions, opening `index.html` directly via `file://` may not work properly in modern browsers.

### Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to repository **Settings** → **Pages**
3. Set source to `main` branch and root directory
4. Your timer will be live at `https://CrueChan.github.io/Timer/`

### Deploy to Web Server

Upload `index.html` to any web server and access via HTTP/HTTPS.

## Customization

### Modify Default Duration

Edit the default values in `index.html` (lines 56-58):
```html
<input id="hours" disabled maxlength="2" type="number" value="0" min="0" max="99"> <b>H</b>&nbsp;
<input id="minutes" disabled maxlength="2" type="number" value="5" min="0" max="59"> <b>M</b>&nbsp;
<input id="seconds" disabled maxlength="2" type="number" value="0" min="0" max="59"> <b>S</b>&nbsp;
```

### Customize Theme and Colors

The theme system uses CSS variables for easy customization. Edit color values in `theme.js`:

```javascript
const themes = {
    dark: {
        blue: {
            primary: '#1e5ba8',           // Primary color
            primaryHover: '#2a7bc4',      // Hover state
            primaryFocus: '#7ba3e0',      // Focus/accent color
            backgroundColor: '#1a1a1a',
            textColor: '#ffffff',
            borderColor: '#444444'
        },
        // ... other color schemes
    },
    light: {
        // ... light mode colors
    }
};
```

### Add New Language

Add translations to `i18n.js`:

```javascript
const translations = {
    en: {
        startButton: 'START',
        // ... other translations
    },
    'zh-CN': {
        startButton: '开始',
        // ... other translations
    },
    // Add new language here
};
```

### Customize Audio Alert

Modify the beep sound in `app.js` by adjusting the Web Audio API parameters:

```javascript
function triggerTimerAlert() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 800;      // Change frequency (Hz)
    oscillator.type = 'sine';              // Change wave type
    // ... adjust duration and volume
}
```

### Customize Styling

Modify the CSS variables in `styles.css` for global styling changes:

```css
:root {
    --primary-color: #14306B;
    --accent-color: #14306B;
    --background-color: #ffffff;
    --text-color: #000000;
    /* ... other variables */
}
```

## Troubleshooting

**Timer doesn't make sound on completion:**
- Check browser sound settings and permissions
- Ensure your system volume is not muted
- The audio path may need to be adjusted for your environment

**Display not scaling properly on mobile:**
- Clear browser cache and reload
- Check that viewport meta tag is correctly set

**START button doesn't respond:**
- Ensure all input fields have valid numbers
- Click SET button to apply the duration first

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

## Author

Created by Crue Chan

## Contributing

Contributions are welcome! Feel free to:
- Report bugs via GitHub Issues
- Suggest new features
- Submit pull requests with improvements

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history, including:

- **Version 2.1.0** (Latest) — Multi-language support, dark mode, 6 color themes
- **Version 2.0.0** — Major optimization: 95% file size reduction, accessibility improvements
- **Version 1.0.0** — Initial release with core timer functionality

---

**Enjoy your timer!** If you find it useful, please consider giving it a star ⭐
