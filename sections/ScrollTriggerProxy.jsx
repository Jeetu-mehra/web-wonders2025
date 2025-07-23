import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (!scroll || !scroll.el) return;

    const element = scroll.el;

    const scrollerProxy = {
      scrollTop(value) {
        try {
          if (arguments.length) {
            scroll.scrollTo(value, { duration: 0, disableLerp: true });
          }
          return scroll.scroll.instance.scroll.y;
        } catch (err) {
          return 0;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: element.style.transform ? "transform" : "fixed"
    };

    ScrollTrigger.scrollerProxy(element, scrollerProxy);

    const handleScroll = () => {
      try {
        ScrollTrigger.update();
      } catch (err) {
        console.warn("Scroll update error:", err);
      }
    };

    scroll.on("scroll", handleScroll);

    // Initialize with delay
    const initTimeout = setTimeout(() => {
      try {
        scroll.update();
        ScrollTrigger.refresh();
      } catch (err) {
        console.warn("Initialization error:", err);
      }
    }, 1500);

    return () => {
      clearTimeout(initTimeout);
      scroll.off("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;