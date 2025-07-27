import { motion } from "framer-motion";
import React from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import styled from "styled-components";
import Image from 'next/image';

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
    <Section>
      <LogoContainer>
        <Image
          width={300}
          height={300}
          src="/Svgs/LOGOimg.svg"
          alt="Wibe"
          data-scroll
          data-scroll-speed="2"
          style={{ width: '10vw', height: 'auto' }}
        />
        <h3 data-scroll data-scroll-speed="-1">
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
          <li aria-hidden="true" onClick={() => handleScroll("#home")}>
            home
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".about")}>
            about
          </li>
          <li aria-hidden="true" onClick={() => handleScroll("#shop")}>
            Explore
          </li>
          <li aria-hidden="true" onClick={() => handleScroll(".new-arrival")}>
            new arrival
          </li>
        </ul>
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
              href="http://devdreaming.com"
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