import React, { Component, useState } from "react";
import "../Styles/Style.scss";
import "../Styles/animatedbox.css";
import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
// const BacktoTop = require('./BackToTopButton')
import BackToTopButton from "./BackToTopButton";
import { FaMailBulk, FaInstagram } from "react-icons/fa";
const Footer = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 500) {
            setVisible(true);
        } else if (scrolled <= 500) {
            setVisible(false);
        }
    };
    window.addEventListener("scroll", toggleVisible);

    return (
        <div className="newft">
            <div id="prefooter">
                <div className="prefooter_title">
                    <h2>About Us</h2>
                    <p>@petshop.vn & @acilue.vn</p>
                </div>
                <div id="prefooter--sc2">
                    <div className="info">
                        <div id="about">
                            <h4>Về Pet Shop</h4>
                            <p>
                                Cửa hàng thú cưng chuyên cung cấp sản phẩm, dịch
                                vụ và tiện ích tốt nhất <br /> cho thu cưng của
                                bạn
                            </p>
                        </div>
                        <div>
                            <h4>Địa chỉ offline</h4>
                            <p>
                                <strong>Địa chỉ:</strong> 10/12D, Đường ABC, P.
                                DEF, Q. Ninh Kiều, Tp. Cần Thơ
                            </p>
                            <p>
                                <strong>Điện thoại:</strong> 012345678 -
                                098765412
                            </p>
                            <p>
                                <strong>Email:</strong> petshop@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="ct">
                        <div>
                            <h4>Chăm sóc khách hàng</h4>
                            <ul id="contact_list">
                                <li>
                                    <Link to="/maintenance">Liên hệ </Link>
                                </li>
                                <li>
                                    <Link to="/maintenance">
                                        Đóng góp ý kiến phản hồi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4>Follow Us</h4>
                            <ul id="social">
                                <li>
                                    <Link to="/maintenance" id="contact_icon">
                                        <FaMailBulk />
                                        petshop.vn
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/maintenance" id="contact_icon">
                                        <FaInstagram /> @acilue.vn
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer">
                <p>Copyright &copy; 2022</p>
                <p>
                    <div className="container">
                        <div
                            className="animate"
                            style={{ display: visible ? "inline" : "none" }}
                        >
                            <div className="circle delay1">
                                <FaFacebookMessenger
                                    style={{
                                        fontSize: "24px",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </div>
                            <div className="circle delay2"></div>
                            <div className="circle delay3"></div>
                            <div className="circle delay4"></div>
                        </div>
                    </div>
                    <BackToTopButton />
                </p>
            </div>
        </div>
    );
};

export default Footer;
