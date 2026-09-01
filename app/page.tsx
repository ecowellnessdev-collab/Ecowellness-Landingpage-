import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Services from "@/components/Services";
import AyurvedicServices from "@/components/AyurvedicServices";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <Header />
      <Hero />
      <Services />
      <AyurvedicServices />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
