"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <nav className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
      {status === "authenticated" ? (
        <div>
          {session.user!.name} <Link className="ml-3" href="/api/auth/signout">Sign out</Link>
        </div>
      ) : (
        <></>
      )}
      {status === "unauthenticated" ? (
        <Link href="/api/auth/signin">Sign in</Link>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
