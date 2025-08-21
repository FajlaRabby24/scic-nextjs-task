'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const Navbar = () => {
  const pathName  = usePathname()

  const links = [
    {name: 'Home', href: '/'},
    {name: 'Products', href: '/products'},
  ]
    return (
        <nav className="max-w-7xl mx-auto">
          <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
        <ul
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
          links?.map((link, idx) => {
            return(
              <li key={idx}>{link.name}</li>
            )
          })
        }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Next.JS</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       {
          links?.map((link, idx) => {
            const activePathName = pathName === link.href
            return(
              <li key={idx} className={activePathName ? 'border-b ': undefined}><Link href={link.href}>{link.name}</Link></li>
            )
          })
        }
    </ul>
  </div>
  <div className="navbar-end">
    <Button >Login</Button>
  </div>
</div>
        </nav>
    );
};

export default Navbar;
