import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
    deleteCatalog,
    handlegetAllCatalogs,
    handlegetAllRoots,
} from "../redux/apiRequest";
import ManagePagination from "../components/MangePagination";
import UserInformation from "../components/UserInformation";
import CatalogModal from "../components/CatalogModal";
import RootModal from "../components/RootModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../Styles/Table.scss";
import axios from "axios";
const PAGE_SIZE = 12;

const CatalogManage = () => {
    const User = useSelector((state) => state.auth.currentUser);
    const rootList = useSelector((state) => state?.sales.allRoots);
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    let [id, setId] = useState("");
    useEffect(() => {
        try {
            handlegetAllCatalogs(dispatch);
            handlegetAllRoots(dispatch);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleOpen = async (mode, id) => {
        try {
            setModal(true);
            setMode(mode);
            setId(id);
            console.log(id);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClose = async () => {
        try {
            setModal(false);
            setMode(null);
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
            console.log(catalog.id);
            let res = await deleteCatalog(dispatch, catalog.id);
            console.log(res);
        } catch (e) {
            console.log(e);
            alert("Error");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const updateCatalogPriority = async (updatedCategories) => {
        try {
            await axios.put("http://localhost:8888/testnew", updatedCategories);
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

    const pageCount = Math.ceil(catalogList?.data.catalogs.count / PAGE_SIZE);

    const categoryToShow = catalogList?.data.catalogs.catalogs.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    const getRoot = (parentId) => {
        const parentCategory = rootList?.data.roots.roots.find(
            (category) => category.id === parentId
        );

        return parentCategory ? parentCategory.name : "Danh mục chính";
    };

    return (
        <>
            <div className="main">
                <div className="content">
                    <div className="userInformation">
                        <h4>Quản lý danh mục</h4>
                        <Link to="/manage">Quản lý người dùng</Link>
                        <Link to="/productsmanage">Quản lý sản phẩm</Link>
                        <Link to="/catalogsmanage"> Quản lý danh mục</Link>
                        <button
                            className="addUser-btn"
                            onClick={(e) => handleOpen("root", null)}
                        >
                            Cài đặt loại danh mục <span> </span>
                            <i className="fas fa-table"></i>
                        </button>
                        <button
                            className="refresh-btn"
                            onClick={(e) => handleRefresh()}
                        >
                            Refresh <span> </span>
                            <i className="fas fa-sync"></i>
                        </button>
                        {User && <UserInformation User={User.data} />}
                    </div>
                    <div className="table-wrapper">
                        {modal &&
                            (mode === "add" ? (
                                <CatalogModal
                                    isOpen={modal}
                                    mode={mode}
                                    catalogId={id}
                                    onClose={handleClose}
                                />
                            ) : (
                                <RootModal
                                    isOpen={modal}
                                    mode={mode}
                                    rootId={id}
                                    onClose={handleClose}
                                />
                            ))}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="categories">
                                {(provided) => (
                                    <div
                                        className="fl-table"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className="thead">
                                            <div>Tên danh mục</div>
                                            <div>Danh mục thuộc</div>
                                        </div>
                                        <div className="body">
                                            {categoryToShow?.map(
                                                (catalog, index) => (
                                                    <Draggable
                                                        key={catalog.id}
                                                        draggableId={catalog.id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                className="tbody"
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div>
                                                                    {
                                                                        catalog.name
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {getRoot(
                                                                        catalog.rootcategory_id
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}

                                            {!catalogList && (
                                                <div>
                                                    <h3>Không có dữ liệu</h3>
                                                </div>
                                            )}
                                            <div className="addBtn">
                                                <button
                                                    onClick={(e) =>
                                                        handleOpen("add", null)
                                                    }
                                                >
                                                    + Add Category{" "}
                                                    <span> </span>
                                                    <i className="fas fa-table"></i>
                                                </button>
                                            </div>
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
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
        </>
    );
};

export default CatalogManage;
