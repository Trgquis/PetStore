import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/Search.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import { handlegetAllPopular, handlegetAllProducts } from "../redux/apiRequest";
import DisplayStar from "./DisplayStar";

export default function AllProducts() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.sales.allProducts);
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
    return (
        <div className="allproductLayout">
            <div className="title">
                <h3>Tất cả sản phẩm khuyến mãi</h3>
            </div>
            <div className="post-grids-formain">
                {data?.data.products.products.slice(0, 8).map((product) => {
                    // Filter products based on category ID
                    return (
                        <div className="post-items" key={product.id}>
                            {product.discount > 0 && product.amount > 0 && (
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
                                                item.product_id === product.id
                                        )
                                        .slice(0, 1)
                                        .map((item, index) => (
                                            <Link
                                                to={`/detail/${product.id}`}
                                                key={item.id}
                                            >
                                                <img
                                                    alt="Hình ảnh"
                                                    src={item.secure_url}
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
                                                            e.currentTarget.src = `${item.secure_url}`;
                                                        }
                                                    }}
                                                />
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            <div className="post-content2">
                                <Link
                                    id={product.id}
                                    to={`/detail/${product.id}`}
                                >
                                    {product.name}
                                </Link>
                                <p className="price">
                                    {convertPrice(
                                        product.price -
                                            product.price *
                                                (product.discount / 100)
                                    )}
                                    ₫
                                    <span id="old-price">
                                        {convertPrice(product.price)}₫
                                    </span>
                                </p>
                                <div className="underframe">
                                    Đã bán: {product.sold_amount}
                                    <DisplayStar rating={product.avgRating} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="btn-collection">
                <Link to={`/allproducts/0/san-pham-khuyen-mai`}>
                    Xem thêm sản phẩm
                    <b> SẢN PHẨM ĐANG KHUYẾN MÃI </b>
                </Link>
            </div>
        </div>
    );
}
