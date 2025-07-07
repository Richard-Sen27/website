"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { novaSquare } from "@/utils/fonts";
import SocialButton from "./SocialButton";

export default function HeroSection() {
  return (
    <section className="min-h-screen snap-start w-full bg-black text-white flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-28 py-16 gap-12">
      
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-start gap-6 max-w-lg text-left"
      >
        <h1
          className={`${novaSquare.className} text-6xl md:text-6xl leading-[1.2] font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-400 text-transparent bg-clip-text`}
        >
          Richard Senger
        </h1>

        <p className="text-lg leading-relaxed text-gray-300">
          Software Engineer · Web Development · Machine Learning
        </p>

        <div className="flex flex-wrap gap-4">
          <SocialButton
            href="https://www.linkedin.com/in/richard-senger-75a200252/"
            label="LinkedIn"
            imgSrc="/linkedin.png"
            className="group-hover:bg-sky-100"
          />
          <SocialButton
            href="https://github.com/richard-sen27"
            label="GitHub"
            imgSrc="/github.png"
            className="group-hover:bg-gray-200"
          />
          <SocialButton
            href="mailto:richard.senger27@icloud.com"
            label="Email"
            svgIcon
            className="group-hover:bg-gray-200"
          />
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex-shrink-0"
      >
        <Image
          src="/black-white-face.webp"
          alt="Portrait of Richard Senger"
          width={400}
          height={400}
          className="rounded-full object-cover"
          priority
        />
      </motion.div>
    </section>
  );
}