"use client";

import { cn } from "@/lib/utils";
import React from "react";
// import { useStore } from "@/hooks/use-store";
import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useRecoilState } from "recoil";
import { sidebarToggleAtom } from "@/hooks/use-sidebar-toggle";

const AdminPanelLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const sidebar = {isOpen: true}; // useStore(useSidebarToggle, (state) => state);
  const [sidebarToggle, setSidebarToggle] = useRecoilState(sidebarToggleAtom);

  if (!sidebarToggle) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebarToggle === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebarToggle === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}

export default AdminPanelLayout;