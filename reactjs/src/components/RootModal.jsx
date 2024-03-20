// Trong RootModal.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handlegetAllRoots } from "../redux/apiRequest";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const RootModal = ({ isOpen, onClose }) => {
    const rootList = useSelector((state) => state?.sales.allRoots);
    const dispatch = useDispatch();
    const [rootCategories, setRootCategories] = useState([]);

    useEffect(() => {
        handlegetAllRoots(dispatch);
    }, []);

    useEffect(() => {
        setRootCategories(rootList?.data?.roots?.roots || []);
    }, [rootList]);

    const updateRootCategoryPriority = async (updatedCategories) => {
        try {
            console.log(updatedCategories);
            await axios.put(
                "http://localhost:8888/api/dragroot",
                updatedCategories
            );
            console.log("Successfully updated root category priority");
            // Sau khi cập nhật, làm mới danh sách
            handlegetAllRoots(dispatch);
        } catch (error) {
            console.error("Error updating root category priority", error);
        }
    };

    const onDragEnd = (result) => {
        // Xử lý logic kéo thả
        const destination = result.destination.index;
        const draggableId = result.draggableId;
        const source = result.source.index;

        // Tạo đối tượng để cập nhật priority
        const requestData = {
            movedId: draggableId,
            destinationIndex: destination,
            sourceIndex: source,
        };
        console.log(requestData);
        // Gọi hàm cập nhật priority
        updateRootCategoryPriority(requestData);
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
                                    <Draggable
                                        key={root.id}
                                        draggableId={root.id.toString()}
                                        index={index}
                                    >
                                        {(
                                            provided,
                                            snapshot // Thêm provided và snapshot vào đây
                                        ) => (
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
                                                    <td>{root.name}</td>
                                                </tr>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default RootModal;
