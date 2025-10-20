"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { Box } from "@radix-ui/themes";
const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  const link = [
    { label: "Dashborad", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>{<AiFillBug />}</Link>
      <ul className="flex space-x-6">
        {link.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                " text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </Box>
    </nav>
  );
};
export default NavBar;
