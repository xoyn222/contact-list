import React, { useState, useEffect } from 'react';

const ContactForm = ({ groups, addContact, closeForm, initialData }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [group, setGroup] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPhone(initialData.phone);
            setGroup(initialData.group || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !phone) return;

        addContact({ name, phone, group });
        setName('');
        setPhone('');
        setGroup('');
        closeForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label>ФИО</label>
                <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label>Номер</label>
                <input
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Группа</label>
                <select
                    className="form-select"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                >
                    <option value="">Без группы</option>
                    {groups.map((g, i) => (
                        <option key={i} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" type="submit">
                Сохранить
            </button>
        </form>
    );
};

export default ContactForm;