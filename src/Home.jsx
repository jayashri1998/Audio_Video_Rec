import React from 'react'
import AudioRecorder from './component/AudioRecord';
import VideoRecorder from './component/VideoRecord';
const Home = () => {

  return (
    <div>
      <div className='max-w-3xl mx-auto mt-2'>
      <h1 className="text-3xl font-bold mb-6 text-center">🎤 Audio & 🎥 Video Recorder</h1>
    
      <AudioRecorder />
      <VideoRecorder />
      </div>
    </div>
  )
}

export default Home
