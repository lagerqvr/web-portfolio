import React, { useState } from "react";
import Link from "next/link";
import Button from "../navbar/Button";
import { usePathname } from "next/navigation";

const Sidebar = ({
    isOpen,
    toggle,
}: {
    isOpen: boolean;
    toggle: () => void;
}): JSX.Element => {
    const pathname = usePathname();
    const [activeRoute, setActiveRoute] = useState(pathname);

    const handleClick = (route: string) => {
        setActiveRoute(route);
        toggle(); // Close the sidebar when a link is clicked
    };

    const isActive = (route: string) => {
        return pathname === route ? "font-bold" : "";
    };

    return (
        <>
            <div
                className="sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white dark:bg-black grid pt-[120px] left-0 z-10"
                style={{
                    opacity: `${isOpen ? "1" : "0"}`,
                    top: `${isOpen ? "0" : "-100%"}`,
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <button className="absolute right-0 p-5 text-black dark:text-white" onClick={toggle} aria-label="Menu">
                    {/* Close icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <ul className="sidebar-nav text-center leading-relaxed text-2xl text-black dark:text-white">
                    <li onClick={() => handleClick("/")} className={`${isActive("/")}`}>
                        <Link href="/">
                            <p>home</p>
                        </Link>
                    </li>
                    <li onClick={() => handleClick("/experience")} className={`${isActive("/experience")}`}>
                        <Link href="/experience">
                            <p>experience</p>
                        </Link>
                    </li>
                    <li onClick={() => handleClick("/projects")} className={`${isActive("/projects")}`}>
                        <Link href="/projects">
                            <p>projects</p>
                        </Link>
                    </li>
                    <li onClick={() => handleClick("/favorites")} className={`${isActive("/favorites")}`}>
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
                <div className="absolute left-0 p-5">
                    <Button />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
