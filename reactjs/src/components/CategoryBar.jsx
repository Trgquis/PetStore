import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/ProductDetail.scss";
import {
    handlegetAllCatalogs,
    handlegetAllChilds,
    handlegetAllRoots,
} from "../redux/apiRequest";

const CategoryBar = ({ catalogId }) => {
    const dispatch = useDispatch();
    const [categoryChain, setCategoryChain] = useState([]);
    const catalogList = useSelector((state) => state.sales.allCatalogs);
    const rootList = useSelector((state) => state.sales.allRoots);
    const childList = useSelector((state) => state.sales.allChilds);

    useEffect(() => {
        const fetchData = async () => {
            await handlegetAllRoots(dispatch);
            await handlegetAllCatalogs(dispatch);
            await handlegetAllChilds(dispatch);
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (
            catalogId &&
            childList?.data.childs.childs.length > 0 &&
            catalogList?.data.catalogs.catalogs.length > 0 &&
            rootList?.data.roots.roots.length > 0
        ) {
            const currentChild = childList?.data.childs.childs.find(
                (child) => child.id === catalogId
            );
            if (currentChild) {
                const parentCategory = catalogList?.data.catalogs.catalogs.find(
                    (category) => category.id === currentChild.parent_id
                );
                if (parentCategory) {
                    const rootCategory = rootList?.data.roots.roots.find(
                        (root) => root.id === parentCategory.rootcategory_id
                    );
                    if (rootCategory) {
                        setCategoryChain([
                            rootCategory,
                            parentCategory,
                            currentChild,
                        ]);
                    }
                }
            }
        }
    }, [catalogId, childList, catalogList, rootList]);

    return (
        <div className="categoryBar">
            <Link to="/">Trang chủ</Link>
            {categoryChain.map((category, index) => (
                <React.Fragment key={`${category.id}_${index}`}>
                    {" > "}
                    <Link to={`/allproducts/${category.id}`}>
                        {category.name}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
};

export default CategoryBar;
