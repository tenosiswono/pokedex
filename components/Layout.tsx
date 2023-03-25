import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-screen-lg pt-8 min-h-screen">
        <div className="flex justify-center">
          <Image src="/img/logo.svg" alt="Pokemon" width={200}  height={75}/>
        </div>
        {children}
      </main>
    </div>
  );
}
