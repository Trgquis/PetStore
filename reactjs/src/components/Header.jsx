import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserInformation from "./UserInformation";
import Login from "./Login";
import Search from "./Search";
import Cart from "./Cart";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import "../Styles/Style.scss";
import {
    handlegetAllRoots,
    handlegetAllCatalogs,
    handlegetAllChilds,
} from "../redux/apiRequest";
import CatalogBar from "./CatalogBar";
const Header = () => {
    const [keyword, setKeyword] = useState();
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const headerRef = useRef(null); // Define headerRef here

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowSearch(false);
        setShowCart(false);
        setOpen(false);
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
        setShowLogin(false);
        setShowCart(false);
        setOpen(false);
    };
    const toggleCart = () => {
        setShowCart(!showCart);
        setShowLogin(false);
        setShowSearch(false);
        setOpen(false);
    };
    const toggleCartShut = () => {
        setShowCart(false);
    };
    const toggleCatalog = () => {
        setOpen(!open);
        setShowLogin(false);
        setShowSearch(false);
        setShowCart(false);
    };
    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };
    const handleKeywordChange = (e) => {
        const newKeyword = e.target.value;
        if (newKeyword.trim() !== "") {
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
        setKeyword(newKeyword); // Cập nhật giá trị keyword với giá trị nhập vào từ ô tìm kiếm
    };
    const currentUser = useSelector((state) => state.auth.currentUser);
    useEffect(() => {
        handlegetAllRoots(dispatch);
        handlegetAllCatalogs(dispatch);
        handlegetAllChilds(dispatch);
        // Thêm event listener cho sự kiện scroll
        window.addEventListener("scroll", handleScroll);
        // Thêm event listener cho sự kiện click bên ngoài header
        document.addEventListener("click", handleClickOutside);

        return () => {
            // Xóa event listener khi component unmount
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // Xử lý sự kiện scroll
    const handleScroll = () => {
        setShowLogin(false);
        setShowSearch(false);
        setShowCart(false);
    };

    // Xử lý sự kiện click bên ngoài header
    const handleClickOutside = (event) => {
        setShowLogin(false);
        setShowSearch(false);
        setShowCart(false);
    };
    return (
        <header className="header">
            <div id="top">
                <p>Tặng voucher miễn phí khi trở thành hội viên của PETSHOP</p>
            </div>
            <i className="fas fas fa-angle-down"></i>
            <nav className="navbarHeader">
                <div className="logo">
                    <Link to="/">pet</Link>
                </div>
                <div
                    className="toggleCatalog"
                    onClick={toggleCatalog}
                    style={{ position: "relative" }}
                >
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                        <CiViewList />
                    </span>
                    Danh mục
                    {open && <CatalogBar />}
                </div>
                <div className="searchSection">
                    <input
                        type="text"
                        placeholder="Bạn cần tìm gì?"
                        value={keyword}
                        onChange={handleKeywordChange}
                    />

                    <div className="iconsearch">
                        <FaSearch />
                    </div>
                </div>
                <div className="contactnumber">
                    <p
                        style={{
                            fontSize: "20px",
                            lineHeight: "20px",
                            marginTop: "10px",
                            marginRight: "5px",
                        }}
                    >
                        <FaPhoneAlt />
                    </p>
                    <div style={{ height: "100%" }}>
                        <div
                            style={{
                                height: "16px",
                                marginTop: "-42px",
                                marginBottom: "5px",
                            }}
                        >
                            Gọi mua hàng
                        </div>
                        <div style={{ height: "16px" }}>0364998896</div>
                    </div>
                </div>
                <div className="icon">
                    {!currentUser && (
                        <>
                            <div className=" icon-btn" onClick={toggleLogin}>
                                <FaUser />
                            </div>
                            <div
                                className="icon-btn"
                                onMouseEnter={toggleCart}
                                // onClick={toggleCart}
                            >
                                <FaShoppingCart />
                            </div>
                            <div
                                style={{
                                    opacity: showLogin ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                {showLogin && <Login />}
                            </div>
                            <div
                                style={{
                                    opacity: showSearch ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                {showSearch && <Search keyword={keyword} />}
                            </div>
                            <div
                                style={{
                                    opacity: showCart ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                {showCart && (
                                    <Cart toggleCartShut={toggleCartShut} />
                                )}
                            </div>
                        </>
                    )}
                    {currentUser && (
                        <>
                            <div className="icon-btn" onClick={toggleSearch}>
                                <FaSearch />
                            </div>
                            <div className="icon-btn" onClick={toggleCart}>
                                <FaShoppingCart />
                            </div>
                            <div className="user-information">
                                {currentUser ? (
                                    <UserInformation
                                        User={currentUser.data.userData}
                                    />
                                ) : (
                                    <UserInformation
                                        User={currentUser.data.userData}
                                    />
                                )}
                            </div>
                            <div
                                style={{
                                    opacity: showSearch ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                {showSearch && <Search keyword={keyword} />}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
