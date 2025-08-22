"use client";

// import defaultUser from "default-user.png";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  const protectedLinks = [
    { name: "Dashboard", href: "/dashboard/add-product" },
  ];

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <nav className="max-w-7xl mx-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {publicLinks?.map((link, idx) => {
                const activePathName = pathName === link.href;
                return (
                  <li
                    key={idx}
                    className={activePathName ? "border-b " : undefined}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                );
              })}
              {status === "authenticated" &&
                session &&
                protectedLinks?.map((link, idx) => {
                  const activePathName = pathName === link.href;
                  return (
                    <li
                      key={idx}
                      className={activePathName ? "border-b " : undefined}
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <Link href={"/"} className="text-2xl font-semibold">
            Next.JS
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {publicLinks?.map((link, idx) => {
              const activePathName = pathName === link.href;
              return (
                <li
                  key={idx}
                  className={activePathName ? "border-b " : undefined}
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
            {status === "authenticated" &&
              session &&
              protectedLinks?.map((link, idx) => {
                const activePathName = pathName === link.href;
                return (
                  <li
                    key={idx}
                    className={activePathName ? "border-b " : undefined}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="navbar-end">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : session ? (
            // User is logged in
            <>
              <div className="avatar mr-2">
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                  <img src={session.user?.image || "/default-user.png"} />
                </div>
              </div>
              <Button onClick={() => signOut({ callbackUrl: "/login" })}>
                LogOut
              </Button>
            </>
          ) : (
            // User is NOT logged in
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
