import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteUser } from "../redux/apiRequest";
import UserModal from "../components/UserModal";
import { handlegetAllUsers } from "../redux/apiRequest";
import Slider from "react-slick";
import ManagePagination from "../components/MangePagination";
import UserInformation from "../components/UserInformation";
const PAGE_SIZE = 10; // số lượng người dùng hiển thị trên một trang

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
const Usermanage = () => {
    const User = useSelector((state) => state.auth.currentUser);
    const userList = useSelector((state) => state.users?.users.allUsers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState();
    let [id, setId] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    console.log(userList);
    useEffect(() => {
        // if (User) {
        //     alert("Login first");
        //     navigate("/adminLogin");
        // } else {
        //     if (
        //         User?.data.accessToken &&
        //         parseInt(User?.data.user.roleId) === 0
        //     ) {
        //         console.log(User.data.user.accessToken);
        //         handlegetAllUsers(User.data.user.accessToken);
        //     } else {
        //         alert("dont have permission");
        //         navigate("/");
        //     }
        // }
    }, []);
    const handleOpen = async (mode, userId) => {
        try {
            setModal(true);
            setMode(mode);
            setId(userId);
            console.log(userId);
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
            let res = await handlegetAllUsers(dispatch);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    const handleDeleteUser = async (user) => {
        try {
            console.log(user.id);
            console.log(User?.data.accessToken);
            alert("Delete Success!");

            let res = await deleteUser(
                User?.data.accessToken,
                dispatch,
                user.id
            );
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
    const pageCount = Math.ceil(userList?.data.users.count / PAGE_SIZE);
    // Lấy danh sách người dùng hiển thị trên trang hiện tại
    const usersToShow = userList?.data.users.users.slice(
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
    console.log(User);

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
                        <div>
                            Tổng số người dùng: {userList?.data.users.count}
                        </div>
                        <div>
                            <button
                                className="addUser-btn"
                                onClick={(e) => {
                                    handleOpen("add", null);
                                }}
                            >
                                Add New User <span> </span>
                                <i className="fa-regular fa-user"></i>
                            </button>
                            {modal && (
                                <UserModal
                                    isOpen={modal}
                                    mode={mode}
                                    userId={id}
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
                    </div>
                    <table className="fl-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Họ</th>
                                <th>Tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Quyền hạn</th>
                                <th>Số ĐT</th>
                                <th>Ảnh đại diện</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {userList?.data.users.users.map((user) => { */}
                            {usersToShow?.map((user) => {
                                let roleName;
                                switch (user.roleId) {
                                    case "1":
                                        roleName = "Admin";
                                        break;
                                    case "2":
                                        roleName = "Khách hàng";
                                        break;
                                    default:
                                        roleName = "Unknown";
                                }
                                return (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            {user.gender === 0 ? "Nam" : "Nữ"}
                                        </td>
                                        <td>{roleName}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>
                                            {userList.data.users &&
                                                userList.data.users.avatars &&
                                                userList.data.users.avatars
                                                    .length === 0 && (
                                                    <div
                                                        className="slider-image"
                                                        key={user.id}
                                                    >
                                                        <Slider {...settings}>
                                                            <img
                                                                src="http://localhost:8081/images/avatars/defaultAvatar.jpg"
                                                                alt=""
                                                            />
                                                        </Slider>
                                                    </div>
                                                )}
                                            {userList.data.users &&
                                                userList.data.users.avatars &&
                                                userList.data.users.avatars
                                                    .filter(
                                                        (item) =>
                                                            item.user_id ===
                                                            user.id
                                                    )
                                                    .map((item) => (
                                                        <div
                                                            className="slider-image"
                                                            key={user.id}
                                                        >
                                                            <Slider
                                                                {...settings}
                                                            >
                                                                <img
                                                                    src={`http://localhost:8081/${item.path}`}
                                                                    alt=""
                                                                />
                                                            </Slider>
                                                        </div>
                                                    ))}
                                        </td>

                                        <td className="userAction">
                                            <button
                                                id={user.id}
                                                value="edit"
                                                className="edit"
                                                onClick={(e) => {
                                                    handleOpen(
                                                        "edit",
                                                        e.target.id
                                                    );
                                                }}
                                            >
                                                Edit <span> </span>{" "}
                                                <i className="fa-solid fa-user-pen"></i>
                                            </button>
                                            <button
                                                className="deleteUser-btn"
                                                onClick={() =>
                                                    handleDeleteUser(user)
                                                }
                                            >
                                                Delete <span> </span>{" "}
                                                <i className="fa-solid fa-user-minus"></i>
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
export default Usermanage;
