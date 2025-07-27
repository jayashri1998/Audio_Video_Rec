import React, { useState, useEffect, useRef } from 'react';
import { saveRecording, getRecordings } from '../utlis/storage';
import musicGif from '../assets/music-16628_256.gif';
export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [recordings, setRecordings] = useState([]);

  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    setRecordings(getRecordings());
  }, []);

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [recording, paused]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      await saveRecording(blob);
      setRecordings(getRecordings());
      setTime(0);
      alert('Your recording was successfully saved.');

    };

    mediaRecorder.current.start();
    setRecording(true);
    setPaused(false);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
    setPaused(false);
  };

  const handlePause = () => {
    if (!mediaRecorder.current) return;
    if (paused) {
      mediaRecorder.current.resume();
      setPaused(false);
    } else {
      mediaRecorder.current.pause();
      setPaused(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleRecord = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow mt-4">
      <h2 className="text-2xl font-bold mb-4">🎤 Audio Recorder</h2>

      {recording && (
        <div className="text-center">
          <p className="text-xl font-mono">{formatTime(time)}</p>
          <img src={musicGif} alt="Recording..." className="w-32 mx-auto my-2" />
        </div>
      )}

      <button
        onClick={handleRecord}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {recording && (
        <button
          onClick={handlePause}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
      )}
    </div>
  );
}
