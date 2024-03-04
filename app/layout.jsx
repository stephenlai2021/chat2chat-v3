import "./globals.css";

/* next */
import { Inter } from "next/font/google";
// import { Lateef } from "next/font/google";

/* utils */
import { Toaster } from "react-hot-toast";

/* daisy-ui theme */
import DaisyUIThemeProvider from "@/providers/daisyui-theme-provider";

/* components */
import ChatList from "@/components/main/ChatList";

const inter = Inter({ subsets: ["latin"] });
// const inter = Lateef({ subsets: ["latin"] });

export const metadata = {
  title: "Chat2Chat-V3",
  description:
    "an instant messenger that brings up your communication to a incredible awesome level 😍",
  icons: {
    icon: "/chat-icon.png",
  },
  content: {
    width: "device-width",
    "user-scalable": "no",
    "initial-scale": "1.0",
    "maximum-scale": "1.0",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning>
        <DaisyUIThemeProvider>
          <Toaster position="bottom-center" />
          <div className="max-w-[1200px] mx-auto bg-base-200 flex">
            <ChatList />
            {children}
          </div>
        </DaisyUIThemeProvider>
      </body>
    </html>
  );
}