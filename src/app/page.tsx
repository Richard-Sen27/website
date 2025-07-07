import Image from "next/image";
import Link from "next/link";
import { novaSquare } from "./layout";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-28 py-16 gap-12">
      
      {/* Left Section */}
      <div className="flex flex-col items-start gap-6 max-w-lg text-left">
        <h1
          className={`${novaSquare.className} text-5xl md:text-6xl leading-16 font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-400 text-transparent bg-clip-text`}
        >
          Richard Senger
        </h1>

        <p className="text-lg leading-relaxed text-gray-300">
          Software Engineer · Web Development ·  Machine Learning
        </p>

        {/* Social Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://www.linkedin.com/in/richard-senger-75a200252/"
            target="_blank"
            aria-label="LinkedIn"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:scale-105 hover:bg-blue-200 transition"
          >
            <Image
              src="/linkedin.png"
              alt="LinkedIn"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium">LinkedIn</span>
          </Link>

          <Link
            href="https://github.com/richard-sen27"
            target="_blank"
            aria-label="GitHub"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:scale-105 hover:bg-gray-200 transition"
          >
            <Image
              src="/github.png"
              alt="GitHub"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium">GitHub</span>
          </Link>

          <Link
            href="mailto:richard.senger27@icloud.com"
            aria-label="Email"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:scale-105 hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="currentColor"
              viewBox="0 0 24 24"
              className="text-black"
            >
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16l-8 5-8-5zm0 12V8l8 5 8-5v10H4z" />
            </svg>
            <span className="text-sm font-medium">Email</span>
          </Link>
        </div>
      </div>

      {/* Right Section: Portrait */}
      <div className="flex-shrink-0">
        <Image
          src="/black-white-face.webp"
          alt="Portrait of Richard Senger"
          width={400}
          height={400}
          className="rounded-full object-cover"
          priority
        />
      </div>
    </main>
  );
}