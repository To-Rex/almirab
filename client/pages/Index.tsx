import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Skills } from "@/components/Skills";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Index() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
