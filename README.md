# Timer

A simple and easy-to-use web-based countdown timer application.

## Features

- ⏱️ **Customizable Duration** — Set hours, minutes, and seconds independently
- ▶️ **Start/Stop Control** — Pause and resume your timer at any time
- ↻ **Reset Function** — Quickly reset the timer to start over
- 🔔 **Audio Alert** — Get notified with a sound when the countdown reaches zero
- 📱 **Responsive Design** — Works seamlessly across desktop, tablet, and mobile devices
- 🎨 **Clean Interface** — Minimal and intuitive user experience with large, easy-to-read display
- ⌨️ **Keyboard Shortcuts** — Space bar to start/stop, R to reset (no mouse needed!)
- ♿ **Accessibility** — Full screen reader support with ARIA labels and keyboard navigation
- ⚡ **High Performance** — Uses requestAnimationFrame for smooth 60 FPS updates

## Demo

Open `index.html` directly in your web browser to use the timer immediately—no installation required.

## Quick Start

### Option 1: Direct Usage
1. Clone this repository: `git clone https://github.com/CrueChan/Timer.git`
2. Open `index.html` in your web browser
3. Start using the timer right away

### Option 2: Online Usage
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
├── index.html       # HTML structure and entry point
├── styles.css       # Stylesheet with responsive design
├── app.js          # Application logic (vanilla JavaScript)
├── README.md       # Project documentation
├── CHANGELOG.md    # Version history and release notes
└── LICENSE         # MIT License
```

## Technical Details

### Dependencies

**Zero external dependencies!** This project uses only vanilla JavaScript and CSS.

Previously used:
- ~~jQuery 2.1.4~~ → Replaced with vanilla JavaScript
- ~~Moment.js~~ → Replaced with native Date API
- ~~textFit~~ → Replaced with CSS `clamp()`

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

### Change Alarm Sound

Replace the audio file path in `app.js` (line ~89):
```javascript
alarmAudio.src = '/notification.wav'; // Change this to your audio file path
```

### Customize Styling

Modify the CSS in `styles.css` to change colors, fonts, and layout:
```css
input[type=submit] {
    background-color: #14306B; /* Change button color */
    border-radius: 10px;
    /* ... other styles */
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

Created by Y. Chen

## Contributing

Contributions are welcome! Feel free to:
- Report bugs via GitHub Issues
- Suggest new features
- Submit pull requests with improvements

## Changelog

### Version 2.0 (Current - Optimization & Accessibility)
- **95% file size reduction** (205 KB → 10 KB)
- Removed jQuery and moment.js dependencies
- Vanilla JavaScript with requestAnimationFrame for smooth performance
- Full keyboard navigation and accessibility support
- ARIA labels for screen reader support
- Keyboard shortcuts (Space to start/stop, R to reset)

### Version 1.0 (Initial Release)
- Core timer functionality with hours, minutes, and seconds
- Start/stop and reset controls
- Responsive design for all devices
- Audio alert on completion

---

**Enjoy your timer!** If you find it useful, please consider giving it a star ⭐
