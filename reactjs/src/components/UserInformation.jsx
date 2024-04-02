import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/apiRequest";
import PropTypes from "prop-types";
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
            {User.user.firstName &&
            User.user.lastName &&
            User.user.email &&
            User.accessToken ? (
                <div className="user-information">
                    <div className="container" onClick={toggleDropdown}>
                        <div className="info-container">
                            <h4 className="name">
                                {User.user.lastName} {User.user.firstName}
                            </h4>
                            <h4 className="email">{User.user.email}</h4>
                        </div>
                    </div>
                    {showDropdown && (
                        <div className="AccountDropdown">
                            <div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-solid fa-id-card"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Hồ sơ
                                        </span>
                                    </Link>
                                </div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-regular fa-bell"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Thông báo
                                        </span>
                                    </Link>
                                </div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-solid fa-headset"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Hỗ trợ
                                        </span>
                                    </Link>
                                </div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/"
                                        onClick={handleLogOut}
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Đăng xuất
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="user-information">
                    <div className="container" onClick={toggleDropdown}>
                        <div className="info-container">
                            <h4 className="name">
                                {User.user.lastName} {User.user.firstName}
                            </h4>
                            <h4 className="email">{User.user.email}</h4>
                        </div>
                    </div>
                    {showDropdown && (
                        <div className="AccountDropdown">
                            <div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-solid fa-id-card"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Hồ sơ
                                        </span>
                                    </Link>
                                </div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-regular fa-bell"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Thông báo
                                        </span>
                                    </Link>
                                </div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/maintenance"
                                    >
                                        <i className="fa-solid fa-headset"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Hỗ trợ
                                        </span>
                                    </Link>
                                </div>
                                <div className="dropdown-line">
                                    <Link
                                        className="dropdown--detail"
                                        to="/"
                                        onClick={handleLogOut}
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        <span style={{ paddingLeft: "8px" }}>
                                            Đăng xuất
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default UserInformation;
