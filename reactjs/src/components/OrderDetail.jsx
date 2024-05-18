import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleGetOrders, handlegetAllProducts } from "../redux/apiRequest";
import axios from "axios";

function OrderDetail({ isOpen, details, onClose }) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state?.sales.allProducts);
    const [status, setStatus] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        handlegetAllProducts(dispatch);
    }, [dispatch]);

    const handleUpdateStatus = async () => {
        console.log(status);
        const formData = {
            status: status,
            id: id,
        };
        if (status) {
            const res = await axios.put(
                `https://petstore-backend-pgof.onrender.com/api/editStatus`,
                formData
            );
            console.log(res);
        }
        setStatus(null);
        handleGetOrders(dispatch);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            style={{
                position: "absolute",
                zIndex: "3",
                backgroundColor: "#fff",
                borderRadius: "5px",
                width: "1185px",
                boxShadow:
                    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
            size="xl"
            isOpen={isOpen}
        >
            <h3>Chi tiết đơn hàng</h3>
            <div isOpen className="modal-body">
                {details ? (
                    <div>
                        <p>Mã đơn hàng: {details.orderId}</p>
                        <h4>Chi tiết sản phẩm:</h4>
                        <ul>
                            {details.details.map((detail, index) => {
                                const product =
                                    productList?.data.products.products.find(
                                        (item) => detail.product_id === item.id
                                    );
                                const images =
                                    productList?.data.products.images.find(
                                        (img) =>
                                            detail.product_id === img.product_id
                                    );
                                if (product && images) {
                                    return (
                                        <li
                                            key={index}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <p>
                                                <p>
                                                    Tên sản phẩm: {product.name}
                                                </p>
                                                <p>
                                                    Số lượng: {detail.quantity}
                                                </p>
                                                <p>
                                                    Tạm tính:{" "}
                                                    {detail.total_price}
                                                </p>
                                            </p>
                                            <p>
                                                <img
                                                    style={{
                                                        height: "50px",
                                                        width: "50px",
                                                    }}
                                                    src={images.secure_url}
                                                    alt=""
                                                />
                                            </p>
                                        </li>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                        <h4>Xử lý đơn hàng:</h4>
                        <div>
                            <div className="Edit-input" controlId="catalog_id">
                                <div>Trạng thái đơn hàng</div>
                                <select
                                    as="select"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        setId(details.orderId);
                                    }}
                                >
                                    <option value="">
                                        Chọn trạng thái đơn hàng
                                    </option>
                                    <option value="pending">Đang xử lý</option>
                                    <option value="confirm">
                                        Xác nhận đơn hàng
                                    </option>
                                    <option value="prepair">
                                        Đang lấy hàng
                                    </option>
                                    <option value="delivery">
                                        Bàn giao vận chuyển
                                    </option>
                                    <option value="completed">
                                        Giao hàng thành công
                                    </option>
                                    <option value="cancel">Đã hủy</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div>
                <button onClick={() => handleUpdateStatus()}>Xác nhận</button>
                <button color="secondary" onClick={onClose}>
                    Hủy
                </button>
            </div>
        </div>
    );
}

export default OrderDetail;
