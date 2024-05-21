import React, { Component, useEffect, useState } from "react";
import "../Styles/Main.scss";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    handleGetAllCarts,
    handlegetAllChilds,
    handlegetAllProducts,
    handlegetProduct,
} from "../redux/apiRequest";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownCategory from "./DropdownCategory";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import CustomAlert from "./CustomAlert";
import DisplayStar from "./DisplayStar";
import Loader from "./Loader";
import AllProducts from "./ProductComponent";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                background: "#d3d6db",
                paddingTop: "4px",
                top: "50%",
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
                top: "50%",
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const increaseQuantity = (pID) => {
        setQuantities((prevState) => ({
            ...prevState,
            [pID]: (prevState[pID] || 0) + 1,
        }));
    };

    const handleAddToCart = async (pID) => {
        const qt = quantities[pID] || 0;
        try {
            const userId = User?.data.userData.user.id;
            console.log(pID, qt + 1, userId);
            const response = await axios.post(
                "http://localhost:8888/api/addcart",
                {
                    userId: userId,
                    product_id: pID,
                    quantity: qt - qt + 1,
                },
                { withCredentials: true }
            );
            console.log(response.data);

            setTimeout(() => {
                setAlertMessage("Thêm vào giỏ hàng thành công!");
                setAlertType(0);
                setAlertOpen(true);
                if (userId) {
                    handleGetAllCarts(userId, dispatch);
                } else {
                    handleGetAllCarts(null, dispatch);
                }
                setIsLoading(false);
            }, 300);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            setAlertMessage("Thêm vào giỏ hàng thất bại!"); // Set error message
            setAlertType(1); // Set error type
            setAlertOpen(true); // Open the alert modal
        }
    };
    const handleClick = (productID) => {
        setIsLoading(true);
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
        slidesToShow: 5,
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
                    <div className="catalog">
                        <div className="catalog_title">
                            <span>danh mục</span>
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
                                            alignItems: "center",
                                        }}
                                        onClick={handleLinkClick}
                                    >
                                        {root.name}
                                    </div>
                                    <FaAngleRight />
                                </div>
                            ))}
                            <Link to={"/pages/chinh-sach-mua-hang"}>
                                Liên hệ
                            </Link>
                            <Link to={"/pages/chinh-sach-mua-hang"}>
                                Giới thiệu
                            </Link>
                            <Link to={"/maintenance"}>Tin tức</Link>
                            <div class="mobile-menu__help">
                                <p class="help-title">LIÊN HỆ VỚI HAPPYPET</p>{" "}
                                <div class="help-item">
                                    <a
                                        class="help-item--link"
                                        href="tel:0988004089"
                                        rel="nofollow"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            role="presentation"
                                        >
                                            <g
                                                stroke-width="2"
                                                fill="none"
                                                fill-rule="evenodd"
                                                stroke-linecap="square"
                                            >
                                                <path
                                                    d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z"
                                                    stroke="#252a2b"
                                                ></path>
                                                <path
                                                    d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5"
                                                    stroke="#6b4433"
                                                ></path>
                                            </g>
                                        </svg>
                                        0364.998.896
                                    </a>
                                </div>
                                <div class="help-item">
                                    <a
                                        class="help-item--link"
                                        href="mailto:info@mozzi.vn"
                                        rel="nofollow"
                                    >
                                        <svg
                                            viewBox="0 0 22 22"
                                            role="presentation"
                                        >
                                            <g fill="none" fill-rule="evenodd">
                                                <path
                                                    stroke="#252a2b"
                                                    d="M.916667 10.08333367l3.66666667-2.65833334v4.65849997zm20.1666667 0L17.416667 7.42500033v4.65849997z"
                                                ></path>
                                                <path
                                                    stroke="#252a2b"
                                                    stroke-width="2"
                                                    d="M4.58333367 7.42500033L.916667 10.08333367V21.0833337h20.1666667V10.08333367L17.416667 7.42500033"
                                                ></path>
                                                <path
                                                    stroke="#252a2b"
                                                    stroke-width="2"
                                                    d="M4.58333367 12.1000003V.916667H17.416667v11.1833333m-16.5-2.01666663L21.0833337 21.0833337m0-11.00000003L11.0000003 15.5833337"
                                                ></path>
                                                <path
                                                    d="M8.25000033 5.50000033h5.49999997M8.25000033 9.166667h5.49999997"
                                                    stroke="#6b4433"
                                                    stroke-width="2"
                                                    stroke-linecap="square"
                                                ></path>
                                            </g>
                                        </svg>
                                        info@happypet.vn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="banner-section">
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
                <section class="section-index-promotion">
                    <div class="container container-md-pd0">
                        <div class="promotion-bgwhite">
                            <div class="list-promotion">
                                <div class="promotion-item">
                                    <div class="promotion-item__inner">
                                        <Link
                                            to="pages/chinh-sach-giao-hang"
                                            title="SHIP COD TOÀN QUỐC"
                                        >
                                            <span class="title">
                                                SHIP COD TOÀN QUỐC
                                            </span>
                                            <span class="content">
                                                Thanh toán khi nhận hàng
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div class="promotion-item">
                                    <div class="promotion-item__inner">
                                        <Link
                                            to="/pages/chinh-sach-doi-tra"
                                            title="MIỄN PHÍ ĐỔI HÀNG *"
                                        >
                                            <span class="title">
                                                MIỄN PHÍ ĐỔI HÀNG *
                                            </span>
                                            <span class="content">
                                                Trong vòng 7 ngày
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div class="promotion-item">
                                    <div class="promotion-item__inner">
                                        <Link
                                            to="/pages/chinh-sach-giao-hang"
                                            title="GIAO HÀNG TRONG NGÀY"
                                        >
                                            <span class="title">
                                                GIAO HÀNG TRONG NGÀY
                                            </span>
                                            <span class="content">
                                                Đối với đơn nội thành Cần Thơ
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div class="promotion-item">
                                    <div class="promotion-item__inner">
                                        <Link
                                            to="allproducts/0/san-pham-khuyen-mai"
                                            title="ĐẶT HÀNG TRỰC TUYẾN"
                                        >
                                            <span class="title">
                                                ĐẶT HÀNG TRỰC TUYẾN
                                            </span>
                                            <span class="content">
                                                Hotline: 0364.998.996
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <AllProducts />
                <div className="title">
                    <h3>Khuyến mãi - On Sale</h3>
                    <p style={{ fontSize: "16px" }}>Sản phẩm cho mèo</p>
                </div>

                <div className="post-grid--sc">
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
                                                            {isLoading ? (
                                                                <Loader />
                                                            ) : (
                                                                <FaShoppingCart />
                                                            )}
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
                                                <div className="underframe">
                                                    Đã bán:{" "}
                                                    {product.sold_amount}
                                                    <DisplayStar
                                                        rating={
                                                            product.avgRating
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Slider>
                </div>
                <Link
                    to="/allproducts/1/Mua%20sắm%20cho%20mèo"
                    className="imagebackground"
                >
                    <img src="/images/image1.png" alt="" />
                </Link>

                <div className="title">
                    <h3>Khuyến mãi - On Sale</h3>
                    <p style={{ fontSize: "16px" }}>Sản phẩm cho chó</p>
                </div>

                <div className="post-grid--sc">
                    {productList?.data.products.products.length === 0 ? (
                        <p>Không có sản phẩm</p>
                    ) : (
                        <>
                            <Slider {...settings}>
                                {productList?.data.products.products.map(
                                    (product) => {
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
                                                                        )
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
                                                                        {isLoading ? (
                                                                            <Loader />
                                                                        ) : (
                                                                            <FaShoppingCart />
                                                                        )}
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
                                                            <div className="underframe">
                                                                Đã bán:{" "}
                                                                {
                                                                    product.sold_amount
                                                                }
                                                                <DisplayStar
                                                                    rating={
                                                                        product.avgRating
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            );
                                        } else {
                                            return null;
                                        }
                                    }
                                )}
                            </Slider>
                        </>
                    )}
                </div>
                <Link
                    to="/allproducts/2/Mua%20sắm%20cho%20chó"
                    className="imagebackground"
                >
                    <img src="/images/image2.png" alt="" />
                </Link>
            </div>
        </>
    );
};

export default Main;
