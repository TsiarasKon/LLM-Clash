import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LLM Clash",
    description: "Let your LLMs fight!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ backgroundColor: '#212121' }}>
                <React.StrictMode>
                    {children}
                    <ToastContainer autoClose={4000} newestOnTop theme="dark" />
                </React.StrictMode>
            </body>
        </html>
    );
}
