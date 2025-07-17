import React from "react";
import styled from "styled-components";
import dynamic from 'next/dynamic';

const CoverVideo = dynamic(() => import('@/sections/CoverVideo'), {
  ssr: false,
  loading: () => <></>
});
const Navbarhome = dynamic(() => import('@/sections/Navbar'), {
  ssr: false,
  loading: () => <></>
});
const Logo = dynamic(() => import('@/sections/Logo'), {
  ssr: false,
  loading: () => <></>
});

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Home = () => {
  return (
    <Section id="home">
      <Logo />
      <Navbarhome />
      <CoverVideo />
    </Section>
  );
};

export default Home;