import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import {
    AddProduct,
    handlegetAllCatalogs,
    handlegetAllChilds,
} from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/Modal.scss";
import axios from "axios";
const ProductDescription = ({ isOpen, productId, onClose }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("0");
    const [discount, setDiscount] = useState("");
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [productDescription, setProductDescription] = useState("");
    //
    const [Editname, setEditName] = useState("");
    const [Editprice, setEditPrice] = useState();
    const [Editdiscount, setEditDiscount] = useState("");
    const [Editamount, setEditAmount] = useState("");
    const [EditcategoryId, setEditCategoryId] = useState("");
    const [EdituploadedImages, setEditUploadedImages] = useState([]);
    const [EditproductDescription, setEditProductDescription] = useState("");
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const childList = useSelector((state) => state?.sales.allChilds);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            console.log(productId);
            const fetchData = async () => {
                const results = await axios.get(
                    "http://localhost:8888/api/getProduct/?id=" + productId
                );
                console.log(results.data.product);
                const productdata = results.data.product;
                setEditName(productdata.product.name);
                setEditCategoryId(productdata.product.category_id);
                setEditDiscount(productdata.product.discount);
                setEditPrice(productdata.product.price);
                setEditProductDescription(productdata.product.content);
                setEditAmount(productdata.product.amount);
                if (productdata.images) {
                    // Assuming images are in an array format
                    setEditUploadedImages(productdata.images);
                }
            };
            fetchData();
        }
        handlegetAllChilds(dispatch);
    }, [productId]);
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }], // Thêm tùy chọn chọn màu chữ và nền
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background", // Thêm định dạng màu chữ và nền
        "list",
        "bullet",
        "link",
        "image",
        "video",
    ];

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    let convertPrice = (price) => {
        let numericPrice = price.replace(/[^\d]/g, "");

        // Chuyển đổi chuỗi số thành một số thực và định dạng giá tiền
        let formattedPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(parseFloat(numericPrice));

        return formattedPrice;
    };
    let convertEditPrice = (price) => {
        // Chuyển đổi chuỗi số thành một số thực và định dạng giá tiền
        let formattedPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(parseFloat(price));

        return formattedPrice;
    };
    console.log(typeof price);
    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };
    const handleDescriptionChange = (content) => {
        setProductDescription(content);
    };
    const submitProductDescription = () => {
        const productData = {
            name: name,
            price: price,
            discount: parseFloat(discount),
            content: productDescription,
            category_id: parseInt(categoryId),
            amount: parseInt(amount),
        };
        console.log("Dữ liệu sản phẩm:", productData);
        console.log(uploadedImages);
        const formData = new FormData();
        formData.append("category_id", productData.category_id);
        formData.append("name", productData.name);
        formData.append("amount", productData.amount);
        formData.append("price", parseFloat(productData.price));
        formData.append("content", productData.content);
        formData.append("discount", productData.discount);
        if (uploadedImages.length === 4) {
            for (let i = 0; i < uploadedImages.length; i++) {
                formData.append("productPhotos", uploadedImages[i]);
            }
        } else {
            alert("Vui lòng upload đủ 4 ảnh");
            return console.error(
                `allow upload 4 images but got ${uploadedImages.length} images`
            );
        }
        AddProduct(formData, dispatch);
    };
    const onDrop = (acceptedFiles) => {
        if (
            acceptedFiles &&
            acceptedFiles.length > 0 &&
            uploadedImages.length < 4
        ) {
            const uploadedFile = acceptedFiles[0];
            const updatedImages = [...uploadedImages, uploadedFile];
            setUploadedImages(updatedImages);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const deleteImage = (index) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);
        setUploadedImages(updatedImages);
    };

    if (!isOpen) {
        return false;
    }

    return (
        <div className="layout">
            <div className="productManage">
                {!productId ? (
                    <>
                        <h2>Tạo sản phẩm</h2>
                        <h5>Thông tin sản phẩm</h5>
                        <div className="section">
                            <div className="insection1">
                                <div>Tên sản phẩm</div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="insection1">
                                <div>Đơn giá</div>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>
                            <div className="section2">
                                <div className="insection2">
                                    <div>Tỉ lệ giảm</div>
                                    <input
                                        type="text"
                                        value={discount}
                                        onChange={handleDiscountChange}
                                    />
                                </div>
                                <div className="insection2">
                                    <div>Số lượng nhập kho</div>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </div>
                            </div>
                            <div className="section3">
                                <div className="insection3"></div>
                                <div className="insection3">
                                    <div>Loại danh mục</div>
                                    <select
                                        value={categoryId}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">
                                            -- Loại danh mục --
                                        </option>
                                        {childList?.data.childs.childs.map(
                                            (catalog) => (
                                                <option
                                                    key={catalog.id}
                                                    value={catalog.id}
                                                >
                                                    {catalog.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="line"></div>

                        <h5>Hình ảnh sản phẩm</h5>
                        <div className="image-upload-container-group">
                            {uploadedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="image-upload-container"
                                    style={{ width: "100px", height: "100px" }}
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                        className="uploaded-image"
                                        onClick={() => deleteImage(index)}
                                    />
                                    {index < 4 && (
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteImage(index)}
                                            style={{
                                                backgroundColor: "#fff",
                                                padding: "2px",
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            ))}
                            {uploadedImages.length < 4 && (
                                <div
                                    {...getRootProps()}
                                    className="image-upload-container"
                                    style={{ width: "100px", height: "100px" }}
                                >
                                    <input {...getInputProps()} />
                                    <p>Thêm ảnh</p>
                                </div>
                            )}
                        </div>

                        <h5>Mô tả sản phẩm</h5>
                        <div className="quill">
                            {/* <ReactQuill
                                value={productDescription}
                                onChange={handleDescriptionChange}
                                modules={modules}
                                formats={formats}
                            /> */}
                            <ReactQuill
                                theme="snow"
                                value={productDescription}
                                onChange={handleDescriptionChange}
                                modules={modules}
                                formats={formats}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Chỉnh sửa thông tin sản phẩm</h2>
                        <h5>Thông tin sản phẩm</h5>
                        <div className="line"></div>
                        <div className="section">
                            <div className="insection1">
                                <div>Tên sản phẩm</div>
                                <input
                                    type="text"
                                    value={Editname}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="insection1">
                                <div>Đơn giá</div>
                                <input
                                    type="text"
                                    value={convertEditPrice(Editprice)}
                                    onChange={(e) =>
                                        setEditPrice(e.target.value)
                                    }
                                />
                            </div>
                            <div className="section2">
                                <div className="insection2">
                                    <div>Tỉ lệ giảm</div>
                                    <input
                                        type="text"
                                        value={Editdiscount}
                                        onChange={(e) =>
                                            setEditDiscount(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="insection2">
                                    <div>Số lượng nhập kho</div>
                                    <input
                                        type="text"
                                        value={Editamount}
                                        onChange={(e) =>
                                            setEditAmount(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="section3">
                                <div className="insection3"></div>
                                <div className="insection3">
                                    <div>Loại danh mục</div>
                                    <select
                                        value={EditcategoryId}
                                        onChange={(e) =>
                                            setEditCategoryId(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Loại danh mục --
                                        </option>
                                        {childList?.data.childs.childs.map(
                                            (catalog) => (
                                                <option
                                                    key={catalog.id}
                                                    value={catalog.id}
                                                >
                                                    {catalog.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <h5>Hình ảnh sản phẩm</h5>
                        <div className="image-upload-container-group">
                            {EdituploadedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="image-upload-container"
                                    style={{ width: "100px", height: "100px" }}
                                >
                                    <img
                                        src={image.secure_url}
                                        alt=""
                                        className="uploaded-image"
                                        onClick={() => deleteImage(index)}
                                    />
                                    {index < 4 && (
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteImage(index)}
                                            style={{
                                                backgroundColor: "#fff",
                                                padding: "2px",
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            ))}
                            {EdituploadedImages.length < 4 && (
                                <div
                                    {...getRootProps()}
                                    className="image-upload-container"
                                    style={{ width: "100px", height: "100px" }}
                                >
                                    <input {...getInputProps()} />
                                    <p>Thêm ảnh</p>
                                </div>
                            )}
                        </div>

                        <h5>Mô tả sản phẩm</h5>
                        <div className="line"></div>
                        <div className="quill">
                            <ReactQuill
                                value={EditproductDescription}
                                onChange={(value) =>
                                    setEditProductDescription(value)
                                }
                                modules={modules}
                                formats={formats}
                                theme="snow"
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="modal-footer">
                <button onClick={submitProductDescription}>Xác nhận</button>
                <button onClick={onClose}>Hủy</button>
            </div>
        </div>
    );
};

export default ProductDescription;
