import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!scroll || !scroll.el || isMounted.current) {
      console.log("ScrollTriggerProxy: Skipping initialization - scroll or scroll.el missing or already mounted");
      return;
    }

    isMounted.current = true;
    const element = scroll.el;

    if (!document.contains(element)) {
      console.warn("ScrollTriggerProxy: Scroll element not found in DOM");
      return;
    }

    const scrollerProxy = {
      scrollTop(value) {
        try {
          if (!document.contains(element)) {
            console.warn("ScrollTriggerProxy: Element not in DOM during scrollTop");
            return 0;
          }
          if (arguments.length) {
            scroll.scrollTo(value, { duration: 0, disableLerp: true });
          }
          return scroll.scroll.instance.scroll.y || 0;
        } catch (err) {
          console.warn("ScrollTriggerProxy: Scroll update error:", err);
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
        if (!document.contains(element)) {
          console.warn("ScrollTriggerProxy: Element not in DOM during scroll update");
          return;
        }
        ScrollTrigger.update();
      } catch (err) {
        console.warn("ScrollTriggerProxy: Scroll update error:", err);
      }
    };

    scroll.on("scroll", handleScroll);

    const initTimeout = setTimeout(() => {
      try {
        if (document.contains(element)) {
          console.log("ScrollTriggerProxy: Initializing scroll and refreshing ScrollTrigger");
          scroll.update();
          ScrollTrigger.refresh(true);
        } else {
          console.warn("ScrollTriggerProxy: Element not in DOM during initialization");
        }
      } catch (err) {
        console.warn("ScrollTriggerProxy: Initialization error:", err);
      }
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      try {
        scroll.off("scroll", handleScroll);
        ScrollTrigger.getAll().forEach(t => t.kill());
        ScrollTrigger.clearMatchMedia();
        console.log("ScrollTriggerProxy: Cleaned up");
      } catch (err) {
        console.warn("ScrollTriggerProxy: Cleanup error:", err);
      }
      isMounted.current = false;
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;