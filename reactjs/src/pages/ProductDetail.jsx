import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/ProductDetail.scss";
import CategoryBar from "../components/CategoryBar";
import CustomAlert from "../components/CustomAlert";
import {
    handleGetAllCarts,
    handlegetAllUsers,
    handlegetProduct,
} from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { FaBox, FaPhoneAlt, FaTruck, FaTruckMoving } from "react-icons/fa";
import Cookies from "js-cookie";
import StarRating from "../components/StarRating";
import DisplayStar from "../components/DisplayStar";
function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const [product, setProduct] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [expandedContent, setExpandedContent] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0); // 0: Success, 1: Error
    const [alertOpen, setAlertOpen] = useState(false);
    const User = useSelector((state) => state.auth.currentUser);
    const product = useSelector((state) => state?.sales.ProductDetail);
    const userList = useSelector((state) => state?.users.allUsers);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    console.log(product);
    console.log(id);
    const userId = User?.data.userData.user.id;
    const [expandedButtonText, setExpandedButtonText] = useState("Xem thêm");

    const toggleExpandContent = () => {
        setExpandedContent(!expandedContent);
        const opacityDownElement = document.getElementById("opacitydown");
        // Toggle the class that controls the opacity
        opacityDownElement.classList.toggle("fade-out");
        if (expandedContent) {
            setExpandedButtonText("Xem thêm");
        } else {
            setExpandedButtonText("Thu gọn");
        }
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3, // Số lượng slide hiển thị cùng một lúc
        slidesToScroll: 1, // Số lượng slide trượt mỗi lần
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

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

    const handleBuyNow = async (pID) => {
        try {
            console.log(pID, count);
            const response = await axios.post(
                "http://localhost:8888/api/addcart",
                {
                    product_id: pID,
                    quantity: count,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            if (userId) {
                await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
            } else {
                await handleGetAllCarts(null, dispatch); // gọi hàm getAllCart với user_id
            }
            navigate("/order");
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handleAddToCart = async (pID) => {
        try {
            console.log(pID, count);
            const response = await axios.post(
                "http://localhost:8888/api/addcart",
                {
                    product_id: pID,
                    quantity: count,
                },
                { withCredentials: true }
            );
            console.log(response.data);
            setAlertMessage("Thêm vào giỏ hàng thành công!"); // Set success message
            setAlertType(0); // Set success type
            setAlertOpen(true); // Open the alert modal
            if (userId) {
                await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
            } else {
                await handleGetAllCarts(null, dispatch); // gọi hàm getAllCart với user_id
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            setAlertMessage("Thêm vào giỏ hàng thất bại!"); // Set error message
            setAlertType(1); // Set error type
            setAlertOpen(true); // Open the alert modal
        }
    };
    const closeAlert = () => {
        setAlertOpen(false);
    };
    const handleClick = (productID) => {
        handleAddToCart(productID);
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
    const saveProductIdToCookies = (productId) => {
        let viewedProducts = Cookies.get("viewedproducts") || []; // Lấy mảng hoặc gán mảng mới nếu không có
        if (!Array.isArray(viewedProducts)) {
            // Kiểm tra nếu viewedProducts không phải là mảng
            viewedProducts = []; // Gán mảng mới nếu viewedProducts không phải là mảng
        }
        if (!viewedProducts.includes(productId)) {
            viewedProducts.push(productId);
            Cookies.set("viewedproducts", viewedProducts, { expires: 7 });
        }
    };
    const getViewedProductsFromCookies = () => {
        return Cookies.get("viewedproducts") || [];
    };
    const convertDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    };
    const handleSendReview = async () => {
        try {
            const data = {
                userId: User?.data.userData.user.id,
                productId: id,
                rating: rating,
                comment: comment,
            };
            const res = await axios.post(
                "http://localhost:8888/api/handleSendReview",
                data
            );
            console.log(res);
            setAlertMessage("Đánh giá sản phẩm thành công!"); // Set success message
            setAlertType(0); // Set success type
            setAlertOpen(true);
            setComment("");
            setRating(0);
            handlegetProduct(dispatch, id);
        } catch (e) {
            console.log(e);
            setAlertMessage("Đánh giá sản phẩm thất bại!"); // Set success message
            setAlertType(1); // Set success type
            setAlertOpen(true);
        }
    };
    useEffect(() => {
        handlegetProduct(dispatch, id);
        saveProductIdToCookies(id);
        handlegetAllUsers(dispatch);
    }, [dispatch, id]);
    // console.log(product.product);
    return (
        <>
            {product?.data.product.product !== undefined && (
                <CategoryBar
                    catalogId={product?.data.product.product.category_id}
                />
            )}
            <CustomAlert
                message={alertMessage}
                type={alertType}
                isOpen={alertOpen}
                onClose={closeAlert}
            />
            <div className="overlayout--productdetail">
                <div className="product-detail">
                    <div className="product-infoImage">
                        <div className="slider">
                            {product?.data.product.images !== undefined &&
                                product?.data.product.images.map(
                                    (image, index) => {
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
                                                    onClick={(e) =>
                                                        handleImageHover(
                                                            `${image.secure_url}`
                                                        )
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                )}
                        </div>
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
                    </div>
                    <div className="product-info">
                        {product?.data.product.product !== undefined && (
                            <>
                                <div className="productOrder">
                                    <div className="nameOrder">
                                        {product?.data.product.product.name}
                                    </div>
                                    <div>
                                        <div className="quantityOrder">
                                            <DisplayStar
                                                rating={
                                                    product?.data.product
                                                        .averageRating
                                                }
                                            />
                                            (
                                            {product?.data.product.reviewsCount}
                                            ){" | "}
                                            <p>
                                                {product?.data.product.product
                                                    .amount > 0
                                                    ? "Tình trạng: Còn hàng"
                                                    : "Tình trạng: Tạm hết hàng"}
                                                <span></span>
                                                {" | "} Thương hiệu: Đang cập
                                                nhật
                                            </p>
                                            {/* <p> </p> */}
                                        </div>
                                    </div>
                                    <div className="indetailOrder">
                                        {product.data.product.product
                                            .discount ? (
                                            <>
                                                <div className="discountOrder">
                                                    -
                                                    {
                                                        product?.data.product
                                                            .product.discount
                                                    }
                                                    %
                                                </div>
                                            </>
                                        ) : null}
                                        <div className="priceOrder">
                                            {product.data.product.product
                                                .discount ? (
                                                <div
                                                    className="product-oldprice"
                                                    style={{
                                                        textDecorationLine:
                                                            "line-through",
                                                    }}
                                                >
                                                    {convertPrice(
                                                        product?.data.product
                                                            .product.price
                                                    )}
                                                    ₫
                                                </div>
                                            ) : (
                                                "GIÁ GỐC"
                                            )}

                                            <div className="product-price">
                                                {convertPrice(
                                                    product?.data.product
                                                        .product.price -
                                                        product?.data.product
                                                            .product.price *
                                                            (product?.data
                                                                .product.product
                                                                .discount /
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
                                            disabled={count === 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            className="amountInput"
                                            value={count}
                                            onChange={(e) => {
                                                const value = parseInt(
                                                    e.target.value
                                                );
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

                                        <button
                                            style={{
                                                textAlign: "center",
                                                textDecoration: "none",
                                                lineHeight: "40px",
                                            }}
                                            onClick={() =>
                                                handleBuyNow(
                                                    product?.data.product
                                                        .product.id
                                                )
                                            }
                                            disabled={
                                                product?.data.product.product
                                                    .amount <= 0
                                            }
                                            to={`/order/guest`}
                                            className="OrderSubmit"
                                        >
                                            Mua ngay
                                        </button>
                                        <div className="cart">
                                            <button
                                                disabled={
                                                    product?.data.product
                                                        .product.amount <= 0
                                                }
                                                onClick={() =>
                                                    handleAddToCart(
                                                        product?.data.product
                                                            .product.id
                                                    )
                                                }
                                            >
                                                <span>Thêm vào giỏ</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="moredetail">
                                    <div>
                                        <h2 className="moredetail--title">
                                            Dịch vụ giao hàng
                                        </h2>
                                        <div className="moredetail--content">
                                            <div className="first">
                                                <FaBox />{" "}
                                                <span>
                                                    Miễn phí đổi trả hàng
                                                </span>
                                            </div>
                                            <div className="second">
                                                <FaTruck />{" "}
                                                <span>
                                                    Giao hàng trong ngày <br />{" "}
                                                    <strong>
                                                        Đối với Tp.Cần Thơ
                                                    </strong>
                                                </span>
                                            </div>
                                            <div className="third">
                                                <FaPhoneAlt />{" "}
                                                <span>
                                                    Đặt hàng trực tuyến <br />{" "}
                                                    <strong>
                                                        Hotline: 0364.998.896
                                                    </strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="moredetail--title">
                                            Phương thức thanh toán
                                        </h2>
                                        <div className="moredetail--content">
                                            <img
                                                src="/images/purchase.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="product-overview">
                    <div className="product-sub">
                        <div className="explain">
                            <h2>Mô tả sản phẩm</h2>
                            {product?.data.product.product.name}
                        </div>
                        {product?.data.product.product !== undefined && (
                            <div className="infomation">
                                <p className="product-name">
                                    Tên sản phẩm:{" "}
                                    <strong>
                                        {product?.data.product.product.name}
                                    </strong>
                                </p>

                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: expandedContent
                                            ? product?.data.product.product
                                                  .content
                                            : product?.data.product.product.content.slice(
                                                  0,
                                                  700
                                              ),
                                    }}
                                    className="product-description"
                                ></p>
                                <span id="opacitydown"></span>
                                <div className="morebutton-section">
                                    {!expandedContent &&
                                        product?.data.product.product.content
                                            .length > 700 && (
                                            <button
                                                onClick={toggleExpandContent}
                                                className="morebutton"
                                            >
                                                {expandedButtonText}
                                            </button>
                                        )}
                                    {expandedContent && (
                                        <button
                                            onClick={toggleExpandContent}
                                            className="lessbutton"
                                        >
                                            Thu gọn
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="user-review">
                        <div className="product-review">
                            <div className="explain2">
                                <h2>Đánh giá & nhận xét</h2>
                                {product?.data.product.product.name}
                            </div>
                            <div className="review-detail">
                                <div className="over--review">
                                    <div className="rating-score">
                                        <p>
                                            {
                                                product?.data.product
                                                    .averageRating
                                            }
                                            /5 ĐIỂM
                                            <DisplayStar
                                                rating={
                                                    product?.data.product
                                                        .averageRating
                                                }
                                            />
                                            {product?.data.product.reviewsCount}{" "}
                                            LƯỢT ĐÁNH GIÁ
                                        </p>
                                        <span id="border"></span>
                                        <div className="your-review">
                                            <div className="review--action">
                                                Đánh giá ngay
                                                <StarRating
                                                    rating={rating}
                                                    onRatingChange={
                                                        handleRatingChange
                                                    }
                                                />
                                                {rating ? (
                                                    <span>
                                                        {rating === 1
                                                            ? "Rất tệ"
                                                            : rating === 2
                                                            ? "Tệ"
                                                            : rating === 3
                                                            ? "Bình thường"
                                                            : rating === 4
                                                            ? "Hài lòng"
                                                            : rating === 5
                                                            ? "Rất hài lòng"
                                                            : ""}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rating-quantity">
                                        {rating ? (
                                            <div className="comment">
                                                <span>
                                                    Nội dung đánh giá
                                                    <button
                                                        onClick={
                                                            handleSendReview
                                                        }
                                                    >
                                                        Gửi
                                                    </button>
                                                </span>
                                                <textarea
                                                    required
                                                    name=""
                                                    id=""
                                                    style={{
                                                        width: "100%",
                                                        padding: "5px",
                                                    }}
                                                    rows={"5"}
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                            </div>
                                        ) : null}
                                        {product?.data.product.reviewsData.map(
                                            (item, index) => (
                                                <div
                                                    className="user-rating"
                                                    key={index}
                                                >
                                                    <p className="header-rating">
                                                        <span>
                                                            {
                                                                userList?.data.users.users.find(
                                                                    (user) =>
                                                                        user.id ===
                                                                        item.user_id
                                                                )?.lastName
                                                            }{" "}
                                                            {
                                                                userList?.data.users.users.find(
                                                                    (user) =>
                                                                        user.id ===
                                                                        item.user_id
                                                                )?.firstName
                                                            }
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            {convertDate(
                                                                item.createdAt
                                                            )}
                                                        </span>
                                                    </p>
                                                    <DisplayStar
                                                        rating={item?.score}
                                                    />
                                                    {item.comment}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="viewedProducts2" style={{ overflow: "hidden" }}>
                    <div>Gợi ý</div>
                    {/* <Slider {...settings}>
                        
                    </Slider> */}
                </div>

                <div className="recommendProducts"></div>
                <div className="popularProducts"></div>
            </div>
        </>
    );
}

export default ProductDetail;
