import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserInformation from "./UserInformation";
import Login from "./Login";
import Search from "./Search";
import Cart from "./Cart";
import DropdownCategory from "./DropdownCategory";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import "../Styles/Style.scss";
import {
    handlegetAllRoots,
    handlegetAllCatalogs,
    handlegetAllChilds,
} from "../redux/apiRequest";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const rootList = useSelector((state) => state?.sales.allRoots);
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
    const currentUser = useSelector((state) => state.auth.currentUser);
    useEffect(() => {
        handlegetAllRoots(dispatch);
        handlegetAllCatalogs(dispatch);
        handlegetAllChilds(dispatch);
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
                    {rootList?.data.roots.roots.map((root) => (
                        <li
                            key={root.id}
                            className="active"
                            onMouseEnter={() => setActiveId(root.id)}
                            onMouseLeave={() => setActiveId(null)}
                        >
                            <Link
                                to={`/allproducts/${root.id}`}
                                onClick={handleLinkClick}
                            >
                                {root.name}
                            </Link>
                            {activeId === root.id && (
                                <DropdownCategory parentID={root.id} />
                            )}
                        </li>
                    ))}
                </ul>
                <div className="icon">
                    {!currentUser && (
                        <>
                            <div className="icon-btn" onClick={toggleSearch}>
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
                                <FaSearch />
                            </div>
                            <div className="icon-btn" onClick={toggleCart}>
                                <FaShoppingCart />
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
