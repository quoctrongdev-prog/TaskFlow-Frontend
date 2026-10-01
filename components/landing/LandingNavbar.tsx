"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/ui/Logo";

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Workflow
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              About
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Pricing
            </a>
          </div>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="btn-secondary">
              Log in
            </Link>

            <Link href="/dashboard" className="btn-primary">
              Get started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                Features
              </a>

              <a
                href="#workflow"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                Workflow
              </a>

              <a
                href="#about"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                About
              </a>

              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                Pricing
              </a>

              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <Link href="/login" className="btn-secondary w-full">
                  Log in
                </Link>

                <Link href="/dashboard" className="btn-primary w-full">
                  Get started
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
  );
}
