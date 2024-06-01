import React, { Component, useState } from "react";
import "../Styles/Style.scss";
import "../Styles/animatedbox.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
// const BacktoTop = require('./BackToTopButton')
import BackToTopButton from "./BackToTopButton";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { CiHeadphones } from "react-icons/ci";

const Footer = () => {
    return (
        <div className="mainfooter">
            <div className="footer-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-12 col-xs-12 widget-footer">
                            <h4 className="title-footer opened">
                                Thông tin liên hệ
                            </h4>
                            <div className="content-footer">
                                <p>
                                    <b>Happypet.vn</b> là trang mua sắm trực
                                    tuyến các sản phẩm bán lẻ dành cho thú cưng
                                    của <b>Happy Pet Shop</b>. Giấy chứng nhận
                                    Đăng ký Kinh doanh số 123456789 do Sở Kế
                                    hoạch và Đầu tư Thành phố Hồ Chí Minh cấp
                                    ngày 28/03/2019.
                                </p>
                                <div className="logo-footer">
                                    <a
                                        href="http://online.gov.vn/Home/WebDetails/80269"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img
                                            alt="Hình ảnh"
                                            className="ls-is-cached lazyloaded"
                                            data-src="//theme.hstatic.net/200000263355/1001161916/14/footer_logobct_img.png?v=67"
                                            src="//theme.hstatic.net/200000263355/1001161916/14/footer_logobct_img.png?v=67"
                                            alt="Bộ Công Thương"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 col-xs-12 widget-footer">
                            <h4 className="title-footer">Thông tin cửa hàng</h4>
                            <div className="content-footer block-collapse">
                                <div className="address-footer">
                                    <ul>
                                        <li className="contact-1">
                                            <b>Cửa hàng 1 </b>:{" "}
                                            <a
                                                rel="noopener noreferrer"
                                                href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.0299337,105.7680404,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi-VN&entry=ttu"
                                                target="_blank"
                                            >
                                                Trường CNTT&TT tại Đại Học Cần
                                                Thơ
                                            </a>
                                            <br />
                                            <b>Cửa hàng 2 </b>:{" "}
                                            <a
                                                rel="noopener noreferrer"
                                                href="https://www.google.com/maps/place/328+%C4%90.+C%C3%A1ch+M%E1%BA%A1ng+Th%C3%A1ng+8,+An+Th%E1%BB%9Bi,+B%C3%ACnh+Th%E1%BB%A7y,+C%E1%BA%A7n+Th%C6%A1,+Vi%E1%BB%87t+Nam/@10.0621102,105.7611636,17z/data=!3m1!4b1!4m6!3m5!1s0x31a087e697ca01bf:0xc63327cfb58e856!8m2!3d10.0621102!4d105.7637385!16s%2Fg%2F11f3wmwx_b?hl=vi-VN&entry=ttu"
                                                target="_blank"
                                            >
                                                328/6, Cách Mạng Tháng Tám,
                                                P.Bùi Hữu Nghĩa, Q.Bình Thủy,
                                                TP.Cần Thơ
                                            </a>
                                        </li>
                                        <li className="contact-2">
                                            <strong>
                                                <a href="tel:0364998896">
                                                    0364.998.996
                                                </a>
                                            </strong>
                                        </li>
                                        <li className="contact-4">
                                            happypetshop.vn
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 col-xs-12 widget-footer">
                            <h4 className="title-footer">Hỗ trợ khách hàng</h4>
                            <div className="content-footer block-collapse">
                                <ul className="footerNav-link">
                                    <li className="item">
                                        <a href="/search" title="Tìm kiếm">
                                            Tìm kiếm
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/gioi-thieu"
                                            title="Giới thiệu"
                                        >
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/chinh-sach-bao-mat"
                                            title="Chính sách bảo mật"
                                        >
                                            Chính sách bảo mật
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/chinh-sach-thanh-toan"
                                            title="Chính sách thanh toán"
                                        >
                                            Chính sách thanh toán
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/chinh-sach-giao-hang"
                                            title="Chính sách giao hàng"
                                        >
                                            Chính sách giao hàng
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/chinh-sach-doi-tra"
                                            title="Chính sách đổi trả"
                                        >
                                            Chính sách đổi trả
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/huong-dan-mua-hang"
                                            title="Hướng dẫn mua hàng"
                                        >
                                            Hướng dẫn mua hàng
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a
                                            href="/pages/dieu-khoan-dich-vu"
                                            title="Điều khoản dịch vụ"
                                        >
                                            Điều khoản dịch vụ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 col-xs-12 widget-footer">
                            <h4 className="title-footer opened">
                                Chăm sóc khách hàng
                            </h4>
                            <div className="footerInfo-hline">
                                <div className="box-icon">
                                    <CiHeadphones />{" "}
                                </div>
                                <div className="box-content">
                                    <span>
                                        <strong>
                                            <a href="tel:0364998896">
                                                0364.998.996
                                            </a>
                                        </strong>
                                    </span>
                                    <u>info@happypetshop.vn</u>
                                </div>
                            </div>
                            <div className="content-footer">
                                <div className="footerInfo-hline"></div>
                                <h4 className="fter-title">Follow Us</h4>
                                <div id="iconlist">
                                    <Link>
                                        <FaFacebook />
                                    </Link>
                                    <Link>
                                        <FaInstagram />
                                    </Link>
                                    <Link>
                                        <FaTiktok />
                                    </Link>
                                    <Link>
                                        <SiShopee />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center">
                <div className="container">
                    <p>
                        Copyright © 2024 <Link to={"/"}>Happy Pet Shop</Link>
                    </p>
                </div>
            </div>
            <p>
                <div className="container">
                    <div className="animate">
                        <Link
                            to={`https://www.facebook.com/profile.php?id=61559289246643`}
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
                        </Link>
                        <div className="circle delay2"></div>
                        <div className="circle delay3"></div>{" "}
                        <div className="circle delay4"></div>
                    </div>
                </div>
                <BackToTopButton />
            </p>
        </div>
    );
};

export default Footer;
