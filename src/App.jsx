import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import GroupPanel from './components/GroupPanel';
import GroupedContactList from './components/GroupedContactList';

import './index.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState(['Друзья', 'Коллеги']);
    const [showContactSidebar, setShowContactSidebar] = useState(false);
    const [showGroupSidebar, setShowGroupSidebar] = useState(false);

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const storedGroups = JSON.parse(localStorage.getItem('groups')) || ['Друзья', 'Коллеги'];
        setContacts(storedContacts);
        setGroups(storedGroups);
    }, []);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        localStorage.setItem('groups', JSON.stringify(groups));
    }, [groups]);

    const addContact = (contact) => setContacts([...contacts, contact]);

    const addGroup = (groupName) => {
        if (!groups.includes(groupName)) setGroups([...groups, groupName]);
    };

    const deleteGroup = (groupName) => {
        setGroups(groups.filter(g => g !== groupName));
        setContacts(contacts.filter(c => c.group !== groupName));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Книга контактов</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary" onClick={() => setShowGroupSidebar(true)}>
                    Группы
                </button>
                <button className="btn btn-danger" onClick={() => setShowContactSidebar(true)}>
                    Добавить контакт
                </button>
            </div>

            <GroupedContactList contacts={contacts} groups={groups} />

            {showContactSidebar && (
                <>
                    <div className="sidebar show">
                        <h5 className="mb-3">Добавить контакт</h5>
                        <ContactForm
                            groups={groups}
                            addContact={addContact}
                            closeForm={() => setShowContactSidebar(false)}
                        />
                    </div>
                    <div className="sidebar-overlay" onClick={() => setShowContactSidebar(false)} />
                </>
            )}

            {showGroupSidebar && (
                <>
                    <div className="sidebar show">
                        <h5 className="mb-3">Управление группами</h5>
                        <GroupPanel
                            groups={groups}
                            addGroup={addGroup}
                            deleteGroup={deleteGroup}
                        />
                        <button className="btn btn-secondary mt-3" onClick={() => setShowGroupSidebar(false)}>
                            Закрыть
                        </button>
                    </div>
                    <div className="sidebar-overlay" onClick={() => setShowGroupSidebar(false)} />
                </>
            )}
        </div>
    );
};

export default App;
