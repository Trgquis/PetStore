import React from "react";
import { useParams } from "react-router-dom";
import "../Styles/Modal.scss";
import { Link } from "react-router-dom";
function WebsitePolicy() {
    const { name } = useParams();
    console.log(name);
    return (
        <>
            {name === "chinh-sach-giao-hang" && (
                <div class="layout-pageDetail">
                    <div class="breadcrumb-shop">
                        <div class="container"></div>
                    </div>
                    <div class="wrapper-pageDetail">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9 col-sm-8 col-xs-12 pageDetail-main-left">
                                    <div class="pageDetail-content">
                                        <div class="heading-pageDetail">
                                            <h3>Chính sách giao hàng</h3>
                                        </div>
                                        <div class="content-pageDetail typeList-style">
                                            <p>
                                                Thông thường sau khi nhận được
                                                thông tin đặt hàng chúng tôi sẽ
                                                xử lý đơn hàng trong vòng 24h và
                                                phản hồi lại thông tin cho khách
                                                hàng về việc thanh toán và giao
                                                nhận.
                                            </p>
                                            <p>
                                                Thời gian giao hàng thường trong
                                                khoảng từ 3-5 ngày kể từ ngày
                                                chốt đơn hàng hoặc theo thỏa
                                                thuận với khách khi đặt hàng.
                                                Tuy nhiên, cũng có trường hợp
                                                việc giao hàng kéo dài hơn nhưng
                                                chỉ xảy ra trong những tình
                                                huống bất khả kháng như sau:
                                            </p>
                                            <p>
                                                - Nhân viên công ty sẽ liên lạc
                                                với khách hàng qua điện thoại
                                                không được nên không thể giao
                                                hàng.
                                            </p>
                                            <p>
                                                - Địa chỉ giao hàng bạn cung cấp
                                                không chính xác hoặc khó tìm.
                                            </p>
                                            <p>
                                                - Số lượng đơn hàng của công ty
                                                tăng đột biến khiến việc xử lý
                                                đơn hàng bị chậm.&nbsp;
                                            </p>
                                            <p>
                                                - Đối tác cung cấp nguyên liệu
                                                cho công ty chậm hơn dự kiến
                                                khiến việc giao hàng bị chậm lại
                                                hoặc đối tác vận chuyển giao
                                                hàng bị chậm chỉ vận chuyển phân
                                                phối cho đại lý hoặc khách hàng
                                                có nhu cầu lớn, lâu dài. Vì thế
                                                công ty đa phần sẽ hỗ trợ chi
                                                phí vận chuyển như một cách chăm
                                                sóc đại lý cua mình. Đối với
                                                khách lẻ nếu có nhu cầu sử dụng
                                                lớn vui lòng liên hệ trực tiếp
                                                để thỏa thuận hợp đồng cũng như
                                                phí vận chuyển.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-12 pageDetail-aside-right">
                                    <aside class="sidebar-page">
                                        <div class="group-sidebox">
                                            <div class="sidebox-title ">
                                                <h3 class="htitle">
                                                    Danh mục page
                                                    <span class="fa fa-angle-down"></span>
                                                </h3>
                                            </div>
                                            <div class="sidebox-content sidebox-content-togged">
                                                <ul class="menuList-links">
                                                    <li class="">
                                                        <Link
                                                            to="/search"
                                                            title="Tìm kiếm"
                                                        >
                                                            <span>
                                                                Tìm kiếm
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/gioi-thieu"
                                                            title="Giới thiệu"
                                                        >
                                                            <span>
                                                                Giới thiệu
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/chinh-sach-bao-mat"
                                                            title="Chính sách bảo mật"
                                                        >
                                                            <span>
                                                                Chính sách bảo
                                                                mật
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/chinh-sach-thanh-toan"
                                                            title="Chính sách thanh toán"
                                                        >
                                                            <span>
                                                                Chính sách thanh
                                                                toán
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class=" active ">
                                                        <Link
                                                            to="/pages/chinh-sach-giao-hang"
                                                            title="Chính sách giao hàng"
                                                        >
                                                            <span>
                                                                Chính sách giao
                                                                hàng
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/chinh-sach-doi-tra"
                                                            title="Chính sách đổi trả"
                                                        >
                                                            <span>
                                                                Chính sách đổi
                                                                trả
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/huong-dan-mua-hang"
                                                            title="Hướng dẫn mua hàng"
                                                        >
                                                            <span>
                                                                Hướng dẫn mua
                                                                hàng
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/dieu-khoan-dich-vu"
                                                            title="Điều khoản dịch vụ"
                                                        >
                                                            <span>
                                                                Điều khoản dịch
                                                                vụ
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {name === "chinh-sach-doi-tra" && (
                <div class="layout-pageDetail">
                    <div class="breadcrumb-shop">
                        <div class="container"></div>
                    </div>
                    <div class="wrapper-pageDetail">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9 col-sm-8 col-xs-12 pageDetail-main-left">
                                    <div class="pageDetail-content">
                                        <div class="heading-pageDetail">
                                            <h3>Chính sách đổi trả</h3>
                                        </div>

                                        <div class="content-pageDetail typeList-style">
                                            <p>
                                                <strong>
                                                    1. Điều kiện đổi trả
                                                </strong>
                                            </p>
                                            <p>
                                                Quý Khách hàng cần kiểm tra tình
                                                trạng hàng hóa và có thể đổi
                                                hàng/ trả lại hàng&nbsp;ngay tại
                                                thời điểm giao/nhận
                                                hàng&nbsp;trong những trường hợp
                                                sau:
                                            </p>
                                            <ul>
                                                <li>
                                                    Hàng không đúng chủng loại,
                                                    mẫu mã trong đơn hàng đã đặt
                                                    hoặc như trên website tại
                                                    thời điểm đặt hàng.
                                                </li>
                                                <li>
                                                    Không đủ số lượng, không đủ
                                                    bộ như trong đơn hàng.
                                                </li>
                                                <li>
                                                    Tình trạng bên ngoài bị ảnh
                                                    hưởng như rách bao bì, bong
                                                    tróc, bể vỡ…
                                                </li>
                                            </ul>
                                            <p>
                                                &nbsp;Khách hàng có trách nhiệm
                                                trình giấy tờ liên quan chứng
                                                minh sự thiếu sót trên để hoàn
                                                thành việc&nbsp;hoàn trả/đổi trả
                                                hàng hóa.&nbsp;
                                            </p>
                                            <p>
                                                <strong>
                                                    2. Quy định về thời gian
                                                    thông báo và gửi sản phẩm
                                                    đổi trả
                                                </strong>
                                            </p>
                                            <ul>
                                                <li>
                                                    <strong>
                                                        Thời gian thông báo đổi
                                                        trả
                                                    </strong>
                                                    :&nbsp;trong vòng 48h kể từ
                                                    khi nhận sản phẩm đối với
                                                    trường hợp sản phẩm thiếu
                                                    phụ kiện, quà tặng hoặc bể
                                                    vỡ.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Thời gian gửi chuyển trả
                                                        sản phẩm
                                                    </strong>
                                                    : trong vòng 14 ngày kể từ
                                                    khi nhận sản phẩm.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Địa điểm đổi trả sản
                                                        phẩm
                                                    </strong>
                                                    : Khách hàng có thể mang
                                                    hàng trực tiếp đến văn
                                                    phòng/ cửa hàng của chúng
                                                    tôi hoặc chuyển qua đường
                                                    bưu điện.
                                                </li>
                                            </ul>
                                            <p>
                                                Trong trường hợp Quý Khách hàng
                                                có ý kiến đóng góp/khiếu nại
                                                liên quan đến chất lượng sản
                                                phẩm, Quý Khách hàng vui lòng
                                                liên hệ đường dây chăm sóc khách
                                                hàng&nbsp;của chúng tôi.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-12 pageDetail-aside-right">
                                    <aside class="sidebar-page">
                                        <div class="group-sidebox">
                                            <div class="sidebox-title ">
                                                <h3 class="htitle">
                                                    Danh mục page
                                                    <span class="fa fa-angle-down"></span>
                                                </h3>
                                            </div>
                                            <div class="sidebox-content sidebox-content-togged">
                                                <ul class="menuList-links">
                                                    <li class="">
                                                        <Link
                                                            to="/pages/chinh-sach-bao-mat"
                                                            title="Chính sách bảo mật"
                                                        >
                                                            <span>
                                                                Chính sách bảo
                                                                mật
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/chinh-sach-thanh-toan"
                                                            title="Chính sách thanh toán"
                                                        >
                                                            <span>
                                                                Chính sách thanh
                                                                toán
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class=" active ">
                                                        <Link
                                                            to="/pages/chinh-sach-giao-hang"
                                                            title="Chính sách giao hàng"
                                                        >
                                                            <span>
                                                                Chính sách giao
                                                                hàng
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/chinh-sach-doi-tra"
                                                            title="Chính sách đổi trả"
                                                        >
                                                            <span>
                                                                Chính sách đổi
                                                                trả
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/huong-dan-mua-hang"
                                                            title="Hướng dẫn mua hàng"
                                                        >
                                                            <span>
                                                                Hướng dẫn mua
                                                                hàng
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li class="">
                                                        <Link
                                                            to="/pages/dieu-khoan-dich-vu"
                                                            title="Điều khoản dịch vụ"
                                                        >
                                                            <span>
                                                                Điều khoản dịch
                                                                vụ
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default WebsitePolicy;
