"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { milonga } from "@/utils/fonts";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-16 gap-12 lg:gap-20"
    >
      {/* Left Section - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center lg:items-start gap-6 max-w-xl text-center lg:text-left"
      >
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-button px-4 py-2 rounded-full text-sm text-foreground-muted"
        >
          👋 Welcome to my portfolio
        </motion.div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Hi, I&apos;m{" "}
          <span className={"gradient-text whitespace-nowrap " + milonga.className}>Richard Senger</span>
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-foreground-muted font-medium">
          Software Engineer
        </p>

        {/* Tagline */}
        <p className="text-foreground-muted leading-relaxed max-w-md">
          Passionate about building elegant solutions with modern web technologies 
          and machine learning. Turning complex problems into simple, beautiful experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent-secondary text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-button px-6 py-3 rounded-2xl font-medium hover:border-glass-border-hover"
          >
            Get in Touch
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-4">
          <SocialLink
            href="https://github.com/richard-sen27"
            label="GitHub"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
          />
          <SocialLink
            href="https://www.linkedin.com/in/richard-senger-75a200252/"
            label="LinkedIn"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            }
          />
          <SocialLink
            href="mailto:contact@richard-senger.com"
            label="Email"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />
        </div>
      </motion.div>

      {/* Right Section - Profile Picture */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent-secondary to-accent blur-3xl opacity-20 animate-pulse-glow" />
        
        {/* Profile Image Container */}
        <div className="relative gradient-border rounded-full p-1 animate-rotate-border">
          <div className="rounded-full overflow-hidden bg-background p-1">
            <Image
              src="/black-white-face.webp"
              alt="Portrait of Richard Senger"
              width={320}
              height={320}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="glass-button p-3 rounded-xl text-foreground-muted hover:text-foreground group relative"
    >
      {icon}
      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-background-secondary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  );
}