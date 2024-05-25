import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import "../Styles/Main.scss";
import DropdownCategory from "./DropdownCategory";
import { Link } from "react-router-dom";
export default function CatalogBar() {
    const rootList = useSelector((state) => state?.sales.allRoots);
    const [activeId, setActiveId] = useState(null);
    const [show, setShow] = useState(false);
    const toggleSubCatalog = (ID) => {
        return () => {
            if (activeId !== ID) {
                setActiveId(ID);
                setShow(true);
            }
        };
    };
    const toggleSubCatalogShut = () => {
        setShow(false);
    };

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };
    return (
        <>
            <div className="catalogfixed">
                <div className="catalog_title">
                    <span>danh mục</span>
                </div>

                <div className="catalog_item">
                    {rootList?.data.roots.roots.map((root) => (
                        <div
                            key={root.id}
                            className="active"
                            onMouseEnter={toggleSubCatalog(root.id)}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    alignItems: "center",
                                }}
                                onClick={handleLinkClick}
                            >
                                {root.name}
                            </div>
                            <FaAngleRight />
                        </div>
                    ))}
                    <Link to={"/pages/chinh-sach-mua-hang"}>Liên hệ</Link>
                    <Link to={"/pages/chinh-sach-mua-hang"}>Giới thiệu</Link>
                    <Link to={"/maintenance"}>Tin tức</Link>
                    <div className="mobile-menu__help">
                        <p className="help-title">LIÊN HỆ VỚI HAPPYPET</p>{" "}
                        <div className="help-item">
                            <a
                                className="help-item--link"
                                href="tel:0988004089"
                                rel="nofollow"
                            >
                                <svg viewBox="0 0 24 24" role="presentation">
                                    <g
                                        stroke-width="2"
                                        fill="none"
                                        fill-rule="evenodd"
                                        stroke-linecap="square"
                                    >
                                        <path
                                            d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z"
                                            stroke="#252a2b"
                                        ></path>
                                        <path
                                            d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5"
                                            stroke="#6b4433"
                                        ></path>
                                    </g>
                                </svg>
                                0364.998.896
                            </a>
                        </div>
                        <div className="help-item">
                            <a
                                className="help-item--link"
                                href="mailto:info@mozzi.vn"
                                rel="nofollow"
                            >
                                <svg viewBox="0 0 22 22" role="presentation">
                                    <g fill="none" fill-rule="evenodd">
                                        <path
                                            stroke="#252a2b"
                                            d="M.916667 10.08333367l3.66666667-2.65833334v4.65849997zm20.1666667 0L17.416667 7.42500033v4.65849997z"
                                        ></path>
                                        <path
                                            stroke="#252a2b"
                                            stroke-width="2"
                                            d="M4.58333367 7.42500033L.916667 10.08333367V21.0833337h20.1666667V10.08333367L17.416667 7.42500033"
                                        ></path>
                                        <path
                                            stroke="#252a2b"
                                            stroke-width="2"
                                            d="M4.58333367 12.1000003V.916667H17.416667v11.1833333m-16.5-2.01666663L21.0833337 21.0833337m0-11.00000003L11.0000003 15.5833337"
                                        ></path>
                                        <path
                                            d="M8.25000033 5.50000033h5.49999997M8.25000033 9.166667h5.49999997"
                                            stroke="#6b4433"
                                            stroke-width="2"
                                            stroke-linecap="square"
                                        ></path>
                                    </g>
                                </svg>
                                info@happypet.vn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    zIndex: "20",
                    left: "255px",
                    top: "8vh",
                }}
            >
                {show && (
                    <DropdownCategory
                        parentID={activeId}
                        toggleSubCatalogShut={toggleSubCatalogShut}
                    />
                )}
            </div>
        </>
    );
}
