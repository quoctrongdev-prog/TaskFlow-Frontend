import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "@/components/ui/Logo";
import FooterColumn from "./ui/FooterColumn";
import SocialIcon from "./ui/SocialIcon";

export default function LandingFooter() {
  return (
    <main>
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <Logo dark />

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                TaskFlow is a simple project and task management workspace
                designed to help teams organize work and get things done.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <SocialIcon icon={<Github size={17} />} />
                <SocialIcon icon={<Twitter size={17} />} />
                <SocialIcon icon={<Linkedin size={17} />} />
                <SocialIcon icon={<Instagram size={17} />} />
              </div>
            </div>

            {/* Product */}
            <FooterColumn
              title="Product"
              links={["Features", "Projects", "Tasks", "Dashboard"]}
            />

            {/* Company */}
            <FooterColumn
              title="Company"
              links={["About", "Careers", "Contact", "Blog"]}
            />

            {/* Resources */}
            <FooterColumn
              title="Resources"
              links={["Documentation", "Help center", "Privacy", "Terms"]}
            />
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 TaskFlow. All rights reserved.</p>

            <div className="flex gap-5">
              <a href="#" className="hover:text-slate-300">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-slate-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
