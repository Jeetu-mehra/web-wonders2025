import React from 'react';
import Head from 'next/head';

const Footer = () => {
  return (
    <>
      {/* Load fonts directly in the component */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>

      <footer style={{ fontFamily: "'Montserrat', sans-serif" }} className="bg-[#111] text-[#eee] pt-[50px] px-[20px] pb-[20px]">
        <div className="max-w-[1200px] mx-auto flex justify-between flex-wrap gap-[30px]">
          {/* Brand Section */}
          <div className="footer-brand max-w-[300px]">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }} className="text-[2rem] text-white mb-[10px]">
              Velure
            </h2>
            <p className="text-[#ccc] leading-[1.6]">
              Your source for fresh fashion trends & insights.
            </p>
          </div>

          {/* Links Section */}
          <div className="footer-links">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }} className="text-[1.2rem] mb-[12px] text-white">
              Explore
            </h3>
            <ul className="list-none p-0">
              <li className="my-[8px]">
                <a href="#" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li className="my-[8px]">
                <a href="#trending" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
                  Trending
                </a>
              </li>
              <li className="my-[8px]">
                <a href="#" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
                  Contact-xxxxxx1234
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="footer-social">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }} className="text-[1.2rem] mb-[12px] text-white">
              Follow Us
            </h3>
            <div className="social-icons flex">
              <a href="#" className="mr-[15px] block w-[24px] h-[24px] hover:filter hover:invert-[60%] hover:sepia-[80%] hover:saturate-[300%] hover:hue-rotate-[280deg] transition-all duration-300">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" 
                  alt="Instagram" 
                  className="w-full h-full invert" 
                />
              </a>
              <a href="#" className="mr-[15px] block w-[24px] h-[24px] hover:filter hover:invert-[60%] hover:sepia-[80%] hover:saturate-[300%] hover:hue-rotate-[280deg] transition-all duration-300">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" 
                  alt="Twitter" 
                  className="w-full h-full invert" 
                />
              </a>
              <a href="#" className="mr-[15px] block w-[24px] h-[24px] hover:filter hover:invert-[60%] hover:sepia-[80%] hover:saturate-[300%] hover:hue-rotate-[280deg] transition-all duration-300">
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" 
                  alt="YouTube" 
                  className="w-full h-full invert" 
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-[40px] pt-[15px] border-t border-[#333] text-[0.9rem] text-[#aaa]">
          <p>© 2025 Velure. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;