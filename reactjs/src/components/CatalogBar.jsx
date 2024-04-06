import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import "../Styles/Main.scss";
import DropdownCategory from "./DropdownCategory";
export default function CatalogBar() {
    const rootList = useSelector((state) => state?.sales.allRoots);
    const [activeId, setActiveId] = useState(null);

    return (
        <div>
            <div
                className="catalog"
                style={{
                    top: "105px",
                    width: "244.5px",
                    position: "absolute",
                    left: "-55%",
                    zIndex: "20",
                    height: "auto",
                    color: "#000",
                }}
            >
                <div className="catalog_title">
                    <span>danh mục sản phẩm</span>
                </div>

                <div className="catalog_item">
                    {rootList?.data.roots.roots.map((root) => (
                        <div
                            key={root.id}
                            className="active"
                            onMouseEnter={() => setActiveId(root.id)}
                        >
                            <span
                                style={{
                                    cursor: "pointer",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {root.name}
                                <FaAngleRight />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "135px",
                    left: "370px",
                    zIndex: "20",
                }}
            >
                {<DropdownCategory parentID={activeId} />}
            </div>
        </div>
    );
}
