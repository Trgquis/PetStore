import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AddUser, editUser } from "../redux/apiRequest";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Modal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
function UserModal({ isOpen, mode, userId, onClose }) {
    // const User = useSelector((state) => state.auth.currentUser)
    // console.log(User)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [roleId, setRoleId] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const [Editemail, setEditEmail] = useState("");
    const [Editpassword, setEditPassword] = useState("");
    const [EditfirstName, setEditFirstName] = useState("");
    const [EditlastName, setEditLastName] = useState("");
    const [Editaddress, setEditAddress] = useState("");
    const [EditroleId, setEditRoleId] = useState("");
    const [Editgender, setEditGender] = useState("");
    const [Editphonenumber, setEditPhonenumber] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let validateUser = (user) => {
        let isValid = true;
        if (
            !user.email ||
            !user.firstName ||
            !user.lastName ||
            !user.password ||
            !user.address ||
            !user.roleId ||
            !user.phonenumber ||
            !user.password
        ) {
            isValid = false;
            console.log("missing parameter");
        }

        return isValid;
    };
    let handleAddUser = async (e) => {
        e.preventDefault();
        const user = {
            // id: userId
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            roleId: roleId,
            gender: gender,
            phonenumber: phonenumber,
        };
        if (validateUser(user) !== true) {
            alert("not valid");
            return false;
        }
        AddUser(user, dispatch, navigate);
    };

    const handleUpdateUser = (e) => {
        const id = { userId }.userId;
        console.log(id);
        const Edituser = {
            id: id,
            email: Editemail,
            // password: Editpassword,
            firstName: EditfirstName,
            lastName: EditlastName,
            address: Editaddress,
            roleId: EditroleId,
            gender: Editgender,
            phonenumber: Editphonenumber,
        };
        console.log(Edituser);
        editUser(Edituser, dispatch);
    };

    useEffect(() => {
        if (userId) {
            console.log(userId);
            const fetchData = async () => {
                const results = await axios.get(
                    "http://localhost:8081/api/get-user/?id=" + userId
                );
                console.log(results.data.user);
                let data = results.data.user;
                setEditEmail(data.email);
                setEditPassword(data.password);
                setEditFirstName(data.firstName);
                setEditLastName(data.lastName);
                setEditAddress(data.address);
                setEditRoleId(data.roleId);
                setEditGender(data.gender);
                setEditPhonenumber(data.phonenumber);
            };
            fetchData();
        }
    }, [userId]);
    if (!isOpen) {
        return null;
    }
    return (
        <Modal size="xl" isOpen={isOpen} className="userModal">
            <ModalHeader isOpen={isOpen}>
                {mode === "add" ? "Add User" : "Edit User Information"}
            </ModalHeader>
            <ModalBody>
                {mode === "add" ? (
                    <>
                        <div className="Edit-input">
                            <label>Email</label>
                            <input
                                value={email}
                                type="text"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Password</label>
                            <input
                                value={password}
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div value={firstName} className="Edit-input">
                            <label>FistName</label>
                            <input
                                type="text"
                                placeholder="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div value={lastName} className="Edit-input">
                            <label>lastName</label>
                            <input
                                type="text"
                                placeholder="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div value={address} className="Edit-input">
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div value={gender} className="Edit-input">
                            <label>Gender</label>
                            <select
                                name="gender"
                                onChange={(e) =>
                                    setGender(parseInt(e.target.value))
                                }
                            >
                                <option value="">....Giới tính....</option>
                                <option value={0}>Nam</option>
                                <option value={1}>Nu</option>
                            </select>
                        </div>
                        <div value={roleId} className="Edit-input">
                            <label>RoleId</label>
                            <select
                                name="roleId"
                                onChange={(e) => setRoleId(e.target.value)}
                            >
                                <option value="">....Role Id....</option>
                                <option value="1">Admin</option>
                                <option value="2">User(Customer)</option>
                            </select>
                        </div>
                        <div value={phonenumber} className="Edit-input">
                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="phonenumber"
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="Edit-input">
                            <label>Email</label>
                            <input
                                value={Editemail}
                                type="text"
                                placeholder="email"
                                onChange={(e) => setEditEmail(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>FistName</label>
                            <input
                                value={EditfirstName}
                                type="text"
                                placeholder="firstName"
                                onChange={(e) =>
                                    setEditFirstName(e.target.value)
                                }
                            />
                        </div>
                        <div className="Edit-input">
                            <label>lastName</label>
                            <input
                                value={EditlastName}
                                type="text"
                                placeholder="lastName"
                                onChange={(e) =>
                                    setEditLastName(e.target.value)
                                }
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Address</label>
                            <input
                                value={Editaddress}
                                type="text"
                                placeholder="address"
                                onChange={(e) => setEditAddress(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label>Gender</label>
                            <select
                                value={Editgender}
                                name="gender"
                                onChange={(e) =>
                                    setEditGender(parseInt(e.target.value))
                                }
                            >
                                <option value="">....Giới tính....</option>
                                <option value={0}>Nam</option>
                                <option value={1}>Nu</option>
                            </select>
                        </div>
                        <div className="Edit-input">
                            <label>RoleId</label>
                            <select
                                value={EditroleId}
                                name="roleId"
                                onChange={(e) => setEditRoleId(e.target.value)}
                            >
                                <option value="">....Role Id....</option>
                                <option value="1">Admin</option>
                                <option value="2">Khách hàng</option>
                            </select>
                        </div>
                        <div className="Edit-input">
                            <label>Phone</label>
                            <input
                                value={Editphonenumber}
                                type="text"
                                placeholder="phonenumber"
                                onChange={(e) =>
                                    setEditPhonenumber(e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                {mode === "add" ? (
                    <>
                        <Button
                            color="primary"
                            onClick={(e) => handleAddUser(e)}
                        >
                            Add
                        </Button>{" "}
                    </>
                ) : (
                    <>
                        <Button
                            color="primary"
                            onClick={(e) => handleUpdateUser(e)}
                        >
                            Edit
                        </Button>{" "}
                    </>
                )}
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UserModal;
