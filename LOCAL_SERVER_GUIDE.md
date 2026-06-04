# Your Way Travel — Local Development Server

## Why You Need a Local Server

Opening the HTML files directly by double-clicking them will **not work correctly** because the site uses `fetch()` to load JSON data files (`trips.json`, `reviews.json`). Browsers block these requests when running from the local filesystem for security reasons. A local server resolves this instantly.

---

## Option 1: Python (Recommended — no install needed)

Python comes pre-installed on macOS and most Linux systems. Windows users can install it from [python.org](https://www.python.org/downloads/).

### Steps

1. Open a terminal (macOS: `Terminal`, Windows: `Command Prompt` or `PowerShell`)

2. Navigate to the project folder:
```bash
cd path/to/yourwaytravel
```
> **Example on Mac:** `cd ~/Desktop/yourwaytravel`
> **Example on Windows:** `cd C:\Users\YourName\Desktop\yourwaytravel`

3. Start the server:

**Python 3 (most common):**
```bash
python3 -m http.server 8080
```

**Python 2 (older systems):**
```bash
python -m SimpleHTTPServer 8080
```

4. Open your browser and go to:
```
http://localhost:8080
```

5. To stop the server, press `Ctrl + C` in the terminal.

---

## Option 2: Node.js — `serve` package

If you have Node.js installed ([nodejs.org](https://nodejs.org)):

1. Install the `serve` tool globally (one-time setup):
```bash
npm install -g serve
```

2. Navigate to the project folder:
```bash
cd path/to/yourwaytravel
```

3. Start the server:
```bash
serve .
```

4. It will print a local URL — usually:
```
http://localhost:3000
```

---

## Option 3: VS Code — Live Server Extension (Easiest for beginners)

If you use Visual Studio Code:

1. Open VS Code and install the **Live Server** extension:
   - Click the Extensions icon (or press `Ctrl+Shift+X`)
   - Search for `Live Server` by Ritwick Dey
   - Click Install

2. Open the `yourwaytravel` folder in VS Code:
   - File → Open Folder → select `yourwaytravel`

3. Right-click on `index.html` in the file explorer panel and select **"Open with Live Server"**

4. Your browser will open automatically at `http://127.0.0.1:5500`

5. Live Server also **auto-refreshes** the browser whenever you save a file — very handy during development.

---

## Navigating the Site

Once the server is running, you can reach all pages at:

| Page | URL |
|---|---|
| Homepage | `http://localhost:8080/` |
| Previous Trips | `http://localhost:8080/trips/` |
| Reviews | `http://localhost:8080/reviews/` |
| Contact Us | `http://localhost:8080/contact/` |

*(Replace `8080` with `3000` or `5500` if using Node.js or Live Server)*

---

## Troubleshooting

**Trip cards or reviews show "could not be loaded"**
→ Make sure you are accessing the site via `http://localhost:...` and not by opening the HTML file directly (the URL should not start with `file://`).

**Port already in use**
→ Change the port number: `python3 -m http.server 8081` then visit `http://localhost:8081`

**Changes not showing**
→ Hard-refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

---

## Adding Content Later

| What to add | Where to go |
|---|---|
| New trips | Edit `trips/trips.json` and drop media into `trips/assets/images/trips/` |
| New reviews | Edit `reviews/reviews.json` and drop photos into `reviews/assets/images/reviews/` |
| Real logo | Replace the text logo in each `index.html` with an `<img>` tag (instructions in each file) |
| EmailJS credentials | Open `contact/contact.js` and fill in the 3 values at the top |
| Hero background image | Place `hero-bg.jpg` in `assets/images/` and update `index.css` (instructions in that file) |
