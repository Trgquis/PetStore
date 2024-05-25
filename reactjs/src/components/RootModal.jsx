import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from "reactstrap";
import { handlegetAllRoots } from "../redux/apiRequest";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const RootModal = ({ isOpen, onClose }) => {
    const rootList = useSelector((state) => state?.sales.allRoots);
    const dispatch = useDispatch();
    const [rootCategories, setRootCategories] = useState([]);
    const [addRoot, setAddRoot] = useState(false);
    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        handlegetAllRoots(dispatch);
    }, [dispatch]);

    useEffect(() => {
        setRootCategories(rootList?.data?.roots?.roots || []);
    }, [rootList]);

    const updateRootCategoryPriority = async (updatedCategories) => {
        try {
            await axios.put(
                "http://localhost:8888/api/dragroot",
                updatedCategories
            );
            // console.log("Successfully updated root category priority");
            handlegetAllRoots(dispatch);
        } catch (error) {
            console.error("Error updating root category priority", error);
        }
    };

    const onDragEnd = (result) => {
        const destination = result.destination.index;
        const draggableId = result.draggableId;
        const source = result.source.index;
        // console.log(destination);
        const requestData = {
            movedId: draggableId,
            destinationIndex: destination + 1,
            sourceIndex: source,
        };
        updateRootCategoryPriority(requestData);
        handlegetAllRoots(dispatch);
    };

    const handleEditClick = (index, name) => {
        setEdit(!edit);
        // console.log(index);
        setEditingIndex(index);
        setEditName(name);
    };

    const handleEditRoot = async () => {
        const data = {
            id: editingIndex,
            name: editName,
        };
        const res = await axios.put("http://localhost:8888/api/editroot", data);
        // console.log(res);
        handlegetAllRoots(dispatch);
        setEditingIndex(null);
    };
    const handleDeleteRoot = async (id) => {
        const res = await axios.delete(
            `http://localhost:8888/api/deleteroot/?id=${id}`
        );
        // console.log(res);
        setEditingIndex(null);
        handlegetAllRoots(dispatch);
    };
    const handleAddRoot = async () => {
        // console.log("first");
        const res = await axios.post(
            "http://localhost:8888/api/create-new-root",
            { name }
        );
        // console.log(res);
        setAddRoot(false);
        handlegetAllRoots(dispatch);
    };

    const handleInputChange = (event, index) => {
        const newValue = event.target.value;
        const updatedRootCategories = [...rootCategories];
        updatedRootCategories[index] = {
            ...updatedRootCategories[index],
            name: newValue,
        };
        setRootCategories(updatedRootCategories);
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Cài đặt loại danh mục</ModalHeader>
            <ModalBody>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="rootCategories">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {rootCategories.map((root, index) => (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Draggable
                                            key={root.id}
                                            draggableId={root.id.toString()}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <tr>
                                                        <td className="drag-handle">
                                                            <div className="dot-row">
                                                                <div className="dot"></div>
                                                                <div className="dot"></div>
                                                            </div>
                                                            <div className="dot-row">
                                                                <div className="dot"></div>
                                                                <div className="dot"></div>
                                                            </div>
                                                            <div className="dot-row">
                                                                <div className="dot"></div>
                                                                <div className="dot"></div>
                                                            </div>
                                                        </td>
                                                        {edit &&
                                                        editingIndex ===
                                                            root.id ? (
                                                            <td>
                                                                <Input
                                                                    type="text"
                                                                    value={
                                                                        editName
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        setEditName(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <Button
                                                                    onClick={
                                                                        handleEditRoot
                                                                    }
                                                                >
                                                                    Xác Nhận
                                                                </Button>
                                                                <Button
                                                                    onClick={() =>
                                                                        handleDeleteRoot(
                                                                            editingIndex
                                                                        )
                                                                    }
                                                                >
                                                                    Xóa danh mục
                                                                </Button>
                                                            </td>
                                                        ) : (
                                                            <td
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        root.id,
                                                                        root.name
                                                                    )
                                                                }
                                                            >
                                                                {root.name}
                                                            </td>
                                                        )}
                                                    </tr>
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {addRoot && (
                    <>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button onClick={() => handleAddRoot()}>Thêm</Button>
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setAddRoot(!addRoot)}>
                    {addRoot ? `Ngừng thêm` : `Thêm danh mục`}
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default RootModal;
