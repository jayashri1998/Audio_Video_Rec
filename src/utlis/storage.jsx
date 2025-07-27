const RECORDINGS_KEY = 'recordings';

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function saveRecording(blob, type = 'audio') {
  const base64 = await blobToBase64(blob);
  const recordings = JSON.parse(localStorage.getItem(RECORDINGS_KEY)) || [];
  const timestamp = new Date().toISOString();

  recordings.push({ type, timestamp, base64 });
  localStorage.setItem(RECORDINGS_KEY, JSON.stringify(recordings));
  return base64;
}

export function getRecordings() {
  return JSON.parse(localStorage.getItem(RECORDINGS_KEY)) || [];
}
export function clearRec(){
  localStorage.removeItem(RECORDINGS_KEY)|| [];
  return []
}