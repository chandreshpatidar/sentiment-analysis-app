import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { AppLayout } from "@/components/AppLayout";

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
      <body>
        <Provider>
          <AppLayout>{children}</AppLayout>
        </Provider>
      </body>
    </html>
  );
}
