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
import "../Styles/Table.scss";
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
        // if (!User) {
        //     // console.log('asdsa')
        //     alert("Login first");
        //     navigate("/salesLogin");
        // } else if (
        //     User?.data.user.accessToken &&
        //     User?.data.user.roleId === "1"
        // ) {
        // console.log(User.data.user.accessToken);
        // handlegetAllCatalogs(User.data.user.accessToken);
        // } else if (
        //     User?.data.user.roleId !== "1" &&
        //     User?.data.user.roleId !== "2"
        // ) {
        //     alert("dont have permission");
        //     navigate("/");
        // }
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

    const handleRefresh = async (e) => {
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
    // Tính số lượng trang
    const pageCount = Math.ceil(catalogList?.data.catalogs.count / PAGE_SIZE);
    // Lấy danh sách người dùng hiển thị trên trang hiện tại
    const categoryToShow = catalogList?.data.catalogs.catalogs.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );
    const getRoot = (parentId) => {
        const parentCategory = rootList?.data.roots.roots.find(
            (category) => category.id === parentId
        );

        // Nếu tìm thấy, trả về tên danh mục cha, ngược lại trả về null
        return parentCategory ? parentCategory.name : null;
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
                        <div className="fl-table">
                            <div className="thead">
                                <div>Tên danh mục</div>
                                <div>Danh mục thuộc</div>
                            </div>
                            <div className="body">
                                {catalogList &&
                                    categoryToShow?.map((catalog, index) => (
                                        <div className="tbody" key={catalog.id}>
                                            <div>{catalog.name}</div>
                                            {/* <div>{catalog.rootcategory_id}</div> */}
                                            <div>
                                                {catalog.rootcategory_id
                                                    ? getRoot(
                                                          catalog.rootcategory_id
                                                      )
                                                    : "Danh mục chính"}
                                            </div>
                                        </div>
                                    ))}

                                {!catalogList && (
                                    <div>
                                        <h3>Không có dữ liệu</h3>
                                    </div>
                                )}
                                <div className="addBtn">
                                    <button
                                        onClick={(e) => handleOpen("add", null)}
                                    >
                                        + Add Category <span> </span>
                                        <i className="fas fa-table"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
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
