import React, { useState, useEffect, useReducer } from 'react';
import shortid from 'shortid';
import ContactForm from './Components/ContactForm';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';

import './App.css';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'addPersistedContacts':
      return [...action.payload.persistedContacts];

    case 'addContact':
      return [...state, action.payload.contact];

    case 'deleteContact':
      return state.filter(contact => contact.id !== action.payload.id);

    default:
      return state;
  }
};

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts);

  useEffect(() => {
    const persistedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (!persistedContacts) return;

    dispatch({ type: 'addPersistedContacts', payload: { persistedContacts } });
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const filteredName = contacts.filter(contact => contact.name === name);
    if (filteredName.length > 0) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    dispatch({ type: 'addContact', payload: { contact } });
  };

  const deleteContact = id => {
    dispatch({ type: 'deleteContact', payload: { id } });
  };

  const [filter, setFilter] = useState('');

  const onChangeFilter = e => setFilter(e.target.value);

  const filteredContacts = contacts.filter(contact => {
    console.log(contact.name.toLowerCase().includes(filter));
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  console.log(contacts);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm saveContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={onChangeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

// useMemo(
//   () =>
//     contacts.filter(contact =>
//       // contact.name.toLowerCase().includes(filter.toLowerCase()),
//       // console.log(contact.name),
//       contact.name.includes(filter.toLowerCase()),
//     ),
//   [contacts, filter],
// );
