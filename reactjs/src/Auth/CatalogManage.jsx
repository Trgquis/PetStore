import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteCatalog, handlegetAllCatalogs } from "../redux/apiRequest";
import ManagePagination from "../components/MangePagination";
import "../Styles/Table.scss";
import UserInformation from "../components/UserInformation";
import CatalogModal from "../components/CatalogModal";
const PAGE_SIZE = 12; // số lượng người dùng hiển thị trên một trang

const CategoryList = ({ categories }) => {
    const getCategoryName = (parentId) => {
        const parentCategory = categories.find(
            (category) => category.id === parentId
        );
        return parentCategory ? parentCategory.name : "";
    };

    const renderCategory = (category) => {
        return (
            <td key={category.id}>
                {category.name}
                {category.children && (
                    <td>
                        {category.children.map((childCategory) =>
                            renderCategory(childCategory)
                        )}
                    </td>
                )}
            </td>
        );
    };

    // Lọc danh mục con theo điều kiện parent_id = id
    const filteredCategories = categories.filter((category) => {
        const childCategory = categories.find(
            (child) => child.parent_id === category.id
        );
        return !!childCategory;
    });
    console.log(filteredCategories)

    return (
        <ul>
            {filteredCategories.map((filteredCategory) =>
                renderCategory({
                    ...filteredCategory,
                    parentName: getCategoryName(filteredCategory.id),
                })
            )}
        </ul>
    );
};

const CatalogManage = () => {
    const User = useSelector((state) => state.auth.currentUser);
    const catalogList = useSelector((state) => state?.sales.allCatalogs.data);
    const catalogChildList = useSelector((state) => state?.sales);
    console.log(catalogChildList);
    console.log(User);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    let [id, setId] = useState("");
    console.log(catalogList);
    // console.log(productList)

    const handleOpen = async (mode, categoryId) => {
        try {
            setModal(true);
            setMode(mode);
            setId(categoryId);
            console.log(categoryId);
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
    const pageCount = Math.ceil(catalogList?.catalogs.count / PAGE_SIZE);
    // Lấy danh sách người dùng hiển thị trên trang hiện tại
    const categoryToShow = catalogList?.catalogs.catalogs.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    useEffect(() => {
        if (!User) {
            // console.log('asdsa')
            alert("Login first");
            navigate("/salesLogin");
        } else if (
            User?.data.user.accessToken &&
            User?.data.user.roleId === "1"
        ) {
            console.log(User.data.user.accessToken);
            handlegetAllCatalogs(User.data.user.accessToken);
        } else if (
            User?.data.user.roleId !== "1" &&
            User?.data.user.roleId !== "2"
        ) {
            alert("dont have permission");
            navigate("/");
        }
    }, []);

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
                            onClick={(e) => handleOpen("add", null)}
                        >
                            Add Category <span> </span>
                            <i className="fas fa-table"></i>
                        </button>
                        {modal && (
                            <CatalogModal
                                isOpen={modal}
                                mode={mode}
                                catalogId={id}
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
                                <th>ID</th>
                                <th>Tên danh mục</th>
                                <th>Danh mục thuộc</th>
                                <th>Vị trí sắp xếp</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {catalogChildList &&
                                catalogList &&
                                categoryToShow?.map((catalog) => {
                                    return (
                                        <tr key={catalog.id}>
                                            <td>{catalog.id}</td>
                                            <td>{catalog.name}</td>
                                            {!catalog.parent_id ? (
                                                <td>Danh mục chính</td>
                                            ) : (
                                                <td>{catalog.parent_id}</td>
                                            )}

                                            <td>{catalog.sort_order}</td>
                                            <td className="userAction">
                                                <button
                                                    id={catalog.id}
                                                    className="edit"
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
                                                        handleDeleteCatalog(
                                                            catalog
                                                        )
                                                    }
                                                >
                                                    Delete <span> </span>{" "}
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            {!catalogList && (
                                <div>
                                    <h3>Không có dữ liệu</h3>
                                </div>
                            )}
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
export default CatalogManage;
