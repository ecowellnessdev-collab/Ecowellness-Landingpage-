"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Services", href: "#services", section: "services" },
  { label: "About", href: "#about", section: "about" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 24);
      setIsVisible(currentScrollY < 80 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-nav-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const sectionName = (visibleEntry?.target as HTMLElement)?.dataset.navSection;

        if (sectionName) {
          setActiveSection(sectionName);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isScrolled
          ? "bg-black/70 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-4 md:px-8">
        <a href="#home" aria-label="Eco Wellness Spa home">
          <Image
            src="/logo-mark.png"
            alt="Eco Wellness Spa"
            width={172}
            height={135}
            priority
            className="h-14 w-auto md:h-16"
          />
        </a>

        <ul className="hidden items-center gap-10 text-sm font-medium tracking-wide text-[#e8c27c] md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;

            return (
              <li key={link.section}>
                <a
                  href={link.href}
                  className={`relative block pb-1 transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-[#e8c27c] after:transition-all after:duration-300 ${
                    isActive
                      ? "text-white after:scale-x-100 after:opacity-100"
                      : "after:scale-x-0 after:opacity-0 hover:text-white"
                  }`}
                >
                  {link.label.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
