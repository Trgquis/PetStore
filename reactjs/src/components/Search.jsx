import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Search.scss";

const Search = ({ keyword }) => {
    const [showResults, setShowResults] = useState(false);
    const [searchKey, setSearchKey] = useState(""); // Sử dụng state để lưu trữ từ khóa tìm kiếm
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state?.auth.currentUser);
    const searchResults = useSelector(
        (state) => state?.sales.ProductSearchInfo
    );
    // console.log(searchResults);
    useEffect(() => {
        setSearchKey(keyword); // Cập nhật giá trị của searchKey mỗi khi keyword thay đổi

        const timer = setTimeout(() => {
            if (keyword.trim() !== "") {
                // Sử dụng keyword thay vì searchKey ở đây
                searchProduct(keyword, dispatch);
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword, dispatch]);

    let convertPrice = (price) => {
        let converted = new Intl.NumberFormat(
            { style: "currency", currency: "VND" },
            "vnd"
        ).format(price);
        return converted;
    };

    const handleClickItem = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <>
            {!User ? (
                <span className="arrow-upSearch "></span>
            ) : (
                <span className="arrow-upSearchLogged "></span>
            )}
            <span className="arrow-upSearch "></span>
            <div className="dropdown-contentSearch">
                {showResults && keyword.trim() !== "" && (
                    <div className="searchresultcontent">
                        {searchResults &&
                        searchResults.data &&
                        searchResults.data.products &&
                        searchResults.data.products.length > 0 ? (
                            <>
                                <div className="searchResults">
                                    {searchResults?.data.products
                                        .slice(0, 5)
                                        .map((result, index) => (
                                            <div
                                                key={index}
                                                className="inforsearch"
                                                onClick={() =>
                                                    handleClickItem(result.id)
                                                }
                                            >
                                                <div className="productInfo-name">
                                                    <Link
                                                        to={`/detail/${result.id}`}
                                                    >
                                                        {result.name}
                                                    </Link>
                                                    <p className="price-search">
                                                        {convertPrice(
                                                            result.price
                                                        )}{" "}
                                                        ₫
                                                    </p>
                                                </div>
                                                {searchResults?.data.images
                                                    .filter(
                                                        (image) =>
                                                            image.product_id ===
                                                            result.id
                                                    )
                                                    .slice(0, 1)
                                                    .map((item, imgIndex) => (
                                                        <div
                                                            className="thumbnail"
                                                            key={imgIndex}
                                                        >
                                                            <img
                                                                alt="Hình ảnh"
                                                                className="product-image"
                                                                src={`${item.secure_url}`}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        ))}
                                    {searchResults?.data.count > 5 && (
                                        <div className="more">
                                            <Link>
                                                Xem thêm{" "}
                                                {searchResults?.data.count - 5}{" "}
                                                sản phẩm
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>Không tìm thấy kết quả phù hợp.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;
