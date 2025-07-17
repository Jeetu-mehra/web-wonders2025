"use client"
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { ThemeProvider } from 'styled-components';
import dynamic from 'next/dynamic';
import { dark } from '@/styles/Themes';

const Loader = dynamic(() => import('@/sections/Loader'), { ssr: false });
const ScrollTriggerProxy = dynamic(() => import('@/sections/ScrollTriggerProxy'), { ssr: false });
const GlobalStyles = dynamic(() => import('@/styles/GlobalStyles'), { ssr: false });
// const { dark } = dynamic(() => import('@/styles/Themes'), { ssr: false });

// Dynamically import sections with SSR disabled
const Home = dynamic(() => import('@/sections/Home'), { ssr: false });
const About = dynamic(() => import('@/sections/About'), { ssr: false });
const Shop = dynamic(() => import('@/sections/Shop'), { ssr: false });
const Marquee = dynamic(() => import('@/sections/Marquee'), { ssr: false });
const NewArrival = dynamic(() => import('@/sections/NewArrival'), { ssr: false });
const Footerhome = dynamic(() => import('@/sections/Footerhome'), { ssr: false });

function home({ Component, pageProps, router }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <>
      <ThemeProvider theme={dark}>
        <GlobalStyles />
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone: { smooth: true },
            tablet: { smooth: true },
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <AnimatePresence mode="wait">
            {!loaded && <Loader />}
          </AnimatePresence>
          <main className="App" data-scroll-container ref={containerRef}>
            <ScrollTriggerProxy />
            {loaded && (
              <>
                <Home key="home" />
                <About key="about" />
                <Shop key="shop" />
                <Marquee key="marquee" />
                <NewArrival key="new-arrival" />
                <Footerhome key="footer" />
              </>
            )}
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default home;