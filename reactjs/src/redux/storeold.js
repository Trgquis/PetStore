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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../Styles/Table.scss";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import ConfirmationModal from "../components/ConfirmationModal";
import RootModal from "../components/RootModal";
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

    const handleOpen = async (mode, id) => {
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

    const updateCatalogPriority = async (updatedCategories) => {
        try {
            await axios.put(
                "http://localhost:8888/api/dragchild",
                updatedCategories
            );
            console.log("oke");
            // Sau khi cập nhật xong, làm mới danh sách
            handleRefresh();
        } catch (error) {
            console.error("Error updating catalog priority", error);
        }
    };

    const onDragEnd = (result) => {
        console.log(result);
        const destination = result.destination.index;
        const draggableId = result.draggableId;
        const source = result.source.index;

        // Tạo đối tượng để cập nhật priority
        const requestData = {
            movedId: draggableId,
            destinationIndex: destination,
            sourceIndex: source,
        };

        console.log(requestData);

        // Gọi hàm cập nhật priority
        updateCatalogPriority(requestData);
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
                                {!id ? (
                                    <CatalogModal
                                        isOpen={modal}
                                        catalogId={id}
                                        onClose={handleClose}
                                    />
                                ) : (
                                    <CatalogModal
                                        isOpen={modal}
                                        catalogId={id}
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
                                    <th></th>
                                    <th>Tên danh mục</th>
                                    <th>Loại danh mục</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="categories">
                                    {(provided) => (
                                        <tbody
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {categoryToShow?.map(
                                                (catalog, index) => (
                                                    <Draggable
                                                        key={catalog.id}
                                                        draggableId={catalog.id.toString()}
                                                        index={index}
                                                        handle=".drag-handle"
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <tr
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                            >
                                                                <td
                                                                    className="drag-handle"
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div className="dot-row">
                                                                        <div className="dot"></div>
                                                                        <div className="dot"></div>
                                                                    </div>
                                                                    <div className="dot-row">
                                                                        <div className="dot"></div>
                                                                        <div className="dot"></div>
                                                                    </div>
                                                                    <div className="dot-row">
                                                                        <div className="dot"></div>
                                                                        <div className="dot"></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        catalog.name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {getRoot(
                                                                        catalog.parent_id
                                                                    )}
                                                                </td>
                                                                <td className="action">
                                                                    <FaPencilAlt
                                                                        className="pen"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleOpen(
                                                                                "edit",
                                                                                catalog.id
                                                                            )
                                                                        }
                                                                    />
                                                                    <RiDeleteBin5Fill
                                                                        className="bin"
                                                                        onClick={() =>
                                                                            handleDeleteCatalog(
                                                                                catalog
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}
                                            {!catalogList && (
                                                <tr>
                                                    <td colSpan="4">
                                                        <h3>
                                                            Không có dữ liệu
                                                        </h3>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    )}
                                </Droppable>
                            </DragDropContext>
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

export default CatalogManage;
