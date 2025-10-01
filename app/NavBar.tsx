"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
const NavBar = () => {
  const currentPath = usePathname();
  const link = [
    { lable: "Dashborad", href: "/" },
    { lable: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>{<AiFillBug />}</Link>
      <ul className="flex space-x-6">
        {link.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              " text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800": true,
            })}
            href={link.href}
          >
            {link.lable}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
