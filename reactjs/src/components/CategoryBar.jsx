import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/ProductDetail.scss";
import {
    handlegetAllCatalogs,
    handlegetAllChilds,
    handlegetAllRoots,
} from "../redux/apiRequest";

const CategoryBar = ({ catalogId, catalogName, productName }) => {
    const dispatch = useDispatch();
    const [categoryChain, setCategoryChain] = useState([]);
    const [rootCategory, setRootCategory] = useState(null); // State để lưu trữ danh mục gốc
    const rootList = useSelector((state) => state.sales.allRoots);
    const catalogList = useSelector((state) => state.sales.allCatalogs);
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
        const findCategoryChain = () => {
            const catalogs = catalogList?.data.catalogs.catalogs;
            const childs = childList?.data.childs.childs;
            const roots = rootList?.data.roots.roots;

            if (catalogs && childs && roots) {
                const currentChild = childs.find(
                    (category) =>
                        category.id === catalogId &&
                        category.name === catalogName
                );

                if (currentChild) {
                    const parentCategory = catalogs.find(
                        (category) => category.id === currentChild.parent_id
                    );

                    if (parentCategory) {
                        const rootCategory = roots.find(
                            (root) => root.id === parentCategory.rootcategory_id
                        );

                        if (rootCategory) {
                            setCategoryChain([parentCategory, currentChild]);
                            setRootCategory(rootCategory);
                            return;
                        }
                    }
                }

                const currentCatalog = catalogs.find(
                    (category) =>
                        category.id === catalogId &&
                        category.name === catalogName
                );

                if (currentCatalog) {
                    setCategoryChain([currentCatalog]);
                    const rootCategory = roots.find(
                        (root) => root.id === currentCatalog.rootcategory_id
                    );

                    if (rootCategory) {
                        setCategoryChain([currentCatalog]);
                        setRootCategory(rootCategory);
                        return;
                    }
                    setRootCategory(null); // Không có danh mục gốc
                }

                const currentRoot = roots.find(
                    (root) => root.id === catalogId && root.name === catalogName
                );
                setCategoryChain(null);
                setRootCategory(currentRoot);
                return;
            }
        };

        findCategoryChain();
    }, [catalogId, catalogName, catalogList, childList, rootList]);

    console.log(categoryChain);
    console.log(rootCategory);
    return (
        <div className="categoryBar">
            <Link to="/">Trang chủ</Link>

            {rootCategory && (
                <React.Fragment>
                    {" / "}
                    <Link
                        to={`/allproducts/${rootCategory.id}/${rootCategory.name}`}
                    >
                        {rootCategory.name}
                    </Link>
                </React.Fragment>
            )}

            {categoryChain &&
                categoryChain.map((category, index) => (
                    <React.Fragment key={`${category.id}_${index}`}>
                        {" / "}
                        <Link
                            to={`/allproducts/${category.id}/${category.name}`}
                        >
                            {category.name}
                        </Link>
                    </React.Fragment>
                ))}

            <span
                style={{
                    fontSize: "13px",
                }}
            >
                {productName && ` / ${productName}`}
            </span>
        </div>
    );
};

export default CategoryBar;
