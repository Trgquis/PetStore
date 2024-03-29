import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/Search.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import { handlegetAllProducts } from "../redux/apiRequest";

export default function AllProducts() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.sales.allProducts);
    const { id } = useParams();

    useEffect(() => {
        handlegetAllProducts(dispatch);
    }, [dispatch]);

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };
    console.log(id);
    return (
        <>
            <CategoryBar catalogId={parseInt(id)} />
            <div id="content">
                <div className="title">
                    <h4>Tất cả sản phẩm</h4>
                </div>
                <div className="post-grids">
                    {data?.data.products.products.map((product) => {
                        // Filter products based on category ID
                        if (product.category_id === parseInt(id)) {
                            return (
                                <div className="post-items" key={product.id}>
                                    <div id="discount-percent--contents">
                                        {product.discount}% GIẢM
                                    </div>
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
                                                            src={`http://localhost:8888/${item.path}`}
                                                            alt=""
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
                                                                    e.currentTarget.src = `http://localhost:8888/${item.path}`;
                                                                }
                                                            }}
                                                        />
                                                    </Link>
                                                ))}
                                        </div>
                                        <div className="over-btns">
                                            <div className="btns">
                                                <button type="submit" id="cart">
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
                                                    (product.price *
                                                        product.discount) /
                                                        100
                                            )}
                                            ₫
                                            <p id="old-price">
                                                {convertPrice(product.price)}₫
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return null; // If category ID does not match, return null
                        }
                    })}
                </div>
            </div>
        </>
    );
}
