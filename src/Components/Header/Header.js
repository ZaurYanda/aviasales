import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
    </header>
  );
}

export default Header;
