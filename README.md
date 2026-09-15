# GPS Map Camera — Publish on GitHub Pages & Install to Home Screen

## Step 1: Create a GitHub repository
1. Go to https://github.com and log in (create a free account if you don't have one).
2. Click the **+** icon at the top right and choose **New repository**.
3. Give it a name, e.g. `gps-map-camera`.
4. Keep it **Public**, then click **Create repository**.

## Step 2: Upload the files
1. On the new repo page, click **"uploading an existing file"** (or Add file → Upload files).
2. Drag and drop every file and folder from this package (`index.html`, `manifest.json`, `service-worker.js`, `favicon.png`, and the whole `icons` folder) — drag the entire `icons` folder in so the folder structure is kept.
3. Click **Commit changes** at the bottom.

## Step 3: Turn on GitHub Pages
1. Open the **Settings** tab of the repo.
2. Click **Pages** in the left sidebar.
3. Under **Branch**, select `main`, keep the folder as `/ (root)`, then click **Save**.
4. Wait 1–2 minutes and refresh — a link will appear at the top, e.g.:
   `https://your-username.github.io/gps-map-camera/`

That link is your app's HTTPS address — camera and location permissions will now work properly.

## Step 4: Install to the home screen

### Android (Chrome)
1. Open the link above in Chrome.
2. Tap the ⋮ (three-dot) menu → **"Install app"** or **"Add to Home screen"**.
   *(You can also tap the "📲 Install to Home Screen" button that appears on the permission screen inside the app.)*
3. Tap **Add/Install**. The app now sits on the home screen like a normal app icon and opens full-screen.

### iPhone (Safari)
1. Open the link above in **Safari** specifically (this option isn't available in Chrome or other browsers on iOS).
2. Tap the **Share** icon (square with an arrow pointing up).
3. Scroll down and choose **"Add to Home Screen"**.
4. Keep the name and tap **Add**.

Opening it from the home screen afterwards launches it full-screen, without the browser address bar.

## Running offline
- Open the link once with an internet connection first (this caches the app's core files on the device).
- After that, the app can be opened from the home screen icon even without internet (the camera will work).
- To see the map while offline, use **Settings → Offline Map Download** inside the app to pre-download the area you need before you go.
- GPS location needs the phone's location service turned on — that works without internet, but fetching the address and new map tiles needs a connection.

## Company logo
- In **Settings → Company Logo**, upload a PNG file, turn "Show logo" on, and set the opacity (100% / 50% / 30% presets, or drag the slider for any value).
- The logo appears in the top-right corner of the live camera view and is burned into every saved photo and video.

## Updating later
If you make changes to the file later, go back to the GitHub repo, upload/edit that file again (especially `index.html`) and commit — the live link will update automatically within a minute or two.
