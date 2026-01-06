import Link from "next/link";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-neutral-900">
          “Is this allowed?” Assistant
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-neutral-700">
          <Link href="/assistant" className="hover:text-black">
            Assistant
          </Link>
          <Link href="/library" className="hover:text-black">
            Rules library
          </Link>
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Button asChild size="sm">
            <Link href="/assistant">Start</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
