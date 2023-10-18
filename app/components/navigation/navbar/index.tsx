import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { usePathname } from 'next/navigation'

const Navbar = ({ toggle }: { toggle: () => void }) => {
    const pathname = usePathname();
    const [activeRoute, setActiveRoute] = useState(pathname);

    const handleClick = (route: string) => {
        setActiveRoute(route);
    };

    const isActive = (route: string) => {
        return activeRoute === route ? "font-bold " : "";
    };

    return (
        <>
            <div className="bg-white dark:bg-black w-full h-20 top-0 fadeIn">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo />
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
                        <ul className="hidden md:flex gap-x-6 text-black dark:text-white z-10">
                            <li onClick={() => handleClick("/")} className={isActive("/")}>
                                <Link href="/">
                                    <p>home</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/experience")} className={isActive("/experience")}>
                                <Link href="/experience">
                                    <p>experience</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/projects")} className={isActive("/projects")}>
                                <Link href="/projects">
                                    <p>projects</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/favorites")} className={isActive("/favorites")}>
                                <Link href="/favorites">
                                    <p>favorites</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/contact")} className={isActive("/contact")}>
                                <Link href="/contact">
                                    <p>contact</p>
                                </Link>
                            </li>
                        </ul>
                        <div className="hidden md:block">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
