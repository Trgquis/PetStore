import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/ProductDetail.scss";
import { handlegetAllCatalogs } from "../redux/apiRequest";
import { useState } from "react";
const CategoryBar = ({ catalogId, product }) => {
    const dispatch = useDispatch();
    const [allCategories, setCatalogs] = useState([]);
    const data = useSelector((state) => state.sales)
    useEffect(() => {
        const fetchedCatalogs = async () => {
            const res = await handlegetAllCatalogs(dispatch);
            setCatalogs(res);
        };
        fetchedCatalogs();
    }, []);
    console.log(allCategories);

    if (catalogId === 99) {
        return (
            <div className="categoryBar">
                <Link to="/">Trang chủ</Link> {" > "}
                <p>Tất cả sản phẩm</p>
            </div>
        );
    } else if (catalogId === 2) {
        return (
            <div className="categoryBar">
                <Link to="/">Trang chủ</Link> {" > "}
                <Link to={`/allproducts/${99}}`}>Tất cả sản phẩm</Link>
                {" > "}
                <Link to={`/allproducts/${2}`}>Shop cho mèo</Link>
            </div>
        );
    } else if (catalogId === 1) {
        return (
            <div className="categoryBar">
                <Link to="/">Trang chủ</Link> {" > "}
                <Link to={`/allproducts/${99}}`}>Tất cả sản phẩm</Link>
                {" > "}
                <Link to={`/allproducts/${1}`}>Shop cho chó</Link>
            </div>
        );
    }

    return (
        <>
            {!product ? (
                <div className="categoryBar">
                    <Link to="/">Trang chủ</Link> {" > "}
                    {allCategories
                        .slice()
                        .reverse()
                        .map((category, index) => (
                            <React.Fragment key={category.id}>
                                {index > 0 && " > "}
                                <Link to={`/allproducts/${category.id}`}>
                                    {category.name}
                                </Link>
                            </React.Fragment>
                        ))}
                </div>
            ) : (
                <div className="categoryBar">
                    <Link to="/">Trang chủ</Link> {" > "}
                    {allCategories
                        .slice()
                        .reverse()
                        .map((category, index) => (
                            <React.Fragment key={category.id}>
                                {index > 0 && " > "}
                                <Link to={`/allproducts/${category.id}`}>
                                    {category.name}
                                </Link>
                            </React.Fragment>
                        ))}
                    {product.name && (
                        <>
                            {" > "}
                            <span style={{ paddingLeft: "15px" }}>
                                {product.name}
                            </span>
                        </>
                    )}
                </div>
            )}
        </>
    );
};
function findParentCategories(category, categories, parentCategories) {
    const parentCategory = categories.find((c) => c.id === category.parent_id);
    if (parentCategory) {
        parentCategories.push(parentCategory);
        findParentCategories(parentCategory, categories, parentCategories);
    }
}
export default CategoryBar;
