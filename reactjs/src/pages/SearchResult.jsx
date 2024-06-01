import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../Styles/Search.scss";

// const handleLoginApi = require('../services/userService');

export default function SearchResult() {
    const searchData = useSelector((state) => state.sales.ProductSearchInfo);
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    // console.log(keyword);
    // console.log(searchData);
    return (
        <div id="content">
            <div className="title">
                <h4>Kết quả tìm kiếm với từ khóa "{keyword}"</h4>
                <p>Tìm thấy {searchData.data.count} kết quả</p>
            </div>
            <div className="post-grids">
                {searchData?.data.products.map((product) => {
                    return (
                        <div className="post-items" key={product.id}>
                            <div id="discount-percent--contents">
                                {product.discount}% GIẢM
                            </div>
                            <div className="overlayouts">
                                <div className="overlayout-img">
                                    {searchData?.data.images
                                        .filter(
                                            (item) =>
                                                item.product_id === product.id
                                        )
                                        .slice(0, 1) // get last of product image

                                        .map((item, index) => {
                                            return (
                                                <img
                                                    alt="Hình ảnh"
                                                    key={item.id}
                                                    src={`${item.secure_url}`}
                                                    onMouseOver={(e) => {
                                                        if (index === 0) {
                                                            e.currentTarget.style.transition =
                                                                "all 0.5s ease-in-out";
                                                            e.currentTarget.style.transform =
                                                                "scale(1.1)";
                                                            e.currentTarget.style.cursor =
                                                                "pointer";
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        if (index === 0) {
                                                            e.currentTarget.style.transition =
                                                                "all 0.5s ease-in-out";
                                                            e.currentTarget.style.transform =
                                                                "scale(1.0)";
                                                            e.currentTarget.src = `http://localhost:8081/${item.path}`;
                                                        }
                                                    }}
                                                />
                                            );
                                        })}
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
                                {product.name}
                                <br />
                                <p className="price">
                                    {product.price -
                                        product.price *
                                            (product.discount / 100)}
                                    ₫<p id="old-price">{product.price}₫</p>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
