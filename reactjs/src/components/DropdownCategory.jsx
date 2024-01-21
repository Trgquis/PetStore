import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handlegetChildCatalogs } from "../redux/apiRequest";
import "../Styles/Dropdown.scss";

export default function DropdownCategoryComponent({ parentID }) {
    const childList = useSelector((state) => state?.sales.allChilds.data);
    const dispatch = useDispatch();
    console.log(parentID);
    useEffect(() => {
        handlegetChildCatalogs(dispatch);
    }, []);

    const renderCategories = (parentID) => {
        const children = childList?.catalogs.filter(
            (catalog) => catalog.parent_id === parentID
        );
        const grandchildren = children.flatMap((child) =>
            childList?.catalogs.filter(
                (catalog) => catalog.parent_id === child.id
            )
        );
        return grandchildren.map((category) => (
            <li className="wrapperCategory" key={category.id}>
                <Link
                    className="contentCategory"
                    to={`/allproducts/${category.id}`}
                >
                    {category.name}
                </Link>
            </li>
        ));
    };

    return <>{renderCategories(parentID)}</>;
}
