import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "reactstrap";
import {
    deleteCatalog,
    handlegetAllCatalogs,
    handlegetAllProducts,
    handlegetAllRoots,
} from "../redux/apiRequest";
import ManagePagination from "../components/MangePagination";
import "../Styles/Table.scss";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CustomAlert from "../components/CustomAlert";
import ConfirmationModal from "../components/ConfirmationModal";
import ProductDescription from "../components/ProductDescription";
import { Link } from "react-router-dom";

const PAGE_SIZE = 12;

const ProductManage = () => {
    const User = useSelector((state) => state.auth.currentUser);
    const rootList = useSelector((state) => state?.sales.allRoots);
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const productList = useSelector((state) => state?.sales.allProducts);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    let [id, setId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState();
    const [mess, setMess] = useState();
    const [pagesize, setPagesize] = useState(20);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [catalogToDelete, setcatalogToDelete] = useState();

    console.log(productList);
    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const handlePagesizechange = (e) => {
        setPagesize(parseInt(e.target.value));
    };
    useEffect(() => {
        try {
            handlegetAllProducts(dispatch);
            handlegetAllCatalogs(dispatch);
            handlegetAllRoots(dispatch);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleOpen = async (id) => {
        try {
            setModal(true);
            setId(id);
            console.log(id);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClose = async () => {
        try {
            setModal(false);
            setId(null);
        } catch (e) {
            console.log(e);
        }
    };

    const handleRefresh = async () => {
        try {
            let res = await handlegetAllCatalogs(dispatch);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteCatalog = async (catalog) => {
        try {
            setcatalogToDelete(catalog); // Assuming you have a state variable catalogToDelete
            setShowDeleteConfirmation(true);
        } catch (e) {
            console.log(e);
            alert("Error");
        }
    };

    const confirmDelete = async (catalogToDelete) => {
        console.log(catalogToDelete);
        try {
            if (catalogToDelete) {
                let res = await deleteCatalog(dispatch, catalogToDelete.id);

                if (res) {
                    setStatus(0);
                    setMess("Xóa danh mục thành công");
                    handleShowAlert();
                } else if (!res) {
                    setStatus(1);
                    setMess("Xóa danh mục thất bại");
                    handleShowAlert();
                }
            }
            setShowDeleteConfirmation(false);
        } catch (e) {
            console.log(e);
            alert("Error");
        }
    };

    const cancelDelete = async () => {
        setStatus(1);
        setMess("Xóa danh mục thất bại");
        handleShowAlert();
        setShowDeleteConfirmation(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };

    const pageCount = Math.ceil(productList?.data.products.count / pagesize);

    const categoryToShow = productList?.data.products.products.slice(
        currentPage * pagesize,
        (currentPage + 1) * pagesize
    );

    return (
        <>
            <div className="main">
                <div className="content">
                    <Link to={"/AdminPage"}>{"<<"}Quay lại trang thống kê</Link>
                    <div className="userInformation">
                        <div>
                            <h4>Quản lý sản phẩm</h4>
                            <div className="navigate">
                                <select
                                    onChange={(e) =>
                                        (window.location.href = e.target.value)
                                    }
                                >
                                    <option value="#">
                                        -- Chọn trang quản lý --
                                    </option>
                                    <option value="/categoriesmanage">
                                        Quản lý danh mục
                                    </option>
                                    <option value="/usersmanage">
                                        Quản lý người dùng
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="addBtn">
                            <Button onClick={(e) => handleOpen(null)}>
                                + Thêm sản phẩm <span> </span>
                                <i className="fas fa-table"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Tỉ lệ giảm</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: "center" }}>
                                {categoryToShow?.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{convertPrice(product.price)}</td>
                                        <td>
                                            {product.discount}%(-
                                            {convertPrice(
                                                product.price *
                                                    (product.discount / 100)
                                            )}
                                            ₫)
                                        </td>
                                        <td
                                            style={{ textAlign: "center" }}
                                            className="action"
                                        >
                                            <FaPencilAlt
                                                className="pen"
                                                onClick={(e) =>
                                                    handleOpen(product.id)
                                                }
                                            />
                                            <RiDeleteBin5Fill
                                                className="bin"
                                                onClick={() =>
                                                    handleDeleteCatalog(product)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {!productList && (
                                    <tr>
                                        <td colSpan="4">
                                            <h3>Không có dữ liệu</h3>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div className="pagination">
                            <ManagePagination
                                currentPage={currentPage}
                                pageCount={pageCount}
                                handlePageChange={handlePageChange}
                            />
                            <div>
                                Kích thước trang hiện tại:
                                <select
                                    value={pagesize}
                                    onChange={handlePagesizechange}
                                >
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={75}>75</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal-container">
                    {!id ? (
                        <ProductDescription
                            isOpen={modal}
                            productId={id}
                            onClose={handleClose}
                        />
                    ) : (
                        <ProductDescription
                            isOpen={modal}
                            productId={id}
                            onClose={handleClose}
                        />
                    )}
                </div>
            )}
            <ConfirmationModal
                isOpen={showDeleteConfirmation}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                message={`Are you sure you want to delete the catalog: ${catalogToDelete?.name}?`}
            />
            <CustomAlert
                message={mess}
                type={status}
                isOpen={showAlert}
                onClose={handleCloseAlert}
            />
        </>
    );
};

export default ProductManage;
