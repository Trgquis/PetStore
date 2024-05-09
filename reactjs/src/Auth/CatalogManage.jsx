import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import {
    deleteCatalog,
    handlegetAllCatalogs,
    handlegetAllChilds,
    handlegetAllRoots,
} from "../redux/apiRequest";
import ManagePagination from "../components/MangePagination";
import CatalogModal from "../components/CatalogModal";
import "../Styles/Table.scss";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CustomAlert from "../components/CustomAlert";
import ConfirmationModal from "../components/ConfirmationModal";
import RootModal from "../components/RootModal";
import axios from "axios";
const PAGE_SIZE = 12;

const CatalogManage = () => {
    const User = useSelector((state) => state.auth.currentUser);
    const rootList = useSelector((state) => state?.sales.allRoots);
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const childList = useSelector((state) => state?.sales.allChilds);
    console.log(childList);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [rootmodal, setRootModal] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    let [id, setId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState();
    const [mess, setMess] = useState();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [catalogToDelete, setcatalogToDelete] = useState();
    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    useEffect(() => {
        try {
            handlegetAllCatalogs(dispatch);
            handlegetAllRoots(dispatch);
            handlegetAllChilds(dispatch);
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
    const handlerootOpen = async () => {
        try {
            setRootModal(true);
        } catch (e) {
            console.log(e);
        }
    };

    const handlerootClose = async () => {
        try {
            setRootModal(false);
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

    // Trong hàm handleDeleteCatalog
    const handleDeleteCatalog = async (catalog) => {
        try {
            setShowDeleteConfirmation(true);
            setcatalogToDelete(catalog);
        } catch (e) {
            console.log(e);
            alert("Error");
        }
    };

    // Trong hàm confirmDelete
    const confirmDelete = async () => {
        try {
            if (catalogToDelete) {
                let res = await axios.delete(
                    `http://localhost:8888/api/deletechild/?id=${catalogToDelete.id}`
                );
                if (res) {
                    setStatus(0);
                    setMess("Xóa danh mục thành công");
                    handleShowAlert();
                    handlegetAllChilds(dispatch);
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

    const pageCount = Math.ceil(childList?.data.childs.count / PAGE_SIZE);

    const categoryToShow = childList?.data.childs.childs.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    const getRoot = (parentId) => {
        const parentCategory = catalogList?.data.catalogs.catalogs.find(
            (category) => category.id === parentId
        );

        return parentCategory ? parentCategory.name : "Danh mục chính";
    };

    return (
        <>
            <div className="main">
                <div className="content">
                    <div className="userInformation">
                        <div>
                            <h4>Quản lý danh mục</h4>
                            <div className="navigate">
                                <select
                                    onChange={(e) =>
                                        (window.location.href = e.target.value)
                                    }
                                >
                                    <option value="#">
                                        -- Chọn trang quản lý --
                                    </option>
                                    <option value="/usersmanage">
                                        Quản lý người dùng
                                    </option>
                                    <option value="/productsmanage">
                                        Quản lý sản phẩm
                                    </option>
                                </select>
                            </div>
                        </div>
                        {modal && (
                            <div className="modal-container">
                                {id ? (
                                    <CatalogModal
                                        isOpen={modal}
                                        catalogId={id}
                                        onClose={handleClose}
                                    />
                                ) : (
                                    <CatalogModal
                                        isOpen={modal}
                                        catalogId={null}
                                        onClose={handleClose}
                                    />
                                )}
                            </div>
                        )}
                        {rootmodal && (
                            <div className="modal-container">
                                {
                                    <RootModal
                                        isOpen={rootmodal}
                                        onClose={handlerootClose}
                                    />
                                }
                            </div>
                        )}
                        <div className="addBtn">
                            <Button onClick={(e) => handleOpen(null)}>
                                + Thêm danh mục <span> </span>
                                <i className="fas fa-table"></i>
                            </Button>
                            <Button onClick={(e) => handlerootOpen()}>
                                + Cài đặt loại danh mục
                            </Button>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <th>Loại danh mục</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryToShow?.map((catalog) => (
                                    <tr key={catalog.id}>
                                        <td>{catalog.name}</td>
                                        <td>{getRoot(catalog.parent_id)}</td>
                                        <td className="action">
                                            <FaPencilAlt
                                                className="pen"
                                                onClick={() =>
                                                    handleOpen(catalog.id)
                                                }
                                            />
                                            <RiDeleteBin5Fill
                                                className="bin"
                                                onClick={() =>
                                                    handleDeleteCatalog(catalog)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {!catalogList && (
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
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showDeleteConfirmation}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                message={`Bạn có chắc muốn xóa danh mục: ${catalogToDelete?.name}?`}
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

export default CatalogManage;
