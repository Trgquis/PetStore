import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { AddProduct, handlegetAllCatalogs } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/Modal.scss";
import axios from "axios";
const ProductDescription = ({ isOpen, productId, onClose }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [discount, setDiscount] = useState("");
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [productDescription, setProductDescription] = useState("");
    //
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState();
    const [editDiscount, setEditDiscount] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editCategoryId, setEditCategoryId] = useState("");
    const [editUploadedImages, setEditUploadedImages] = useState([]);
    const [editProductDescription, setEditProductDescription] = useState("");
    const catalogList = useSelector((state) => state?.sales.allCatalogs);
    const dispatch = useDispatch();
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    useEffect(() => {
        if (productId) {
            console.log(productId);
            const fetchData = async () => {
                const results = await axios.get(
                    "http://localhost:8888/api/getProduct/?id=" + productId
                );
                console.log(results.data.product);
                let data = results.data.product;
                setEditCategoryId(data.category_id);
                setEditName(data.name);
                setEditPrice(data.price);
                setAmount(data.amount);
                setEditPrice(data.lastName);
                setEditProductDescription(data.content);
                setEditDiscount(data.discount);
                // setEditUploadedImages(data.);
            };
            fetchData();
        }
        handlegetAllCatalogs(dispatch);
    }, []);
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
    ];
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        // Loại bỏ các ký tự không phải là số và không phải là dấu phẩy
        let value = e.target.value.replace(/[^\d.]/g, "");
        // Thêm dấu phẩy sau mỗi 3 chữ số
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Cập nhật giá trị vào state
        setPrice(value);
    };
    let convertPrice = (price) => {
        let converted = parseFloat(price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        return converted;
    };
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
        <div className="layout" st>
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
                                        {catalogList?.data.catalogs.catalogs.map(
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
                        <div className="line"></div>
                        <div className="quill">
                            <ReactQuill
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
                                        {catalogList?.data.catalogs.catalogs.map(
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
                        <div className="line"></div>
                        <div className="quill">
                            <ReactQuill
                                value={productDescription}
                                onChange={handleDescriptionChange}
                                modules={modules}
                                formats={formats}
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
