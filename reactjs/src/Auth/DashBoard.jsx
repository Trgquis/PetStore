import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { CiSettings } from "react-icons/ci";
import {
    faAlignLeft,
    faTachometerAlt,
    faChartLine,
    faPowerOff,
    faUser,
    faGift,
    faHandHoldingUsd,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import thẻ Link từ react-router-dom
import "../Styles/admin.css";
import {
    handleGetOrders,
    handlegetAllProducts,
    handlegetAllUsers,
} from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "../components/OrderDetail";
function DashBoard() {
    const [isToggled, setIsToggled] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const userList = useSelector((state) => state?.users.allUsers);
    const [perPage, setPerPage] = useState(15); // Số mục hiển thị trên mỗi trang
    const pageCount = Math.ceil(userList?.data.users.count / perPage); // Số trang
    const productList = useSelector((state) => state?.sales.allProducts);
    const orderList = useSelector((state) => state?.order.Order);
    const [openDetail, setOpenDetail] = useState(false);
    const [details, setDetails] = useState(false);
    console.log(productList?.data.products.count);

    useEffect(() => {
        try {
            handlegetAllUsers(dispatch);
            handlegetAllProducts(dispatch);
            handleGetOrders(dispatch);
        } catch (e) {
            console.log(e);
        }
    }, [dispatch]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleOpenDetail = (orderId) => {
        try {
            const filteredOrders = orderList?.data.details.filter(
                (order) => order.orderId === orderId
            );
            setOpenDetail(true);
            setDetails(filteredOrders[0]);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCloseDetail = async () => {
        try {
            setOpenDetail(false);
            setDetails(null);
        } catch (e) {
            console.log(e);
        }
    };

    const convertDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Đảm bảo rằng giờ, phút và giây có hai chữ số bằng cách thêm số 0 nếu cần
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        const formattedDate = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

        return formattedDate;
    };

    return (
        <div className={`d-flex ${isToggled ? "toggled" : ""}`} id="wrapper">
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    HappyPet Admin
                </div>
                <div className="list-group list-group-flush my-3">
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faTachometerAlt}
                            className="me-2"
                        />
                        Thống kê
                    </Link>

                    <Link
                        to="/productsmanage"
                        className="list-group-item list-group-item-action bg-transparent second-text active"
                    >
                        <CiSettings className="me-2" />
                        Trang quản lý
                    </Link>

                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
                    >
                        <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                        Logout
                    </Link>
                </div>
            </div>
            <div id="page-content-wrapper">
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faAlignLeft}
                            className="primary-text fs-4 me-3"
                            id="menu-toggle"
                            onClick={handleToggle}
                        />
                        <h2 className="fs-2 m-0">Thống kê</h2>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>

                <div className="container-fluid px-4">
                    <div className="row g-3 my-2">
                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">
                                        {productList?.data.products.count}
                                    </h3>
                                    <p className="fs-5">Products</p>
                                </div>
                                <FontAwesomeIcon
                                    icon={faGift}
                                    className="me-2
                                    fas faGift fa-gift fs-1 primary-text border rounded-full secondary-bg p-3
                                        "
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">4920</h3>
                                    <p className="fs-5">Sales</p>
                                </div>
                                <FontAwesomeIcon
                                    icon={faHandHoldingUsd}
                                    className="me-2
                                        fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3
                                        "
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">3899</h3>
                                    <p className="fs-5">Delivery</p>
                                </div>
                                <FontAwesomeIcon
                                    icon={faTruck}
                                    className="me-2
                                    fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3
                                        "
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">%25</h3>
                                    <p className="fs-5">Increase</p>
                                </div>
                                <FontAwesomeIcon
                                    icon={faChartLine}
                                    className="me-2
                                    fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3
                                        "
                                />
                            </div>
                        </div>
                    </div>

                    <OrderDetail
                        isOpen={openDetail}
                        details={details}
                        onClose={handleCloseDetail}
                    />
                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Đơn đặt hàng</h3>
                        <div className="col">
                            <table className="table bg-white rounded shadow-sm  table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Email khách hàng</th>
                                        <th scope="col">Mã đơn hàng</th>
                                        <th scope="col">Ngày tạo</th>
                                        <th scope="col">Phí Ship</th>
                                        <th scope="col">Tổng tiền</th>
                                        <th scope="col">Trạng thái đơn hàng</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orderList?.data.orders
                                        .slice(
                                            currentPage * perPage,
                                            currentPage * perPage + perPage
                                        )
                                        .map((order) => {
                                            // Tìm người dùng có user_id tương ứng trong userList
                                            const user =
                                                userList?.data.users.users.find(
                                                    (user) =>
                                                        user.id ===
                                                        order.user_id
                                                );

                                            // Kiểm tra xem user có tồn tại không
                                            if (user) {
                                                return (
                                                    <tr key={order.id}>
                                                        <td>{user.email}</td>
                                                        <td>{order.id}</td>
                                                        <td>
                                                            {convertDate(
                                                                order.createdAt
                                                            )}
                                                        </td>
                                                        <td>{order.shipFee}</td>
                                                        <td>
                                                            {order.totalPayment}
                                                        </td>
                                                        <td>
                                                            {order.status ===
                                                                "pending" &&
                                                                "Đang xử lý"}
                                                            {order.status ===
                                                                "confirm" &&
                                                                "Đã xác nhận"}
                                                            {order.status ===
                                                                "prepair" &&
                                                                "Đang lấy hàng"}
                                                            {order.status ===
                                                                "delivery" &&
                                                                "Đã bàn giao vận chuyển"}
                                                            {order.status ===
                                                                "completed" &&
                                                                "Đã hoàn thành"}
                                                            {order.status ===
                                                                "cancel" &&
                                                                "Đã hủy"}
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    handleOpenDetail(
                                                                        order.id
                                                                    )
                                                                }
                                                                style={{
                                                                    border: "none",
                                                                    backgroundColor:
                                                                        "#ACE1AF",
                                                                    padding:
                                                                        "2px",
                                                                }}
                                                            >
                                                                Chi tiết
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                </tbody>

                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* /#page-content-wrapper */}
        </div>
    );
}

export default DashBoard;
