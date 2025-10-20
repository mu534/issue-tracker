"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href={"/"}>{<AiFillBug />}</Link>
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};
const NavLink = () => {
  const currentPath = usePathname();

  const link = [
    { label: "Dashborad", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6">
      {link.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              " !text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated")
    <Link className="nav-link" href="/api/auth/signin">
      Sign in
    </Link>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default NavBar;
