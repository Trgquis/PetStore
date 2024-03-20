import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/ProductDetail.scss";
import CategoryBar from "../components/CategoryBar";
import { handlegetProduct } from "../redux/apiRequest";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const [product, setProduct] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);

    const User = useSelector((state) => state.auth.currentUser);
    const product = useSelector((state) => state?.sales.ProductDetail);
    console.log(product);
    const [count, setCount] = useState(0);
    console.log(id);
    const handleImageHover = (path) => {
        setCurrentImage(path);
    };
    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };
    let handleSubmit = async (product, id) => {
        const data = {
            product_id: product.product.id,
            user_id: id,
            status: "buyNow",
            quantity: count,
            total_price: parseFloat(count * product.product.price),
        };
        console.log(data);
        alert("Đã đặt thành công bạn sẽ được chuyển đến trang xác nhận");
        const response = await axios.post(
            "http://localhost:8888/api/submitOrder/",
            data
        );
        console.log(response);
    };
    const handleIncrement = () => {
        if (count < 99) {
            setCount(count + 1);
        }
    };
    const handleDecrement = () => {
        if (count >= 1) {
            setCount(count - 1);
        }
    };
    console.log(product?.data.product.images);
    useEffect(() => {
        handlegetProduct(dispatch, id);
    }, [dispatch, id]);
    // console.log(product.product);
    return (
        <>
            {product?.data.product.product !== undefined && (
                <CategoryBar
                    catalogId={product?.data.product.product.category_id}
                />
            )}
            <div className="product-detail">
                <div className="product-infoImage">
                    {product?.data.product.images !== undefined && (
                        <div className="product-image">
                            <img
                                src={
                                    currentImage
                                        ? `http://localhost:8888/${currentImage}`
                                        : `http://localhost:8888/${product?.data.product.images[0].path}`
                                }
                                alt={product.name}
                            />
                        </div>
                    )}
                    <div className="slider">
                        {product?.data.product.images !== undefined &&
                            product?.data.product.images.map((image, index) => {
                                return (
                                    <div className="slider-images">
                                        <img
                                            src={`http://localhost:8888/${image.path}`}
                                            alt=""
                                            key={index}
                                            className={
                                                index === currentSlide
                                                    ? "slider-image active"
                                                    : "slider-image"
                                            }
                                            onMouseOver={() =>
                                                handleImageHover(
                                                    `${image.path}`
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {product?.data.product.product !== undefined && (
                    <div className="product-info">
                        <h4 className="product-name">
                            {product?.data.product.product.name}
                        </h4>
                        <p className="product-description">
                            {product?.data.product.product.content}
                        </p>
                        <div className="productOrder">
                            <div className="nameOrder">
                                {product?.data.product.product.name}
                            </div>
                            <div className="quantityOrder">
                                <p>Số lượng sản phẩm còn lại:</p>
                                {product?.data.product.product.amount}
                            </div>
                            <div className="indetailOrder">
                                <div className="discountOrder">
                                    -{product?.data.product.product.discount}%
                                </div>
                                <div className="priceOrder">
                                    <div
                                        className="product-oldprice"
                                        style={{
                                            textDecorationLine: "line-through",
                                        }}
                                    >
                                        {convertPrice(
                                            product?.data.product.product.price
                                        )}
                                        ₫
                                    </div>
                                    <div className="product-price">
                                        {convertPrice(
                                            product?.data.product.product
                                                .price -
                                                product?.data.product.product
                                                    .price *
                                                    (product?.data.product
                                                        .product.discount /
                                                        100)
                                        )}
                                        ₫
                                    </div>
                                </div>
                            </div>
                            <div className="Order">
                                <button
                                    onClick={handleDecrement}
                                    className="amountOrder"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    className="amountInput"
                                    value={count}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (
                                            !isNaN(value) &&
                                            value > 0 &&
                                            value < 100
                                        ) {
                                            setCount(value);
                                        }
                                    }}
                                />
                                <button
                                    className="amountOrder"
                                    onClick={handleIncrement}
                                >
                                    +
                                </button>
                                {User && (
                                    <Link
                                        style={{
                                            textAlign: "center",
                                            textDecoration: "none",
                                            lineHeight: "40px",
                                        }}
                                        onClick={(e) =>
                                            handleSubmit(
                                                product,
                                                User.data.user.id
                                            )
                                        }
                                        to={`/order/${User.data.user.id}/${0}`}
                                        className="OrderSubmit"
                                    >
                                        Mua ngay
                                    </Link>
                                )}
                                <button className="OrderCart">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="contact-section">
                    <div className="contact-info">
                        <div className="phone">
                            <p>
                                <i class="fa-solid fa-phone"></i>
                                {` `}
                                Bán lẻ: 0364.998.896
                            </p>
                            <p>
                                <i class="fa-solid fa-phone"></i>
                                {` `}
                                Bán sĩ: 0369.258.656
                            </p>
                        </div>
                        <div className="address">
                            <p>
                                <i class="fa-solid fa-location-dot"></i>
                                {` `}
                                Địa chỉ của Petshop:
                                <br />
                                328/6 CMT8, Bình Thủy, Cần Thơ
                            </p>
                            <p>
                                – Giờ mở cửa của Petshop: <br />
                                từ 8h đến 19h hằng ngày
                            </p>
                        </div>
                    </div>
                    <div className="addition">
                        <h4>tại sao nên chọn chúng tôi</h4>
                        <p>
                            <i class="fa-solid fa-clock"></i>
                            {` `}
                            Hạn Sử Dụng Dài Nhất. Bao Bì Mới Nhất
                        </p>
                        <p>
                            <i class="fa-solid fa-percent"></i>
                            {` `}
                            Mua Càng Nhiều. Giảm Càng Nhiều
                        </p>
                        <p>
                            <i class="fa-solid fa-thumbs-up"></i>
                            {` `}
                            Bán Sỉ Giá Tốt. Bán Lẻ Sale Thường Xuyên
                        </p>
                        <p>
                            <i class="fa-solid fa-truck-fast"></i>
                            {` `}
                            Ship Tận Nơi. Nhận Hàng - Trả Tiền Ngay Tại Nhà
                        </p>
                        <p>
                            <i class="fa-solid fa-circle-dollar-to-slot"></i>
                            {` `}
                            Hoàn Tiền Gấp 10 Lần Nếu Bán Hàng Giả
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
