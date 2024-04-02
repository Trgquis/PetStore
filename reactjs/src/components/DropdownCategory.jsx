import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { handlegetAllRoots, handlegetAllCatalogs } from "../redux/apiRequest";
import { FaAngleRight } from "react-icons/fa";

const DropdownCategory = ({ parentID }) => {
    const catalogList = useSelector((state) => state?.sales.allCatalogs.data);
    const childList = useSelector((state) => state?.sales.allChilds.data);
    const dispatch = useDispatch();
    const [hoveredCatalogId, setHoveredCatalogId] = useState(null);
    const [isChildDropdownVisible, setIsChildDropdownVisible] = useState(false);
    let hideTimeout;
    useEffect(() => {
        handlegetAllRoots(dispatch);
        handlegetAllCatalogs(dispatch);
    }, [dispatch]);

    const handleCatalogHover = (catalogId) => {
        setHoveredCatalogId(catalogId);
        setIsChildDropdownVisible(true); // Hiển thị dropdown con khi di chuột vào dropdown cha
    };

    const handleCatalogLeave = () => {
        hideTimeout = setTimeout(() => {
            setIsChildDropdownVisible(false); // Ẩn dropdown con sau khoảng thời gian chờ
        }, 4000); // Đặt khoảng thời gian chờ trước khi ẩn dropdown con
    };

    if (!catalogList) {
        return null;
    }

    const filteredCatalogs = catalogList.catalogs.catalogs.filter(
        (catalog) => catalog.rootcategory_id === parentID
    );

    // const filteredChilds = childList.childs.childs.filter(
    //     (child) => child.parent_id === hoveredCatalogId
    // );
    const filteredChilds = filteredCatalogs.flatMap((catalog) =>
        childList.childs.childs.filter(
            (child) => child.parent_id === catalog.id
        )
    );
    return (
        <>
            <div className="dropdownSub">
                <div className="dropdown-content">
                    <div className="wrapperCategory" style={{ width: "100%" }}>
                        <div>
                            <div>
                                {catalogList.catalogs.catalogs
                                    .filter(
                                        (catalog) =>
                                            catalog.rootcategory_id === parentID
                                    )
                                    .map((catalog) => (
                                        <div
                                            style={{
                                                maxWidth: "auto",
                                                wordWrap: "break-word",
                                            }}
                                            key={catalog.id}
                                        >
                                            {catalog.name}
                                        </div>
                                    ))}
                            </div>
                            <div>
                                {catalogList.catalogs.catalogs
                                    .filter(
                                        (catalog) =>
                                            catalog.rootcategory_id === parentID
                                    )
                                    .map((catalog) => (
                                        <div key={catalog.id}>
                                            {childList.childs.childs
                                                .filter(
                                                    (child) =>
                                                        child.parent_id ===
                                                        catalog.id
                                                )
                                                .map((child) => (
                                                    <div
                                                        key={child.id}
                                                        to={`/category/${child.id}`}
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                    >
                                                        {child.name}
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropdownCategory;
