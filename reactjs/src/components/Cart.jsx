import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handleGetAllCarts } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
export default function Cart() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const cartList = useSelector((state) => state.order.allCarts);
    console.log(currentUser?.data.user.id);
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
            await handleGetAllCarts(20, dispatch); // gọi hàm getAllCart với user_id là 123
        }
        fetchCartItems();
    }, []);
    return (
        <>
            {!currentUser ? (
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
                    <div className="dropdownCartLogged">
                        <div>
                            <div className="titleCart">
                                "GIỎ HÀNG KHÔNG CÓ SẢN PHẦM NÀO"
                                {/* {cartList?.data.count > 0 ? (
                                    `GIỎ HÀNG ĐANG CÓ ${cartList?.data.count} SẢN PHẨM`
                                )} */}
                            </div>
                            {cartList?.data.cartItem.map((item) => {
                                return (
                                    <>
                                        <table className="dropdown-contentCartLogged">
                                            <tbody>
                                                <tr id="miniCartInfo">
                                                    <td id="miniCartImg">
                                                        <Link>
                                                            <img
                                                                src={`http://localhost:8081/${item.images.path}`}
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td id="miniCart">
                                                        <p id="miniCartTitle">
                                                            <Link className="miniCartTitleLink">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </Link>
                                                        </p>
                                                        <span></span>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
