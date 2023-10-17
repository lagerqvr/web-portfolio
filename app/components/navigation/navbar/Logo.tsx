"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

const Logo = () => {
    //Update the size of the logo when the size of the screen changes
    const [width, setWidth] = useState(0);

    // State variable for dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
    }, []);

    // Detect dark mode on component mount
    useEffect(() => {
        const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(mode);
    }, []);

    // Change between the logo and the button when the user scrolls
    const [showButton, setShowButton] = useState(false);

    const changeNavButton = () => {
        if (window.scrollY >= 400 && window.innerWidth < 768) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNavButton);
    }, []);

    return (
        <>
            <Link href="/" style={{ display: showButton ? "none" : "block" }}>
                <Image
                    src={isDarkMode ? "/logo-light.svg" : "/logo-dark.svg"}
                    alt="Logo"
                    width={"64"}
                    height={"64"}
                    className="relative"
                />
            </Link>
            <div
                style={{
                    display: showButton ? "block" : "none",
                }}
            >
                <Button />
            </div>
        </>
    );
};

export default Logo;