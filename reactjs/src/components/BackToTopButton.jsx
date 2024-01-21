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
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
