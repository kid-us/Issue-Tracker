"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface Links {
  name: string;
  href: string;
  id: number;
}

const Navbar = () => {
  const links: Links[] = [
    { id: 1, name: "Dashboard", href: "/" },
    { id: 2, name: "Issues", href: "/issues" },
  ];

  const currentPathName = usePathname();

  return (
    <nav className="flex justify-between items-center h-16 border-b border-gray-700 mb-8">
      <Link
        href={"/"}
        className="bi bi-bug-fill text-2xl text-yellow-400"
      ></Link>
      <ul className="flex space-x-10">
        {links.map((l) => (
          <li key={l.id}>
            <Link
              href={l.href}
              className={`${
                currentPathName === l.href ? "text-white" : "text-zinc-400"
              } hover:text-white transition-colors`}
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
