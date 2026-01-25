import React from "react";
import Hero from "../components/home/Hero";
import Story from "../components/home/Story";
import WhyUs from "../components/home/WhyUs";
import Partners from "../components/home/Partners";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <section id="story">
        <Story />
      </section>

        <WhyUs />
      <section id="partners">
        <Partners />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}

export default Home;
