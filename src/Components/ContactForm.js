import React, { useState, useRef } from 'react';
import T from 'prop-types';
import shortid from 'shortid';

export default function ContactForm({ saveContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hadleSubmit = e => {
    e.preventDefault();

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
    <form className="form" onSubmit={hadleSubmit}>
      <label htmlFor={nameInputId}>
        Name
        <input
          id={nameInputId}
          type="text"
          value={name}
          onChange={handleChangeName}
          name="name"
        />
      </label>

      <label htmlFor={numberInputId}>
        Number
        <input
          id={numberInputId}
          type="number"
          value={number}
          onChange={handleChangeNumber}
          name="number"
        />
      </label>

      <button type="submit">add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  saveContact: T.func.isRequired,
};
