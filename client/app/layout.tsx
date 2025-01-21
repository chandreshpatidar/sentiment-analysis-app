import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentiment",
  description: "Sentiment Analysis App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
