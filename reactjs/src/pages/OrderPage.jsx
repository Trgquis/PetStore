import React, { useState } from "react";
import "../Styles/Order.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetAllCarts, handleGetOrder } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
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
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectWard] = useState("");
    const [Address, setAddress] = useState("");
    const [Phonenumber, setPhoneNumber] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [deliveryPrice, setDeliveryPrice] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [totalPayment, setTotalPayment] = useState(0);

    const [tempName, setTempName] = useState("");
    const [tempAddress, setTempAddress] = useState("");
    const [tempPhone, setTempPhone] = useState("");
    const [selectedTempCity, setSelectedTempCity] = useState("");
    const [selectedTempDistrict, setSelectedTempDistrict] = useState("");
    const [selectedTempWard, setSelectTempWard] = useState("");
    const [deliveryTempMethod, setDeliveryTempMethod] = useState("");
    const [deliveryTempPrice, setDeliveryTempPrice] = useState("");
    const [paymentTempMethod, setPaymentTempMethod] = useState("");
    const [totalTempPayment, setTotalTempPayment] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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
        if (currentUser) {
            setSelectedCity(selectedCity.Name);
        } else {
            setSelectedTempCity(selectedCity.Name);
        }
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
        if (currentUser) {
            setSelectedDistrict(selectedDistrict.Name);
            setAddress(currentUser?.data.userData.user.address);
            setPhoneNumber(currentUser?.data.userData.user.phonenumber);
        } else {
            setSelectedTempDistrict(selectedCity.Name);
        }
    };
    useEffect(() => {
        async function fetchCartItems() {
            await handleGetAllCarts(userId, dispatch); // gọi hàm getAllCart với user_id
        }
        fetchCartItems();
        calculateTotalPrice();
    }, [dispatch]);

    const calculateTotalPrice = () => {
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
            if (currentUser) {
                setTotalPayment(totalPrice);
            } else {
                setTotalTempPayment(totalPrice);
            }
        }
    };

    const handleMethodChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        if (currentUser) {
            setDeliveryMethod(id);
            if (totalPrice < 700000) {
                setDeliveryPrice(value);
                setTotalPayment(totalPrice + parseInt(value));
            } else {
                setDeliveryPrice(0);
                setTotalPayment(totalPrice);
            }
        } else {
            setDeliveryTempMethod(id);
            if (totalPrice < 700000) {
                setDeliveryTempPrice(value);
                setTotalTempPayment(totalPrice + parseInt(value));
            } else {
                setDeliveryTempPrice(0);
                setTotalTempPayment(totalPrice);
            }
        }
    };
    const handleSubmitOrder = async () => {
        if (!cartList.data || cartList.data.cart.length === 0) {
            console.log("Giỏ hàng của bạn đang trống");
            return;
        }
        setIsLoading(true);
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
                        totalPrice: parseFloat(totalPayment),
                        totalQuantity: totalqt,
                        userId: userId,
                        city: selectedCity,
                        district: selectedDistrict,
                        ward: selectedWard,
                        address: Address,
                        phonenumber: Phonenumber,
                        paymentMethod: paymentMethod,
                        deliveryMethod: deliveryMethod,
                        deliveryPrice: deliveryPrice,
                    },
                    { withCredentials: true }
                );
                console.log("Đơn hàng đã được đặt thành công:", response.data);

                await axios.get("http://localhost:8888/clear", {
                    withCredentials: true,
                });
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/");
                }, 2000);
            } else {
                const response = await axios.post(
                    "http://localhost:8888/api/submitOrder",
                    {
                        cart: cartItems,
                        totalPrice: parseFloat(totalTempPayment),
                        totalQuantity: totalqt,
                        guestuserId: guestId,
                        city: selectedTempCity,
                        district: selectedTempDistrict,
                        ward: selectedTempWard,
                        address: tempAddress,
                        phonenumber: tempPhone,
                        paymentMethod: paymentTempMethod,
                        deliveryMethod: deliveryTempMethod,
                        deliveryPrice: deliveryTempPrice,
                    },
                    { withCredentials: true }
                );
                console.log("Đơn hàng đã được đặt thành công:", response.data);
                // await axios.get("http://localhost:8888/clear", {
                //     withCredentials: true,
                // });
                // navigate("/");
                // setIsLoading(false);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi đặt hàng:", error);
        } finally {
            if (isLoading) {
                console.log("sdasdasd");
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        }
    };
    return (
        <div className="checkout-container">
            <div className="logoandtitle">
                <Link to={"/"}>
                    <img
                        style={{ width: "100px", height: "70px" }}
                        src="/flavicon.ico"
                        alt=""
                    />
                </Link>
            </div>
            {isLoading ? (
                <div id="loader">
                    <Loader />
                    Đang xử lý...
                </div>
            ) : null}

            <div className="overlayout--checkout">
                <div className="user-details">
                    <Link
                        to={"/cart"}
                        style={{
                            textDecoration: "none",
                            color: "#a7a7a7",
                        }}
                    >
                        {">>"} Quay lại giỏ hàng
                    </Link>
                    <div className="user--infor">
                        <h4>Thông tin giao hàng</h4>
                        {currentUser ? (
                            <>
                                <div className="userInfo">
                                    <div className="userTag">
                                        <p>
                                            {
                                                currentUser?.data.userData.user
                                                    .lastName
                                            }{" "}
                                            {
                                                currentUser?.data.userData.user
                                                    .firstName
                                            }
                                            (
                                            {
                                                currentUser?.data.userData.user
                                                    .email
                                            }
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
                                            <label
                                                for="name"
                                                class="form__label"
                                            >
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
                                                value={`${currentUser?.data.userData.user.phonenumber}`}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <label
                                                for="name"
                                                class="form__label"
                                            >
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
                                                    currentUser?.data.userData
                                                        .user.address
                                                }
                                                required
                                            />
                                            <label
                                                for="name"
                                                class="form__label"
                                            >
                                                Địa chỉ
                                            </label>
                                        </div>

                                        <div className="location--picker">
                                            <select
                                                className="minimal"
                                                id="city"
                                                onChange={handleCityChange}
                                            >
                                                <option value="">
                                                    Tỉnh/Thành
                                                </option>
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
                                                <option value="">
                                                    Quận/Huyện
                                                </option>
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
                                            <select
                                                className="minimal"
                                                id="ward"
                                                onChange={(e) =>
                                                    setSelectWard(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Phường/Xã
                                                </option>
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
                                        <div className="checkbox--list">
                                            <h4 className="delivery--title">
                                                Chọn phương thức vận chuyển
                                            </h4>
                                            <span style={{ color: "red" }}>
                                                Lưu ý: Chọn phương thức vận
                                                chuyển giống với khu vực địa chỉ
                                                của bạn
                                            </span>
                                            <label for="option1">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option1"
                                                        value={25000}
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh Cần Thơ
                                                        (trong vòng 24h)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    25.000 đ
                                                </span>
                                            </label>

                                            <label for="option2">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        value={30000}
                                                        id="option2"
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh các
                                                        Tỉnh Miền Nam (1-3 ngày)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    30.000 đ
                                                </span>
                                            </label>
                                            <label for="option3">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option3"
                                                        value={35000}
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh các
                                                        Tỉnh Miền Trung (3-5
                                                        ngày)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    35.000 đ
                                                </span>
                                            </label>
                                            <label for="option4">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option4"
                                                        value={45000}
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh các
                                                        Tỉnh Miền Bắc (4-6 ngày)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    45.000 đ
                                                </span>
                                            </label>
                                            <label for="option5">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option5"
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        value={30000}
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển hỏa tốc ngoại
                                                        thành từ 10km - 20km
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    30.000 đ
                                                </span>
                                            </label>
                                        </div>
                                        <div className="checkbox--list">
                                            <h4 className="delivery--title">
                                                Chọn phương thức thanh toán
                                            </h4>
                                            <label for="method1">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="method1"
                                                        name="purchase"
                                                        value={"online"}
                                                        onChange={(e) =>
                                                            setPaymentMethod(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Online -
                                                        Momo/ZaloPay/ATMCart/Credit
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            height: "35px",
                                                            width: "auto",
                                                        }}
                                                        src="images/purchase.png"
                                                        alt=""
                                                    />
                                                </span>
                                            </label>

                                            <label for="method2">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="method2"
                                                        name="purchase"
                                                        value={"cod"}
                                                        onChange={(e) =>
                                                            setPaymentMethod(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Thanh toán khi nhận hàng
                                                        (COD)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Tiền mặt
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        id="submitOrder"
                                        onClick={() => handleSubmitOrder()}
                                    >
                                        Hoàn thành thử đơn hàng
                                    </button>
                                    {/* <button
                                        id="submitOrder"
                                        onClick={() => handleSubmitOrder()}
                                    >
                                        Hoàn thành đơn hàng
                                    </button> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="userInfo">
                                    <div className="userTag">
                                        <p>
                                            Xin chào khách hàng! Vui lòng nhập
                                            thông tin để nhận hàng nhé
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
                                                value={`${tempName}`}
                                                onChange={(e) =>
                                                    setTempName(e.target.value)
                                                }
                                                required
                                            />
                                            <label
                                                for="name"
                                                class="form__label"
                                            >
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
                                                value={`${tempPhone}`}
                                                onChange={(e) =>
                                                    setTempPhone(e.target.value)
                                                }
                                                required
                                            />
                                            <label
                                                for="name"
                                                class="form__label"
                                            >
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
                                                value={tempAddress}
                                                onChange={(e) =>
                                                    setTempAddress(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <label
                                                for="name"
                                                class="form__label"
                                            >
                                                Địa chỉ
                                            </label>
                                        </div>

                                        <div className="location--picker">
                                            <select
                                                className="minimal"
                                                id="city"
                                                onChange={handleCityChange}
                                            >
                                                <option value="">
                                                    Tỉnh/Thành
                                                </option>
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
                                                <option value="">
                                                    Quận/Huyện
                                                </option>
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
                                            <select
                                                className="minimal"
                                                id="ward"
                                                onChange={(e) =>
                                                    setSelectTempWard(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Phường/Xã
                                                </option>
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
                                        <div className="checkbox--list">
                                            <h4 className="delivery--title">
                                                Chọn phương thức vận chuyển
                                            </h4>
                                            <span style={{ color: "red" }}>
                                                Lưu ý: Chọn phương thức vận
                                                chuyển giống với khu vực địa chỉ
                                                của bạn
                                            </span>
                                            <label for="option1">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option1"
                                                        value={25000}
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh Cần Thơ
                                                        (trong vòng 24h)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    25.000 đ
                                                </span>
                                            </label>

                                            <label for="option2">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        value={30000}
                                                        id="option2"
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh các
                                                        Tỉnh Miền Nam (1-3 ngày)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    30.000 đ
                                                </span>
                                            </label>
                                            <label for="option3">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option3"
                                                        value={35000}
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh các
                                                        Tỉnh Miền Trung (3-5
                                                        ngày)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    35.000 đ
                                                </span>
                                            </label>
                                            <label for="option4">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option4"
                                                        value={45000}
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển nhanh các
                                                        Tỉnh Miền Bắc (4-6 ngày)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    45.000 đ
                                                </span>
                                            </label>
                                            <label for="option5">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="option5"
                                                        name="method"
                                                        onChange={
                                                            handleMethodChange
                                                        }
                                                        value={30000}
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Vận chuyển hỏa tốc ngoại
                                                        thành từ 10km - 20km
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    30.000 đ
                                                </span>
                                            </label>
                                        </div>
                                        <div className="checkbox--list">
                                            <h4 className="delivery--title">
                                                Chọn phương thức thanh toán
                                            </h4>
                                            <label for="method1">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="method1"
                                                        name="purchase"
                                                        value={"online"}
                                                        onChange={(e) =>
                                                            setPaymentTempMethod(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Online -
                                                        Momo/ZaloPay/ATMCart/Credit
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            height: "35px",
                                                            width: "auto",
                                                        }}
                                                        src="images/purchase.png"
                                                        alt=""
                                                    />
                                                </span>
                                            </label>

                                            <label for="method2">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="method2"
                                                        name="purchase"
                                                        value={"cod"}
                                                        onChange={(e) =>
                                                            setPaymentTempMethod(
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            display: "block",
                                                        }}
                                                    />
                                                    <span>
                                                        Thanh toán khi nhận hàng
                                                        (COD)
                                                    </span>
                                                </div>
                                                <span
                                                    style={{
                                                        marginRight: "10px",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Tiền mặt
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        id="submitOrder"
                                        onClick={() => handleSubmitOrder()}
                                    >
                                        Hoàn thành thử đơn hàng
                                    </button>
                                    {/* <button
                                        id="submitOrder"
                                        onClick={() => handleSubmitOrder()}
                                    >
                                        Hoàn thành đơn hàng
                                    </button> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="order-details">
                    <div className="product--infomation">
                        <h4>Thông tin đơn hàng</h4>
                        {cartList?.data.cart.map((item) => {
                            return (
                                <>
                                    <div className="order-summary">
                                        {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                                        <ul>
                                            <div className="productList">
                                                <span
                                                    style={{
                                                        paddingRight: "20px",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            maxWidth: "70px",
                                                        }}
                                                        src={`${item?.product.images[0].secure_url}`}
                                                        alt=""
                                                    />
                                                </span>
                                                <li
                                                    style={{
                                                        listStyle: "none",
                                                    }}
                                                    key={
                                                        item?.product.product.id
                                                    }
                                                >
                                                    <span>
                                                        {
                                                            item?.product
                                                                .product.name
                                                        }
                                                    </span>
                                                    <span>
                                                        Số lượng:{" "}
                                                        {item.quantity}{" "}
                                                    </span>
                                                    <span>
                                                        Giá tiền:{" "}
                                                        {convertPrice(
                                                            (item.product
                                                                .product.price -
                                                                item.product
                                                                    .product
                                                                    .price *
                                                                    (item
                                                                        .product
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

                        <div className="order-total">
                            {currentUser ? (
                                <>
                                    <span>
                                        Tổng tiền: {convertPrice(totalPrice)}
                                    </span>
                                    <span>
                                        Tiền Ship: {convertPrice(deliveryPrice)}
                                    </span>
                                    <h4>
                                        Tổng cộng: {convertPrice(totalPayment)}
                                    </h4>
                                </>
                            ) : (
                                <>
                                    <span>
                                        Tổng tiền: {convertPrice(totalPrice)}
                                    </span>
                                    <span>
                                        Tiền Ship:{" "}
                                        {convertPrice(deliveryTempPrice)}
                                    </span>
                                    <h4>
                                        Tổng cộng:{" "}
                                        {convertPrice(totalTempPayment)}
                                    </h4>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
