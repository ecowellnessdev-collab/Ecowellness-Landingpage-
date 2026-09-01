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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nextIsVisible = currentScrollY < 80 || currentScrollY < lastScrollY;

      setIsScrolled(currentScrollY > 24);
      setIsVisible(nextIsVisible);
      if (!nextIsVisible) {
        setIsMenuOpen(false);
      }
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
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      } ${
        isScrolled || isMenuOpen
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

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-[#e8c27c] transition-colors hover:border-[#e8c27c]/70 hover:bg-white/10 md:hidden"
        >
          <span className="flex flex-col gap-1">
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
          </span>
        </button>
      </nav>

      <div
        className={`md:hidden transition-all duration-200 ease-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="mx-6 mb-4 flex flex-col rounded-lg border border-white/10 bg-[#1d120b]/95 px-5 py-3 text-sm font-medium tracking-wide text-[#e8c27c] shadow-xl shadow-black/20">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;

            return (
              <li key={link.section}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative block py-3 transition-colors duration-300 after:absolute after:bottom-2 after:left-0 after:h-px after:w-5 after:rounded-full after:bg-[#e8c27c] after:transition-all after:duration-300 ${
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
      </div>
    </header>
  );
}
