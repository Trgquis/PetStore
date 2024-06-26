import React, { useEffect, useState } from "react";
import { registerUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import("../Styles/Regist.scss");
export default function Regist() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
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

    const handleRegist = async (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName,
            address: address,
            gender: parseInt(gender),
            phonenumber: parseInt(phonenumber),
        };

        try {
            const res = await registerUser(newUser, dispatch, navigate);
            setStatus(res);
            if (res === 0) {
                setMess("Tạo tài khoản thành công!");
            } else {
                setMess("Tạo tài khoản thất bại!");
            }
            handleShowAlert();
        } catch (error) {
            console.error(error);
            // Handle registration failure if needed
        }
    };

    useEffect(() => {
        document.title = "Đăng ký | HappyPet"
    })
    return (
        <div id="content">
            <form id="box" name="refg" onSubmit={handleRegist}>
                <table>
                    <h1>Đăng Ký</h1>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    id="emailreg"
                                    type="email"
                                    name="name"
                                    required
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="password"
                                    name="pass"
                                    placeholder="Mật Khẩu"
                                    required
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Họ"
                                    required
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Tên"
                                    required
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Địa chỉ"
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    id="gender"
                                    type="radio"
                                    name="gender"
                                    value="0"
                                    required
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                Nam
                                <input
                                    id="gender"
                                    type="radio"
                                    name="gender"
                                    value="1"
                                    required
                                    onChange={(e) =>
                                        setGender(parseInt(e.target.value))
                                    }
                                />
                                Nữ
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <input
                                    id="sdt"
                                    type="text"
                                    name="sdt"
                                    required
                                    placeholder="Số Điện Thoại"
                                    onChange={(e) =>
                                        setPhonenumber(parseInt(e.target.value))
                                    }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td id="confirm">
                                <button type="submit">Đăng ký</button>
                                <button type="reset">Hủy</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <CustomAlert
                message={mess}
                type={status}
                isOpen={showAlert}
                onClose={handleCloseAlert}
            />
        </div>
    );
}
