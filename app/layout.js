import { Inter, Roboto_Mono, Playfair_Display, Montserrat} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "Velure Magazine",
  description: "Premium fashion and lifestyle content",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}