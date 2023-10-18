import Link from "next/link";
import Button from "../navbar/Button";

const Sidebar = ({
    isOpen,
    toggle,
}: {
    isOpen: boolean;
    toggle: () => void;
}): JSX.Element => {
    return (
        <>
            <div
                className="sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white dar dark:bg-black grid pt-[120px] left-0 z-10"
                style={{
                    opacity: `${isOpen ? "1" : "0"}`,
                    top: `${isOpen ? "0" : "-100%"}`,
                    transition: 'all 0.4s ease-in-out'
                }}
            >
                <button className="absolute right-0 p-5 text-black dark:text-white" onClick={toggle}>
                    {/* Close icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                        />
                    </svg>
                </button>

                <ul className="sidebar-nav text-center leading-relaxed text-xl text-black dark:text-white">
                    <li>
                        <Link href="/" onClick={toggle}>
                            <p>home</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/experience" onClick={toggle}>
                            <p>experience</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" onClick={toggle}>
                            <p>projects</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/favorites" onClick={toggle}>
                            <p>favorites</p>
                        </Link>
                    </li>
                    {/*
                    <li>
                        <Link href="/guestbook" onClick={toggle}>
                            <p>guestbook</p>
                        </Link>
                    </li>
                    */}
                    <li>
                        <Link href="/contact" onClick={toggle}>
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