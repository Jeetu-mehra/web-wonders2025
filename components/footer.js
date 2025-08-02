// import React from 'react';
// import Head from 'next/head';

// const Footer = () => {
//   return (
//     <>
//       {/* Load fonts directly in the component */}
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat&display=swap"
//           rel="stylesheet"
//         />
//       </Head>

//       <footer style={{ fontFamily: "'Montserrat', sans-serif" }} className="bg-[#111] text-[#eee] pt-[50px] px-[20px] pb-[20px]">
//         <div className="max-w-[1200px] mx-auto flex justify-between flex-wrap gap-[30px]">
//           {/* Brand Section */}
//           <div className="footer-brand max-w-[300px]">
//             <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }} className="text-[2rem] text-white mb-[10px]">
//               Velure
//             </h2>
//             <p className="text-[#ccc] leading-[1.6]">
//               Your source for fresh fashion trends & insights.
//             </p>
//           </div>

//           {/* Links Section */}
//           <div className="footer-links">
//             <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }} className="text-[1.2rem] mb-[12px] text-white">
//               Explore
//             </h3>
//             <ul className="list-none p-0">
//               <div className='flex gap-12'>
//                 <li className="my-[8px]">
//                 <a href="/home" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
//                   Home
//                 </a>
//               </li>
//               <li className="my-[8px]">
//                 <a href="/trending" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
//                   Trending
//                 </a>
//               </li>
//               </div>
//               <div className='flex gap-6.5'>
//                 <li className="my-[6px]">
//                 <a href="/featured" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
//                   Featured
//                 </a>
//               </li>
//               <li className="my-[6px]">
//                 <a href="/wedding" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
//                   Wedding
//                 </a>
//               </li>
//               </div>
//               <div className='flex gap-5'>
//                 <li className="my-[8px]">
//                 <a href="/traditional" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
//                   Traditional
//                 </a>
//               </li>
//               <li className="my-[8px]">
//                 <a href="/beauty" className="text-[#ccc] no-underline hover:text-white transition-colors duration-300">
//                   Beauty
//                 </a>
//               </li>
//               </div>
//             </ul>
//           </div>

//           {/* Social Section */}
//           <div className="footer-social">
//             <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }} className="text-[1.2rem] mb-[12px] text-white">
//               Follow Us
//             </h3>
//             <div className="social-icons flex">
//               <a href="#" className="mr-[15px] block w-[24px] h-[24px] hover:filter hover:invert-[60%] hover:sepia-[80%] hover:saturate-[300%] hover:hue-rotate-[280deg] transition-all duration-300">
//                 <img 
//                   src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" 
//                   alt="Instagram" 
//                   className="w-full h-full invert" 
//                 />
//               </a>
//               <a href="#" className="mr-[15px] block w-[24px] h-[24px] hover:filter hover:invert-[60%] hover:sepia-[80%] hover:saturate-[300%] hover:hue-rotate-[280deg] transition-all duration-300">
//                 <img 
//                   src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" 
//                   alt="Twitter" 
//                   className="w-full h-full invert" 
//                 />
//               </a>
//               <a href="#" className="mr-[15px] block w-[24px] h-[24px] hover:filter hover:invert-[60%] hover:sepia-[80%] hover:saturate-[300%] hover:hue-rotate-[280deg] transition-all duration-300">
//                 <img 
//                   src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" 
//                   alt="YouTube" 
//                   className="w-full h-full invert" 
//                 />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="text-center mt-[40px] pt-[15px] border-t border-[#333] text-[0.9rem] text-[#aaa]">
//           <p>© 2025 Velure. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;




"use client"

import { motion } from "framer-motion";
import React from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import styled from "styled-components";
import Image from 'next/image';
// import "./footer.css";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 10vw;
    height: auto;
  }

  h3 {
    font-family: "Kaushan Script";
    font-size: ${(props) => props.theme.fontxxl};

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;

const FooterComponent = styled(motion.footer)`
  width: 80vw;

  @media (max-width: 48em) {
    width: 90vw;
  }
  
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 2rem;
    margin-top: 4rem;
    padding: 0 1rem;
    border-top: 1px solid ${(props) => props.theme.text};
    border-bottom: 1px solid ${(props) => props.theme.text};

    @media (max-width: 48em) {
      justify-content: center;
    }
  }

  li {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontlg};
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 48em) {
      padding: 1rem;
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const Bottom = styled.div`
  padding: 0.5rem 0;
  margin: 0 4rem;
  font-size: ${(props) => props.theme.fontlg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    justify-content: center;
    span {
      transform: none !important;
    }
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const Footerhome = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    try {
      const elem = document.querySelector(id);
      if (!elem) {
        console.warn(`Footerhome: Element ${id} not found`);
        return;
      }
      if (scroll) {
        console.log(`Footerhome: Scrolling to ${id}`);
        scroll.scrollTo(elem, {
          offset: -100,
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0],
          disableLerp: true,
          callback: () => {
            console.log(`Footerhome: Scroll to ${id} completed`);
            scroll.update();
            setTimeout(() => {
              scroll.update();
            }, 100);
          }
        });
      } else {
        console.warn("Footerhome: Scroll instance not available, using window.scrollTo");
        const rect = elem.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.warn("Footerhome: Scroll error:", err);
    }
  };

  return (
    <Section style={{color:"white",backgroundColor : '#202020' }}>
      <LogoContainer>
        <Image
          width={300}
          height={300}
          src="/Svgs/LOGOimg.svg"
          alt="Wibe"
          data-scroll
          data-scroll-speed="2"
          style={{ width: '10vw', height: 'auto', color:"white",backgroundColor: '#202020' }}
        />
        {/* <h3 data-scroll data-scroll-speed="-1">
          Velure
        </h3> */}
        <h3
          data-scroll
          data-scroll-speed="-1"
          style={{
            fontFamily: "Kaushan Script",
            fontSize: '3rem'
          }
        }
        
>
  Velure
</h3>

      </LogoContainer>
      <FooterComponent
        initial={{ y: "-400px" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
        }}
      >
        <ul>
          <li aria-hidden="true">
            <a href="/">Home</a>
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".about")}>
            <a href="/trending">Trending</a>
          </li>
          <li aria-hidden="true" onClick={() => handleScroll("#shop")}>
            <a href="/featured">featured</a>

          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            <a href="/traditional">traditional</a>
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            <a href="/beauty">beauty</a>
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            <a href="/wedding">wedding</a>
          </li>
        </ul>
        {/* <ul>
          <li aria-hidden="true" onClick={() => handleScroll("#home")}>
            home
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".about")}>
            Trending
          </li>
          <li aria-hidden="true" onClick={() => handleScroll("#shop")}>
            featured
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            traditional
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            beauty
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            wedding
          </li>
        </ul> */}
        <Bottom>
          <span
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="horizontal"
          >
            &copy; 2025. Web Wonders.
          </span>
          <span
            data-scroll
            data-scroll-speed="-2"
            data-scroll-direction="horizontal"
          >
            Made with &hearts; by{" "}
            <a
              // href="http://devdreaming.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Web-Ninjas
            </a>
          </span>
        </Bottom>
      </FooterComponent>
    </Section>
  );
};

export default Footerhome;