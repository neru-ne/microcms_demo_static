"use client"
import "./globals.css";

import { Suspense } from "react";
import { RecoilRoot } from 'recoil';
import { SetOption } from '@/app/components/atoms/options/SetOption'
import { Head } from '@/app/components/layouts/Head'


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
            <SetOption />
            {children}
          </Suspense>
        </body>
      </RecoilRoot>
    </html>
  );
}
