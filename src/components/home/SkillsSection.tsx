"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { milonga } from "@/utils/fonts";
import Image from "next/image";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "ai";
}

const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  // Tools
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "CI/CD", category: "tools" },
  // AI/ML
  { name: "Python", category: "ai" },
  { name: "PyTorch", category: "ai" },
  { name: "Machine Learning", category: "ai" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
  { id: "ai", label: "AI/ML" },
];

// Animation duration for skill badge appearance (in seconds)
const ANIMATION_DURATION = 0.3;

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className={"gradient-text " + milonga.className}>Skills</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "glass-button hover:border-glass-border-hover"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills as Tags */}
        <div 
          className="relative transition-all duration-300"
          style={{ minHeight: '100px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION_DURATION }}
              className="flex flex-wrap justify-center gap-3"
            >
              {filteredSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-full text-sm font-medium glass-card cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-center text-foreground-muted text-sm mb-6">
            Technologies I frequently work with
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "React", icon: "react" },
              { name: "Next.js", icon: "nextjs" },
              { name: "TypeScript", icon: "typescript" },
              { name: "Tailwind", icon: "tailwindcss" },
              { name: "Node.js", icon: "nodejs" },
              { name: "Python", icon: "python" },
              { name: "Docker", icon: "docker" },
              { name: "Git", icon: "git" },
            ].map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.1, y: -4 }}
                className="glass-button p-3 rounded-xl group relative"
              >
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="w-8 h-8"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                  }}
                />
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-background-secondary border border-glass-border text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
