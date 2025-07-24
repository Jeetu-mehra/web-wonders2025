"use client";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { ThemeProvider } from 'styled-components';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { dark } from '@/styles/Themes';
import useLocoScroll from '@/sections/useLocoScroll';

const Loader = dynamic(() => import('@/sections/Loader'), { 
  ssr: false,
  loading: () => <div style={{background: 'black', width: '100vw', height: '100vh'}}></div>
});
const ScrollTriggerProxy = dynamic(() => import('@/sections/ScrollTriggerProxy'), { ssr: false });
const GlobalStyles = dynamic(() => import('@/styles/GlobalStyles'), { ssr: false });

const Home = dynamic(() => import('@/sections/Home'), { ssr: false });
const About = dynamic(() => import('@/sections/About'), { ssr: false });
const Shop = dynamic(() => import('@/sections/Shop'), { ssr: false });
const Marquee = dynamic(() => import('@/sections/Marquee'), { ssr: false });
const NewArrival = dynamic(() => import('@/sections/NewArrival'), { ssr: false });
const Footerhome = dynamic(() => import('@/sections/Footerhome'), { ssr: false });

function HomePage() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Use custom hook to manage Locomotive Scroll
  useLocoScroll(loaded, containerRef);

  // Handle route changes to ensure cleanup
  useEffect(() => {
    const handleRouteChangeStart = () => {
      try {
        if (window.locomotiveScroll) {
          console.log("page.jsx: Destroying scroll instance on route change");
          window.locomotiveScroll.stop();
          window.locomotiveScroll.destroy();
          window.locomotiveScroll = null;
        }
      } catch (err) {
        console.warn("page.jsx: Error during route change cleanup:", err);
      }
    };

    router.events?.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events?.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);

  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          smartphone: { smooth: false },
          tablet: { smooth: false },
          reloadOnContextChange: true,
          lerp: 0.1
        }}
        watch={[path]}
        containerRef={containerRef}
      >
        <AnimatePresence mode="wait">
          {!loaded && <Loader />}
        </AnimatePresence>

        <main
          className="App"
          data-scroll-container
          ref={containerRef}
          key={path}
        >
          <ScrollTriggerProxy />

          {loaded && (
            <>
              <section data-scroll-section><Home /></section>
              <section data-scroll-section><About /></section>
              <section data-scroll-section><Shop /></section>
              <section data-scroll-section><Marquee /></section>
              <section data-scroll-section><NewArrival /></section>
              <section data-scroll-section><Footerhome /></section>
            </>
          )}
        </main>
      </LocomotiveScrollProvider>
    </ThemeProvider>
  );
}

export default HomePage;