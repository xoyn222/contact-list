import React from 'react';

const ContactList = ({ contacts }) => {
    if (contacts.length === 0) {
        return <p className="text-center text-muted">Список контактов пуст</p>;
    }

    return (
        <ul className="list-group">
            {contacts.map((contact, index) => (
                <li key={index} className="list-group-item">
                    <div><strong>{contact.name}</strong></div>
                    <div>{contact.phone}</div>
                    {contact.group && <small className="text-muted">Группа: {contact.group}</small>}
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
