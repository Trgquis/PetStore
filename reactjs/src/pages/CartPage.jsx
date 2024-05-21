import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Cart.scss";
import "bootstrap";
import { Link } from "react-router-dom";
import { handleGetAllCarts } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import Cookies from "js-cookie";
export default function CartPage() {
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.order.allCarts);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [totalPrice, setTotalPrice] = useState(0); // Khởi tạo state để lưu tổng giá trị đơn hàng
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);

    console.log(cartList);
    const userId = currentUser?.data.userData.user.id;
    const guestId = Cookies.get("guestuserId");

    useEffect(() => {
        async function fetchCartItems() {
            if (userId) {
                await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
            } else {
                await handleGetAllCarts(null, dispatch); // gọi hàm getAllCart với user_id
            }
        }
        fetchCartItems();
    }, [userId, dispatch]);
    const convertPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    useEffect(() => {
        if (cartList.data) {
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
    const handleClickDecrease = async (productId) => {
        await handleRemoveItemCart(productId);
    };
    const handleClickIncrease = async (productId, qt) => {
        await handleAddToCart(productId, qt - qt + 1);
    };
    const closeAlert = () => {
        setAlertOpen(false);
    };

    const handleRemoveItemCart = async (productID) => {
        try {
            await axios.delete(
                "http://localhost:8888/api/removeItemCart/?productID=" +
                    productID,
                { withCredentials: true }
            );
            setAlertMessage("Cập nhật vào giỏ hàng thành công!"); // Set success message
            setAlertType(0); // Set success type
            setAlertOpen(true); // Open the alert modal
            if (userId) {
                await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
            } else {
                await handleGetAllCarts(null, dispatch); // gọi hàm getAllCart với user_id
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleAddToCart = async (pID, qt) => {
        try {
            console.log(pID, qt);
            if (pID && qt) {
                const response = await axios.post(
                    "http://localhost:8888/api/addcart",
                    {
                        product_id: pID,
                        quantity: qt,
                    },
                    { withCredentials: true }
                );
                console.log(response.data);
                setAlertMessage("Cập nhật vào giỏ hàng thành công!"); // Set success message
                setAlertType(0); // Set success type
                setAlertOpen(true); // Open the alert modal
                if (userId) {
                    await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
                } else {
                    await handleGetAllCarts(null, dispatch); // gọi hàm getAllCart với user_id
                }
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };
    const handleDeleteItem = async (productID) => {
        try {
            console.log(productID);
            await axios.delete(
                "http://localhost:8888/api/deleteCart/?productID=" + productID,
                { withCredentials: true }
            );
            setAlertMessage("Cập nhật vào giỏ hàng thành công!"); // Set success message
            setAlertType(0); // Set success type
            setAlertOpen(true); // Open the alert modal
            if (userId) {
                await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
            } else {
                await handleGetAllCarts(null, dispatch); // gọi hàm getAllCart với user_id
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="layoutCart">
            <CustomAlert
                message={alertMessage}
                type={alertType}
                isOpen={alertOpen}
                onClose={closeAlert}
            />
            <div className="wrapperCart">
                <div className="headertitle">
                    <div className="container">
                        <div className="headingCart">
                            <h4>Giỏ hàng của bạn</h4>
                        </div>
                    </div>
                </div>
                <div className="contentCart">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-8 col-xs-12 contentCartDetail">
                                <div className="listCart">
                                    <div className="listContent">
                                        <div className="cart-row">
                                            {cartList?.data.count && (
                                                <p className="title-number">
                                                    Bạn đang có
                                                    <strong>
                                                        {" "}
                                                        {
                                                            cartList?.data.count
                                                        }{" "}
                                                        sản phẩm{" "}
                                                    </strong>
                                                    trong giỏ hàng
                                                </p>
                                            )}
                                            <div className="table-cart">
                                                {cartList.data &&
                                                    cartList?.data.cart.map(
                                                        (item) => {
                                                            return (
                                                                <div className="line-item">
                                                                    <div className="line-item-left">
                                                                        <div className="item-img">
                                                                            <Link
                                                                                to={`/detail/${item.product.product.id}`}
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        item
                                                                                            .product
                                                                                            .images[0]
                                                                                            .secure_url
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="line-item-right">
                                                                        <div className="item-qty">
                                                                            <Link
                                                                                className="span--title"
                                                                                to={`/detail/${item?.product.product.id}`}
                                                                            >
                                                                                {
                                                                                    item
                                                                                        ?.product
                                                                                        .product
                                                                                        .name
                                                                                }
                                                                            </Link>
                                                                            <div className="qty-parent">
                                                                                <div className="item--totalPrice">
                                                                                    <p className="price">
                                                                                        {convertPrice(
                                                                                            item
                                                                                                .product
                                                                                                .product
                                                                                                .price -
                                                                                                item
                                                                                                    .product
                                                                                                    .product
                                                                                                    .price *
                                                                                                    (item
                                                                                                        .product
                                                                                                        .product
                                                                                                        .discount /
                                                                                                        100)
                                                                                        )}
                                                                                    </p>
                                                                                    <button
                                                                                        className="qty-btn"
                                                                                        onClick={() =>
                                                                                            handleClickDecrease(
                                                                                                item
                                                                                                    .product
                                                                                                    .product
                                                                                                    .id,
                                                                                                item.quantity
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            item.quantity ===
                                                                                            1
                                                                                        }
                                                                                    >
                                                                                        -
                                                                                    </button>
                                                                                    <input
                                                                                        className="item-quantity"
                                                                                        type="text"
                                                                                        readOnly
                                                                                        value={
                                                                                            item.quantity
                                                                                        }
                                                                                    />
                                                                                    <button
                                                                                        className="qty-btn"
                                                                                        onClick={() =>
                                                                                            handleClickIncrease(
                                                                                                item
                                                                                                    .product
                                                                                                    .product
                                                                                                    .id,
                                                                                                item.quantity
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                </div>

                                                                                <div className="btnsection">
                                                                                    <div className="item--price">
                                                                                        <span>
                                                                                            Thành
                                                                                            tiền:{" "}
                                                                                            {convertPrice(
                                                                                                (item
                                                                                                    .product
                                                                                                    .product
                                                                                                    .price -
                                                                                                    item
                                                                                                        .product
                                                                                                        .product
                                                                                                        .price *
                                                                                                        (item
                                                                                                            .product
                                                                                                            .product
                                                                                                            .discount /
                                                                                                            100)) *
                                                                                                    item.quantity
                                                                                            )}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="remove"
                                                                                    onClick={() =>
                                                                                        handleDeleteItem(
                                                                                            item
                                                                                                .product
                                                                                                .product
                                                                                                .id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <Link>
                                                                                        <img
                                                                                            src="https://theme.hstatic.net/1000296747/1000891809/14/delete-cart.png?v=20"
                                                                                            alt=""
                                                                                        />
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                {!cartList.data && (
                                                    <>
                                                        <div>
                                                            Giỏ hàng của bạn
                                                            đang trống
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 sidebarCart-sticky">
                                <div className="wrapOrder">
                                    <div className="order-block">
                                        <h2 className="order-block--title">
                                            Thông tin đơn hàng
                                        </h2>
                                        <div className="order-total">
                                            <p>
                                                Tổng tiền :{" "}
                                                <span>
                                                    {convertPrice(totalPrice)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="order-action">
                                            <p>
                                                Xem phí vận chuyển ở trang thanh
                                                toán
                                            </p>
                                            <p>
                                                Voucher giảm giá được áp dụng ở
                                                trang thanh toán
                                            </p>
                                            {!cartList.data ||
                                            cartList.data.cart.length === 0 ? (
                                                <span id="checkout-btn">
                                                    Giỏ hàng của bạn đang trống
                                                </span>
                                            ) : userId ? (
                                                <Link
                                                    id="checkout-btn"
                                                    to={"/order"}
                                                    // onClick={() => {
                                                    //     handleSubmitOrder();
                                                    // }}
                                                >
                                                    ĐẶT MUA
                                                </Link>
                                            ) : (
                                                <Link
                                                    id="checkout-btn"
                                                    to={"/order"}

                                                    // onClick={() => {
                                                    //     handleSubmitOrder();
                                                    // }}
                                                >
                                                    ĐẶT MUA
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div className="order-block order-notify">
                                        <div className="warning">
                                            <p className="textrm">
                                                <strong>
                                                    Chính sách mua hàng:
                                                </strong>
                                            </p>
                                            <p>
                                                Hiện chúng tôi chỉ áp dụng miễn
                                                phí vận chuyển cho đơn hàng từ
                                                <strong> 700.000đ </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
