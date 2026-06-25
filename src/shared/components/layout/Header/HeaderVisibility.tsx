"use client";

import { usePathname } from "next/navigation";

type HeaderVisibilityProps = {
  children: React.ReactNode;
};

const HeaderVisibility = ({ children }: HeaderVisibilityProps) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/cadastro";

  if (isAuthPage) {
    return null;
  }

  return children;
};

HeaderVisibility.displayName = "HeaderVisibility";

export { HeaderVisibility };
