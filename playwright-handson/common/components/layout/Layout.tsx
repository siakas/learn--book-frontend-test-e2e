import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/common/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NotoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${NotoSans.variable} font-[family-name:var(--font-noto-sans)]`}
    >
      <div className="min-h-screen p-10">
        <main>
          <ul className="mb-8 flex gap-2">
            <li>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">ホーム</Link>
              </Button>
            </li>
            <li>
              <Button variant="outline" size="sm" asChild>
                <Link href="/form">入力フォーム</Link>
              </Button>
            </li>
          </ul>
          {children}
        </main>
      </div>
    </div>
  );
};
