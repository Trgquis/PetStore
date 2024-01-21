import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AddCatalog, editCatalog } from "../redux/apiRequest";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Styles/Modal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function CatalogModal({ isOpen, mode, catalogId, onClose }) {
    // const User = useSelector((state) => state.auth.currentUser)
    // console.log(User)
    const [name, setName] = useState("");
    const [parent_id, setParentId] = useState("");
    const [sort_order, setSort] = useState("");
    const [Editname, setEditName] = useState("");
    const [Editparent_id, setEditParentId] = useState("");
    const [Editsort_order, setEditSort] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [parentCatalogs, setParentCatalogs] = useState([]);
    const [shouldUpdateCatalogs, setShouldUpdateCatalogs] = useState(false); // Thêm state mới

    useEffect(() => {
        fetchParentCatalogs();
    }, [shouldUpdateCatalogs]); // Thêm shouldUpdateCatalogs vào mảng dependency của useEffect

    const fetchParentCatalogs = async () => {
        const results = await axios.get(
            "http://localhost:8081/api/get-all-catalogs"
        );
        console.log(results.data.catalogs);
        const catalogs = results.data.catalogs.catalogs;
        setParentCatalogs(catalogs);
        setEditName(catalogs.name);
        setEditParentId(catalogs.parent_id);
        setEditSort(catalogs.sort_order);
    };

    let validate = (catalog) => {
        let isValid = true;
        if (
            !catalog.name ||
            // !catalog.parent_id ||
            !catalog.sort_order ||
            catalog.sort_order <= 0 ||
            catalog.sort_order > 99
        ) {
            isValid = false;
            console.log("missing parameter");
        }

        return isValid;
    };
    const allSortOrders = [];

    let inspectSortOrder = (catalog) => {
        allSortOrders.push(catalog);
        console.log(allSortOrders);
        return true;
    };

    let handleAddCatalog = async (e) => {
        e.preventDefault();
        const catalog = {
            name: name,
            parent_id: parseInt(parent_id),
            sort_order: parseInt(sort_order),
        };
        console.log(catalog);
        if (validate(catalog) !== true) {
            alert("Không thành công! Vui lòng kiểm tra lại");
            return false;
        }
        if (inspectSortOrder(catalog) !== true) {
            alert("Vị trí đã được sắp xếp trước đó");
            return false;
        }
        await AddCatalog(catalog, dispatch, navigate);
        await fetchParentCatalogs();
        // setShouldUpdateCatalogs(!shouldUpdateCatalogs); // Cập nhật giá trị state mới
    };

    const handUpdateCatalog = async (e) => {
        const id = { catalogId }.catalogId;
        console.log(id);
        const Editcatalog = {
            id: id,
            name: name,
            parent_id: parent_id,
            sort_order: sort_order,
        };
        console.log(Editcatalog);
        if (validate(Editcatalog) !== true) {
            alert("not valid");
            return false;
        }
        await editCatalog(Editcatalog, dispatch);
        await fetchParentCatalogs();
    };

    if (!isOpen) {
        return null;
    }
    return (
        <Modal size="xl" isOpen={isOpen} className="userModal">
            <ModalHeader isOpen={isOpen}>
                {mode === "add" ? "Add Category" : "Edit Category"}
            </ModalHeader>
            <ModalBody>
                {mode === "add" ? (
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
                            <label htmlFor="parent-id">Danh mục thuộc</label>
                            <select
                                id="parent-id"
                                value={parent_id}
                                onChange={(e) =>
                                    setParentId(parseInt(e.target.value))
                                }
                            >
                                <option value="">
                                    -- Select parent catalog --
                                </option>
                                <option value="">Danh mục chính</option>
                                {parentCatalogs?.map((catalog) => (
                                    <option key={catalog.id} value={catalog.id}>
                                        {catalog.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="Edit-input">
                            <label>Thứ tự hiển thị</label>

                            <input
                                type="number"
                                min={1}
                                max={99}
                                placeholder="số thứ tự "
                                onChange={(e) => setSort(e.target.value)}
                            />
                        </div>
                        <div className="sort_note">
                            LƯU Ý: <br />
                            + Nhập số từ 1 đến 99 để sắp xếp thứ tự hiển thị các
                            danh mục. Số càng nhỏ, danh mục sẽ được hiển thị
                            trước.
                            <br />+ Thứ tự sắp xếp không được trùng nhau cho
                            chung một danh mục
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
                                    -- Select parent catalog --
                                </option>
                                {parentCatalogs?.map((catalog) => (
                                    <option key={catalog.id} value={catalog.id}>
                                        {catalog.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="Edit-input">
                            <label>Thứ tự hiển thị</label>
                            <input
                                type="number"
                                min={1}
                                max={99}
                                value={Editsort_order}
                                placeholder="số thứ tự "
                                onChange={(e) => setEditSort(e.target.value)}
                            />
                        </div>
                        <div className="sort_note">
                            LƯU Ý: <br />
                            + Nhập số từ 1 đến 99 để sắp xếp thứ tự hiển thị các
                            danh mục. Số càng nhỏ, danh mục sẽ được hiển thị
                            trước.
                            <br />+ Thứ tự sắp xếp không được trùng nhau cho
                            chung một danh mục
                        </div>
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e) => handleAddCatalog(e)}>
                    Add
                </Button>{" "}
                <Button color="primary" onClick={(e) => handUpdateCatalog(e)}>
                    Update
                </Button>{" "}
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CatalogModal;
