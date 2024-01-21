import React, { useState } from "react";
import { searchProduct } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router";
import "../Styles/Dropdown.scss";

const Search = () => {
    const [keyword, setKey] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    const navigate = useNavigate();
    const history = useHistory();
    const search = async (e) => {
        e.preventDefault();
        await searchProduct(keyword, dispatch);
        navigate(`/searchResult?keyword=${keyword}`);
    };

    return (
        <>
            {!currentUser ? (
                <>
                    <span className="arrow-upSearch"></span>
                    <div className="dropdownSearch">
                        <div className="dropdown-contentSearch">
                            <form className="formdataSearch" onSubmit={search}>
                                <div className="dropdown-titleSearch">
                                    <h4 className="searchTitle">
                                        TÌM KIẾM SẢN PHẨM
                                    </h4>
                                </div>
                                <label>
                                    <input
                                        placeholder="Tìm kiếm tên sản phẩm"
                                        className="searchInput"
                                        onChange={(e) => setKey(e.target.value)}
                                        required
                                    />
                                    <button id="searchBtn" type="submit">
                                        <i className="fa-solid fa-magnifying-glass "></i>
                                    </button>
                                </label>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <span className="arrow-upSearchLogged"></span>
                    <div className="dropdownSearchLogged">
                        <div className="dropdown-contentSearch">
                            <form className="formdataSearch" onSubmit={search}>
                                <div className="dropdown-titleSearch">
                                    <h4 className="searchTitle">
                                        TÌM KIẾM SẢN PHẨM
                                    </h4>
                                </div>
                                <label>
                                    <input
                                        placeholder="Tìm kiếm tên sản phẩm"
                                        className="searchInput"
                                        onChange={(e) => setKey(e.target.value)}
                                        required
                                    />
                                    <button id="searchBtn" type="submit">
                                        <i className="fa-solid fa-magnifying-glass "></i>
                                    </button>
                                </label>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Search;
