"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { techStackData } from "@/utils/techstackData";

const INTERVAL = 2000;

type Phase = "odd" | "pause1" | "even" | "pause2";

export default function TechStack() {
  const [isMobile, setIsMobile] = useState(false);
  const [phase, setPhase] = useState<Phase>("odd");
  const [columnStates, setColumnStates] = useState<number[]>([0, 1, 2]);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set([0, 1, 2]));
  const [mobileIndex, setMobileIndex] = useState(0);

  const totalItems = techStackData.length;
  const COLUMNS = isMobile ? 1 : 3;

  // Handle responsiveness
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Update desktop slideshow
  useEffect(() => {
    if (isMobile) return;

    const id = setInterval(() => {
      setColumnStates((prev) => {
        const updated = [...prev];
        const newUsed = new Set(usedIndices);

        for (let i = 0; i < COLUMNS; i++) {
          const isOdd = i % 2 === 0;
          const isEven = !isOdd;

          if ((phase === "odd" && isOdd) || (phase === "even" && isEven)) {
            const available = techStackData
              .map((_, idx) => idx)
              .filter((idx) => !newUsed.has(idx));

            let nextIndex: number;
            if (available.length === 0) {
              nextIndex = (prev[i] + 1) % totalItems;
              newUsed.clear();
            } else {
              nextIndex = available[Math.floor(Math.random() * available.length)];
            }

            updated[i] = nextIndex;
            newUsed.add(nextIndex);
          }
        }

        setUsedIndices(newUsed.size >= totalItems ? new Set(updated) : newUsed);
        return updated;
      });

      setPhase((prev) =>
        prev === "odd" ? "pause1" : prev === "pause1" ? "even" : prev === "even" ? "pause2" : "odd"
      );
    }, INTERVAL);

    return () => clearInterval(id);
  }, [phase, usedIndices, isMobile]);

  // Update mobile slideshow
  useEffect(() => {
    if (!isMobile) return;

    const id = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % totalItems);
    }, INTERVAL);

    return () => clearInterval(id);
  }, [isMobile]);

  // Determine which items to display
  const visibleItems = isMobile
    ? [techStackData[mobileIndex]]
    : columnStates.map((index) => techStackData[index]);

  return (
    <section className="w-full min-h-screen snap-start bg-black py-16 px-6 flex justify-center">
      <div
        className={`flex gap-x-18 ${
          isMobile ? "flex-col" : "flex-row"
        } justify-center items-center gap-10`}
      >
        {visibleItems.map((item, col) => (
          <AnimatePresence key={col} mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-white gap-2"
            >
              {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/tech/${item.icon}.png`}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ) : (
                <Image
                  src={`/tech/${item.icon}.png`}
                  alt={item.name}
                  width={80}
                  height={80}
                />
              )}
              <span className="text-sm text-gray-300">{item.name}</span>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
}