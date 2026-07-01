import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { config } from '@/lib/config';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const syne = Syne({
    subsets: ['latin'],
    variable: '--font-syne',
    display: 'swap',
});

export const metadata: Metadata = {
    title: `${config.githubUsername} | Developer Portfolio`,
    description: 'Portfolio of Marius4lui - Full Stack Developer',
    icons: {
        icon: `https://github.com/${config.githubUsername}.png`,
        shortcut: `https://github.com/${config.githubUsername}.png`,
        apple: `https://github.com/${config.githubUsername}.png`,
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${syne.variable}`}>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
