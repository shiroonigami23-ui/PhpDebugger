# PHP Debugger Forensics

![PHP Debugger Extension](icons/icon-1024.png)

**PHP Debugger Forensics** is a production-ready Chrome extension that makes debugging silent PHP/SQL errors and backend issues dramatically easier. It works in two modes:

- **DevTools Panel** – Real-time network forensics, failure pattern detection, and correlation ID lookup for developers
- **User/Popup Mode** – Simple "Record → Reproduce → Export" workflow for non-technical testers to share clean incident bundles

## Why This Exists

Backend errors in PHP apps often fail silently:
- `500 Internal Server Error` with an empty response body
- Database connection errors that never reach the frontend
- SQL query failures buried in server logs
- Timeouts, deadlocks, and auth issues that leave users confused

**PHP Debugger Forensics** makes these visible and actionable **without modifying your backend code** (though it pairs beautifully with correlation IDs if you want to).

## Features

✅ **Dual-mode UI**
- DevTools panel for developers (live inspection, analysis, export)
- Toolbar popup for users (guided recording, clean export)

✅ **Network Forensics**
- Capture request/response metadata (method, URL, status, timing, headers)
- Timeline and TTFB analysis
- Response payload inspection (sanitized)

✅ **Intelligent Failure Classification**
- Network/TLS failures
- CORS issues
- Auth failures (401/403)
- Rate limiting (429)
- Upload size limits (413)
- Server errors (5xx)

✅ **Production-Ready**
- Correlation ID support (find errors in logs faster)
- Sanitization by default (no passwords, keys, or PII leakage)
- Exportable incident bundles (shareable JSON + cURL commands)
- Works with zero backend changes

✅ **Developer-Friendly**
- Built with Nuxt 3 + TypeScript + Tailwind
- Manifest V3 (modern, secure)
- Full source code + MIT license

## Installation

### From GitHub Releases (User)

1. Download the latest `php-debugger-extension.zip` from [Releases](https://github.com/YOUR_USERNAME/PhpDebugger/releases)
2. Extract it to a folder
3. Open `chrome://extensions`
4. Enable **Developer mode** (top-right toggle)
5. Click **Load unpacked** and select the extracted folder
6. Done! You'll see the PHP Debugger icon in your toolbar

### From Source (Developer)

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PhpDebugger.git
   cd PhpDebugger
   ```

2. Install dependencies:
   ```bash
   cd src
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load into Chrome:
   - Open `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked** → select the `PhpDebugger` root folder

## Usage

### User Mode (Popup)

1. Click the **PHP Debugger Forensics** icon in your toolbar
2. Click **Start Recording**
3. Go back to the tab and reproduce the problem
4. Return to the popup and click **Stop & Export**
5. A JSON bundle is generated; share it with the dev team

The bundle includes:
- All captured network requests
- Timing data
- Response status codes and headers
- User environment (browser, OS)
- No sensitive data (passwords, tokens are stripped)

### DevTools Mode (Panel)

1. Open **DevTools** (F12 or Cmd+Option+I)
2. Switch to the **PHP Debugger Forensics** tab
3. Click **Start Capture**
4. Reproduce the issue on the page
5. Inspect failures in real-time:
   - See all requests grouped by endpoint
   - View timing and status codes
   - Read "likely cause" hints
   - Copy cURL reproduction commands
   - Export full incident bundle

## License

MIT – Free for personal and commercial use.

## Contributing

Contributions welcome! Open issues or PRs on GitHub.
