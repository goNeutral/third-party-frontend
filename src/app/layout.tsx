'use client';

// import type { Metadata } from "next";
import React from 'react';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/theme-provider';

// export const metadata: Metadata = {
//   metadataBase: new URL(
//     process.env.APP_URL
//       ? `${process.env.APP_URL}`
//       : process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}`
//       : `http://localhost:${process.env.PORT || 3000}`
//   ),
//   title: "shadcn/ui sidebar",
//   description:
//     "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
//   alternates: {
//     canonical: "/"
//   },
//   openGraph: {
//     url: "/",
//     title: "shadcn/ui sidebar",
//     description:
//       "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
//     type: "website"
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "shadcn/ui sidebar",
//     description:
//       "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness."
//   }
// };

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={GeistSans.className}>
				<AuthProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
