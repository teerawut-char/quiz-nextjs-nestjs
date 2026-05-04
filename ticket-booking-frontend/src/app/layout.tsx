import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Brand | Ticket Booking",
    description: "Secure and professional ticket booking portal.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
