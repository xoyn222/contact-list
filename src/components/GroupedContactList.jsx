import React, { useState } from 'react';

const GroupedContactList = ({ contacts, groups }) => {
    const [expandedGroup, setExpandedGroup] = useState(null);

    const toggleGroup = (groupName) => {
        setExpandedGroup(expandedGroup === groupName ? null : groupName);
    };

    const groupedContacts = groups.reduce((acc, group) => {
        acc[group] = contacts.filter((c) => c.group === group);
        return acc;
    }, {});

    const noGroupContacts = contacts.filter((c) => !c.group);

    return (
        <div className="accordion" id="groupedContacts">
            {groups.map((group, index) => (
                <div key={index} className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${expandedGroup !== group ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => toggleGroup(group)}
                        >
                            {group}
                        </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${expandedGroup === group ? 'show' : ''}`}>
                        <div className="accordion-body">
                            {groupedContacts[group].length > 0 ? (
                                <ul className="list-group">
                                    {groupedContacts[group].map((contact, idx) => (
                                        <li key={idx} className="list-group-item">
                                            <strong>{contact.name}</strong> — {contact.phone}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">Нет контактов</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {noGroupContacts.length > 0 && (
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${expandedGroup !== 'no-group' ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => toggleGroup('no-group')}
                        >
                            Без группы
                        </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${expandedGroup === 'no-group' ? 'show' : ''}`}>
                        <div className="accordion-body">
                            <ul className="list-group">
                                {noGroupContacts.map((contact, idx) => (
                                    <li key={idx} className="list-group-item">
                                        <strong>{contact.name}</strong> — {contact.phone}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupedContactList;
