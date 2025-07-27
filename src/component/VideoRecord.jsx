import React, { useEffect, useRef, useState } from 'react';
import { saveRecording, getRecordings } from '../utlis/storage';

export default function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recordings')) || [];
    setRecordings(stored);
  }, []);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      await saveRecording(blob, 'video');
      setRecordings(getRecordings());
      stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
      clearInterval(timerRef.current);
      setTime(0);
      alert('Your recording was successfully saved.');
    };

    mediaRecorder.start();
    setRecording(true);
    setPaused(false);
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const pauseRecording = () => {
    mediaRecorderRef.current.pause();
    setPaused(true);
    clearInterval(timerRef.current);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current.resume();
    setPaused(false);
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  return (
    <div className="p-4 border rounded-xl shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Video Recorder</h2>

      <video ref={videoRef} className="w-full mb-4 border rounded" />

      <p className="mb-2 text-gray-600 font-mono">Recording Time: {formatTime(time)}</p>

      {!recording ? (
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Recording
        </button>
      ) : (
        <div className="flex gap-2">
          {!paused ? (
            <button
              onClick={pauseRecording}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={resumeRecording}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Resume
            </button>
          )}
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
