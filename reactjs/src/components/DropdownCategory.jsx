import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { handlegetAllRoots, handlegetAllCatalogs } from "../redux/apiRequest";
import { FaAngleRight } from "react-icons/fa";

const DropdownCategory = ({ parentID, toggleSubCatalogShut }) => {
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const childList = useSelector((state) => state?.sales.allChilds);
    const dispatch = useDispatch();

    useEffect(() => {
        handlegetAllRoots(dispatch);
        handlegetAllCatalogs(dispatch);
    }, [dispatch]);

    const handleMouseLeave = () => {
        if (toggleSubCatalogShut) {
            toggleSubCatalogShut(); // Call the function only if it's provided
        }
    };

    if (!catalogList) {
        return null;
    }

    return (
        <div className="dropdownSub" onMouseLeave={handleMouseLeave}>
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
                                                            textDecoration:
                                                                "none",
                                                            fontSize: "15px",
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
