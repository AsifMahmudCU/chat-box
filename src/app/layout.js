import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export const metadata = {
  title: "Jui Chat",
  description: "Author: Afreed Bin Haque & Asif Mahmud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        {children} <Toaster />
      </body>
    </html>
  );
}
