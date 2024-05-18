import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AddCatalog,
    AddUser,
    editCatalog,
    editUser,
    handlegetAllRoots,
} from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import "../Styles/Modal.scss";
import axios from "axios";
import CustomAlert from "./CustomAlert";
import { handlegetAllUsers } from "../redux/apiRequest";
function UserModal({ isOpen, userId, onClose }) {
    const [email, setemail] = useState("");
    const [lastName, setlastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [Address, setAddress] = useState("");
    const [Gender, setGender] = useState();
    const [Phone, setPhone] = useState();
    const [password, setPassword] = useState();
    //
    const [Editemail, setEditemail] = useState("");
    const [EditlastName, setEditlastName] = useState("");
    const [EditfirstName, setEditfirstName] = useState("");
    const [EditAddress, setEditAddress] = useState("");
    const [EditGender, setEditGender] = useState();
    const [EditPhone, setEditPhone] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState();
    const [mess, setMess] = useState();
    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const generateRandomPassword = () => {
        const length = 10; // Set the desired length of the password
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let newPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset[randomIndex];
        }
        setPassword(newPassword);
    };
    const roleId = 0;
    useEffect(() => {
        try {
            if (userId) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(
                            `https://petstore-backend-pgof.onrender.com/api/getuser/?id=${userId}`
                        );
                        const userInfo = response.data.user; // Adjust based on your API response structure
                        console.log(userInfo);
                        setEditemail(userInfo.email);
                        setEditlastName(userInfo.lastName);
                        setEditfirstName(userInfo.firstName);
                        setEditAddress(userInfo.address);
                        setEditGender(userInfo.gender);
                        setEditPhone(userInfo.phonenumber);
                    } catch (error) {
                        console.error("Error fetching category details", error);
                    }
                };

                // Call the function to fetch category details
                fetchUserData();
            }
            generateRandomPassword();
            handlegetAllUsers(dispatch);
        } catch (e) {
            console.log(e);
        }
    }, []);

    let validate = (user) => {
        console.log(user);
        if (
            !user.email ||
            !user.lastName ||
            !user.firstName
            // !user.address ||
            // !user.phonenumber ||
            // !user.gender ||
            // !user.roleId
        ) {
            console.log("missing parameter");
            return false;
        } else {
            return true;
        }
    };

    let handleAddUser = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName,
            address: Address,
            roleId: roleId,
            gender: parseInt(Gender),
            phonenumber: parseInt(Phone),
        };
        if (validate(userData) !== true) {
            return false;
        }
        const res = await AddUser(userData, dispatch, navigate);
        if (res === 0) {
            setStatus(res);
            setMess("Thêm người dùng thành công!");
            handleShowAlert();
        } else if (res === 1) {
            setStatus(res);
            setMess("Thiếu dữ liệu");
            handleShowAlert();
        }
    };
    const handUpdateCatalog = async (e) => {
        e.preventDefault();
        const id = userId;
        const EditUserData = {
            id: id,
            email: Editemail,
            lastName: EditlastName,
            firstName: EditfirstName,
            address: EditAddress,
            gender: EditGender,
            phonenumber: EditPhone,
        };
        console.log(EditUserData);
        if (validate(EditUserData) !== true) {
            alert("not valid");
            return false;
        }
        const response = await editUser(EditUserData, dispatch);
        console.log(response);
        if (response.data.errCode === 0) {
            setStatus(response.data.errCode);
            setMess("Chỉnh sửa thông tin thành công!");
            console.log(status, mess);
            handleShowAlert();
        } else if (response.data.errCode === 1) {
            setStatus(response.data.errCode);
            setMess("Thiếu dữ liệu");
            handleShowAlert();
        }
    };

    if (!isOpen) {
        return null;
    }
    return (
        <div
            className="custom-modal"
            style={{
                position: "absolute",
                display: "flex",
                backgroundColor: "#fff",
                width: "700px",
                top: "30%",
                left: "30%",
                boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
        >
            <div className="modal-content">
                <h2>
                    {userId === null
                        ? "Thêm người dùng"
                        : "Sửa thông tin người dùng"}
                </h2>
                {userId === null ? (
                    <>
                        <div className="Edit-input">
                            <label>Địa chỉ email</label>
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Họ</label>
                            <input
                                type="text"
                                placeholder="Họ người dùng"
                                onChange={(e) => setlastName(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Tên</label>
                            <input
                                type="text"
                                placeholder="Tên người dùng"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                onChange={(e) =>
                                    setPhone(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Giới tính</label>
                            <select
                                value={Gender}
                                onChange={(e) =>
                                    setGender(parseInt(e.target.value))
                                }
                            >
                                <option value="">-- Giới tính --</option>
                                <option value="0">Nam</option>
                                <option value="1">Nữ</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button onClick={(e) => handleAddUser(e)}>
                                Xác nhận
                            </button>
                            <button onClick={onClose}>Hủy</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="Edit-input">
                            <label>Địa chỉ email</label>
                            <input
                                type="text"
                                placeholder="email người dùng"
                                value={Editemail}
                                onChange={(e) => setEditemail(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Họ</label>
                            <input
                                type="text"
                                placeholder="Họ người dùng"
                                value={EditlastName}
                                onChange={(e) =>
                                    setEditlastName(e.target.value)
                                }
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Tên</label>
                            <input
                                type="text"
                                placeholder="Tên người dùng"
                                value={EditfirstName}
                                onChange={(e) =>
                                    setEditfirstName(e.target.value)
                                }
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                placeholder="Địa chỉ người dùng"
                                value={EditAddress}
                                onChange={(e) => setEditAddress(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                placeholder="Số điện thoại người dùng"
                                value={EditPhone}
                                onChange={(e) =>
                                    setEditPhone(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Giới tính</label>
                            <select
                                value={EditGender}
                                onChange={(e) =>
                                    setEditGender(parseInt(e.target.value))
                                }
                            >
                                <option value="">-- Giới tính --</option>
                                <option value="0">Nam</option>
                                <option value="1">Nữ</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button onClick={(e) => handUpdateCatalog(e)}>
                                Update
                            </button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    </>
                )}
                <CustomAlert
                    message={mess}
                    type={status}
                    isOpen={showAlert}
                    onClose={handleCloseAlert}
                />
            </div>
        </div>
    );
}

export default UserModal;
