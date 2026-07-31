import type { Metadata } from "next";
import {
  Archivo_Black,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Special_Elite,
} from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "AVALA — Cuentas de cobro validadas y listas para pagar",
  description:
    "AVALA revisa PILA, RUT y los demás documentos de tus proveedores y resuelve las correcciones por WhatsApp, para que tus cuentas de cobro lleguen listas para pagar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${archivoBlack.variable} ${plexSans.variable} ${plexMono.variable} ${specialElite.variable}`}
    >
      <body className="bg-paper font-body text-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
