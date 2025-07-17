import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();
  const isUpdating = useRef(false);

  useEffect(() => {
    if (!scroll) return;

    gsap.registerPlugin(ScrollTrigger);
    const element = scroll.el;

    // Prevent infinite loops
    const onScroll = () => {
      if (!isUpdating.current) {
        isUpdating.current = true;
        ScrollTrigger.update();
        isUpdating.current = false;
      }
    };

    scroll.on('scroll', onScroll);

    ScrollTrigger.scrollerProxy(element, {
      scrollTop(value) {
        if (arguments.length) {
          scroll.scrollTo(value, {
            duration: 0,
            disableLerp: true,
            callback: () => ScrollTrigger.update()
          });
        }
        return scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: element.style.transform ? 'transform' : 'fixed'
    });

    // Initialize
    ScrollTrigger.defaults({ scroller: element });
    ScrollTrigger.refresh();

    return () => {
      scroll.off('scroll', onScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;