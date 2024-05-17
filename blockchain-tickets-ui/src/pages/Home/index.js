import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import bannerVid1 from '../../assets/videos/bannerVid1.mp4';
import bannerVid2 from '../../assets/videos/bannerVid2.mp4';
import './styles.css';

const Home = () => {
  useEffect(() => {
    const videoElement = document.getElementById('bannerVideo');
    const videos = [bannerVid1, bannerVid2];
    let currentVideoIndex = 0;

    function switchVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      videoElement.pause(); // Pause the video before switching
      videoElement.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play().catch(error => {
        console.error('Video play error:', error);
      });
    }

    videoElement.src = videos[currentVideoIndex];
    videoElement.play().catch(error => {
      console.error('Initial video play error:', error);
    });
    const intervalId = setInterval(switchVideo, 180000); // Switch video every 3 minutes

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <Layout>
      <section className="banner">
        <video id="bannerVideo" autoPlay muted loop></video>
        <div className="selection">
          <select id="locationSelect">
            <option value="">Select Location</option>
            {/* Add location options here */}
          </select>
          <select id="eventTypeSelect">
            <option value="">Select Event Type</option>
            {/* Add event type options here */}
          </select>
        </div>
      </section>
      <section id="about">
        <h2>About BlockchainTickets</h2>
        <p>BlockchainTickets aims to become a blockchain-based event ticketing platform that rivals traditional services like Ticketmaster.</p>
      </section>
    </Layout>
  );
};

export default Home;
