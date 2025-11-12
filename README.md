# Timer

A simple and easy-to-use web-based countdown timer application.

## Features

- ⏱️ **Customizable Duration** — Set hours, minutes, and seconds independently
- ▶️ **Start/Stop Control** — Pause and resume your timer at any time
- ↻ **Reset Function** — Quickly reset the timer to start over
- 🔔 **Audio Alert** — Get notified with a sound when the countdown reaches zero
- 📱 **Responsive Design** — Works seamlessly across desktop, tablet, and mobile devices
- 🎨 **Clean Interface** — Minimal and intuitive user experience with large, easy-to-read display

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

## Technical Details

### Dependencies

- **jQuery 2.1.4** — DOM manipulation and event handling
- **Moment.js** — Date and time calculations
- **textFit** — Dynamic text sizing for responsive display

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

The timer updates every 50 milliseconds for precise countdown accuracy using `setInterval`.

## Installation & Deployment

### Local Development

Simply open `index.html` in your browser—no build process or dependencies to install locally.

### Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to repository **Settings** → **Pages**
3. Set source to `main` branch and root directory
4. Your timer will be live at `https://CrueChan.github.io/Timer/`

### Deploy to Web Server

Upload `index.html` to any web server and access via HTTP/HTTPS.

## Customization

### Modify Default Duration

Edit the default values in `index.html` (around line 155-157):
```html
<input id="minutes" disabled maxlength="2" type="number" value="5">
<input id="seconds" disabled maxlength="2" type="number" value="0">
```

### Change Alarm Sound

Replace the audio file path in the code (line 5572):
```javascript
A.attr("src", "file://C:/Windows/Media/notify.wav")
```

### Customize Styling

Modify the CSS in the `<style>` section to change colors, fonts, and layout.

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

### Version 1.0 (Initial Release)
- Core timer functionality with hours, minutes, and seconds
- Start/stop and reset controls
- Responsive design for all devices
- Audio alert on completion

---

**Enjoy your timer!** If you find it useful, please consider giving it a star ⭐
