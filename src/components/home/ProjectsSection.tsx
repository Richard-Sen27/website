"use client";

import { motion } from "framer-motion";
import { milonga } from "@/utils/fonts";

interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Diploma Project: ERP Scipio",
    description:
      "Military ERP system developed in cooperation with a German startup. Next.js frontend, PostgreSQL database, Java Spring Boot backend. Team of 5.",
    tags: ["Next.js", "PostgreSQL", "Java", "Spring Boot", "ERP", "Team Project"],
    featured: true,
    // No githubUrl or liveUrl
  },
  {
    title: "NavigAI-tors",
    description:
      "AI-driven container ship route calculation. Winning project of the Austrian National AI Championship 2024.",
    tags: ["AI", "Route Optimization", "Shipping", "Championship Winner", "2024"],
    featured: true,
    liveUrl: "https://navigaitors.app",
    // No githubUrl
  },
  {
    title: "Volkstanzverband Burgenland Web Page",
    description:
      "Public web page for 'Volkstanzverband Burgenland' built with Next.js and Strapi CMS. Migrated from WordPress to a custom-hosted solution.",
    tags: ["Next.js", "Strapi", "CMS", "Migration", "Web Development"],
    featured: false,
    liveUrl: "https://web.infra.volkstanzverband-burgenland.at",
    // No githubUrl
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, glassmorphism-styled personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Features dark/light mode, smooth animations, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    githubUrl: "https://github.com/richard-sen27",
    featured: false,
    // No liveUrl
  },
  // {
  //   title: "Machine Learning Project",
  //   description:
  //     "A deep learning project exploring neural network architectures for image classification and natural language processing tasks using PyTorch.",
  //   tags: ["Python", "PyTorch", "Machine Learning", "Deep Learning"],
  //   githubUrl: "https://github.com/richard-sen27",
  //   featured: false,
  //   // No liveUrl
  // },
  // {
  //   title: "DevOps Pipeline",
  //   description:
  //     "Automated CI/CD pipeline setup with Docker containerization, GitHub Actions, and cloud deployment. Streamlines development workflow and ensures code quality.",
  //   tags: ["Docker", "CI/CD", "GitHub Actions", "Linux"],
  //   githubUrl: "https://github.com/richard-sen27",
  //   featured: false,
  //   // No liveUrl
  // },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
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
            Featured <span className={"gradient-text " + milonga.className}>Projects</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            A selection of projects I&apos;ve worked on. Each one represents a unique 
            challenge and learning experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group ${project.featured ? "md:col-span-1" : ""}`}
            >
              <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col">
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 via-accent-secondary/10 to-accent/10 overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent-secondary/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary to-accent-secondary text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-glass-bg border border-glass-border text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-glass-border min-h-[2.5rem]">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {!project.githubUrl && !project.liveUrl && (
                      <span className="text-xs text-foreground-muted italic opacity-60">No public links available</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/richard-sen27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-button px-6 py-3 rounded-2xl font-medium hover:border-glass-border-hover group"
          >
            View All Projects on GitHub
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
