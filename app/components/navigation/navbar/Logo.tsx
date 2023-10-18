import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";

const Logo = () => {
    const [width, setWidth] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
    }, []);

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

    let logoSrc;
    switch (resolvedTheme) {
        case 'light':
            logoSrc = '/logo-light.svg';
            break;
        case 'dark':
            logoSrc = '/logo-dark.svg';
            break;
        default:
            logoSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            break;
    }

    return (
        <>
            {hasMounted && (
                <Link href="/" style={{ display: showButton ? "none" : "block" }}>
                    <Image
                        src={logoSrc}
                        alt="Logo"
                        width={"64"}
                        height={"64"}
                        className="relative fadeIn"
                    />
                </Link>
            )}
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