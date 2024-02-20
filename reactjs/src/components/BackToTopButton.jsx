import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "../Styles/Style.scss";
const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        const scrollStep = window.scrollY / 50;

        const scroll = () => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, -scrollStep);
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <button
            onClick={scrollToTop}
            id="backtoTop"
            style={{
                display: visible ? "block" : "none",
            }}
        >
            <FaArrowCircleUp style={{ display: visible ? "inline" : "none" }} />
        </button>
    );
};

export default BackToTopButton;
