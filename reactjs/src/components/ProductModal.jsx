import React, { useState, useEffect } from "react";
import { AddProduct } from "../redux/apiRequest";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "../Styles/Modal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { editProduct } from "../redux/apiRequest";

function ProductModal({ isOpen, mode, productId, onClose }) {
    // const User = useSelector((state) => state.auth.currentUser)
    // // console.log(User)
    const [catalogId, setcatalogId] = useState();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [priceDisplay, setPriceDisplay] = useState();
    const [content, setContent] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [Editquantity, setEditQuantity] = useState(0);
    const [discount, setDiscount] = useState();
    const [img, setImg] = useState();

    const [EditcatalogId, setEditcatalogId] = useState();
    const [Editname, setEditName] = useState("");
    const [Editprice, setEditPrice] = useState(0);
    const [EditpriceDisplay, setEditPriceDisplay] = useState();
    const [Editcontent, setEditContent] = useState("");
    const [Editdiscount, setEditDiscount] = useState();
    const [Editimg, setEditImg] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const catalogList = useSelector((state) => state?.sales.allCatalogs.data);
    const catalogChildList = useSelector(
        (state) => state?.sales.allChilds.data
    );
    // console.log("ádasd", catalogChildList);
    useEffect(() => {
        if (productId) {
            // console.log(productId);
            const fetchData = async () => {
                const results = await axios.get(
                    "http://localhost:8888/api/getproduct/?id=" + productId
                );
                // console.log(results.data.product);
                let data = results.data.product;
                setEditcatalogId(data.catalog_id);
                setEditName(data.name);
                setEditPrice(data.price);
                setEditQuantity(data.quantity);
                // setEditPriceDisplay(data.lastName);
                setEditContent(data.content);
                setEditDiscount(data.discount);
                // setEditImg(data.gender);
            };
            fetchData();
        }
    }, [productId]);
    let handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("catalog_id", catalogId);
        formData.append("name", name);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("content", content);
        formData.append("discount", discount);
        if (img.length === 4) {
            for (let i = 0; i < img.length; i++) {
                formData.append("productPhotos", img[i]);
            }
        } else {
            alert("Allow only 4 images");
            return console.error(
                `allow upload 4 images but got ${img.length} images`
            );
        }

        // console.log(formData.get(name));
        AddProduct(formData, dispatch, navigate);
    };
    // console.log(productId);
    let handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", productId);
        formData.append("name", Editname);
        formData.append("catalog_id", EditcatalogId);
        formData.append("price", Editprice);
        formData.append("content", Editcontent);
        formData.append("discount", Editdiscount);
        if (Editimg.length === 4) {
            for (let i = 0; i < Editimg.length; i++) {
                formData.append("productPhotos", Editimg[i]);
            }
        } else {
            alert("Allow only 4 images");
            return console.error(
                `allow upload 4 images but got ${img.length} images`
            );
        }
        await editProduct(formData, dispatch);
    };
    const handlePriceChange = (e) => {
        const value = e.target.value;
        const formattedValue = value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setPriceDisplay(formattedValue);
        setPrice(parseFloat(formattedValue.replace(/,/g, "")));
    };

    // console.log(img);
    if (!isOpen) {
        return null;
    }

    return (
        <Modal size="xl" isOpen={isOpen} className="userModal">
            <ModalHeader isOpen={isOpen}>
                {mode === "add" ? "Add Product" : "Edit Product Information"}
            </ModalHeader>
            <ModalBody className="modal-body">
                {mode === "add" ? (
                    <Form
                        onSubmit={(e) => handleAddProduct(e)}
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <Form.Group className="Edit-input" catalogId="name">
                            <label>Tên sản phẩm</label>
                            <Form.Control
                                value={name}
                                type="text"
                                placeholder="name of product"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="Edit-input"
                            controlId="catalog_id"
                        >
                            <Form.Label>Danh mục của sản phẩm</Form.Label>
                            <Form.Control
                                as="select"
                                value={catalogId}
                                onChange={(e) => setcatalogId(e.target.value)}
                            >
                                <option value="#">Chọn</option>
                                {catalogList?.catalogs.catalogs.map(
                                    (catalog) => (
                                        <option
                                            key={catalog.id}
                                            value={catalog.id}
                                        >
                                            {catalog.name}
                                        </option>
                                    )
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="Edit-input" controlId="price">
                            <Form.Label>Giá niêm yết</Form.Label>
                            <Form.Control
                                value={priceDisplay}
                                type="text"
                                placeholder="100,000"
                                onChange={handlePriceChange}
                            />
                            {/* <Form.Control value={formatPrice(priceDisplay)} type="text" placeholder='100,000' onChange={handlePriceChange}/> */}
                        </Form.Group>
                        <Form.Group className="Edit-input" controlId="discount">
                            <Form.Label>Phần trăm giảm giá</Form.Label>
                            <Form.Control
                                value={discount}
                                type="text"
                                placeholder="Ex: 10.5"
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </Form.Group>
                        <div className="Edit-input">
                            <Form.Label>Tải lên hình ảnh</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                placeholder=""
                                onChange={(e) => setImg(e.target.files)}
                                multiple
                            />
                        </div>
                        <Form.Group className="Edit-input" controlId="quantity">
                            <Form.Label>Số lượng tồn kho</Form.Label>
                            <Form.Control
                                value={quantity}
                                type="number"
                                placeholder="Ex: 200"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="Edit-input " controlId="content">
                            <Form.Label>Mô tả sản phẩm</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                type="text"
                                className="content-box"
                                placeholder="content of product"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" color="primary">
                            Thêm
                        </Button>{" "}
                    </Form>
                ) : (
                    <Form
                        onSubmit={(e) => handleUpdateProduct(e)}
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <Form.Group className="Edit-input" catalogId="name">
                            <label>Name</label>
                            <Form.Control
                                value={Editname}
                                type="text"
                                placeholder="name of product"
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="Edit-input"
                            controlId="catalog_id"
                        >
                            <Form.Label>Catalog Name</Form.Label>
                            <Form.Control
                                as="select"
                                value={EditcatalogId}
                                onChange={(e) =>
                                    setEditcatalogId(e.target.value)
                                }
                            >
                                <option value="#">Select catalog name</option>
                                <option value="0">Thức ăn cho mèo</option>
                                <option value="1">Thức ăn cho chó</option>
                                <option value="2">Thú cưng</option>
                                <option value="3">Vật phẩm thú cưng</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="Edit-input" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={Editprice}
                                type="text"
                                placeholder="100,000"
                                onChange={handlePriceChange}
                            />
                            {/* <Form.Control value={formatPrice(priceDisplay)} type="text" placeholder='100,000' onChange={handlePriceChange}/> */}
                        </Form.Group>
                        <Form.Group className="Edit-input" controlId="discount">
                            <Form.Label>Discount percent</Form.Label>
                            <Form.Control
                                value={Editdiscount}
                                type="text"
                                placeholder="Ex: 10.5"
                                onChange={(e) =>
                                    setEditDiscount(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="Edit-input" controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                value={Editquantity}
                                type="number"
                                placeholder="Ex: 200"
                                onChange={(e) =>
                                    setEditQuantity(e.target.value)
                                }
                            />
                        </Form.Group>
                        <div className="Edit-input">
                            <Form.Label>Upload image</Form.Label>
                            <Form.Control
                                type="file"
                                value={Editimg}
                                name="image"
                                placeholder=""
                                onChange={(e) => setEditImg(e.target.files)}
                                multiple
                            />
                        </div>
                        <Form.Group className="Edit-input " controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={Editcontent}
                                type="text"
                                className="content-box"
                                placeholder="content of product"
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" color="primary">
                            Update
                        </Button>{" "}
                    </Form>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProductModal;
