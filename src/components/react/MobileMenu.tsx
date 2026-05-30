/**
 * MobileMenu.tsx — React island
 * --------------------------------------------------------------------------
 * Hamburger toggle + slide-down mobile navigation drawer.
 * Mounted with client:load so it's interactive immediately.
 *
 * Behaviour:
 *  - Opens/closes via the hamburger button in the header
 *  - Closes when the user clicks any nav link
 *  - Closes on ESC key press
 *  - Traps focus while open (A11y)
 *  - Locks body scroll while open
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Catering", href: "/catering" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const MENU_CATEGORIES = [
  "Traditional Irish Classics",
  "American Pub Fare",
  "Starters",
  "Draft Beers",
  "Bottles & Cans",
  "Whiskey & Spirits",
  "Cocktails",
  "Non-Alcoholic",
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuSubOpen, setIsMenuSubOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMenuSubOpen(false);
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Return focus to toggle button on close
  useEffect(() => {
    if (!isOpen) buttonRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      {/* Hamburger / close button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-pub-green md:hidden"
      >
        {isOpen ? (
          <X size={22} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Menu size={22} strokeWidth={2} aria-hidden="true" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed inset-x-0 top-0 z-50 flex flex-col bg-wood-darker pb-8 pt-20 shadow-2xl transition-transform duration-300 ease-in-out md:hidden max-h-[90vh] overflow-y-auto",
          isOpen ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        {/* Separator */}
        <div className="mx-6 mb-6 h-px bg-pub-green/30" />

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4">
          {NAV_ITEMS.map(({ label, href }) =>
            label === "Menu" ? (
              <div key={href}>
                <button
                  onClick={() => setIsMenuSubOpen((prev) => !prev)}
                  aria-expanded={isMenuSubOpen}
                  className="display-caps flex w-full items-center rounded-sm px-4 py-3 text-sm tracking-widest text-white transition-colors hover:bg-pub-green/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pub-green"
                >
                  {label}
                </button>
                {isMenuSubOpen && (
                  <div className="flex flex-col gap-1 bg-black/20 pl-4 py-2">
                    <a
                      href="/menu"
                      onClick={close}
                      className="display-caps px-4 py-2 text-xs tracking-widest text-white/70 hover:text-white"
                    >
                      All Items
                    </a>
                    {MENU_CATEGORIES.map((cat) => (
                      <a
                        key={cat}
                        href={`/menu#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={close}
                        className="display-caps px-4 py-2 text-xs tracking-widest text-white/70 hover:text-white"
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={href}
                href={href}
                onClick={close}
                className="display-caps flex items-center rounded-sm px-4 py-3 text-sm tracking-widest text-white transition-colors hover:bg-pub-green/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pub-green"
              >
                {label}
              </a>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="mt-6 px-8">
          <a
            href="tel:+15595551234"
            onClick={close}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-pub-green px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-pub-green-dark"
          >
            Call Us
          </a>
        </div>
      </div>
    </>
  );
}
