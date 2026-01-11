import Link from "next/link";
import { CARME } from "@/lib/carme";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="text-xl font-semibold">
        {CARME.brand}™
      </Link>
      <div className="text-sm text-zinc-600">
        Hosted by {CARME.legal}
      </div>
    </header>
  );
}
