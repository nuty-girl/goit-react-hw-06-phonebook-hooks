import React from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import styles from './Filter.module.css';

const filterInputId = shortid.generate();

const Filter = ({ value, onChangeFilter }) => (
  <label htmlFor={filterInputId}>
    <p className={styles.label}>Find contacts by name</p>
    <input
      className={styles.input}
      id={filterInputId}
      type="text"
      value={value}
      onChange={onChangeFilter}
    />
  </label>
);

Filter.propTypes = {
  value: T.string,
  onChangeFilter: T.func.isRequired,
};

Filter.defaultProps = {
  value: '',
};
export default Filter;
