"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Get to know me better — my journey, passion, and what drives me forward.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-6">
                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed">
                  <span className="gradient-text text-4xl">&ldquo;</span>
                  Technology is best when it brings people together. As a developer, 
                  I strive to bridge complexity with clarity.
                  <span className="gradient-text text-4xl">&rdquo;</span>
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-glass-border">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">3+</p>
                    <p className="text-xs sm:text-sm text-foreground-muted">Years Coding</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">10+</p>
                    <p className="text-xs sm:text-sm text-foreground-muted">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">5+</p>
                    <p className="text-xs sm:text-sm text-foreground-muted">Technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Software Engineering</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    I specialize in building robust, scalable applications with clean architecture. 
                    From frontend interfaces to backend systems, I enjoy the full development lifecycle.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/5">
                  <svg className="w-6 h-6 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Machine Learning</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    Fascinated by AI and its potential, I explore machine learning applications 
                    using PyTorch and Python to solve real-world problems.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Web Development</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    Creating modern, responsive web experiences with React, Next.js, and 
                    Tailwind CSS. I focus on performance, accessibility, and beautiful design.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
