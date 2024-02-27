// File: RootModal.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDrag, useDrop } from "react-dnd";

// Đặt ItemTypes trong cùng file
const ItemTypes = {
    ROOT_CATEGORY: "rootCategory",
};

function RootModal({ isOpen, mode, rootId, onClose }) {
    const [rootCategories, setRootCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8888/api/getAllRoots");
                setRootCategories(response.data);
            } catch (error) {
                console.error("Error fetching root categories:", error);
            }
        };

        fetchData();
    }, []);

    const moveCard = (dragIndex, hoverIndex) => {
        const draggedCard = rootCategories[dragIndex];
        setRootCategories((prev) => {
            const updated = [...prev];
            updated.splice(dragIndex, 1);
            updated.splice(hoverIndex, 0, draggedCard);
            return updated;
        });
    };

    const Card = ({ id, name, priority, index }) => {
        const [, drag] = useDrag({
            type: ItemTypes.ROOT_CATEGORY,
            item: { id, index },
        });

        const [, drop] = useDrop({
            accept: ItemTypes.ROOT_CATEGORY,
            hover: (item) => {
                if (item.index !== index) {
                    moveCard(item.index, index);
                    item.index = index;
                }
            },
        });

        return (
            <tr ref={(node) => drag(drop(node))} key={id}>
                <td>{id}</td>
                <td>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            handleChange(id, "name", e.target.value)
                        }
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={priority}
                        onChange={(e) =>
                            handleChange(id, "priority", e.target.value)
                        }
                    />
                </td>
                <td>
                    <button onClick={() => handleEdit(id)}>Edit</button>
                </td>
            </tr>
        );
    };

    const handleChange = (id, field, value) => {
        setRootCategories((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleEdit = (id) => {
        console.log("Edit root category with id:", id);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rootCategories.map((rootCategory, index) => (
                        <Card
                            key={rootCategory.id}
                            id={rootCategory.id}
                            name={rootCategory.name}
                            priority={rootCategory.priority}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RootModal;
