"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isSerModeloPage = pathname === "/ser-modelo";

  if (isSerModeloPage) return null;
  
  return <Footer />;
}

