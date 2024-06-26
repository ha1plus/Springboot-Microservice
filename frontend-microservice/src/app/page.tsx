'use client'
import Link from "next/link";
import { ReactNode } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <>
      <ToastContainer />
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/owner">
                  Owner Management
                </Link>
              </li>
              <li>
                <Link href="/task">
                  Task Management
                </Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">T Task</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/owner">
                Owner Management
              </Link>
            </li>
            <li>
              <Link href="/task">
                Task Management
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-ghost text-xl">Powered by Ha1</a>
        </div>
      </div>
      {children}
    </>
  );
}
