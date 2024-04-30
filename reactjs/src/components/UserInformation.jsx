import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/apiRequest";
import PropTypes from "prop-types";
import { FaAngleDown } from "react-icons/fa";
import "../Styles/UserInformation.scss";

const UserInformation = ({ User }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(User);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLogOut = async () => {
        await logOut(User.accessToken, dispatch);
    };
    return (
        <>
            <div className="user-information">
                <div className="container" onClick={toggleDropdown}>
                    <div className="info-container">
                        <h4 className="name">
                            Xin chào! {User.user.lastName} {User.user.firstName}
                        </h4>
                    </div>
                </div>
                {showDropdown && (
                    <div className="AccountDropdown">
                        <div>
                            {User.user.roleId === "1" ? (
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/AdminPage"
                                    >
                                        <i className="fa-regular fa-bell"></i>
                                        <span>Trang admin</span>
                                    </Link>
                                </div>
                            ) : null}
                            <div className="dropdown-line">
                                <Link
                                    className="dropdown--detail"
                                    to="/maintenance"
                                >
                                    <i className="fa-solid fa-id-card"></i>
                                    <span>Tài khoản của tôi</span>
                                </Link>
                            </div>
                            {User.user.roleId !== "1" ? (
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-solid fa-headset"></i>
                                        <span>Đơn hàng</span>
                                    </Link>
                                </div>
                            ) : null}

                            <div className="dropdown-line">
                                <Link
                                    className="dropdown--detail"
                                    to="/maintenance"
                                >
                                    <i className="fa-solid fa-headset"></i>
                                    <span>Hỗ trợ</span>
                                </Link>
                            </div>
                            <div className="dropdown-line">
                                <Link
                                    className="dropdown--detail"
                                    to="/"
                                    onClick={handleLogOut}
                                >
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>Đăng xuất</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserInformation;
