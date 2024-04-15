"use client"
import "./globals.css";

import { Suspense } from "react";
import { RecoilRoot } from 'recoil';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <RecoilRoot>
        <body >
          <Suspense>
            {children}
          </Suspense>
        </body>
      </RecoilRoot>
    </html>
  );
}
