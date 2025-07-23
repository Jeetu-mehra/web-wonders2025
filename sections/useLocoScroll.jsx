import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const LocomotiveScroll = typeof window !== "undefined" ? require("locomotive-scroll").default : null;

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start) {
  useEffect(() => {
    if (!start || typeof window === "undefined" || !LocomotiveScroll) return;

    let locoScroll = null;
    let scrollEl = document.querySelector("[data-scroll-container]");

    if (!scrollEl) {
      console.warn("No element with [data-scroll-container] found");
      return;
    }

    // Initialize with safer options
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

    // Error boundary for scroll events
    const handleScroll = () => {
      try {
        ScrollTrigger.update();
      } catch (e) {
        console.warn("ScrollTrigger update error:", e);
      }
    };

    locoScroll.on("scroll", handleScroll);

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (arguments.length && locoScroll) {
          locoScroll.scrollTo(value, {
            duration: 0,
            disableLerp: true
          });
        }
        return locoScroll?.scroll?.instance?.scroll?.y || 0;
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

    // Refresh with delay to ensure DOM is ready
    const refresh = () => {
      if (locoScroll) {
        locoScroll.update();
        ScrollTrigger.refresh();
      }
    };

    const refreshTimeout = setTimeout(refresh, 1000);

    // Cleanup function
    return () => {
      clearTimeout(refreshTimeout);
      if (locoScroll) {
        locoScroll.off("scroll", handleScroll);
        locoScroll.destroy();
        locoScroll = null;
      }
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.defaults({ scroller: window });
    };
  }, [start]);
}