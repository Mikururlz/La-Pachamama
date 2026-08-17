import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./regional.css";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BackToTop from "./components/BackToTop";

export const metadata: Metadata = {
  title: "La Pachamama | Productos regionales",
  description: "Sabores, conservas y artesanías seleccionados.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}<BackToTop/><FloatingWhatsApp/></body></html>;
}
