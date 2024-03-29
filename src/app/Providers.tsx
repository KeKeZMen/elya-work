"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <>{children}</>;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
