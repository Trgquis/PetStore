import React, { Component, useEffect, useState } from "react";
import "../Styles/Main.scss";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handlegetAllProducts, handlegetProduct } from "../redux/apiRequest";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                background: "#d3d6db",
                paddingTop: "4px",
                top: "93%",
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
                top: "93%",
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
    console.log(productList);
    const [id, setId] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = {
        // dots: true,
        initialSlide: 0,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 2,
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
    useEffect(() => {
        handlegetAllProducts(dispatch);
    }, []);
    return (
        <div id="content">
            <div className="home-img">
                <img src="/images/Cover01.jpg" alt="" />
            </div>
            <div className="post-grid--sc2">
                <div className="post-item--banner">
                    <Link to={`/allproducts/${1}`} onClick={handleLinkClick}>
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
                    <Link to={`/allproducts/${2}`} onClick={handleLinkClick}>
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
                <p>Thức ăn cho mèo</p>
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
                        // Kiểm tra nếu parent_id của sản phẩm nằm trong khoảng từ 1 đến 7 thì mới hiển thị sản phẩm
                        if (
                            product.category_id >= 1 &&
                            product.category_id <= 7
                        ) {
                            return (
                                <Fragment>
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
                                                                src={`http://localhost:8888/${item.path}`}
                                                                alt=""
                                                            />
                                                        ))}
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
                <p>Shop cho chó</p>
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
                                        product.category_id <= 12
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
                                                            {product.discount}%
                                                            GIẢM
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
                                                                                src={`http://localhost:8888/${item.path}`}
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
            {/* <div className="title">
                <h1>Top Sales</h1>
                <p>Thú cưng</p>
            </div>
            <div className="post-grid">
                <div className="post-item" >
                    <img 
                        src = ""
                        alt=""
                        className="content_img" 
                        id="largest-img--sp"/>
                </div>
                {productList?.products.map((product) => {
                    if(product.catalog_id === 2){
                     return (
                        <Fragment>
                            
                            <div className="post-item" key={product.id}>
                                <div className="overlayout">
                                    <div className="overlayout-img">
                                        <img  src={product.image_link} alt="" />
                                    </div>
                                    
                                    <div className="over-btn">
                                        <div className="detail-btn"> 
                                            <button type="" className="indetail"  onClick="direct()">
                                                <i className="ti-info"></i>
                                                view more
                                            </button>                
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                        {product.name}<br/>(thuần chủng)

                                    <p className="price">{product.price}₫</p>
                                </div>
                            </div>
                        </Fragment>
                        )} 
                    })}

            </div>
            <div className="title">
                <h1>Top Sales</h1>
                <p>Vật phẩm</p>
            </div>
            <div className="post-grid">
                <div className="post-item" >
                    <img 
                        src = "/images/Banner02.jpg"
                        alt=""
                        className="content_img" 
                        id="largest-img--sp"/>
                </div>
                {productList?.products.map((product) => {
                    if(product.catalog_id === 3){
                     return (
                        <Fragment>
                            
                            <div className="post-item" key={product.id}>
                                <div className="overlayout">
                                    <div className="overlayout-img">
                                        <img  src={product.image_link} alt="" />
                                    </div>
                                    
                                    <div  className="over-btn"> 
                                        <div  className="detail-btn"> 
                                            <button type="submit" id="cart">
                                                <i className="fas fa-shopping-cart   "></i>
                                            </button>
                                            <button type="" className="indetail" onClick={inDetail}><i  className="ti-info"></i>detail</button>
                                        </div>
                                    </div>
                                </div>
                                <div  className="post-content">
                                        {product.name}
                                    <p className="price">
                                            {product.price-product.price*(product.discount/100)}₫
                                        <span id="old-price">
                                            {product.price}₫
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Fragment>
                        )} 
                    })}

            </div> */}
        </div>
    );
};

export default Main;
