import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Dynamically import LocomotiveScroll to avoid SSR issues
const LocomotiveScroll = typeof window !== "undefined" ? require("locomotive-scroll").default : null;

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start) {
  useEffect(() => {
    if (!start || typeof window === "undefined" || !LocomotiveScroll) return;

    let locoScroll = null;
    let scrollEl = document.querySelector("[data-scroll-container]");

    // Guard clause if no scroll container found
    if (!scrollEl) {
      console.warn("No element with [data-scroll-container] found");
      return;
    }

    try {
      // Initialize Locomotive Scroll
      locoScroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        multiplier: 1,
        smartphone: {
          smooth: false,
        },
        tablet: {
          smooth: false,
        },
        reloadOnContextChange: true,
      });

      // Sync GSAP ScrollTrigger with Locomotive Scroll
      locoScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollEl.style.transform ? "transform" : "fixed",
      });

      // Update ScrollTrigger when Locomotive Scroll refreshes
      const lsUpdate = () => {
        if (locoScroll) {
          locoScroll.update();
        }
      };

      ScrollTrigger.addEventListener("refresh", lsUpdate);
      ScrollTrigger.refresh();

      // Cleanup function
      return () => {
        if (locoScroll) {
          ScrollTrigger.removeEventListener("refresh", lsUpdate);
          locoScroll.off("scroll");
          locoScroll.destroy();
          locoScroll = null;
        }

        ScrollTrigger.clearMatchMedia();
        ScrollTrigger.defaults({ scroller: window });
        ScrollTrigger.refresh();
      };
    } catch (error) {
      console.error("Error initializing Locomotive Scroll:", error);
    }
  }, [start]);
}