import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { handlegetAllRoots, handlegetAllCatalogs } from "../redux/apiRequest";
import { FaAngleRight } from "react-icons/fa";

const DropdownCategory = ({ parentID }) => {
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const childList = useSelector((state) => state?.sales.allChilds);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState();
    console.log(parentID);
    useEffect(() => {
        handlegetAllRoots(dispatch);
        handlegetAllCatalogs(dispatch);
        setIsDropdownOpen(parentID);
    }, [parentID, dispatch]);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    if (!catalogList) {
        return null;
    }

    return (
        <div
            className="dropdownSub"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ display: isDropdownOpen && parentID ? "block" : "none" }}
        >
            <div className="dropdown-content">
                <div className="wrapperCategory" style={{ width: "100%" }}>
                    <div className="catalogWrapper">
                        {catalogList?.data.catalogs.catalogs
                            .filter(
                                (catalog) =>
                                    catalog.rootcategory_id === parentID
                            )
                            .map((catalog) => (
                                <div key={catalog.id} className="catalogItem">
                                    <div className="catalogTitle">
                                        {catalog.name}
                                    </div>
                                    <div className="children">
                                        {childList?.data.childs.childs
                                            .filter(
                                                (child) =>
                                                    child.parent_id ===
                                                    catalog.id
                                            )
                                            .map((child) => (
                                                <div
                                                    key={child.id}
                                                    className="child"
                                                >
                                                    <Link
                                                        to={`/allproducts/${child.id}`}
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropdownCategory;
