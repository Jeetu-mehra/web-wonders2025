import React from "react";
import styled from "styled-components";
import Image from 'next/image';

const Section = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  display: flex;

  @media (max-width: 48em) {
    width: 90vw;
  }

  @media (max-width: 30em) {
    width: 100vw;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: relative;
  z-index: 5;
  margin-top: 20%;

  @media (max-width: 64em) {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    margin: 0 auto;
    padding: 2rem;
    font-weight: 600;
    backdrop-filter: blur(2px);
    background-color: ${(props) => `rgba(${props.theme.textRgba},0.4)`};
    border-radius: 20px;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
    padding: 2rem;
    width: 70%;
  }
`;

const Right = styled.div`
  width: 50%;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }

  .small-img-1 {
    width: 40%;
    position: absolute;
    right: 95%;
    bottom: 10%;
  }
  .small-img-2 {
    width: 40%;
    position: absolute;
    left: 80%;
    top: 30%;
  }
  @media (max-width: 64em) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }

    .small-img-1 {
      width: 30%;
      height: auto;
      left: 5%;
      bottom: 10%;
    }
    .small-img-2 {
      width: 30%;
      height: auto;
      position: absolute;
      left: 60%;
      bottom: 20%;
    }
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontBig};
  font-family: "Kaushan Script";
  font-weight: 300;
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 5;

  span {
    display: inline-block;
  }

  @media (max-width: 64em) {
    font-size: ${(props) => `calc(${props.theme.fontBig} - 5vw)`};
    top: 0;
    left: 0%;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxxl};
  }
`;

const About = () => {
  return (
    <Section id="fixed-target" className="about">
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
      >
        About Us
      </Title>
      <Left data-scroll data-scroll-sticky data-scroll-target="#fixed-target">
        We&apos;re a fashion-forward digital magazine based in India, celebrating the 
        art, passion, and evolution of style. From haute couture to everyday wear, we 
        bring stories, trends, and inspiration that redefine the way fashion is seen 
        and experienced.
        <br />
        <br />
        At our core, we believe fashion is more than clothing—it&apos;s a voice, an identity, and a 
        statement. Through carefully curated articles, interviews, lookbooks, and editorials, 
        we capture the pulse of the industry and the essence of individuality.
        <br />
        <br />
        Our mission is to explore creativity without limits. We feature emerging designers, 
        global icons, street style, and cultural influences that shape fashion today. Whether 
        you&apos;re a trendsetter or just love discovering what&apos;s next, our content is crafted to excite,
         inform, and inspire.
      </Left>

      <Right>
        <Image width={400} height={600} src="/Images/img1.webp" alt="About Us" style={{width: '100%', height: 'auto'}} />
        <Image
          width={400}
          height={600}
          className="small-img-1"
          src="/Images/img2.webp"
          alt="About Us"
          data-scroll
          data-scroll-speed="5"
          style={{width: '40%', height: 'auto'}}
        />
        <Image
          width={400}
          height={600}
          className="small-img-2"
          src="/Images/img3.webp"
          alt="About Us"
          data-scroll
          data-scroll-speed="-2"
          style={{width: '40%', height: 'auto'}}
        />
      </Right>
    </Section>
  );
};

export default About;