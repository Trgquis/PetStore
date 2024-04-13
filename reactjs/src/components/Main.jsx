import React, { Component, useEffect, useState } from "react";
import "../Styles/Main.scss";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handlegetAllProducts, handlegetProduct } from "../redux/apiRequest";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownCategory from "./DropdownCategory";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import CustomAlert from "./CustomAlert";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                background: "#d3d6db",
                paddingTop: "4px",
                top: "70%",
                right: "-40px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
            }}
            onClick={onClick}
        ></button>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                background: "#d3d6db",
                paddingTop: "4px",
                top: "70%",
                left: "-40px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
            }}
            onClick={onClick}
        />
    );
}

const Main = () => {
    const productList = useSelector((state) => state?.sales.allProducts);
    const User = useSelector((state) => state?.auth.currentUser);
    const [activeId, setActiveId] = useState(null);
    const rootList = useSelector((state) => state?.sales.allRoots);
    const catalogList = useSelector((state) => state?.sales.allCatalogs);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);
    const increaseQuantity = (pID) => {
        setQuantities((prevState) => ({
            ...prevState,
            [pID]: (prevState[pID] || 0) + 1,
        }));
    };

    const handleAddToCart = async (pID) => {
        const qt = quantities[pID] || 0;
        try {
            console.log(pID, qt + 1);
            const response = await axios.post(
                "http://localhost:8888/api/addcart",
                {
                    product_id: pID,
                    quantity: qt + 1,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            setAlertMessage("Thêm vào giỏ hàng thành công!"); // Set success message
            setAlertType(0); // Set success type
            setAlertOpen(true); // Open the alert modal
        } catch (error) {
            console.error("Error adding item to cart:", error);
            setAlertMessage("Thêm vào giỏ hàng thất bại!"); // Set error message
            setAlertType(1); // Set error type
            setAlertOpen(true); // Open the alert modal
        }
    };
    const handleClick = (productID) => {
        increaseQuantity(productID);
        handleAddToCart(productID);
    };
    const homeImageSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const settings = {
        // dots: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 2,
        speed: 500,
        // autoplay: true,
        // autoplaySpeed: 2000,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    const toggleSubCatalog = (ID) => {
        return () => {
            if (activeId !== ID) {
                setActiveId(ID);
                setShow(true);
            }
        };
    };

    const closeAlert = () => {
        setAlertOpen(false);
    };

    const toggleSubCatalogShut = () => {
        setShow(false);
    };
    useEffect(() => {
        handlegetAllProducts(dispatch);
    }, []);

    return (
        <>
            {alertOpen && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    isOpen={alertOpen}
                    onClose={closeAlert}
                />
            )}
            <div id="content">
                <div className="overlayouthome">
                    <div
                        className="catalog"
                    >
                        <div className="catalog_title">
                            <span>danh mục sản phẩm</span>
                        </div>

                        <div className="catalog_item">
                            {rootList?.data.roots.roots.map((root) => (
                                <div
                                    key={root.id}
                                    className="active"
                                    onMouseEnter={toggleSubCatalog(root.id)}
                                >
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                        onClick={handleLinkClick}
                                    >
                                        {root.name}
                                        <FaAngleRight />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="banner-section">
                        <ul id="nav_bar">
                            {catalogList?.data.catalogs.catalogs
                                .slice(0, 6)
                                .map((root) => (
                                    <li key={root.id} className="active">
                                        <Link
                                            to={`/allproducts/${root.id}`}
                                            onClick={handleLinkClick}
                                        >
                                            {root.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                        <div style={{ position: "absolute", zIndex: "20" }}>
                            {show && (
                                <DropdownCategory
                                    parentID={activeId}
                                    toggleSubCatalogShut={toggleSubCatalogShut}
                                />
                            )}
                        </div>
                        <div className="slider-section">
                            <div className="home-img">
                                <Slider {...homeImageSettings}>
                                    <img
                                        src="/images/Cover01.jpg"
                                        alt=""
                                        className="slider-img"
                                    />
                                    <img
                                        src="/images/Cover07.jpg"
                                        alt=""
                                        className="slider-img"
                                    />
                                    <img
                                        src="/images/Cover03.jpg"
                                        alt=""
                                        className="slider-img"
                                    />
                                    <img
                                        src="/images/Cover04.jpg"
                                        alt=""
                                        className="slider-img"
                                    />
                                </Slider>
                            </div>
                            <div className="sub-img">
                                <img
                                    src="/images/SUB01.jpg"
                                    className="subslider-img"
                                    alt=""
                                />
                                <img
                                    src="/images/SUB02.jpg"
                                    className="subslider-img"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-grid--sc2">
                    <div className="post-item--banner">
                        <Link
                            to={`/allproducts/${1}`}
                            onClick={handleLinkClick}
                        >
                            <img
                                src="/images/Banner01.jpg"
                                alt=""
                                className="content_img"
                                id="largest-img--bg"
                            />
                        </Link>
                        <div className="preview_title">
                            <h2>Shop cho chó</h2>
                            <div className="preview">
                                <Link
                                    to={`/allproducts/${1}`}
                                    onClick={handleLinkClick}
                                >
                                    Xem ngay <i className="ti-angle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="post-item--banner">
                        <Link
                            to={`/allproducts/${2}`}
                            onClick={handleLinkClick}
                        >
                            <img
                                src="/images/Banner02.jpg"
                                alt=""
                                className="content_img"
                                id="largest-img--bg"
                            />
                        </Link>
                        <div className="preview_title">
                            <h2>Shop cho mèo</h2>
                            <div className="preview">
                                <Link
                                    to={`/allproducts/${2}`}
                                    onClick={handleLinkClick}
                                >
                                    Xem ngay <i className="ti-angle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="title">
                    <h3>Khuyến mãi - On Sale</h3>
                    <p style={{ fontSize: "16px" }}>Sản phẩm cho mèo</p>
                </div>

                <div className="post-grid--sc">
                    <div className="post-item">
                        <img
                            src="/images/Banner04.jpg"
                            alt=""
                            className="content_img"
                            id="largest-img--sp"
                        />
                    </div>
                    <Slider {...settings}>
                        {productList?.data.products.products.map((product) => {
                            if (
                                product.category_id >= 1 &&
                                product.category_id <= 7 &&
                                product.discount !== 0
                            ) {
                                return (
                                    <Fragment>
                                        <div
                                            className="post-item"
                                            key={product.id}
                                        >
                                            <div id="discount-percent">
                                                <p id="discount-percent--content">
                                                    <i className="fa-solid fa-tags"></i>
                                                    <span> </span>
                                                    {product.discount}% GIẢM
                                                </p>
                                            </div>
                                            <div className="overlayout">
                                                <div className="overlayout-img">
                                                    <Link
                                                        onClick={
                                                            handleLinkClick
                                                        }
                                                        to={`/detail/${product.id}`}
                                                    >
                                                        {productList.data.products.images
                                                            .filter(
                                                                (item) =>
                                                                    item.product_id ===
                                                                    product.id
                                                            )
                                                            .slice(0, 1) // get last of product image
                                                            .map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        src={
                                                                            item.secure_url
                                                                        }
                                                                        alt=""
                                                                    />
                                                                )
                                                            )}
                                                    </Link>
                                                </div>
                                                <div className="over-btn">
                                                    <div className="detail-btn">
                                                        <button
                                                            type="submit"
                                                            id="cart"
                                                            onClick={() => {
                                                                handleClick(
                                                                    product.id
                                                                );
                                                            }}
                                                        >
                                                            <FaShoppingCart />
                                                        </button>
                                                        <Link
                                                            onClick={
                                                                handleLinkClick
                                                            }
                                                            id={product.id}
                                                            className="indetail"
                                                            to={`/detail/${product.id}`}
                                                        >
                                                            detail
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-content">
                                                <Link
                                                    id={product.id}
                                                    to={`/detail/${product.id}`}
                                                    onClick={handleLinkClick}
                                                >
                                                    {product.name}
                                                </Link>
                                                <p className="price">
                                                    {convertPrice(
                                                        product.price -
                                                            product.price *
                                                                (product.discount /
                                                                    100)
                                                    )}
                                                    ₫
                                                    <span id="old-price">
                                                        {convertPrice(
                                                            product.price
                                                        )}
                                                        ₫
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            } else {
                                return null; // Không hiển thị sản phẩm nếu parent_id không nằm trong khoảng từ 1 đến 7
                            }
                        })}
                    </Slider>
                </div>
                <div className="title">
                    <h3>Khuyến mãi - On Sale</h3>
                    <p style={{ fontSize: "16px" }}>Sản phẩm cho chó</p>
                </div>

                <div className="post-grid--sc">
                    {productList?.data.products.products.length === 0 ? (
                        <p>Không có sản phẩm</p>
                    ) : (
                        <>
                            <div className="post-item">
                                <img
                                    src="/images/Banner03.jpg"
                                    alt=""
                                    className="content_img"
                                    id="largest-img--sp"
                                />
                            </div>
                            <Slider {...settings}>
                                {productList?.data.products.products.map(
                                    (product) => {
                                        // Kiểm tra nếu parent_id của sản phẩm nằm trong khoảng từ 1 đến 7 thì mới hiển thị sản phẩm
                                        if (
                                            product.category_id >= 8 &&
                                            product.category_id <= 12 &&
                                            product.discount !== 0
                                        ) {
                                            return (
                                                <Fragment>
                                                    <div
                                                        className="post-item"
                                                        key={product.id}
                                                    >
                                                        <div id="discount-percent">
                                                            <p id="discount-percent--content">
                                                                <i className="fa-solid fa-tags"></i>
                                                                <span> </span>
                                                                {
                                                                    product.discount
                                                                }
                                                                % GIẢM
                                                            </p>
                                                        </div>
                                                        <div className="overlayout">
                                                            <div className="overlayout-img">
                                                                <Link
                                                                    onClick={
                                                                        handleLinkClick
                                                                    }
                                                                    to={`/detail/${product.id}`}
                                                                >
                                                                    {productList.data.products.images
                                                                        .filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.product_id ===
                                                                                product.id
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            1
                                                                        ) // get last of product image
                                                                        .map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <img
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                    src={
                                                                                        item.secure_url
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            )
                                                                        )}
                                                                </Link>
                                                            </div>
                                                            <div className="over-btn">
                                                                <div className="detail-btn">
                                                                    <button
                                                                        type="submit"
                                                                        id="cart"
                                                                    >
                                                                        <FaShoppingCart />
                                                                    </button>
                                                                    <Link
                                                                        onClick={
                                                                            handleLinkClick
                                                                        }
                                                                        id={
                                                                            product.id
                                                                        }
                                                                        className="indetail"
                                                                        to={`/detail/${product.id}`}
                                                                    >
                                                                        detail
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="post-content">
                                                            <Link
                                                                id={product.id}
                                                                to={`/detail/${product.id}`}
                                                                onClick={
                                                                    handleLinkClick
                                                                }
                                                            >
                                                                {product.name}
                                                            </Link>
                                                            <p className="price">
                                                                {convertPrice(
                                                                    product.price -
                                                                        product.price *
                                                                            (product.discount /
                                                                                100)
                                                                )}
                                                                ₫
                                                                <span id="old-price">
                                                                    {convertPrice(
                                                                        product.price
                                                                    )}
                                                                    ₫
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            );
                                        } else {
                                            return null; // Không hiển thị sản phẩm nếu parent_id không nằm trong khoảng từ 1 đến 7
                                        }
                                    }
                                )}
                            </Slider>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Main;
