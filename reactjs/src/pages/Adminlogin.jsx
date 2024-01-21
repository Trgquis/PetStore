import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";
import { loginAdmin, loginUser } from "../redux/apiRequest";

import "../Styles/Login.scss";
// const handleLoginApi = require('../services/userService');

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let handleadminLogin = async (e) => {
        try {
            e.preventDefault();
            const user = {
                email: email,
                password: password,
            };
            // console.log(user)
            await loginAdmin(user, dispatch);
            navigate("/manage");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div id="login-content">
            <form className="box" onSubmit={handleadminLogin}>
                <h1>Đăng Nhập</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="ps"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type="submit" name="submit" />
            </form>
        </div>
    );
}
