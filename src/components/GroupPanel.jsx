import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Импорт иконки

const GroupPanel = ({ groups, addGroup, deleteGroup }) => {
    const [newGroup, setNewGroup] = useState('');

    const handleAdd = () => {
        if (newGroup.trim()) {
            addGroup(newGroup.trim());
            setNewGroup('');
        }
    };

    return (
        <div>
            {groups.map((group, i) => (
                <div key={i} className="d-flex align-items-center mb-2">
                    <input className="form-control me-2" value={group} readOnly />
                    <button
                        className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                        onClick={() => deleteGroup(group)}
                        style={{ width: '36px', height: '36px' }}
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}
            <div className="mt-3">
                <input
                    className="form-control mb-2"
                    placeholder="Новая группа"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAdd}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default GroupPanel;
