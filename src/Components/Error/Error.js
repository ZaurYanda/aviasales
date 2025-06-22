import React from 'react';
import PropTypes from 'prop-types';
import styles from './Error.module.scss';

function Error({ title, message }) {
  return (
    <div className={styles.error}>
      <div className={styles.errorTitle}>{title || 'Произошла ошибка'}</div>
      <div className={styles.errorMessage}>{message || 'Попробуйте обновить страницу'}</div>
    </div>
  );
}

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

Error.defaultProps = {
  title: 'Произошла ошибка',
  message: 'Попробуйте обновить страницу',
};

export default Error;
