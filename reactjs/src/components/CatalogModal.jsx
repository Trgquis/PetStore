import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AddCatalog,
    editCatalog,
    handlegetAllRoots,
} from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import "../Styles/Modal.scss";
import axios from "axios";
import CustomAlert from "./CustomAlert";
function CatalogModal({ isOpen, catalogId, onClose }) {
    const [name, setName] = useState("");
    const [rootcategory_id, setroot_id] = useState("");
    const [Editname, setEditName] = useState("");
    const [Editparent_id, setEditParentId] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rootList = useSelector((state) => state?.sales.allRoots);
    const catalogList = useSelector((state) => state?.sales.allCatalogs);

    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState();
    const [mess, setMess] = useState();
    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    useEffect(() => {
        try {
            if (catalogId) {
                const fetchCategoryDetails = async () => {
                    try {
                        const response = await axios.get(
                            `http://localhost:8888/api/getChild/?id=${catalogId}`
                        );
                        const categoryDetails = response.data; // Adjust based on your API response structure
                        console.log(categoryDetails);
                        // Set the fetched data to the state variables
                        setEditName(categoryDetails.child.child.name);
                        setEditParentId(categoryDetails.child.child.parent_id);
                    } catch (error) {
                        console.error("Error fetching category details", error);
                    }
                };

                // Call the function to fetch category details
                fetchCategoryDetails();
            }
            handlegetAllRoots(dispatch);
        } catch (e) {
            console.log(e);
        }
    }, []);

    let validate = (catalog) => {
        let isValid = true;
        if (!catalog.name || !catalog.parent_id) {
            isValid = false;
            console.log("missing parameter");
        }
        return isValid;
    };

    let handleAddCatalog = async (e) => {
        e.preventDefault();
        const catalog = {
            name: name,
            parent_id: parseInt(rootcategory_id),
        };
        console.log(catalog);
        if (validate(catalog) !== true) {
            return false;
        }
        const res = await AddCatalog(catalog, dispatch, navigate);
        if (res === 0) {
            setStatus(res);
            setMess("Thêm danh mục thành công!");
            handleShowAlert();
        } else if (res === 1) {
            setStatus(res);
            setMess("Thiếu dữ liệu");
            handleShowAlert();
        }
    };
    const handUpdateCatalog = async (e) => {
        e.preventDefault();
        const id = catalogId;
        const Editcatalog = {
            id: id,
            name: Editname,
            rootcategory_id: Editparent_id,
        };
        console.log(Editcatalog);
        if (validate(Editcatalog) !== true) {
            alert("not valid");
            return false;
        }
        const response = await editCatalog(Editcatalog, dispatch);
        console.log(response.data.errCode);
        if (response.data.errCode === 0) {
            setStatus(response.data.errCode);
            setMess("Chỉnh sửa danh mục thành công!");
            console.log(status, mess);
            handleShowAlert();
        } else if (response.data.errCode === 1) {
            setStatus(response.data.errCode);
            setMess("Thiếu dữ liệu");
            handleShowAlert();
        }
    };

    if (!isOpen) {
        return null;
    }
    return (
        <div className="custom-modal">
            <div className="modal-content">
                <h2>{catalogId === null ? "Add Category" : "Edit Category"}</h2>
                {catalogId === null ? (
                    <>
                        <div className="Edit-input">
                            <label>Tên danh mục</label>
                            <input
                                type="text"
                                placeholder="catalogName"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label htmlFor="parent-id">Loại danh mục</label>
                            <select
                                id="parent-id"
                                value={rootcategory_id}
                                onChange={(e) =>
                                    setroot_id(parseInt(e.target.value))
                                }
                            >
                                <option value="">
                                    -- Chọn loại danh mục --
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
                        <div className="modal-footer">
                            <button onClick={(e) => handleAddCatalog(e)}>
                                Add
                            </button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="Edit-input">
                            <label>Tên danh mục</label>
                            <input
                                type="text"
                                placeholder="catalogName"
                                value={Editname}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </div>
                        <div className="Edit-input">
                            <label htmlFor="parent-id">Danh mục thuộc</label>
                            <select
                                id="parent-id"
                                value={Editparent_id}
                                onChange={(e) =>
                                    setEditParentId(parseInt(e.target.value))
                                }
                            >
                                <option value="">
                                    -- Chọn loại danh mục --
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
                        <div className="modal-footer">
                            <button onClick={(e) => handUpdateCatalog(e)}>
                                Update
                            </button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    </>
                )}
                <CustomAlert
                    message={mess}
                    type={status}
                    isOpen={showAlert}
                    onClose={handleCloseAlert}
                />
            </div>
        </div>
    );
}

export default CatalogModal;
