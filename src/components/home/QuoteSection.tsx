"use client";

import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="w-full min-h-screen snap-start px-6 md:px-28 py-24 bg-black text-white flex justify-center items-center">
      <motion.blockquote
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-y-6 md:gap-y-0 max-w-3xl text-center "
      >
        {/* Opening quotation mark */}
        <span
          className={`self-start md:-translate-x-1/2 text-7xl md:text-9xl font-bold -mb-8 md:-mb-14 bg-linear-to-r from-blue-300 via-blue-500 to-cyan-400 text-transparent bg-clip-text`}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          Technology is best when it brings people together. <br className="hidden md:block" />
          As a developer, I strive to bridge complexity with clarity.
        </p>

        {/* Closing quotation mark */}
        <span
          className={`self-end md:translate-x-1/2 text-7xl md:text-9xl font-bold bg-linear-to-r from-blue-300 via-blue-500 to-cyan-400 text-transparent bg-clip-text`}
          aria-hidden="true"
        >
          &rdquo;
        </span>
      </motion.blockquote>
    </section>
  );
}