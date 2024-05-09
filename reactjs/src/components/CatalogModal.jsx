import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AddCatalog,
    AddChild,
    editCatalog,
    handlegetAllChilds,
    handlegetAllRoots,
} from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
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
    const axios = require("axios");
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState();
    const [mess, setMess] = useState();

    const toggleAlert = () => setShowAlert(!showAlert);

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
        const res = await AddChild(catalog, dispatch, navigate);
        if (res === 0) {
            setStatus(res);
            setMess("Thêm danh mục thành công!");
            toggleAlert();
        } else if (res === 1) {
            setStatus(res);
            setMess("Thiếu dữ liệu");
            toggleAlert();
        }
    };
    const handUpdateCatalog = async (e) => {
        e.preventDefault();
        const id = catalogId;
        const Editcatalog = {
            id: id,
            name: Editname,
            parent_id: Editparent_id,
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
            toggleAlert();
            handlegetAllChilds(dispatch)
        } else if (response.data.errCode === 1) {
            setStatus(response.data.errCode);
            setMess("Thiếu dữ liệu");
            toggleAlert();
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>
                {!catalogId ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    {!catalogId ? (
                        <>
                            <FormGroup>
                                <Label for="catalogName">Tên danh mục</Label>
                                <Input
                                    type="text"
                                    id="catalogName"
                                    placeholder="catalogName"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="parent-id">Loại danh mục</Label>
                                <Input
                                    type="select"
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
                                </Input>
                            </FormGroup>
                        </>
                    ) : (
                        <>
                            <FormGroup>
                                <Label for="editCatalogName">
                                    Tên danh mục
                                </Label>
                                <Input
                                    type="text"
                                    id="editCatalogName"
                                    value={Editname}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="editParent-id">
                                    Danh mục thuộc
                                </Label>
                                <Input
                                    type="select"
                                    id="editParent-id"
                                    value={Editparent_id}
                                    onChange={(e) =>
                                        setEditParentId(
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    <option value={""}>
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
                                </Input>
                            </FormGroup>
                        </>
                    )}
                </Form>
            </ModalBody>
            <ModalFooter>
                {!catalogId ? (
                    <Button
                        color="primary"
                        onClick={(e) => handleAddCatalog(e)}
                    >
                        Add
                    </Button>
                ) : (
                    <Button
                        color="primary"
                        onClick={(e) => handUpdateCatalog(e)}
                    >
                        Update
                    </Button>
                )}
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
            <CustomAlert
                message={mess}
                type={status}
                isOpen={showAlert}
                onClose={toggleAlert}
            />
        </Modal>
    );
}

export default CatalogModal;
