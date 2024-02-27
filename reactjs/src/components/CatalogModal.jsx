import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddCatalog, editCatalog } from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import "../Styles/Modal.scss";
import axios from "axios";

function CatalogModal({ isOpen, mode, catalogId, onClose }) {
    const [name, setName] = useState("");
    const [parent_id, setParentId] = useState("");
    const [sort_order, setSort] = useState("");
    const [Editname, setEditName] = useState("");
    const [Editparent_id, setEditParentId] = useState("");
    const [Editsort_order, setEditSort] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [parentCatalogs, setParentCatalogs] = useState([]);
    const [shouldUpdateCatalogs, setShouldUpdateCatalogs] = useState(false);

    useEffect(() => {
        fetchParentCatalogs();
    }, [shouldUpdateCatalogs]);

    const fetchParentCatalogs = async () => {
        const results = await axios.get(
            "http://localhost:8888/api/getAllRoots"
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
        <div className="custom-modal">
            <div className="modal-content">
                <h2>{mode === "add" ? "Add Category" : "Edit Category"}</h2>
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
                        <div className="modal-footer">
                            <button onClick={(e) => handUpdateCatalog(e)}>
                                Update
                            </button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CatalogModal;
