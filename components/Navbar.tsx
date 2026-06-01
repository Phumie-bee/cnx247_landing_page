"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import logo from "@/public/cnx247_logo-t.png";

const navLinks = [
  { label: "Why CNX247", href: "/#why" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  // { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isFocusedPage = pathname === "/contact" || pathname === "/products";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The homepage leads with a dark hero, so the navbar stays light-on-dark
  // throughout: transparent at the very top, frosted-dark once scrolled.
  const isHome = pathname === "/";
  const lightText = isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !scrolled
          ? "bg-transparent border-b border-transparent"
          : isHome
            ? "bg-black/65 backdrop-blur-xl border-b border-white/10 shadow-sm"
            : "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-bold text-primary tracking-tight"
        >
          <Image src={logo} alt="CNX247 Logo" width={120} height={120} />
        </Link>

        {/* Desktop nav */}
        {isFocusedPage && (
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-body hover:text-primary transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to home
          </Link>
        )}

        {!isFocusedPage && (
          <ul
            className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
              lightText ? "text-white/85" : "text-body"
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    lightText ? "hover:text-accent" : "hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!isFocusedPage && (
          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              className="hidden md:inline-flex px-5! py-2! text-sm! bg-primary!"
            >
              Get Started
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                lightText ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-5 h-5 ${lightText ? "text-white" : "text-heading"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {!isFocusedPage && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen
              ? `max-h-64 border-t ${lightText ? "border-white/10" : "border-gray-100"}`
              : "max-h-0"
          }`}
        >
          <div
            className={`px-6 py-4 backdrop-blur-xl space-y-1 ${
              lightText ? "bg-black/70" : "bg-white/95"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 text-sm font-medium transition-colors ${
                  lightText
                    ? "text-white/85 hover:text-accent"
                    : "text-body hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/contact"
              className="w-full mt-2 px-5! py-2.5! text-sm! bg-primary!"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
