import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteProduct } from "../redux/apiRequest";
import Slider from "react-slick";
import ProductModal from "../components/ProductModal";
import ManagePagination from "../components/MangePagination";
import UserInformation from "../components/UserInformation";
import { handlegetAllProducts } from "../redux/apiRequest";
const PAGE_SIZE = 5; // số lượng người dùng hiển thị trên một trang

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style,
                background: "#d3d6db",
                paddingTop: "4px",
                right: "-30px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                zIndex: 2,
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
                left: "-30px",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                zIndex: 2,
            }}
            onClick={onClick}
        />
    );
}
const ProductManage = () => {
    const User = useSelector((state) => state.auth.currentUser);
    const productList = useSelector((state) => state.sales.allProducts.data);
    const catalogList = useSelector(
        (state) => state?.sales.allCatalogs.data.catalogs.catalogs
    );
    console.log(productList);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let axiosJWT = axios.create()
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    let [id, setId] = useState(null);
    let [productInfo, setProductInfo] = useState("");
    const [mode, setMode] = useState();
    console.log(productInfo);
    console.log(id);
    const handleOpen = async (mode, productId) => {
        try {
            setModal(true);
            setId(productId);
            setMode(mode);
            console.log(mode);
        } catch (e) {
            console.log(e);
        }
    };
    const handleClose = async () => {
        try {
            setModal(false);
            setId(null);
            setMode(null);
        } catch (e) {
            console.log(e);
        }
    };

    const handleRefresh = async (e) => {
        try {
            let res = await handlegetAllProducts(dispatch);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    const handleDeleteProduct = async (product) => {
        try {
            console.log(product.id);
            // console.log(User?.data.accessToken)
            let res = await deleteProduct(dispatch, product.id);
            console.log(res);

            // deleteUser(User?.user.accessToken, dispatch, user.id )
            // alert('Delete Success')
        } catch (e) {
            console.log(e);
            alert("Error");
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // Tính số lượng trang
    console.log(productList);
    const pageCount = Math.ceil(productList?.products.count / PAGE_SIZE);

    // Lấy danh sách người dùng hiển thị trên trang hiện tại
    const productToShow = productList?.products.products.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );
    const settings = {
        dots: true,
        initialSlide: 0,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        // adaptiveHeight: true,
        // centerMode: true,
    };
    useEffect(() => {
        if (!User) {
            alert("Login first");
            navigate("/salesLogin");
        } else if (
            User?.data.user.accessToken &&
            User?.data.user.roleId === "1"
        ) {
            console.log(User.data.user.accessToken);
            handlegetAllProducts(User.data.user.accessToken);
        } else if (
            User?.data.user.roleId !== "1" &&
            User?.data.user.roleId !== "2"
        ) {
            alert("dont have permission");
            navigate("/");
        }
    }, []);

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };

    return (
        <div className="main">
            <div className="content">
                <div className="userInformation">
                    <h4>Quản lý danh mục</h4>
                    <Link to="/manage">Quản lý người dùng</Link>
                    <Link to="/productsmanage">Quản lý sản phẩm</Link>
                    <Link to="/catalogsmanage"> Quản lý danh mục</Link>
                    {User && <UserInformation User={User.data} />}
                </div>
                <div className="table-wrapper">
                    <div className="admin-btn">
                        <button
                            className="addUser-btn"
                            value="add"
                            onClick={(e) => {
                                handleOpen("add", null);
                            }}
                        >
                            Add <span> </span>
                            <i className="fas fa-tags"></i>
                        </button>
                        {modal && (
                            <ProductModal
                                isOpen={modal}
                                mode={mode}
                                productId={id}
                                onClose={handleClose}
                            />
                        )}
                        <button
                            className="refresh-btn"
                            onClick={(e) => handleRefresh()}
                        >
                            Refresh <span> </span>
                            <i className="fas fa-sync"></i>
                        </button>
                    </div>
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        Danh mục <br /> sản phẩm
                                    </div>
                                </th>
                                <th
                                    style={{
                                        width: "150px",
                                    }}
                                >
                                    <div>Tên sản phẩm</div>
                                </th>
                                <th>
                                    <div>Giá tiền</div>
                                </th>
                                <th>
                                    <div>Mô tả sản phẩm</div>
                                </th>
                                <th>
                                    <div>Giảm giá (%)</div>
                                </th>
                                <th>
                                    <div>Tồn hàng</div>
                                </th>
                                <th>
                                    <div>Hình ảnh hàng hóa</div>
                                </th>
                                <th>
                                    <div>Chỉnh sửa</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {productList?.products.products.map((product) => { */}
                            {productToShow?.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        {catalogList
                                            .filter(
                                                (catalog) =>
                                                    catalog.id ===
                                                    product.catalog_id
                                            )
                                            .map((catalog) => (
                                                <td>
                                                    {product.catalog_id ===
                                                    catalog.id
                                                        ? catalog.name
                                                        : null}
                                                </td>
                                            ))}
                                        <td>{product.name}</td>
                                        <td>{convertPrice(product.price)}₫</td>
                                        <td
                                            style={{
                                                width: "450px",
                                            }}
                                        >
                                            <textarea
                                                value={product.content}
                                                readOnly
                                                rows="10"
                                                style={{
                                                    fontSize: "14px",
                                                    height: "100%",
                                                    width: "100%",
                                                    padding: "5px",
                                                    resize: "vertical",
                                                    overflow: "auto",
                                                }}
                                            />
                                        </td>
                                        <td>{product.discount}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <div className="slider-image">
                                                <Slider {...settings}>
                                                    {productList.products.images
                                                        .filter(
                                                            (item) =>
                                                                item.product_id ===
                                                                product.id
                                                        )
                                                        .map((item) => (
                                                            <img
                                                                key={item.id}
                                                                src={`http://localhost:8081/${item.path}`}
                                                                alt=""
                                                            />
                                                        ))}
                                                </Slider>
                                            </div>
                                        </td>
                                        <td className="userAction">
                                            <button
                                                id={product.id}
                                                className="edit"
                                                value="edit"
                                                onClick={(e) => {
                                                    handleOpen(
                                                        "edit",
                                                        e.target.id
                                                    );
                                                }}
                                            >
                                                Edit <span> </span>{" "}
                                                <i className="far fa-edit"></i>
                                            </button>
                                            <button
                                                className="deleteUser-btn"
                                                onClick={() =>
                                                    handleDeleteProduct(product)
                                                }
                                            >
                                                Delete <span> </span>{" "}
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <ManagePagination
                            currentPage={currentPage}
                            pageCount={pageCount}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductManage;
