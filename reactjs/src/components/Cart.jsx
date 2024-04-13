import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handleGetAllCarts } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
const axios = require("axios");
export default function Cart({ toggleCartShut }) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const cartList = useSelector((state) => state.order.allCarts);
    console.log(currentUser?.data.user.id);
    console.log(cartList);
    console.log(typeof cartList?.data.productList);
    const dispatch = useDispatch();

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };
    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await handleGetAllCarts(dispatch);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                // Xử lý lỗi ở đây nếu cần
            }
        }
        fetchCartItems();
    }, []);
    const handleLeaveCart = () => {
        // Xử lý các thao tác cần thiết khi rời khỏi Cart
        // Sau đó gọi toggleCartShut để đóng modal Cart
        toggleCartShut();
    };

    return (
        <>
            {currentUser ? (
                <>
                    <span className="arrow-upCart"></span>
                    <div className="dropdownCart">
                        <div className="dropdown-contentCart">
                            <div className="dropdown-title">
                                <div className="Login--title">PETSHOP</div>
                                <div className="LoginDetail--title">
                                    VUI LÒNG ĐĂNG NHẬP TRƯỚC KHI MUA SẮM BẠN
                                    NHÉ!
                                </div>
                            </div>
                            <div className="Login--opt">
                                <div>
                                    Khách hàng mới?{" "}
                                    <Link to="/regrist">Tạo tài khoản</Link>
                                </div>
                                <div id="reset-ps">
                                    Quên mật khẩu?{" "}
                                    <Link>Khôi phục mật khẩu</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <span className="arrow-upCartLogged"></span>
                    <div
                        className="dropdownCartLogged"
                        onMouseLeave={handleLeaveCart}
                    >
                        <div className="titleCart">
                            {cartList?.data.totalQuantity > 0
                                ? `GIỎ HÀNG ĐANG CÓ ${cartList?.data.totalQuantity} SẢN PHẨM`
                                : "GIỎ HÀNG KHÔNG CÓ SẢN PHẦM NÀO"}
                        </div>
                        {cartList?.data.cart.map((item, index) => (
                            <div>
                                <div
                                    className="dropdown-contentCartLogged"
                                    key={index}
                                >
                                    <div>
                                        <div id="miniCartInfo">
                                            <div id="miniCart">
                                                <div id="miniCartTitle">
                                                    {item?.product.product.name}
                                                </div>
                                            </div>
                                            <div id="miniCartImg">
                                                {item?.quantity}
                                                <Link
                                                    to={`/product/${item?.product.product.id}`}
                                                >
                                                    {item?.product.images
                                                        .slice(0, 1)
                                                        .map(
                                                            (
                                                                image,
                                                                productIndex
                                                            ) => (
                                                                <img
                                                                    style={{
                                                                        width: "50px",
                                                                    }}
                                                                    src={
                                                                        image.secure_url
                                                                    }
                                                                    alt=""
                                                                    key={
                                                                        productIndex
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
