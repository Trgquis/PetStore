// DropdownCategory.jsx

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

    const handleDropdownChildEnter = () => {
        clearTimeout(hideTimeout); // Xóa bỏ timeout khi di chuột vào dropdown con
    };
    if (!catalogList) {
        return null;
    }

    const filteredCatalogs = catalogList.catalogs.catalogs.filter(
        (catalog) => catalog.rootcategory_id === parentID
    );

    const filteredChilds = childList.childs.childs.filter(
        (child) => child.parent_id === hoveredCatalogId
    );

    return (
        <>
            <div className="dropdown">
                <div className="dropdown-content">
                    <ul className="wrapperCategory">
                        {filteredCatalogs.map((catalog) => (
                            <li
                                className="categoriesline"
                                key={catalog.id}
                                onMouseEnter={() =>
                                    handleCatalogHover(catalog.id)
                                }
                                onMouseLeave={handleCatalogLeave}
                            >
                                    {catalog.name} <FaAngleRight />
                                
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isChildDropdownVisible && hoveredCatalogId && filteredChilds ? (
                <div
                    className="dropdownchild"
                    onMouseEnter={handleDropdownChildEnter}
                >
                    {filteredChilds.length > 0 && (
                        <ul className="wrapperCategorychild">
                            {filteredChilds.map((child) => (
                                <li
                                    className="categorieschildline"
                                    key={child.id}
                                >
                                    <Link to={`/allproducts/${child.id}`}>
                                        {child.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default DropdownCategory;
