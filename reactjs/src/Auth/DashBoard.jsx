import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

import {
    faUserSecret,
    faAlignLeft,
    faTachometerAlt,
    faProjectDiagram,
    faChartLine,
    faPaperclip,
    faShoppingCart,
    faGift,
    faCommentDots,
    faMapMarkerAlt,
    faPowerOff,
    faUser,
    faHandHoldingUsd,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import thẻ Link từ react-router-dom
import "../Styles/admin.css";
import { handlegetAllProducts, handlegetAllUsers } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
function DashBoard() {
    const [isToggled, setIsToggled] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const userList = useSelector((state) => state?.users.allUsers);
    const [perPage, setPerPage] = useState(15); // Số mục hiển thị trên mỗi trang
    const pageCount = Math.ceil(userList?.data.users.count / perPage); // Số trang
    const productList = useSelector((state) => state?.sales.allProducts);
    console.log(productList?.data.products.count)

    useEffect(() => {
        try {
            handlegetAllUsers(dispatch);
            handlegetAllProducts(dispatch)
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className={`d-flex ${isToggled ? "toggled" : ""}`} id="wrapper">
            {/* Sidebar */}
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    HappyPet Admin
                </div>
                <div className="list-group list-group-flush my-3">
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text active"
                    >
                        <FontAwesomeIcon
                            icon={faTachometerAlt}
                            className="me-2"
                        />
                        DashBoard
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faProjectDiagram}
                            className="me-2"
                        />
                        Projects
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon icon={faChartLine} className="me-2" />
                        Analytics
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon icon={faPaperclip} className="me-2" />
                        Reports
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="me-2"
                        />
                        Store Mng
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon icon={faGift} className="me-2" />
                        Products
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faCommentDots}
                            className="me-2"
                        />
                        Chat
                    </Link>
                    <Link
                        to="#"
                        className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                    >
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="me-2"
                        />
                        Outlet
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
            {/* /#sidebar-wrapper */}

            {/* Page Content */}
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
                        <h2 className="fs-2 m-0">Dashboard</h2>
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
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle second-text fw-bold"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="me-2"
                                    />
                                    John Doe
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* /Navbar */}

                <div className="container-fluid px-4">
                    {/* Nội dung trang */}
                    <div className="row g-3 my-2">
                        <div className="col-md-3">
                            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">{productList?.data.products.count}</h3>
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
                                {/* <i className="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i> */}
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

                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Recent Orders</h3>
                        <div className="col">
                            <table className="table bg-white rounded shadow-sm  table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <th scope="col">Họ</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Điện thoại</th>
                                        <th scope="col">Địa chỉ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList?.data.users.users
                                        .slice(
                                            currentPage * perPage,
                                            currentPage * perPage + perPage
                                        )
                                        .map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.email}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.firstName}</td>
                                                <td>
                                                    {user.gender === 0
                                                        ? "Nam"
                                                        : "Nữ"}
                                                </td>
                                                <td>{user.phonenumber}</td>
                                                <td>{user.address}</td>
                                            </tr>
                                        ))}
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
