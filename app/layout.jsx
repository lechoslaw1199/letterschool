import { Quicksand } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Reading.com | Teach Your Child To Read Early, Step By Step",
  description: "Reading.com is a children's learning-to-read app that helps kids learn to read early, step by step.",
  icons: {
    icon: "/favicon-32.png",
  },
};

import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-quicksand antialiased overflow-x-hidden`}>
        <OnboardingProvider>
          <BackgroundWrapper>
            {children}
          </BackgroundWrapper>
        </OnboardingProvider>
      </body>
    </html>
  );
}
