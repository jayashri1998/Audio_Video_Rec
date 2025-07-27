# React + Vite

🎙️ Audio & Video Recorder App
This is a simple React application that allows users to record audio or video directly in the browser using the MediaRecorder
## Fetures
🎤 Audio Recording

📹 Video Recording

💾 Save recordings to localStorage

📃 View and replay saved recordings

🗑️ Clear recordings
## Installation
git clone https://github.com/jayashri1998/Audio_Video_Rec.git
cd Audio_Video_Rec
npm install

**start your application**
npm run dev
##**How it work**
When the user starts recording, MediaRecorder captures the stream from mic or camera.

On stop, the stream is converted to a Blob.

The Blob is then converted to a base64 string and saved in localStorage.

Recordings can be replayed or cleared.
