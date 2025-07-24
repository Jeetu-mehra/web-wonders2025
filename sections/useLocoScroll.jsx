import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const LocomotiveScroll = typeof window !== "undefined" ? require("locomotive-scroll").default : null;

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start, containerRef) {
  useEffect(() => {
    if (!start || typeof window === "undefined" || !LocomotiveScroll || !containerRef.current) {
      console.warn("useLocoScroll: Skipping initialization - conditions not met");
      return;
    }

    let locoScroll = null;
    let scrollEl = containerRef.current;

    if (!scrollEl || !document.contains(scrollEl)) {
      console.warn("useLocoScroll: No valid [data-scroll-container] element found");
      return;
    }

    try {
      console.log("useLocoScroll: Initializing Locomotive Scroll");
      locoScroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        multiplier: 1,
        smartphone: { smooth: false },
        tablet: { smooth: false },
        reloadOnContextChange: true,
        lerp: 0.1,
        getDirection: true,
        getSpeed: true
      });

      window.locomotiveScroll = locoScroll;
      locoScroll.stop(); // Pause initially

      const handleScroll = () => {
        try {
          if (!document.contains(scrollEl)) {
            console.warn("useLocoScroll: Element not in DOM during scroll update");
            return;
          }
          ScrollTrigger.update();
        } catch (e) {
          console.warn("useLocoScroll: ScrollTrigger update error:", e);
        }
      };

      locoScroll.on("scroll", handleScroll);

      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          try {
            if (!document.contains(scrollEl)) {
              console.warn("useLocoScroll: Element not in DOM during scrollTop");
              return 0;
            }
            if (arguments.length && locoScroll) {
              locoScroll.scrollTo(value, {
                duration: 0,
                disableLerp: true
              });
            }
            return locoScroll?.scroll?.instance?.scroll?.y || 0;
          } catch (err) {
            console.warn("useLocoScroll: ScrollTop error:", err);
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
        pinType: scrollEl.style.transform ? "transform" : "fixed"
      });

      const refresh = () => {
        try {
          if (locoScroll && document.contains(scrollEl)) {
            console.log("useLocoScroll: Refreshing scroll and ScrollTrigger");
            locoScroll.update();
            ScrollTrigger.refresh();
            locoScroll.start(); // Resume after refresh
          } else {
            console.warn("useLocoScroll: Element not in DOM during refresh");
          }
        } catch (err) {
          console.warn("useLocoScroll: Refresh error:", err);
        }
      };

      const refreshTimeout = setTimeout(refresh, 2500);

      return () => {
        clearTimeout(refreshTimeout);
        try {
          if (locoScroll) {
            console.log("useLocoScroll: Cleaning up scroll instance");
            locoScroll.off("scroll", handleScroll);
            locoScroll.stop();
            locoScroll.destroy();
            window.locomotiveScroll = null;
            locoScroll = null;
          }
          ScrollTrigger.clearMatchMedia();
          ScrollTrigger.defaults({ scroller: window });
        } catch (err) {
          console.warn("useLocoScroll: Cleanup error:", err);
        }
      };
    } catch (err) {
      console.warn("useLocoScroll: Initialization error:", err);
    }
  }, [start, containerRef]);

  return null;
}