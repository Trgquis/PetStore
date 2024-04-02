import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/ProductDetail.scss";
import CategoryBar from "../components/CategoryBar";
import { handlegetProduct } from "../redux/apiRequest";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    FaCalendar,
    FaPercent,
    FaThumbsUp,
    FaTruckMoving,
    FaDollarSign,
    FaDiscoun,
} from "react-icons/fa";
function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const [product, setProduct] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [expandedContent, setExpandedContent] = useState(false);

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
                                        ? `${currentImage}`
                                        : `${product?.data.product.images[0].secure_url}`
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
                                            src={`${image.secure_url}`}
                                            alt=""
                                            key={index}
                                            className={
                                                index === currentSlide
                                                    ? "slider-image active"
                                                    : "slider-image"
                                            }
                                            onMouseOver={() =>
                                                handleImageHover(
                                                    `${image.secure_url}`
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

                        <p
                            dangerouslySetInnerHTML={{
                                __html: expandedContent
                                    ? product?.data.product.product.content
                                    : product?.data.product.product.content.slice(
                                          0,
                                          500
                                      ),
                            }}
                            className="product-description"
                        ></p>
                        {!expandedContent &&
                            product?.data.product.product.content.length >
                                500 && (
                                <button
                                    onClick={() => setExpandedContent(true)}
                                    style={{ border: "none" }}
                                >
                                    Xem thêm
                                </button>
                            )}
                        {/* Các phần khác của sản phẩm */}
                        <div className="productOrder">
                            <div className="nameOrder">
                                {product?.data.product.product.name}
                            </div>
                            <div className="quantityOrder">
                                <p>Số lượng sản phẩm còn lại:</p>
                                {product?.data.product.product.amount}
                            </div>
                            <div className="indetailOrder">
                                <p
                                    style={{
                                        paddingRight: "20px",
                                        color: "red",
                                    }}
                                >
                                    Ưu đãi giảm ngay
                                </p>
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
                                {User ? (
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
                                        // to={`/order/${User.data.user.id}/${0}`}
                                        to={`/order/guest`}
                                        className="OrderSubmit"
                                    >
                                        Mua ngay
                                    </Link>
                                ) : (
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
                                        to={`/order/guest`}
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
                            <FaCalendar />
                            {` `}
                            Hạn Sử Dụng Dài Nhất. Bao Bì Mới Nhất
                        </p>
                        <p>
                            <FaPercent />
                            {` `}
                            Mua Càng Nhiều. Giảm Càng Nhiều
                        </p>
                        <p>
                            <FaThumbsUp />
                            {` `}
                            Bán Sỉ Giá Tốt. Bán Lẻ Sale Thường Xuyên
                        </p>
                        <p>
                            <FaTruckMoving />
                            {` `}
                            Ship Tận Nơi. Nhận Hàng - Trả Tiền Ngay Tại Nhà
                        </p>
                        <p>
                            <FaDollarSign />
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
