import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { handleGetAllCarts } from "../redux/apiRequest";

const Cart = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const cartList = useSelector((state) => state.order.allCarts);
    const dispatch = useDispatch();

    // Function to fetch cart items
    useEffect(() => {
        async function fetchCartItems() {
            try {
                await handleGetAllCarts(dispatch);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                // Handle error here if needed
            }
        }
        fetchCartItems();
    }, [dispatch]);

    // Function to convert price format
    const convertPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Handle click event to prevent propagation
    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            {currentUser ? (
                <>
                    <span className="arrow-upCart"></span>
                    <div className="dropdownCart" onClick={handleClick}>
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
                    <div className="dropdownCartLogged" onClick={handleClick}>
                        <div className="titleCart">
                            {cartList?.data.totalQuantity > 0
                                ? `GIỎ HÀNG ĐANG CÓ ${cartList?.data.totalQuantity} SẢN PHẨM`
                                : "GIỎ HÀNG KHÔNG CÓ SẢN PHẦM NÀO"}
                        </div>
                        <div  className="dropdown-contentCartLogged">
                            {cartList?.data.cart.map((item, index) => (
                                <div key={index} id="miniCartInfo">
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
                                            <img
                                                style={{ width: "50px" }}
                                                src={
                                                    item?.product.images[0]
                                                        .secure_url
                                                }
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Cart;
