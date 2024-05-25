import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import thẻ Link từ react-router-dom
import "../Styles/admin.css";
import {
    handleGetOrders,
    handlegetAllProducts,
    handlegetAllUsers,
} from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "../components/OrderDetail";
import CustomAlert from "../components/CustomAlert";
function ManageOrder() {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state?.order.Order);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);
    const productList = useSelector((state) => state?.sales.allProducts);

    useEffect(() => {
        try {
            handlegetAllUsers(dispatch);
            handlegetAllProducts(dispatch);
            handleGetOrders(dispatch);
        } catch (e) {
            // console.log(e);
        }
    }, [dispatch]);
    const closeAlert = () => {
        setAlertOpen(false);
    };

    const convertPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
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
                                                <div>
                                                    Chức năng đang được phát
                                                    triển. Vui lòng quay lại
                                                    sau!
                                                </div>
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
