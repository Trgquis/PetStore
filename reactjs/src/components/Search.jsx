import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import "../Styles/Search.scss";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [showResults, setShowResults] = useState(false); // Thêm state để kiểm soát việc hiển thị kết quả tìm kiếm
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchResults = useSelector(
        (state) => state?.sales.ProductSearchInfo
    );

    useEffect(() => {
        // Hàm này sẽ được gọi mỗi khi keyword thay đổi
        const timer = setTimeout(() => {
            // Thực hiện tìm kiếm khi keyword không trống
            if (keyword.trim() !== "") {
                searchProduct(keyword, dispatch);
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        }, 500); // Đợi 500ms sau khi ngừng nhập để thực hiện tìm kiếm

        // Clear timeout trước khi gọi lại useEffect để tránh việc gọi tìm kiếm nhiều lần
        return () => clearTimeout(timer);
    }, [keyword, dispatch]);

    return (
        <>
            <span className="arrow-upSearch"></span>
            <div className="dropdownSearch">
                <div className="dropdown-contentSearch">
                    <form className="formdataSearch">
                        <div className="dropdown-titleSearch">
                            <h4 className="searchTitle">TÌM KIẾM SẢN PHẨM</h4>
                        </div>
                        <label>
                            <input
                                placeholder="Tìm kiếm tên sản phẩm"
                                className="searchInput"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                required
                            />
                            <button
                                id="searchBtn"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Thực hiện tìm kiếm khi người dùng nhấn nút
                                    if (keyword.trim() !== "") {
                                        searchProduct(keyword, dispatch);
                                        setShowResults(true);
                                    }
                                }}
                            >
                                <i className="fa-solid fa-magnifying-glass "></i>
                            </button>
                        </label>
                    </form>
                    {/* Hiển thị kết quả tìm kiếm khi có từ khóa và kết quả không rỗng */}
                    <div className="searchresultmodal">
                        {showResults && keyword.trim() !== "" && (
                            <div className="searchresultcontent">
                                <h3 className="searchTitle">
                                    Kết quả tìm kiếm:
                                </h3>
                                {searchResults &&
                                searchResults.data &&
                                searchResults.data.products &&
                                searchResults.data.products.length > 0 ? (
                                    <ul className="searchResults">
                                        {searchResults.data.products.map(
                                            (result, index) => (
                                                <li key={index}>
                                                    {result.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p>Không tìm thấy kết quả phù hợp.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
