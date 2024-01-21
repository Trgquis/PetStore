import React from "react";
import { useSelector } from "react-redux";
import "../Styles/Search.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// const handleLoginApi = require('../services/userService');
import CategoryBar from "../components/CategoryBar";
export default function AllProducts() {
    const data = useSelector((state) => state.sales.allProducts.data);
    const { id } = useParams();
    console.log(id);
    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };
    return (
        <>
            <CategoryBar catalogId={parseInt(id)} />
            <div id="content">
                {parseInt(id) === 1 && (
                    <>
                        <div className="title">
                            <h4>Shop cho chó</h4>
                        </div>
                        <div className="post-grids">
                            {data?.products.products.map((product) => {
                                if (
                                    product.catalog_id >= 4 &&
                                    product.catalog_id <= 23
                                ) {
                                    return (
                                        <div
                                            className="post-items"
                                            key={product.id}
                                        >
                                            {product.discount !== 0 ? (
                                                <>
                                                    <div id="discount-percent--contents">
                                                        {product.discount}% GIẢM
                                                    </div>
                                                    <div className="overlayouts">
                                                        {/* <img src={product.image_link} alt="" /> */}
                                                        <div className="overlayout-img">
                                                            {data.products.images
                                                                .filter(
                                                                    (item) =>
                                                                        item.product_id ===
                                                                        product.id
                                                                )
                                                                .slice(0, 1) // get last of product image
                                                                .map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <Link
                                                                            to={`/detail/${product.id}`}
                                                                        >
                                                                            <img
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                src={`http://localhost:8081/${item.path}`}
                                                                                alt=""
                                                                                onMouseOver={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.1)";
                                                                                        e.currentTarget.style.cursor =
                                                                                            "pointer";
                                                                                        // e.currentTarget.src = `http://localhost:8081/${
                                                                                        //     data.products.images.find(
                                                                                        //         (img) =>
                                                                                        //             img.product_id === product.id &&
                                                                                        //             img.path !== item.path
                                                                                        //     ).path
                                                                                        // }`;
                                                                                    }
                                                                                }}
                                                                                onMouseOut={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.0)";
                                                                                        e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    )
                                                                )}
                                                        </div>
                                                        <div className="over-btns">
                                                            <div className="btns">
                                                                <button
                                                                    type="submit"
                                                                    id="cart"
                                                                >
                                                                    <i className="ti-shopping-cart"></i>
                                                                </button>
                                                                <button
                                                                    type=""
                                                                    id="details"
                                                                    onClick="direct_sc5()"
                                                                >
                                                                    Chi tiết
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="post-content">
                                                        <Link
                                                            to={`/detail/${product.id}`}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <br />
                                                        <p className="price">
                                                            {convertPrice(
                                                                product.price -
                                                                    product.price *
                                                                        (product.discount /
                                                                            100)
                                                            )}
                                                            ₫
                                                            <p id="old-price">
                                                                {convertPrice(
                                                                    product.price
                                                                )}
                                                                ₫
                                                            </p>
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="overlayouts">
                                                        {/* <img src={product.image_link} alt="" /> */}
                                                        <div className="overlayout-img">
                                                            {data.products.images
                                                                .filter(
                                                                    (item) =>
                                                                        item.product_id ===
                                                                        product.id
                                                                )
                                                                .slice(0, 1) // get last of product image
                                                                .map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <Link
                                                                            to={`/detail/${product.id}`}
                                                                        >
                                                                            <img
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                src={`http://localhost:8081/${item.path}`}
                                                                                alt=""
                                                                                onMouseOver={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.1)";
                                                                                        e.currentTarget.style.cursor =
                                                                                            "pointer";
                                                                                        // e.currentTarget.src = `http://localhost:8081/${
                                                                                        //     data.products.images.find(
                                                                                        //         (img) =>
                                                                                        //             img.product_id === product.id &&
                                                                                        //             img.path !== item.path
                                                                                        //     ).path
                                                                                        // }`;
                                                                                    }
                                                                                }}
                                                                                onMouseOut={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.0)";
                                                                                        e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    )
                                                                )}
                                                        </div>
                                                        <div className="over-btns">
                                                            <div className="btns">
                                                                <button
                                                                    type="submit"
                                                                    id="cart"
                                                                >
                                                                    <i className="ti-shopping-cart"></i>
                                                                </button>
                                                                <button
                                                                    type=""
                                                                    id="details"
                                                                    onClick="direct_sc5()"
                                                                >
                                                                    Chi tiết
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="post-content">
                                                        <Link
                                                            to={`/detail/${product.id}`}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <br />
                                                        <p className="price">
                                                            {convertPrice(
                                                                product.price -
                                                                    product.price *
                                                                        (product.discount /
                                                                            100)
                                                            )}
                                                            ₫
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                )}
                {parseInt(id) === 2 && (
                    <>
                        <div className="title">
                            <h3>Shop cho mèo</h3>
                        </div>
                        <div className="post-grids">
                            {data?.products.products.map((product) => {
                                if (
                                    product.catalog_id >= 24 &&
                                    product.catalog_id <= 36
                                ) {
                                    return (
                                        <div
                                            className="post-items"
                                            key={product.id}
                                        >
                                            {product.discount !== 0 ? (
                                                <>
                                                    <div id="discount-percent--contents">
                                                        {product.discount}% GIẢM
                                                    </div>
                                                    <div className="overlayouts">
                                                        {/* <img src={product.image_link} alt="" /> */}
                                                        <div className="overlayout-img">
                                                            {data.products.images
                                                                .filter(
                                                                    (item) =>
                                                                        item.product_id ===
                                                                        product.id
                                                                )
                                                                .slice(0, 1) // get last of product image
                                                                .map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <Link
                                                                            to={`/detail/${product.id}`}
                                                                        >
                                                                            <img
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                src={`http://localhost:8081/${item.path}`}
                                                                                alt=""
                                                                                onMouseOver={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.1)";
                                                                                        e.currentTarget.style.cursor =
                                                                                            "pointer";
                                                                                        // e.currentTarget.src = `http://localhost:8081/${
                                                                                        //     data.products.images.find(
                                                                                        //         (img) =>
                                                                                        //             img.product_id === product.id &&
                                                                                        //             img.path !== item.path
                                                                                        //     ).path
                                                                                        // }`;
                                                                                    }
                                                                                }}
                                                                                onMouseOut={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.0)";
                                                                                        e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    )
                                                                )}
                                                        </div>
                                                        <div className="over-btns">
                                                            <div className="btns">
                                                                <button
                                                                    type="submit"
                                                                    id="cart"
                                                                >
                                                                    <i className="ti-shopping-cart"></i>
                                                                </button>
                                                                <button
                                                                    type=""
                                                                    id="details"
                                                                    onClick="direct_sc5()"
                                                                >
                                                                    Chi tiết
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="post-content">
                                                        <Link
                                                            to={`/detail/${product.id}`}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <br />
                                                        <p className="price">
                                                            {convertPrice(
                                                                product.price -
                                                                    product.price *
                                                                        (product.discount /
                                                                            100)
                                                            )}
                                                            ₫
                                                            <p id="old-price">
                                                                {convertPrice(
                                                                    product.price
                                                                )}
                                                                ₫
                                                            </p>
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="overlayouts">
                                                        {/* <img src={product.image_link} alt="" /> */}
                                                        <div className="overlayout-img">
                                                            {data.products.images
                                                                .filter(
                                                                    (item) =>
                                                                        item.product_id ===
                                                                        product.id
                                                                )
                                                                .slice(0, 1) // get last of product image
                                                                .map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <Link
                                                                            to={`/detail/${product.id}`}
                                                                        >
                                                                            <img
                                                                                key={
                                                                                    item.id
                                                                                }
                                                                                src={`http://localhost:8081/${item.path}`}
                                                                                alt=""
                                                                                onMouseOver={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.1)";
                                                                                        e.currentTarget.style.cursor =
                                                                                            "pointer";
                                                                                        // e.currentTarget.src = `http://localhost:8081/${
                                                                                        //     data.products.images.find(
                                                                                        //         (img) =>
                                                                                        //             img.product_id === product.id &&
                                                                                        //             img.path !== item.path
                                                                                        //     ).path
                                                                                        // }`;
                                                                                    }
                                                                                }}
                                                                                onMouseOut={(
                                                                                    e
                                                                                ) => {
                                                                                    if (
                                                                                        index ===
                                                                                        0
                                                                                    ) {
                                                                                        e.currentTarget.style.transition =
                                                                                            "all 0.5s ease-in-out";
                                                                                        e.currentTarget.style.transform =
                                                                                            "scale(1.0)";
                                                                                        e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    )
                                                                )}
                                                        </div>
                                                        <div className="over-btns">
                                                            <div className="btns">
                                                                <button
                                                                    type="submit"
                                                                    id="cart"
                                                                >
                                                                    <i className="ti-shopping-cart"></i>
                                                                </button>
                                                                <button
                                                                    type=""
                                                                    id="details"
                                                                    onClick="direct_sc5()"
                                                                >
                                                                    Chi tiết
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="post-content">
                                                        <Link
                                                            to={`/detail/${product.id}`}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <br />
                                                        <p className="price">
                                                            {convertPrice(
                                                                product.price -
                                                                    product.price *
                                                                        (product.discount /
                                                                            100)
                                                            )}
                                                            ₫
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                )}

                {parseInt(id) === 99 && (
                    <>
                        <div className="title">
                            <h3>Tất cả sản phẩm</h3>
                        </div>
                        <div className="post-grids">
                            {data?.products.products.map((product) => {
                                return (
                                    <div
                                        className="post-items"
                                        key={product.id}
                                    >
                                        <div id="discount-percent--contents">
                                            {product.discount}% GIẢM
                                        </div>
                                        <div className="overlayouts">
                                            {/* <img src={product.image_link} alt="" /> */}
                                            <div className="overlayout-img">
                                                {data.products.images
                                                    .filter(
                                                        (item) =>
                                                            item.product_id ===
                                                            product.id
                                                    )
                                                    .slice(0, 1) // get last of product image
                                                    .map((item, index) => (
                                                        <Link
                                                            to={`/detail/${product.id}`}
                                                        >
                                                            <img
                                                                key={item.id}
                                                                src={`http://localhost:8081/${item.path}`}
                                                                alt=""
                                                                onMouseOver={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        index ===
                                                                        0
                                                                    ) {
                                                                        e.currentTarget.style.transition =
                                                                            "all 0.5s ease-in-out";
                                                                        e.currentTarget.style.transform =
                                                                            "scale(1.1)";
                                                                        e.currentTarget.style.cursor =
                                                                            "pointer";
                                                                        // e.currentTarget.src = `http://localhost:8081/${
                                                                        //     data.products.images.find(
                                                                        //         (img) =>
                                                                        //             img.product_id === product.id &&
                                                                        //             img.path !== item.path
                                                                        //     ).path
                                                                        // }`;
                                                                    }
                                                                }}
                                                                onMouseOut={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        index ===
                                                                        0
                                                                    ) {
                                                                        e.currentTarget.style.transition =
                                                                            "all 0.5s ease-in-out";
                                                                        e.currentTarget.style.transform =
                                                                            "scale(1.0)";
                                                                        e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                                    }
                                                                }}
                                                            />
                                                        </Link>
                                                    ))}
                                            </div>
                                            <div className="over-btns">
                                                <div className="btns">
                                                    <button
                                                        type="submit"
                                                        id="cart"
                                                    >
                                                        <i className="ti-shopping-cart"></i>
                                                    </button>
                                                    <button
                                                        type=""
                                                        id="details"
                                                        onClick="direct_sc5()"
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-content">
                                            <Link to={`/detail/${product.id}`}>
                                                {product.name}
                                            </Link>
                                            <br />
                                            <p className="price">
                                                {convertPrice(
                                                    product.price -
                                                        product.price *
                                                            (product.discount /
                                                                100)
                                                )}
                                                ₫
                                                <p id="old-price">
                                                    {convertPrice(
                                                        product.price
                                                    )}
                                                    ₫
                                                </p>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                {parseInt(id) && parseInt(id) !== 1 && parseInt(id) !== 2 && (
                    <>
                        <div className="title">
                            <h3>Tất cả sản phẩm</h3>
                        </div>
                        <div className="post-grids">
                            {data?.products.products.map((product) => {
                                if (product.catalog_id === parseInt(id)) {
                                    return (
                                        <div
                                            className="post-items"
                                            key={product.id}
                                        >
                                            <div id="discount-percent--contents">
                                                {product.discount}% GIẢM
                                            </div>
                                            <div className="overlayouts">
                                                {/* <img src={product.image_link} alt="" /> */}
                                                <div className="overlayout-img">
                                                    {data.products.images
                                                        .filter(
                                                            (item) =>
                                                                item.product_id ===
                                                                product.id
                                                        )
                                                        .slice(0, 1) // get last of product image
                                                        .map((item, index) => (
                                                            <Link
                                                                to={`/detail/${product.id}`}
                                                            >
                                                                <img
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    src={`http://localhost:8081/${item.path}`}
                                                                    alt=""
                                                                    onMouseOver={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            index ===
                                                                            0
                                                                        ) {
                                                                            e.currentTarget.style.transition =
                                                                                "all 0.5s ease-in-out";
                                                                            e.currentTarget.style.transform =
                                                                                "scale(1.1)";
                                                                            e.currentTarget.style.cursor =
                                                                                "pointer";
                                                                            // e.currentTarget.src = `http://localhost:8081/${
                                                                            //     data.products.images.find(
                                                                            //         (img) =>
                                                                            //             img.product_id === product.id &&
                                                                            //             img.path !== item.path
                                                                            //     ).path
                                                                            // }`;
                                                                        }
                                                                    }}
                                                                    onMouseOut={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            index ===
                                                                            0
                                                                        ) {
                                                                            e.currentTarget.style.transition =
                                                                                "all 0.5s ease-in-out";
                                                                            e.currentTarget.style.transform =
                                                                                "scale(1.0)";
                                                                            e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                                        }
                                                                    }}
                                                                />
                                                            </Link>
                                                        ))}
                                                </div>
                                                <div className="over-btns">
                                                    <div className="btns">
                                                        <button
                                                            type="submit"
                                                            id="cart"
                                                        >
                                                            <i className="ti-shopping-cart"></i>
                                                        </button>
                                                        <button
                                                            type=""
                                                            id="details"
                                                            onClick="direct_sc5()"
                                                        >
                                                            Chi tiết
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-content">
                                                <Link
                                                    to={`/detail/${product.id}`}
                                                >
                                                    {product.name}
                                                </Link>
                                                <br />
                                                <p className="price">
                                                    {convertPrice(
                                                        product.price -
                                                            product.price *
                                                                (product.discount /
                                                                    100)
                                                    )}
                                                    ₫
                                                    <p id="old-price">
                                                        {convertPrice(
                                                            product.price
                                                        )}
                                                        ₫
                                                    </p>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
