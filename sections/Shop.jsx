import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";

const Section = styled(motion.section)`
  min-height: 100vh;
  height: auto;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  color: ${(props) => props.theme.text};
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Left = styled.div`
  width: 35%;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  z-index: 10;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    width: 80%;
    margin: 0 auto;
  }

  @media (max-width: 64em) {
    p {
      font-size: ${(props) => props.theme.fontmd};
    }
  }

  @media (max-width: 48em) {
    width: 40%;
    p {
      font-size: ${(props) => props.theme.fontsm};
    }
  }
  @media (max-width: 30em) {
    p {
      font-size: ${(props) => props.theme.fontxs};
    }
  }
`;

const Right = styled.div`
  position: absolute;
  left: 35%;
  padding-left: 30%;
  background-color: ${(props) => props.theme.grey};
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Item = styled(motion.div)`
  display: inline-block;
  width: 20rem;
  margin-right: 6rem;

  img {
    width: 100%;
    height: auto;
    cursor: pointer;
  }

  h1 {
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    color: black;
  }

  @media (max-width: 48em) {
    width: 15rem;
  }
`;

const Product = ({ img, title = "" }) => {
  return (
    <Item
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: "all" }}
    >
      <Image 
        width={400} 
        height={600} 
        src={img} 
        alt={title} 
        style={{ width: '100%', height: 'auto' }}
      />
      <h1>{title}</h1>
    </Item>
  );
};

const Shop = () => {
  const ref = useRef(null);
  const Horizontalref = useRef(null);

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = Horizontalref.current;
    
    if (!element || !scrollingElement) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const setupAnimation = () => {
      const pinWrapWidth = scrollingElement.offsetWidth;
      
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scroller: ".App",
          scrub: 1,
          pin: true,
        }
      });

      t1.to(element, {
        height: `${scrollingElement.scrollWidth}px`,
        ease: "none",
      });

      t1.to(scrollingElement, {
        x: -pinWrapWidth,
        ease: "none",
      });

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(setupAnimation, 1000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([element, scrollingElement]);
    };
  }, []);

  return (
    <Section ref={ref} id="shop">
      <Title data-scroll data-scroll-speed="-1">
        Explore
      </Title>
      <Left>
        <p>
          We have five main sections on our website: Beauty, Trending,
          Culture, Celebrity's Choice, and Jewellery. 
          <br /><br />
          From the latest fashion and beauty tips to star styles, cultural insights, 
          and stunning accessories — we bring you everything to stay stylish and inspired.
          <br /><br />
          Give it a try and experience a new look.
        </p>
      </Left>
      <Right data-scroll ref={Horizontalref}>
        <Link href="/trending"><Product img="/Images/Trending.jpg" title="Trending" /></Link>
        <Link href="/featured"><Product img="/Images/celebrity.jpg" title="Featured" /></Link>
        <Link href="/traditional"><Product img="/Images/Cultural.jpg" title="Traditional" /></Link>
        <Link href="/beauty"><Product img="/Images/beauty.jpg" title="Beauty" /></Link>
        <Link href="/wedding"><Product img="/Images/jewellary.jpg" title="Weddings" /></Link>
      </Right>
    </Section>
  );
};

export default Shop;