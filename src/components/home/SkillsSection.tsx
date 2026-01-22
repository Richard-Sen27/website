"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "ai";
  icon: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend", icon: "⚛️" },
  { name: "Next.js", level: 85, category: "frontend", icon: "▲" },
  { name: "TypeScript", level: 85, category: "frontend", icon: "📘" },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "🎨" },
  // Backend
  { name: "Node.js", level: 80, category: "backend", icon: "🟢" },
  { name: "Java", level: 75, category: "backend", icon: "☕" },
  { name: "Spring Boot", level: 70, category: "backend", icon: "🌱" },
  { name: "PostgreSQL", level: 75, category: "backend", icon: "🐘" },
  // Tools
  { name: "Git", level: 85, category: "tools", icon: "📦" },
  { name: "Docker", level: 70, category: "tools", icon: "🐳" },
  { name: "Linux", level: 75, category: "tools", icon: "🐧" },
  // AI/ML
  { name: "Python", level: 85, category: "ai", icon: "🐍" },
  { name: "PyTorch", level: 70, category: "ai", icon: "🔥" },
  { name: "Machine Learning", level: 65, category: "ai", icon: "🤖" },
];

const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "frontend", label: "Frontend", icon: "🎨" },
  { id: "backend", label: "Backend", icon: "⚙️" },
  { id: "tools", label: "Tools", icon: "🛠️" },
  { id: "ai", label: "AI/ML", icon: "🤖" },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24">
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
            Technical <span className="gradient-text">Skills</span>
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
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-primary to-accent-secondary text-white shadow-lg shadow-primary/25"
                  : "glass-button hover:border-glass-border-hover"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              layout
              className="glass-card rounded-2xl p-5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className="text-sm text-foreground-muted">{skill.level}%</span>
              </div>

              {/* Skill Bar */}
              <div className="h-2 bg-glass-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.level}%` : 0 }}
                  transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                  className="h-full skill-bar rounded-full"
                />
              </div>
            </motion.div>
          ))}
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
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                  alt={tech.name}
                  className="w-8 h-8"
                  onError={(e) => {
                    // Fallback for icons that need different paths
                    const target = e.target as HTMLImageElement;
                    target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                  }}
                />
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-background-secondary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
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
