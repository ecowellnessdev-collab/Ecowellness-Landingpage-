import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#311602] py-4">
      <div className="pointer-events-none absolute bottom-0 right-0 w-[90px] opacity-70 md:w-[280px] md:opacity-100 lg:w-[340px]">
        <Image
          src="/footimag.png"
          alt=""
          width={547}
          height={643}
          className="h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <p className="text-xs text-white/60">
          © 2026 Eco Wellness Spa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
