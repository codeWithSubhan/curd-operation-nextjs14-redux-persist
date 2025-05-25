"use client";
import Link from "next/link";
import {
  ChevronLast,
  ChevronFirst,
  FileText,
  Stamp,
  Layers,
  FileUser,
  FolderClock,
  CalendarDays,
  House,
} from "lucide-react";
import React, { FC, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  icon: ReactNode;
  text: string;
  to: string;
};

type SidebarProps = {
  item: NavItem;
  expanded: boolean;
  pathname: string;
};

const Sidebar: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { icon: <House size={20} />, text: "Create Order", to: "/" },
    { icon: <FileText size={20} />, text: "Daily Visit", to: "/daily" },
    { icon: <Stamp size={20} />, text: "Donate", to: "/donate" },
    { icon: <Layers />, text: "Work Orders", to: "/workorder" },
    { icon: <FileUser size={20} />, text: "Reports", to: "/report" },
    {
      icon: <FolderClock size={20} />,
      text: "Reports History",
      to: "/reporthistory",
    },
    {
      icon: <FolderClock size={20} />,
      text: "Test History",
      to: "/testhistory",
    },
    {
      icon: <CalendarDays size={20} />,
      text: "Calendar Type",
      to: "/calender",
    },
  ];

  return (
    <aside className="h-screen sticky top-0">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://datagainservices.com/wp-content/uploads/2024/01/datagain-logo.png"
            className={`transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
          {navItems.map((nav) => (
            <SidebarItem
              key={nav.text}
              item={nav}
              expanded={expanded}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const SidebarItem: FC<SidebarProps> = ({ item, expanded, pathname }) => {
  const { icon, text, to } = item;
  const isActive = pathname === to;

  return (
    <li>
      <Link href={to}>
        <div
          className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>

          {!expanded && (
            <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 w-max">
              {text}
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default Sidebar;
