import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Logo from "./Logo";
import Button from "./Button";

const Navbar = ({ toggle }: { toggle: () => void }) => {
    const pathname = usePathname();

    const isActive = (route: string) => {
        return pathname === route ? "" : "";
    };

    return (
        <>
            <div className="bg-white dark:bg-black w-full h-20 top-0 fadeIn">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex flex-row justify-between items-center align-middle h-full">
                        <div className="w-20 h-8">
                            <Logo />
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center md:hidden text-black dark:text-white"
                            onClick={toggle}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                                />
                            </svg>
                        </button>
                        <ul className="hidden md:flex gap-x-12 text-black dark:text-white z-10 pt-3">
                            <li className={`zoom ${isActive("/")}`}>
                                <Link href="/">
                                    <p>home</p>
                                </Link>
                            </li>
                            <li className={`zoom ${isActive("/experience")}`}>
                                <Link href="/experience">
                                    <p>experience</p>
                                </Link>
                            </li>
                            <li className={`zoom ${isActive("/projects")}`}>
                                <Link href="/projects">
                                    <p>projects</p>
                                </Link>
                            </li>
                            <li className={`zoom ${isActive("/favorites")}`}>
                                <Link href="/favorites">
                                    <p>favorites</p>
                                </Link>
                            </li>
                            <li className={`zoom ${isActive("/contact")}`}>
                                <Link href="/contact">
                                    <p>contact</p>
                                </Link>
                            </li>
                        </ul>
                        <div className="hidden md:block w-20 h-10">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

