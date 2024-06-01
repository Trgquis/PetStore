import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/Search.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import {
    handlegetAllProducts,
    handlegetAllChilds,
    handlegetAllCatalogs,
    handlegetAllRoots,
} from "../redux/apiRequest";

export default function AllProducts() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.sales.allProducts);
    const { id, name } = useParams();
    // console.log(name);
    const product = useSelector((state) => state?.sales.ProductDetail);
    const rootList = useSelector((state) => state.sales.allRoots);
    const catalogList = useSelector((state) => state.sales.allCatalogs);
    const childList = useSelector((state) => state.sales.allChilds);
    // console.log(product);
    useEffect(() => {
        document.title = `${name} | HappyPet`
        handlegetAllProducts(dispatch);
        handlegetAllChilds(dispatch);
        handlegetAllCatalogs(dispatch);
        handlegetAllRoots(dispatch);
    }, [dispatch, id, name]);

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };
    // console.log(id, name);

    let currentRoot;
    let currentCatalog;
    let currentChild;

    currentChild = childList?.data.childs.childs.find(
        (child) => child.id === parseInt(id) && child.name === name
    );
    if (!currentChild) {
        currentCatalog = catalogList?.data.catalogs.catalogs.find(
            (catalog) => catalog.id === parseInt(id) && catalog.name === name
        );
        if (!currentCatalog) {
            currentRoot = rootList?.data.roots.roots.find(
                (root) => root.id === parseInt(id) && root.name === name
            );
        }
    }
    // console.log(childList);
    // console.log(currentRoot, currentChild);
    return (
        <>
            <CategoryBar catalogId={parseInt(id)} catalogName={name} />
            <div id="content">
                <div className="title">
                    <h4>{name ? name : "Tất cả sản phẩm"}</h4>
                </div>
                <div className="post-grids">
                    {data?.data.products.products.map((product) => {
                        if (product.category_id === currentChild?.id) {
                            return (
                                <div className="post-items" key={product.id}>
                                    {product.discount > 0 &&
                                        product.amount > 0 && (
                                            <div id="discount-percent--contents">
                                                {product.discount}% GIẢM
                                            </div>
                                        )}
                                    {product.discount === 0 && (
                                        <div id="discount-percent--contents">
                                            GIÁ GỐC
                                        </div>
                                    )}
                                    {product.amount === 0 && (
                                        <div
                                            id="discount-percent--contents"
                                            style={{ backgroundColor: "gray" }}
                                        >
                                            TẠM HẾT HÀNG
                                        </div>
                                    )}
                                    <div className="overlayouts">
                                        <div className="overlayout-img">
                                            {data?.data.products.images
                                                .filter(
                                                    (item) =>
                                                        item.product_id ===
                                                        product.id
                                                )
                                                .slice(0, 1)
                                                .map((item, index) => (
                                                    <Link
                                                        to={`/detail/${product.id}`}
                                                        key={item.id}
                                                    >
                                                        <img
                                                            alt="Hình ảnh"
                                                            src={
                                                                item.secure_url
                                                            }
                                                            onMouseOver={(
                                                                e
                                                            ) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.1)";
                                                                    e.currentTarget.style.cursor =
                                                                        "pointer";
                                                                }
                                                            }}
                                                            onMouseOut={(e) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.0)";
                                                                    e.currentTarget.src = `${item.secure_url}`;
                                                                }
                                                            }}
                                                        />
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <Link to={`/detail/${product.id}`}>
                                            {product.name}
                                        </Link>
                                        <br />
                                        {product.discount ? (
                                            <p className="price">
                                                {convertPrice(
                                                    product.price -
                                                        (product.price *
                                                            product.discount) /
                                                            100
                                                )}
                                                ₫
                                                <p id="old-price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    ₫
                                                </p>
                                                <p
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    id="old-price"
                                                >
                                                    Đã bán:{" "}
                                                    {product.sold_amount}
                                                </p>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    <p
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        id="old-price"
                                                    >
                                                        Đã bán:{" "}
                                                        {product.sold_amount}
                                                    </p>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        } else if (
                            currentCatalog &&
                            product.parent_id === currentCatalog?.id
                        ) {
                            return (
                                <div className="post-items" key={product.id}>
                                    {product.discount > 0 &&
                                        product.amount > 0 && (
                                            <div id="discount-percent--contents">
                                                {product.discount}% GIẢM
                                            </div>
                                        )}
                                    {product.discount === 0 && (
                                        <div id="discount-percent--contents">
                                            GIÁ GỐC
                                        </div>
                                    )}
                                    {product.amount === 0 && (
                                        <div
                                            id="discount-percent--contents"
                                            style={{ backgroundColor: "gray" }}
                                        >
                                            TẠM HẾT HÀNG
                                        </div>
                                    )}
                                    <div className="overlayouts">
                                        <div className="overlayout-img">
                                            {data?.data.products.images
                                                .filter(
                                                    (item) =>
                                                        item.product_id ===
                                                        product.id
                                                )
                                                .slice(0, 1)
                                                .map((item, index) => (
                                                    <Link
                                                        to={`/detail/${product.id}`}
                                                        key={item.id}
                                                    >
                                                        <img
                                                            alt="Hình ảnh"
                                                            src={
                                                                item.secure_url
                                                            }
                                                            onMouseOver={(
                                                                e
                                                            ) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.1)";
                                                                    e.currentTarget.style.cursor =
                                                                        "pointer";
                                                                }
                                                            }}
                                                            onMouseOut={(e) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.0)";
                                                                    e.currentTarget.src = `${item.secure_url}`;
                                                                }
                                                            }}
                                                        />
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <Link to={`/detail/${product.id}`}>
                                            {product.name}
                                        </Link>
                                        <br />
                                        {product.discount ? (
                                            <p className="price">
                                                {convertPrice(
                                                    product.price -
                                                        (product.price *
                                                            product.discount) /
                                                            100
                                                )}
                                                ₫
                                                <p id="old-price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    ₫
                                                </p>
                                                <p
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    id="old-price"
                                                >
                                                    Đã bán:{" "}
                                                    {product.sold_amount}
                                                </p>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    <p
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        id="old-price"
                                                    >
                                                        Đã bán:{" "}
                                                        {product.sold_amount}
                                                    </p>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        } else if (
                            currentRoot &&
                            product.root_id === currentRoot?.id
                        ) {
                            return (
                                <div className="post-items" key={product.id}>
                                    {product.discount > 0 &&
                                        product.amount > 0 && (
                                            <div id="discount-percent--contents">
                                                {product.discount}% GIẢM
                                            </div>
                                        )}
                                    {product.discount === 0 && (
                                        <div id="discount-percent--contents">
                                            GIÁ GỐC
                                        </div>
                                    )}
                                    {product.amount === 0 && (
                                        <div
                                            id="discount-percent--contents"
                                            style={{ backgroundColor: "gray" }}
                                        >
                                            TẠM HẾT HÀNG
                                        </div>
                                    )}
                                    <div className="overlayouts">
                                        <div className="overlayout-img">
                                            {data?.data.products.images
                                                .filter(
                                                    (item) =>
                                                        item.product_id ===
                                                        product.id
                                                )
                                                .slice(0, 1)
                                                .map((item, index) => (
                                                    <Link
                                                        to={`/detail/${product.id}`}
                                                        key={item.id}
                                                    >
                                                        <img
                                                            alt="Hình ảnh"
                                                            src={
                                                                item.secure_url
                                                            }
                                                            onMouseOver={(
                                                                e
                                                            ) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.1)";
                                                                    e.currentTarget.style.cursor =
                                                                        "pointer";
                                                                }
                                                            }}
                                                            onMouseOut={(e) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.0)";
                                                                    e.currentTarget.src = `${item.secure_url}`;
                                                                }
                                                            }}
                                                        />
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <Link to={`/detail/${product.id}`}>
                                            {product.name}
                                        </Link>
                                        <br />
                                        {product.discount ? (
                                            <p className="price">
                                                {convertPrice(
                                                    product.price -
                                                        (product.price *
                                                            product.discount) /
                                                            100
                                                )}
                                                ₫
                                                <p id="old-price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    ₫
                                                </p>
                                                <p
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    id="old-price"
                                                >
                                                    Đã bán:{" "}
                                                    {product.sold_amount}
                                                </p>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    <p
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        id="old-price"
                                                    >
                                                        Đã bán:{" "}
                                                        {product.sold_amount}
                                                    </p>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        } else if (parseInt(id) === 0) {
                            return (
                                <div className="post-items" key={product.id}>
                                    {product.discount > 0 &&
                                        product.amount > 0 && (
                                            <div id="discount-percent--contents">
                                                {product.discount}% GIẢM
                                            </div>
                                        )}
                                    {product.discount === 0 && (
                                        <div id="discount-percent--contents">
                                            GIÁ GỐC
                                        </div>
                                    )}
                                    {product.amount === 0 && (
                                        <div
                                            id="discount-percent--contents"
                                            style={{ backgroundColor: "gray" }}
                                        >
                                            TẠM HẾT HÀNG
                                        </div>
                                    )}
                                    <div className="overlayouts">
                                        <div className="overlayout-img">
                                            {data?.data.products.images
                                                .filter(
                                                    (item) =>
                                                        item.product_id ===
                                                        product.id
                                                )
                                                .slice(0, 1)
                                                .map((item, index) => (
                                                    <Link
                                                        to={`/detail/${product.id}`}
                                                        key={item.id}
                                                    >
                                                        <img
                                                            alt="Hình ảnh"
                                                            src={
                                                                item.secure_url
                                                            }
                                                            onMouseOver={(
                                                                e
                                                            ) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.1)";
                                                                    e.currentTarget.style.cursor =
                                                                        "pointer";
                                                                }
                                                            }}
                                                            onMouseOut={(e) => {
                                                                if (
                                                                    index === 0
                                                                ) {
                                                                    e.currentTarget.style.transition =
                                                                        "all 0.5s ease-in-out";
                                                                    e.currentTarget.style.transform =
                                                                        "scale(1.0)";
                                                                    e.currentTarget.src = `${item.secure_url}`;
                                                                }
                                                            }}
                                                        />
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <Link to={`/detail/${product.id}`}>
                                            {product.name}
                                        </Link>
                                        <br />
                                        {product.discount > 0 ? (
                                            <p className="price">
                                                {convertPrice(
                                                    product.price -
                                                        (product.price *
                                                            product.discount) /
                                                            100
                                                )}
                                                ₫
                                                <p id="old-price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    ₫
                                                </p>
                                                <p
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    id="old-price"
                                                >
                                                    Đã bán:{" "}
                                                    {product.sold_amount}
                                                </p>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    <p
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        id="old-price"
                                                    >
                                                        Đã bán:{" "}
                                                        {product.sold_amount}
                                                    </p>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}
