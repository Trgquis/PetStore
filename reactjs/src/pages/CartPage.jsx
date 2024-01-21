import React from "react";
import { useParams } from "react-router-dom";
import "../Styles/Cart.scss";
import "bootstrap";
import { Link } from "react-router-dom";
import { handleGetAllCarts } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function CartPage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.order.allCarts);

    console.log(cartList);
    useEffect(() => {
        async function fetchCartItems() {
            await handleGetAllCarts(20, dispatch); // gọi hàm getAllCart với user_id
        }
        fetchCartItems();
    }, [userId]);
    return (
        <div className="layoutCart">
            <div className="wrapperCart">
                <div className="headertitle">
                    <div className="container">
                        <div className="headingCart">
                            <h4>Giỏ hàng của bạn</h4>
                        </div>
                    </div>
                </div>
                <div className="contentCart">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-8 col-xs-12 contentCartDetail">
                                <div className="listCart">
                                    <div className="listContent">
                                        <div className="cart-row">
                                            {cartList?.data.count && (
                                                <p className="title-number">
                                                    Bạn đang có
                                                    <strong>
                                                        {" "}
                                                        {cartList?.data.count}
                                                        {" "}
                                                        sản phẩm{" "}
                                                    </strong>
                                                    trong giỏ hàng
                                                </p>
                                            )}
                                            <div className="table-cart">
                                                {cartList.data &&
                                                    cartList?.data.cartItem.map(
                                                        (item) => {
                                                            return (
                                                                <div className="line-item">
                                                                    <div className="line-item-left">
                                                                        <div className="item-img">
                                                                            <Link
                                                                                to={`/detail/${item.product.id}`}
                                                                            >
                                                                                <img
                                                                                    src={`http://localhost:8081/${item.images.path}`}
                                                                                    alt=""
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="line-item-right">
                                                                        <div className="item-info">
                                                                            <Link
                                                                                to={`/detail/${item.product.id}`}
                                                                            >
                                                                                <h3 className="item--title">
                                                                                    {
                                                                                        item
                                                                                            .product
                                                                                            .name
                                                                                    }
                                                                                </h3>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="item-qty">
                                                                            <div className="qty-parent">
                                                                                <button className="qty-btn">
                                                                                    +
                                                                                </button>
                                                                                <input
                                                                                    className="item-quantity"
                                                                                    type="text"
                                                                                />
                                                                                <button className="qty-btn">
                                                                                    -
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="item-price">
                                                                            <p>
                                                                                <span className="span--price">
                                                                                    190,000đ
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="item--totalPrice">
                                                                        <div className="item--price">
                                                                            <span>
                                                                                Thành
                                                                                tiền:
                                                                            </span>
                                                                            <span className="price--total">
                                                                                190,000đ
                                                                            </span>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <Link>
                                                                                <img
                                                                                    src="https://theme.hstatic.net/1000296747/1000891809/14/delete-cart.png?v=20"
                                                                                    alt=""
                                                                                />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                {!cartList.data && (
                                                    <>
                                                        <div>
                                                            Giỏ hàng của bạn
                                                            đang trống
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12 sidebarCart-sticky">
                                <div className="wrapOrder">
                                    <div className="order-block">
                                        <h2 className="order-block--title">
                                            Thông tin đơn hàng
                                        </h2>
                                        <div className="order-total">
                                            <p>
                                                Tổng tiền :{" "}
                                                <span>190,000đ</span>
                                            </p>
                                        </div>
                                        <div className="order-action">
                                            <p>
                                                Phí vận chuyển sẽ được tính ở
                                                trang thanh toán.
                                            </p>
                                            <p>
                                                Bạn cũng có thể nhập mã giảm giá
                                                ở trang thanh toán.
                                            </p>
                                            <Link id="checkout-btn">
                                                ĐẶT HÀNG
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="order-block order-notify">
                                        <div className="warning">
                                            <p className="textrm">
                                                <strong>
                                                    Chính sách mua hàng:
                                                </strong>
                                            </p>
                                            <p>
                                                Hiện chúng tôi chỉ áp dụng thanh
                                                toán với đơn hàng có giá trị tối
                                                thiểu
                                                <strong>0đ</strong>
                                                trở lên
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
