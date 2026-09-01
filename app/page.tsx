import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Services from "@/components/Services";
import AyurvedicServices from "@/components/AyurvedicServices";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <Header />
      <Hero />
      <ScrollReveal delay={0.1}>
        <Services />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <AyurvedicServices />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <About />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Contact />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
