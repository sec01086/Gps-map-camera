# GPS Map Camera — Publish on GitHub Pages & Install to Home Screen

## Step 1: Create a GitHub repository
1. Go to https://github.com and log in (create a free account if you don't have one).
2. Click the **+** icon at the top right and choose **New repository**.
3. Give it a name, e.g. `gps-map-camera`.
4. Keep it **Public**, then click **Create repository**.

## Step 2: Upload the files
1. On the new repo page, click **"uploading an existing file"** (or Add file → Upload files).
2. Drag and drop **every single file** from this package straight into the repo root — `index.html`, `manifest.json`, `service-worker.js`, `favicon.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png`. All files sit flat in the same folder — there is no subfolder to worry about.
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

## Fullscreen mode (hides the phone's status bar)
- Fullscreen is requested automatically the first time you grant camera/location permission.
- If it doesn't engage (some browsers block auto-fullscreen), turn it on anytime from **Settings → Fullscreen**.
- This only works while you're actively using the page — exiting the app or navigating away exits fullscreen, and you may need to tap the toggle again next time. This is a browser limitation, not a bug in the app.

## Flash modes (Off / Auto / On)
Tap the flash icon at the top to cycle through three modes, like a normal camera:
- **OFF** — flash never fires.
- **AUTO** — the app checks how dark the scene looks right before capture and only fires the flash if it's genuinely dim.
- **ON** — for photos, the flash fires as a brief pulse right at the moment of capture (not left on during preview). For video, it switches on for the entire recording and turns off automatically when you stop.
Flash/torch control only works on devices and browsers that expose it (mainly the rear camera in Chrome on Android) — if it's not supported, the icon will look dimmed and tapping it will tell you so.

## Zoom & photo/video size
- Pinch with two fingers on the camera view to zoom, or tap the 1x/2x/3x pills on the right.
- On phones whose browser exposes hardware camera zoom, that's used automatically; otherwise the app falls back to a digital zoom (crop + scale) that still matches in the saved photo/video.
- **Settings → Photo / Video Size** lets you pick Max/1080p/720p/480p — lower sizes capture faster and take less storage.

## Save to phone gallery
- **Settings → "Save photos to phone gallery"**: when on, every capture is also downloaded automatically (in addition to being kept in the app's own Gallery). On most Android phones, files downloaded through Chrome are indexed into the Photos app automatically; on iPhone, downloaded files go to the Files app (Safari doesn't allow a webpage to save directly into the Camera Roll).

## Gallery (formerly "Reports")
- Tap **Select** in the Gallery to enter multi-select mode: tap thumbnails to check them, use **Select all**, then **Share** (opens the system share sheet with all chosen files, where supported) or **Download**/**Delete**.

## Pro Settings (master company logo for every device)
Regular users can only turn the configured logo on/off from **Settings → Company Logo**. The image itself is set once by whoever manages the deployment, through a hidden **Pro Settings** panel:
1. In Settings, tap **Pro Settings** at the bottom — it opens what looks like an upsell screen.
2. Enter the code `admin123` and tap **Purchase Pro** (this is just a lightweight lock so casual users don't stumble into it — it isn't a real purchase or a secure login).
3. Upload a PNG and choose the default opacity, then tap **Generate updated app file** — this downloads a new `index.html` with the logo embedded directly in the file.
4. Upload that generated `index.html` to GitHub, replacing the old one, and commit.

This is the only way a logo can appear the same for everyone on a site with no backend server — it has to travel inside the file itself. There's no way to make one device silently update another device's copy; each redeploy is a manual step.

## Setting a location manually
- Open **Location** at the bottom of the camera screen.
- Paste a Google Maps link (e.g. copied with Maps' Share button), raw coordinates like `24.7136, 46.6753`, or just type a place name, then tap **Set**.
  - Links/coordinates are read instantly and work even offline.
  - A plain place name is looked up online (needs internet).
- While a manual location is active, a yellow **"Manual location active"** banner appears on the camera screen — tap it anytime to jump back to your live GPS position. The same option is available as an **"Use Live GPS"** button inside the Location sheet.

## Troubleshooting: no install option / offline not working
The in-app diagnostics panel has been removed to keep Settings simple, so check manually instead:
1. Open these links directly in your phone's browser and confirm each loads (not a 404):
   - `https://your-username.github.io/gps-map-camera/manifest.json`
   - `https://your-username.github.io/gps-map-camera/service-worker.js`
   - `https://your-username.github.io/gps-map-camera/icon-512.png`
2. If any of them 404, that exact file is missing or misnamed in your GitHub repo root — re-upload it there (no subfolders).

Common causes:
- Only `index.html` was re-uploaded after an update, without also re-uploading `manifest.json` / `service-worker.js` / the icon files.
- A file was uploaded to the wrong place (e.g. inside a subfolder) — every file in this package belongs directly in the repo root, not in any subfolder.
- The very first visit after updating files was itself offline — the app must load online at least once after any update before offline mode reflects the new version.
- Old cached version in Chrome — open the site's info icon (🛈) next to the address bar → Site settings → **Clear & reset**, then reload.

After fixing files on GitHub, reload the page fully (not from the cached home-screen icon) at least once while online, then check the ⋮ menu for "Install app" again.

## Updating later
If you make changes to the file later, go back to the GitHub repo, upload/edit that file again (especially `index.html`) and commit — the live link will update automatically within a minute or two.
