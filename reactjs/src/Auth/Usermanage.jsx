import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import {
    deleteCatalog,
    deleteUser,
    handlegetAllCatalogs,
    handlegetAllRoots,
    handlegetAllUsers,
} from "../redux/apiRequest";
import ManagePagination from "../components/MangePagination";
import UserInformation from "../components/UserInformation";
import "../Styles/Table.scss";
import "bootstrap/dist/css/bootstrap.css";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CustomAlert from "../components/CustomAlert";
import ConfirmationModal from "../components/ConfirmationModal";
import UserModal from "../components/UserModal";
import Modal from "react-modal";
const PAGE_SIZE = 25;
Modal.setAppElement("#root"); // Change #root to the appropriate selector for your root element

const Usermanage = () => {
    const dispatch = useDispatch();
    const User = useSelector((state) => state.auth.currentUser);
    const userList = useSelector((state) => state?.users.allUsers);
    console.log(userList);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    let [id, setId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState();
    const [mess, setMess] = useState();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteInfo, setdeleteUser] = useState(null);
    console.log(User);
    useEffect(() => {
        try {
            // handlegetAllCatalogs(dispatch);
            handlegetAllUsers(dispatch);
            // handlegetAllRoots(dispatch);
        } catch (e) {
            console.log("Lỗi fetch dữ liệu", e);
        }
    }, []);

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

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

    // Trong hàm handleDeleteUser
    const handleDeleteUser = async (user) => {
        try {
            console.log(user);
            setdeleteUser(user); // Truyền user thay vì user trực tiếp
            setShowDeleteConfirmation(true);
        } catch (e) {
            console.log(e);
            alert("Error");
        }
    };

    // Trong hàm confirmDelete
    const confirmDelete = async () => {
        try {
            if (deleteInfo) {
                console.log("info", deleteInfo);
                let res = await deleteUser(dispatch, deleteInfo.id);
                console.log(res);
                if (res) {
                    setStatus(0);
                    setMess("Xóa người dùng thành công");
                    handleShowAlert();
                } else if (!res) {
                    setStatus(1);
                    setMess("Xóa người dùng thất bại");
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
        setMess("Xóa người dùng thất bại");
        handleShowAlert();
        setShowDeleteConfirmation(false);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const pageCount = Math.ceil(userList?.data.users.count / PAGE_SIZE);
    const categoryToShow = userList?.data.users.users.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    );

    return (
        <>
            <div className="main">
                <div className="content">
                    <div className="userInformation">
                        <h4>Quản lý người dùng</h4>
                        <div className="addBtn">
                            <Button onClick={(e) => handleOpen(null)}>
                                + Thêm sản phẩm <span> </span>
                                <i className="fas fa-table"></i>
                            </Button>
                        </div>

                        {/* <Link to="/manage">Quản lý người dùng</Link>
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
                    {User && <UserInformation User={User.data} />} */}
                    </div>

                    <div className="table-wrapper">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Họ</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Số điện thoại</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryToShow?.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            {user.gender === 0 ? "nam" : "nữ"}
                                        </td>
                                        <td>{user.phonenumber}</td>
                                        <td>
                                            <FaPencilAlt
                                                className="pen"
                                                onClick={(e) =>
                                                    handleOpen("edit", user.id)
                                                }
                                            />
                                            <RiDeleteBin5Fill
                                                className="bin"
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {!userList && (
                                    <tr>
                                        <td colSpan="7">
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
            {modal && (
                <div className="modal-container">
                    {!id ? (
                        <UserModal
                            isOpen={modal}
                            userId={id}
                            onClose={handleClose}
                        />
                    ) : (
                        <UserModal
                            isOpen={modal}
                            userId={id}
                            onClose={handleClose}
                        />
                    )}
                </div>
            )}
            <ConfirmationModal
                isOpen={showDeleteConfirmation}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                // message={`Bạn có chắc muốn xóa người dùng: ${deleteUserInfo.email}?`}
                message={`Bạn có chắc muốn xóa người dùng`}
            />

            <CustomAlert
                message={mess || ""}
                type={status}
                isOpen={showAlert}
                onClose={handleCloseAlert}
            />
        </>
    );
};

export default Usermanage;
