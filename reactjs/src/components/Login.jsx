import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Styles/Dropdown.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        await loginUser(user, dispatch);
        navigate("/");
    };

    return (
        <>
            <span className="arrow-up"></span>
            <div className="dropdown">
                <div className="dropdown-content">
                    <div className="dropdown-title">
                        <div className="Login--title">ĐĂNG NHẬP TÀI KHOẢN</div>
                        <div className="LoginDetail--title">
                            Nhập email và mật khẩu của bạn
                        </div>
                    </div>
                    <form className="formdata" onSubmit={handleLogin}>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            id="ps"
                            placeholder="Password"
                            type="password"
                            name="password"
                            className="ps"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="login--btn" type="submit">
                            Đăng nhập
                        </button>
                    </form>
                    <div className="Login--opt">
                        <div>
                            Khách hàng mới?{" "}
                            <Link to="/regrist">Tạo tài khoản</Link>
                        </div>
                        <br />
                        <div id="reset-ps">
                            Quên mật khẩu? <Link>Khôi phục mật khẩu</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
