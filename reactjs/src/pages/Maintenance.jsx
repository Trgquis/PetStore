import React from "react";
import { Link } from "react-router-dom";
export default function Maintenance() {
    return (
        <div style={{ height: "40vh", textAlign: "center" }}>
            <h2 style={{ marginTop: "30vh" }}>
                Chức năng đang được phát triển. Bạn vui lòng quay lại sau nhé!{" "}
                <br />
                <Link style={{ textDecoration: "none", color: "grey" }} to="/">
                    Trở về trang chủ
                </Link>
            </h2>
        </div>
    );
}
