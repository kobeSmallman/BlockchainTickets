// blockchain-tickets-ui/src/pages/Home/index.js

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
      videoElement.pause();
      videoElement.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play().catch((error) => {
        console.error('Video play error:', error);
      });
    }

    videoElement.src = videos[currentVideoIndex];
    videoElement.play().catch((error) => {
      console.error('Initial video play error:', error);
    });
    const intervalId = setInterval(switchVideo, 180000); // Switch video every 3 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <section className="hero">
        <video id="bannerVideo" autoPlay muted loop></video>
        <div className="hero__overlay">
          <h1 className="hero__title">Experience Events Like Never Before</h1>
          <p className="hero__subtitle">Secure, transparent, and hassle-free ticketing on the blockchain.</p>
          <div className="hero__cta">
            <button className="btn btn--primary">Discover Events</button>
            <button className="btn btn--secondary">Learn More</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose BlockchainTickets?</h2>
        <div className="features__grid">
          <div className="feature">
            <h3>Secure Transactions</h3>
            <p>All transactions are secured on the blockchain, ensuring trust and transparency.</p>
          </div>
          <div className="feature">
            <h3>Fair Pricing</h3>
            <p>No hidden fees. Get your tickets at fair prices without intermediaries.</p>
          </div>
          <div className="feature">
            <h3>Global Access</h3>
            <p>Access events worldwide with ease and convenience.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol className="how-it-works__steps">
          <li>
            <h3>Create an Account</h3>
            <p>Sign up in seconds and join our community.</p>
          </li>
          <li>
            <h3>Browse Events</h3>
            <p>Explore a wide range of events tailored for you.</p>
          </li>
          <li>
            <h3>Purchase Tickets</h3>
            <p>Buy tickets securely with blockchain technology.</p>
          </li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials__container">
          <div className="testimonial">
            <p>"BlockchainTickets made buying tickets so much easier and safer!"</p>
            <h4>- Jane Doe</h4>
          </div>
          <div className="testimonial">
            <p>"No more worrying about fake tickets. Love this platform!"</p>
            <h4>- John Smith</h4>
          </div>
        </div>
      </section>

      <section className="partners">
        <h2>Our Partners</h2>
        <div className="partners__logos">
          {/* Add partner logos here */}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
