import React from 'react';

import T from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.li}>
        <span>{name}: </span>
        <span>{number}</span>
        <button
          className={styles.button}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      name: T.string.isRequired,
      number: T.string.isRequired,
    }),
  ).isRequired,
  onDeleteContact: T.func.isRequired,
};

export default ContactList;
