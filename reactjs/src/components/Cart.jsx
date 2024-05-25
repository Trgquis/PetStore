import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Dropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import { handleGetAllCarts } from "../redux/apiRequest";
import axios from "axios";
import { GrCart } from "react-icons/gr";

const Cart = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const cartList = useSelector((state) => state.order.allCarts);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0); // Khởi tạo state để lưu tổng giá trị đơn hàng
    const userId = currentUser?.data.userData.user.id;
    // console.log(cartList);
    useEffect(() => {
        async function fetchCartItems() {
            try {
                if (userId) {
                    await handleGetAllCarts(userId, dispatch);
                } else {
                    await handleGetAllCarts(null, dispatch);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        }
        fetchCartItems();
    }, [dispatch]);

    const handleClickDecrease = async (productId) => {
        await handleRemoveItemCart(productId);
    };
    const handleClickIncrease = async (productId, qt) => {
        await handleAddToCart(productId, qt - qt + 1);
    };

    const handleRemoveItemCart = async (productID) => {
        try {
            await axios.delete(
                "http://localhost:8888/api/removeItemCart/?productID=" +
                    productID,
                { withCredentials: true }
            );

            try {
                if (userId) {
                    await handleGetAllCarts(userId, dispatch);
                } else {
                    await handleGetAllCarts(null, dispatch);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
                // Handle error here if needed
            }
        } catch (e) {
            // console.log(e);
        }
    };
    const handleAddToCart = async (pID, qt) => {
        try {
            // console.log(pID, qt, currentUser?.data.userData.user.id);
            if (pID && qt) {
                const response = await axios.post(
                    "http://localhost:8888/api/addcart",
                    {
                        product_id: pID,
                        quantity: qt,
                    },
                    { withCredentials: true }
                );
                // console.log(response.data);
                try {
                    if (userId) {
                        await handleGetAllCarts(userId, dispatch);
                    } else {
                        await handleGetAllCarts(null, dispatch);
                    }
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                    // Handle error here if needed
                }
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    useEffect(() => {
        if (cartList?.data) {
            let totalPrice = 0;
            cartList.data.cart.forEach((item) => {
                const discountedPrice =
                    item.product.product.price -
                    item.product.product.price *
                        (item.product.product.discount / 100);
                totalPrice += discountedPrice * item.quantity;
            });
            setTotalPrice(totalPrice);
        }
    }, [cartList]);

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

    const handleDeleteItem = async (productID) => {
        try {
            // console.log(productID);
            await axios.delete(
                "http://localhost:8888/api/deleteCart/?productID=" + productID,
                { withCredentials: true }
            );
            try {
                if (userId) {
                    await handleGetAllCarts(userId, dispatch);
                } else {
                    await handleGetAllCarts(null, dispatch);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
                // Handle error here if needed
            }
        } catch (e) {
            // console.log(e);
        }
    };
    return (
        <>
            {cartList?.data.totalQuantity <= 0 ? (
                <>
                    <div className="dropdownCartLogged" onClick={handleClick}>
                        <div className="dropdownCartContent">
                            <div className="titleCart">GIỎ HÀNG</div>
                            <div className="dropdown-cart">
                                <GrCart />
                                <p>Hiện chưa có sản phẩm</p>
                            </div>
                            <div className="miniCartFooter">
                                <div className="totalPrice">
                                    <span>Tổng tiền:</span>
                                    <p id="totalprice">
                                        {convertPrice(totalPrice)}
                                    </p>
                                </div>
                                <div className="toCart">
                                    <div className="cart">
                                        <Link to={`/cart`}>
                                            <span>Xem giỏ hàng</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="dropdownCartLogged" onClick={handleClick}>
                        <div className="dropdownCartContent">
                            <div className="titleCart">
                                GIỎ HÀNG ĐANG CÓ {cartList?.data.totalQuantity}{" "}
                                SẢN PHẨM
                            </div>
                            <div className="dropdown-contentCartLogged">
                                {cartList?.data.cart.map((item, index) => (
                                    <div key={index} id="miniCartInfo">
                                        <div id="miniCartImg">
                                            <Link
                                                to={`/detail/${item?.product.product.id}`}
                                            >
                                                <img
                                                    style={{
                                                        width: "85px",
                                                        height: "85px",
                                                        border: "1px solid #e7e7e7",
                                                    }}
                                                    src={
                                                        item?.product.images[0]
                                                            .secure_url
                                                    }
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div id="miniCart">
                                            <div id="miniCartTitle">
                                                <Link
                                                    to={`/detail/${item.product.product.id}`}
                                                >
                                                    {item?.product.product.name}
                                                </Link>
                                            </div>
                                            <div className="priceandqt">
                                                <div className="qtsection">
                                                    <button
                                                        className="qt-btn"
                                                        onClick={() =>
                                                            handleClickDecrease(
                                                                item.product
                                                                    .product.id
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity === 1
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        className="item-qt"
                                                        type="text"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="qt-btn"
                                                        onClick={() =>
                                                            handleClickIncrease(
                                                                item.product
                                                                    .product.id,
                                                                item.quantity
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <span id="priceCart">
                                                    {convertPrice(
                                                        item.product.product
                                                            .price -
                                                            item.product.product
                                                                .price *
                                                                (item.product
                                                                    .product
                                                                    .discount /
                                                                    100)
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            id="deletecartinfo"
                                            onClick={() =>
                                                handleDeleteItem(
                                                    item?.product.product.id
                                                )
                                            }
                                        >
                                            <img
                                                src="https://theme.hstatic.net/1000296747/1000891809/14/delete-cart.png?v=20"
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="miniCartFooter">
                                <div className="totalPrice">
                                    <span>Tổng tiền:</span>
                                    <p id="totalprice">
                                        {convertPrice(totalPrice)}
                                    </p>
                                </div>
                                <div className="toCart">
                                    <div className="cart">
                                        <Link to={`/cart`}>Xem giỏ hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Cart;
