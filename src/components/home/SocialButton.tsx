import Link from "next/link";
import Image from "next/image";

type SocialButtonProps = {
  href: string;
  label: string;
  imgSrc?: string;
  svgIcon?: boolean;
  className?: string;
};

export default function SocialButton({
  href,
  label,
  imgSrc,
  svgIcon,
  className = "",
}: SocialButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="group p-1 rounded-full animate-rotate-border hover:bg-conic/[from_var(--border-angle)] focus:bg-conic/[from_var(--border-angle)] from-blue-300 via-blue-500 to-cyan-400 will-change-[background] ring-0 outline-none"
    >
    <div
      className={`flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full ${className}`}
    >
      {imgSrc && (
        <Image src={imgSrc} alt={label} width={20} height={20} />
      )}
      {svgIcon && (
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
      )}
      <span className="text-sm font-medium">{label}</span>
    </div>
    </Link>
  );
}