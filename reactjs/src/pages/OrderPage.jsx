import React, { useState } from "react";
import "../Styles/Order.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetAllCarts, handleGetOrder } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import Cookies from "js-cookie";
import CategoryBar from "../components/CategoryBar";
export default function OrderPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const cartList = useSelector((state) => state.order.allCarts);
    const [totalPrice, setTotalPrice] = useState(0); // Khởi tạo state để lưu tổng giá trị đơn hàng
    const userId = currentUser?.data.userData.user.id;
    const guestId = Cookies.get("guestuserId");
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const navigate = useNavigate();
    console.log(currentUser);
    const convertPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                );
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const handleCityChange = (event) => {
        const selectedCityId =
            event.target.options[event.target.selectedIndex].dataset.id;
        const selectedCity = cities.find((city) => city.Id === selectedCityId);
        setDistricts(selectedCity ? selectedCity.Districts : []);
        setWards([]);
    };

    const handleDistrictChange = (event) => {
        const selectedDistrictId =
            event.target.options[event.target.selectedIndex].dataset.id;
        const selectedCityId = cities.find(
            (city) =>
                city.Id ===
                document.getElementById("city").options[
                    document.getElementById("city").selectedIndex
                ].dataset.id
        ).Id;
        const selectedCity = cities.find((city) => city.Id === selectedCityId);
        const selectedDistrict = selectedCity.Districts.find(
            (district) => district.Id === selectedDistrictId
        );
        setWards(selectedDistrict ? selectedDistrict.Wards : []);
    };
    useEffect(() => {
        async function fetchCartItems() {
            await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
        }
        fetchCartItems();
    }, [dispatch]);
    useEffect(() => {
        if (cartList.data) {
            let totalPrice = 0;
            cartList.data.cart.forEach((item) => {
                const discountedPrice =
                    item.product.product.price -
                    item.product.product.price *
                        (item.product.product.discount / 100);
                totalPrice += discountedPrice * item.quantity;
            });
            setTotalPrice(totalPrice);
        }
    }, [cartList]);

    const handleSubmitOrder = async () => {
        if (!cartList.data || cartList.data.cart.length === 0) {
            // Kiểm tra xem giỏ hàng có sản phẩm không
            console.log("Giỏ hàng của bạn đang trống");
            return; // Không có sản phẩm trong giỏ hàng, không thực hiện tiếp theo
        }
        const cartItems = cartList.data.cart.map((item) => ({
            productId: item.product.product.id, // Lấy id của sản phẩm
            quantity: item.quantity, // Lấy số lượng của sản phẩm
            price:
                (item.product.product.price -
                    item.product.product.price *
                        (item.product.product.discount / 100)) *
                item.quantity,
        }));
        const totalqt = cartList?.data.totalQuantity;
        try {
            if (userId) {
                console.log(userId);
                const response = await axios.post(
                    "http://localhost:8888/api/submitOrder",
                    {
                        cart: cartItems,
                        totalPrice: totalPrice,
                        totalQuantity: totalqt,
                        userId: userId,
                    },
                    { withCredentials: true }
                );
                console.log("Đơn hàng đã được đặt thành công:", response.data);
                await axios.get("http://localhost:8888/clear", {
                    withCredentials: true,
                });
                navigate("/");
            } else {
                const response = await axios.post(
                    "http://localhost:8888/api/submitOrder",
                    {
                        cart: cartItems,
                        totalPrice: totalPrice,
                        totalQuantity: totalqt,
                        guestuserId: guestId,
                    },
                    { withCredentials: true }
                );
                console.log("Đơn hàng đã được đặt thành công:", response.data);
                // await axios.get("http://localhost:8888/clear", {
                //     withCredentials: true,
                // });
                // navigate("/");
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi đặt hàng:", error);
        }
    };
    return (
        <div className="checkout-container">
            <div className="user-details">
                <div className="logoandtitle">
                    <Link to={"/"}>
                        <img
                            style={{ width: "100px", height: "70px" }}
                            src="/flavicon.ico"
                            alt=""
                        />
                    </Link>
                    <div className="">Giỏ hàng {">"} thanh toán</div>
                </div>
                <div className="user--infor">
                    <h4>Thông tin giao hàng</h4>
                    {currentUser && (
                        <>
                            <div className="userInfo">
                                <div className="userTag">
                                    <p>
                                        {
                                            currentUser?.data.userData.user
                                                .lastName
                                        }
                                        {
                                            currentUser?.data.userData.user
                                                .firstName
                                        }{" "}
                                        ({currentUser?.data.userData.user.email}
                                        )
                                    </p>
                                </div>
                                <div className="formOrder">
                                    <div class="form__group field">
                                        <input
                                            type="input"
                                            class="form__field"
                                            placeholder="Name"
                                            name="name"
                                            id="name"
                                            value={`${currentUser?.data.userData.user.lastName} ${currentUser?.data.userData.user.firstName}`}
                                            required
                                        />
                                        <label for="name" class="form__label">
                                            Họ và tên
                                        </label>
                                    </div>
                                    <div class="form__group field">
                                        <input
                                            type="input"
                                            class="form__field"
                                            placeholder="Name"
                                            name="name"
                                            id="name"
                                            value={`(+84) ${currentUser?.data.userData.user.phonenumber}`}
                                            required
                                        />
                                        <label for="name" class="form__label">
                                            Số điện thoại
                                        </label>
                                    </div>
                                    <div class="form__group field">
                                        <input
                                            type="input"
                                            class="form__field"
                                            placeholder="Name"
                                            name="name"
                                            id="name"
                                            value={
                                                currentUser?.data.userData.user
                                                    .address
                                            }
                                            required
                                        />
                                        <label for="name" class="form__label">
                                            Địa chỉ
                                        </label>
                                    </div>

                                    <div className="location--picker">
                                        <select
                                            className="minimal"
                                            id="city"
                                            onChange={handleCityChange}
                                        >
                                            <option value="">Tỉnh/Thành</option>
                                            {cities.map((city) => (
                                                <option
                                                    key={city.Id}
                                                    value={city.Name}
                                                    data-id={city.Id}
                                                >
                                                    {city.Name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="minimal"
                                            id="district"
                                            onChange={handleDistrictChange}
                                        >
                                            <option value="">Quận/Huyện</option>
                                            {districts.map((district) => (
                                                <option
                                                    key={district.Id}
                                                    value={district.Name}
                                                    data-id={district.Id}
                                                >
                                                    {district.Name}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="minimal" id="ward">
                                            <option value="">Phường/Xã</option>
                                            {wards.map((ward) => (
                                                <option
                                                    key={ward.Id}
                                                    value={ward.Name}
                                                    data-id={ward.Id}
                                                >
                                                    {ward.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="checkbox--list">
                                    <label htmlFor="">
                                        <input type="checkbox" name="" id="" />
                                        <div>s</div>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="delivery"></div>
                <div className="purchase--method"></div>
            </div>
            <div className="order-details">
                <h4>Thông tin đơn hàng</h4>
                {cartList?.data.cart.map((item) => {
                    return (
                        <>
                            <div className="order-summary">
                                {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                                <ul>
                                    <div className="productList">
                                        <span style={{ paddingRight: "20px" }}>
                                            <img
                                                style={{ maxWidth: "70px" }}
                                                src={`${item?.product.images[0].secure_url}`}
                                                alt=""
                                            />
                                        </span>
                                        <li
                                            style={{ listStyle: "none" }}
                                            key={item?.product.product.id}
                                        >
                                            <span>
                                                {item?.product.product.name}
                                            </span>
                                            <span>
                                                Số lượng: {item.quantity}{" "}
                                            </span>
                                            <span>
                                                Giá tiền:{" "}
                                                {convertPrice(
                                                    (item.product.product
                                                        .price -
                                                        item.product.product
                                                            .price *
                                                            (item.product
                                                                .product
                                                                .discount /
                                                                100)) *
                                                        item.quantity
                                                )}
                                            </span>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </>
                    );
                })}
                <button onClick={() => handleSubmitOrder()}>
                    Hoàn thành đơn hàng
                </button>
                <div className="order-total">
                    <h4>Tổng cộng: {convertPrice(totalPrice)}</h4>
                </div>
            </div>
        </div>
    );
}
