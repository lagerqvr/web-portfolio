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
        return activeRoute === route ? "" : "";
    };

    return (
        <>
            <div className="bg-white dark:bg-black w-full h-20 top-0 fadeIn">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex flex-row justify-between items-center align-middle h-full">
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
                        <ul className="hidden md:flex gap-x-12 text-black dark:text-white z-10 pt-3">
                            <li onClick={() => handleClick("/")} className={`zoom ${isActive("/")}`}>
                                <Link href="/">
                                    <p>home</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/experience")} className={`zoom ${isActive("/experience")}`}>
                                <Link href="/experience">
                                    <p>experience</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/projects")} className={`zoom ${isActive("/projects")}`}>
                                <Link href="/projects">
                                    <p>projects</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/favorites")} className={`zoom ${isActive("/favorites")}`}>
                                <Link href="/favorites">
                                    <p>favorites</p>
                                </Link>
                            </li>
                            <li onClick={() => handleClick("/contact")} className={`zoom ${isActive("/contact")}`}>
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
