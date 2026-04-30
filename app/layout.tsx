import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CNX247 — Business Management Software for Nigerian Teams",
  description:
    "CNX247 is Nigeria's all-in-one company management system — CRM, HR, payroll, projects & team chat in one platform. Book a free demo today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CNX247",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, iOS, Android",
              description:
                "Nigeria's all-in-one company management system — CRM, HR, payroll, projects and team collaboration.",
              offers: [
                {
                  "@type": "Offer",
                  name: "Startup",
                  price: "10000",
                  priceCurrency: "NGN",
                },
                {
                  "@type": "Offer",
                  name: "SMB",
                  price: "18000",
                  priceCurrency: "NGN",
                },
              ],
              provider: {
                "@type": "Organization",
                name: "Connexxion Telecoms",
                url: "https://cnx247.com",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
