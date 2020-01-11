import React, { useState, useRef } from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import styles from './ContactForm.module.css';

export default function ContactForm({ saveContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hadleSubmit = e => {
    e.preventDefault();
    if (name === '' || number === '') return;

    saveContact({ name, number });
    setName('');
    setNumber('');
  };

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.target.value);
  };

  const nameInputId = useRef(shortid.generate()).current;
  const numberInputId = useRef(shortid.generate()).current;

  return (
    <form className={styles.form} onSubmit={hadleSubmit}>
      <label className={styles.label} htmlFor={nameInputId}>
        <span className={styles.span}>Name </span>
        <input
          id={nameInputId}
          type="text"
          value={name}
          onChange={handleChangeName}
          name="name"
        />
      </label>

      <label className={styles.label} htmlFor={numberInputId}>
        <span className={styles.span}>Number </span>
        <input
          id={numberInputId}
          type="number"
          value={number}
          onChange={handleChangeNumber}
          name="number"
        />
      </label>

      <button className={styles.button} type="submit">
        add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  saveContact: T.func.isRequired,
};
