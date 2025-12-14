import "./globals.css";
import { CARME } from "@/lib/carme";
import type { ReactNode } from "react";

export const metadata = {
  title: `${CARME.brand} | ${CARME.vehicle.title}`,
  description: "Direct, host-operated car rentals with Stripe checkout.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
