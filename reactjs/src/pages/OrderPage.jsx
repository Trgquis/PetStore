import React from "react";
import "../Styles/Order.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleGetAllCarts, handleGetOrder } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
export default function OrderPage() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { isCart } = useParams();
    const currentUser = useSelector(
        (state) => state.auth.currentUser.data.user
    );
    const orderData = useSelector((state) => state.order.Order);
    const cartList = useSelector((state) => state.order.allCarts);
    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };
    useEffect(() => {
        async function fetchCartItems() {
            // await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
            await handleGetOrder(2, dispatch);
        }
        fetchCartItems();
    }, []);
    return (
        <div className="checkout-container">
            <div className="user-details">
                <h4>Thông tin giao hàng</h4>
                {currentUser && (
                    <>
                        <div className="userInfo">
                            <>
                                <img
                                    style={{ maxWidth: "70px" }}
                                    src={`http://localhost:8081/${currentUser.avatar.path}`}
                                    alt=""
                                />
                                <div className="userTag">
                                    <div>
                                        <p>
                                            {currentUser.lastName}
                                            {currentUser.firstName}
                                        </p>
                                        <p>{currentUser.email}</p>
                                    </div>
                                </div>
                            </>
                        </div>
                        <div className="formOrder">
                            <input type="text" value={currentUser.address} />
                            <input
                                type="text"
                                value={currentUser.phonenumber}
                            />
                            {currentUser.gender === 0 ? (
                                <input type="text" value="Nam" />
                            ) : (
                                <input type="text" value="Nữ" />
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="order-details">
                <h4>Thông tin đơn hàng</h4>
                {parseInt(isCart) === 0 && orderData?.data && (
                    <>
                        <div className="order-summary">
                            {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                            <ul>
                                <div className="productList">
                                    <span style={{ paddingRight: "20px" }}>
                                        <img
                                            style={{ maxWidth: "70px" }}
                                            src={`http://localhost:8081/${orderData?.data.images.path}`}
                                            alt=""
                                        />
                                    </span>
                                    <li
                                        style={{ listStyle: "none" }}
                                        key={orderData?.data.id}
                                    >
                                        <span>
                                            {orderData?.data.product.name}
                                        </span>
                                        <span>
                                            Giá tiền:{" "}
                                            {convertPrice(
                                                orderData?.data.product.price -
                                                    orderData?.data.product
                                                        .price *
                                                        (orderData?.data.product
                                                            .discount /
                                                            100)
                                            )}
                                            ₫
                                        </span>
                                        <span>
                                            Số lượng: {orderData?.data.quantity}{" "}
                                        </span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                        <div className="order-total">
                            <h4>
                                Tổng cộng:{" "}
                                {convertPrice(
                                    orderData?.data.quantity *
                                        (orderData?.data.product.price -
                                            orderData?.data.product.price *
                                                (orderData?.data.product
                                                    .discount /
                                                    100))
                                )}
                                ₫
                            </h4>
                        </div>
                    </>
                )}
                {parseInt(isCart) === 1 &&
                    cartList?.data.cartItem.map((item) => {
                        return (
                            <>
                                <div className="order-summary">
                                    {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                                    <ul>
                                        <div className="productList">
                                            <span
                                                style={{ paddingRight: "20px" }}
                                            >
                                                <img
                                                    style={{ maxWidth: "70px" }}
                                                    src={`http://localhost:8081/${item.images.path}`}
                                                    alt=""
                                                />
                                            </span>
                                            <li
                                                style={{ listStyle: "none" }}
                                                key={item.id}
                                            >
                                                <span>{item.product.name}</span>
                                                <span>
                                                    Giá tiền:{" "}
                                                    {convertPrice(
                                                        item.product.price -
                                                            item.produc.price *
                                                                (item.product
                                                                    .discount /
                                                                    100)
                                                    )}
                                                    ₫
                                                </span>
                                                <span>
                                                    Số lượng: {item.quantity}{" "}
                                                </span>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                                <div className="order-total">
                                    <h4>
                                        Tổng cộng:{" "}
                                        {item.quantity *
                                            convertPrice(
                                                item.product.price -
                                                    item.product.price *
                                                        (item.product.discount /
                                                            100)
                                            )}
                                        ₫
                                    </h4>
                                </div>
                            </>
                        );
                    })}
            </div>
        </div>
    );
}
