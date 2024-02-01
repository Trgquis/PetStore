import React, { Component, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserInformation from "./UserInformation";
import { handlegetChildCatalogs } from "../redux/apiRequest";
import Login from "./Login";
import Search from "./Search";
import Cart from "./Cart";
import "../Styles/Style.scss";
import DropdownCategory from "./DropdownCategory";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const [dropdown, setDropdown] = useState(false);
    const onMouseEnter = async (catalogid, catid) => {
        console.log(catalogid);
        console.log(typeof catalogid);
        setActiveId(catalogid);
        setDropdown(!dropdown);
        // await handlegetChildCatalogs(dispatch);
    };

    const onMouseLeave = () => {
        setActiveId(null);
        setDropdown(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowSearch(false);
        setShowCart(false);
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
        setShowLogin(false);
        setShowCart(false);
    };
    const toggleCart = () => {
        setShowCart(!showCart);
        setShowLogin(false);
        setShowSearch(false);
    };
    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };
    // const [user, setUser] = useState('')
    const currentUser = useSelector((state) => state.auth.currentUser);
    // console.log(currentUser?.data.user)

    document.addEventListener("scroll", () => {
        if (showLogin) {
            setShowLogin(false);
        }
        if (showSearch) {
            setShowSearch(false);
        }
        if (showCart) {
            setShowCart(false);
        }
    });
    useEffect(() => {
        // Fetch catalog list here
        handlegetChildCatalogs(dispatch);
    }, []);
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
                <ul id="nav_bar">
                    <li className="active">
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li
                        className="active"
                        id="1"
                        onMouseEnter={(e) => onMouseEnter(1)}
                        onMouseLeave={(e) => onMouseLeave()}
                    >
                        <Link
                            to={`/allproducts/${1}`}
                            onClick={handleLinkClick}
                        >
                            Shop cho chó
                        </Link>
                        {activeId === 1 ? (
                            <DropdownCategory
                                dropdown={true}
                                parentID={activeId}
                            />
                        ) : null}
                    </li>

                    <li
                        className="active"
                        id="2"
                        onMouseEnter={(e) => onMouseEnter(2)}
                        onMouseLeave={(e) => onMouseLeave()}
                    >
                        <Link
                            to={`/allproducts/${2}`}
                            onClick={handleLinkClick}
                        >
                            Shop cho mèo
                        </Link>
                        {activeId === 2 ? (
                            <DropdownCategory
                                dropdown={true}
                                parentID={activeId}
                            />
                        ) : null}
                    </li>
                    <li className="active">
                        <Link to="/">Dịch vụ</Link>
                    </li>
                    <li className="active">
                        <Link to="/">Liên hệ</Link>
                    </li>
                </ul>
                <div className="icon">
                    {!currentUser && (
                        <>
                            <div className="icon-btn" onClick={toggleSearch}>
                                {/* <i className="fa fa-search"></i> */}
                                <FaSearch />
                            </div>
                            <div className=" icon-btn" onClick={toggleLogin}>
                                <FaUser />
                            </div>
                            <div className="icon-btn" onClick={toggleCart}>
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
                                {showSearch && <Search />}
                            </div>
                            <div
                                style={{
                                    opacity: showCart ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                {showCart && <Cart />}
                            </div>
                        </>
                    )}
                    {currentUser && (
                        <>
                            <div className="icon-btn" onClick={toggleSearch}>
                                <i className="fa-solid fa-magnifying-glass "></i>
                            </div>
                            <div className="icon-btn" onClick={toggleCart}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div className="user-information">
                                {currentUser &&
                                currentUser.data.user.avatar &&
                                currentUser.data.user.avatar.path ? (
                                    <UserInformation User={currentUser.data} />
                                ) : (
                                    <UserInformation User={currentUser.data} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
