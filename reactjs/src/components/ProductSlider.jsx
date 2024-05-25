import React, { Component, useEffect, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaShoppingCart } from "react-icons/fa";
import {
    handleGetAllCarts,
    handlegetAllPopular,
    handlegetAllProducts,
} from "../redux/apiRequest";
import axios from "axios";
import Loader from "./Loader";
import "../Styles/Main.scss";
import DisplayStar from "./DisplayStar";

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

function ProductSlider({ type }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector((state) => state?.sales.allProducts);
    const popularList = useSelector((state) => state?.sales.allPopular);
    const [isLoading, setIsLoading] = useState(false);
    const User = useSelector((state) => state?.auth.currentUser);
    const [show, setShow] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);
    const [reviews, setReviews] = useState();
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);

    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };
    const increaseQuantity = (pID) => {
        setQuantities((prevState) => ({
            ...prevState,
            [pID]: (prevState[pID] || 0) + 1,
        }));
    };
    const handleClick = (productID) => {
        setIsLoading(true);
        increaseQuantity(productID);
        handleAddToCart(productID);
    };

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };

    const handleAddToCart = async (pID) => {
        const qt = quantities[pID] || 0;
        try {
            const userId = User?.data.userData.user.id;
            // console.log(pID, qt + 1, userId);
            const response = await axios.post(
                "http://localhost:8888/api/addcart",
                {
                    userId: userId,
                    product_id: pID,
                    quantity: qt - qt + 1,
                },
                { withCredentials: true }
            );
            // console.log(response.data);

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
    useEffect(() => {
        handlegetAllProducts(dispatch);
        handleGetAllCarts(dispatch);
        handlegetAllPopular(dispatch);
        const tmp1 = Math.floor(Math.random() * 95) + 10;
        const tmp2 = Math.floor(Math.random() * 95) + 10;
        setN1(tmp1);
        setN2(tmp2);
    }, [dispatch]);
    const settings = {
        // dots: true,
        initialSlide: 0,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        rows: 1,
        speed: 500,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        // autoplay: true,
        // autoplaySpeed: 2000,
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

    return (
        <>
            {type === 1 && (
                <Slider {...settings}>
                    {productList?.data.products.products
                        .slice(0, 40)
                        .map((product) => {
                            return (
                                <div className="post-item" key={product.id}>
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
                                                onClick={handleLinkClick}
                                                to={`/detail/${product.id}`}
                                            >
                                                {productList.data.products.images
                                                    .filter(
                                                        (item) =>
                                                            item.product_id ===
                                                            product.id
                                                    )
                                                    .slice(0, 1) // get last of product image
                                                    .map((item, index) => (
                                                        <img
                                                            key={item.id}
                                                            src={
                                                                item.secure_url
                                                            }
                                                            alt=""
                                                        />
                                                    ))}
                                            </Link>
                                        </div>
                                        <div
                                            className="over-btn"
                                            style={{ position: "absolute" }}
                                        >
                                            <div className="detail-btn">
                                                <button
                                                    type="submit"
                                                    id="cart"
                                                    onClick={() => {
                                                        handleClick(product.id);
                                                    }}
                                                >
                                                    {isLoading ? (
                                                        <Loader />
                                                    ) : (
                                                        <FaShoppingCart />
                                                    )}
                                                </button>
                                                <Link
                                                    onClick={handleLinkClick}
                                                    id={product.id}
                                                    className="indetail"
                                                    to={`/detail/${product.id}`}
                                                >
                                                    detail
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="post-content"
                                        style={{ position: "relative" }}
                                    >
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
                                                        (product.discount / 100)
                                            )}
                                            ₫
                                            <span id="old-price">
                                                {convertPrice(product.price)}₫
                                            </span>
                                        </p>
                                        <div className="underframe">
                                            Đã bán: {product.sold_amount}
                                            <DisplayStar
                                                rating={product.avgRating}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            )}
            {type === 2 && (
                <Slider {...settings}>
                    {popularList?.data.products.products.map((product) => {
                        return (
                            <div className="post-item" key={product.id}>
                                {product.discount ? (
                                    <div id="discount-percent">
                                        <p id="discount-percent--content">
                                            <i className="fa-solid fa-tags"></i>
                                            <span>
                                                {product.discount}% GIẢM
                                            </span>
                                        </p>
                                    </div>
                                ) : null}
                                <div className="overlayout">
                                    <div className="overlayout-img">
                                        <Link
                                            onClick={handleLinkClick}
                                            to={`/detail/${product.id}`}
                                        >
                                            {productList.data.products.images
                                                .filter(
                                                    (item) =>
                                                        item.product_id ===
                                                        product.id
                                                )
                                                .slice(0, 1) // get last of product image
                                                .map((item, index) => (
                                                    <img
                                                        key={item.id}
                                                        src={item.secure_url}
                                                        alt=""
                                                    />
                                                ))}
                                        </Link>
                                    </div>
                                    <div
                                        className="over-btn"
                                        style={{ position: "absolute" }}
                                    >
                                        <div className="detail-btn">
                                            <button
                                                type="submit"
                                                id="cart"
                                                onClick={() => {
                                                    handleClick(product.id);
                                                }}
                                            >
                                                {isLoading ? (
                                                    <Loader />
                                                ) : (
                                                    <FaShoppingCart />
                                                )}
                                            </button>
                                            <Link
                                                onClick={handleLinkClick}
                                                id={product.id}
                                                className="indetail"
                                                to={`/detail/${product.id}`}
                                            >
                                                detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="post-content"
                                    style={{ position: "relative" }}
                                >
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
                                                    (product.discount / 100)
                                        )}
                                        ₫
                                        {product.discount ? (
                                            <span id="old-price">
                                                {convertPrice(product.price)}₫
                                            </span>
                                        ) : null}
                                    </p>
                                    <div className="underframe">
                                        Đã bán: {product.sold_amount}
                                        <DisplayStar
                                            rating={product.avgRating}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            )}
            {type === 3 && (
                <Slider {...settings}>
                    {productList?.data.products.products
                        .slice(n1, n2)
                        .map((product) => {
                            return (
                                <div className="post-item" key={product.id}>
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
                                                onClick={handleLinkClick}
                                                to={`/detail/${product.id}`}
                                            >
                                                {productList.data.products.images
                                                    .filter(
                                                        (item) =>
                                                            item.product_id ===
                                                            product.id
                                                    )
                                                    .slice(0, 1) // get last of product image
                                                    .map((item, index) => (
                                                        <img
                                                            key={item.id}
                                                            src={
                                                                item.secure_url
                                                            }
                                                            alt=""
                                                        />
                                                    ))}
                                            </Link>
                                        </div>
                                        <div
                                            className="over-btn"
                                            style={{ position: "absolute" }}
                                        >
                                            <div className="detail-btn">
                                                <button
                                                    type="submit"
                                                    id="cart"
                                                    onClick={() => {
                                                        handleClick(product.id);
                                                    }}
                                                >
                                                    {isLoading ? (
                                                        <Loader />
                                                    ) : (
                                                        <FaShoppingCart />
                                                    )}
                                                </button>
                                                <Link
                                                    onClick={handleLinkClick}
                                                    id={product.id}
                                                    className="indetail"
                                                    to={`/detail/${product.id}`}
                                                >
                                                    detail
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="post-content"
                                        style={{ position: "relative" }}
                                    >
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
                                                        (product.discount / 100)
                                            )}
                                            ₫
                                            <span id="old-price">
                                                {convertPrice(product.price)}₫
                                            </span>
                                        </p>
                                        <div className="underframe">
                                            Đã bán: {product.sold_amount}
                                            <DisplayStar
                                                rating={product.avgRating}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            )}
        </>
    );
}

export default ProductSlider;
