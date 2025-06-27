import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/sortSlice';
import styles from './SortingTabs.module.scss';

const tabs = ['САМЫЙ ДЕШЕВЫЙ', 'САМЫЙ БЫСТРЫЙ', 'ОПТИМАЛЬНЫЙ'];

function SortingTabs() {
  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.sort.type);

  const handleChange = (e) => {
    dispatch(setSortType(Number(e.target.value)));
  };

  return (
    <div className={styles.sortingTabs} role="radiogroup" aria-label="Сортировка">
      {tabs.map((tab, index) => (
        <label key={tab} className={styles.tab}>
          <input
            type="radio"
            name="sort"
            value={index}
            checked={activeSort === index}
            onChange={handleChange}
            className={styles.radio}
          />
          <span className={activeSort === index ? styles.active : ''}>{tab}</span>
        </label>
      ))}
    </div>
  );
}

export default SortingTabs;
