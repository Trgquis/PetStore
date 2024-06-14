import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import thẻ Link từ react-router-dom
import "../Styles/Cart.scss";
import {
    handleGetOrders,
    handlegetAllProducts,
    handlegetAllUsers,
} from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "../components/OrderDetail";
import CustomAlert from "../components/CustomAlert";
import { handleGetUserOrders } from "../redux/apiRequest";
function ManageOrder() {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state?.order.Order);
    const userId = useSelector(
        (state) => state?.auth.currentUser.data.userData.user.id
    );
    const detailItem = useSelector((state) => state?.order.userOrders.data);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);
    const productList = useSelector((state) => state?.sales.allProducts);
    useEffect(() => {
        try {
            handlegetAllUsers(dispatch);
            handlegetAllProducts(dispatch);
            handleGetOrders(dispatch);
            handleGetUserOrders(dispatch, userId);
        } catch (e) {
            // console.log(e);
        }
    }, [dispatch, userId]);
    const closeAlert = () => {
        setAlertOpen(false);
    };

    const convertPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const convertDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
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
                            <h4>Đơn hàng của bạn</h4>
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
                                            <div className="table-cart">
                                                {detailItem?.orders
                                                    .slice(0, 5)
                                                    .map((order) => {
                                                        return (
                                                            <div
                                                                className="line-item--layout"
                                                                key={order.id}
                                                            >
                                                                <div className="order-line--layout">
                                                                    <span>
                                                                        Mã đơn
                                                                        hàng:{" "}
                                                                        {
                                                                            order.id
                                                                        }{" "}
                                                                        | Thời
                                                                        gian tạo{" "}
                                                                        {convertDate(
                                                                            order.createdAt
                                                                        )}
                                                                    </span>

                                                                    <span>
                                                                        Tình
                                                                        trạng:
                                                                        {orderList?.data.orders.map(
                                                                            (
                                                                                item
                                                                            ) => {
                                                                                return (
                                                                                    <Fragment>
                                                                                        {item.id ===
                                                                                        order.id
                                                                                            ? item.status
                                                                                            : null}
                                                                                    </Fragment>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
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
                                                    {/* {convertPrice(totalPrice)} */}
                                                </span>
                                            </p>
                                        </div>
                                        <div>Trạng thái: </div>
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

export default ManageOrder;
