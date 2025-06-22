import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/sortSlice';
import styles from './SortingTabs.module.scss';

const tabs = ['САМЫЙ ДЕШЕВЫЙ', 'САМЫЙ БЫСТРЫЙ', 'ОПТИМАЛЬНЫЙ'];

function SortingTabs() {
  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.sort.type);

  const handleClick = (index) => {
    dispatch(setSortType(index));
  };

  return (
    <div className={styles.sortingTabs}>
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={`${styles.tab} ${activeSort === index ? styles.active : ''}`}
          onClick={() => handleClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default SortingTabs;
