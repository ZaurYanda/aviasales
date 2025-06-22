import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../../store/filtersSlice';
import styles from './Sidebar.module.scss';

const filterLabels = {
  all: 'Все',
  noTransfers: 'Без пересадок',
  oneTransfer: '1 пересадка',
  twoTransfers: '2 пересадки',
  threeTransfers: '3 пересадки',
};

function Sidebar() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleChange = (filterName) => {
    dispatch(toggleFilter({ filterName }));
  };

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <div className={styles.filterList}>
        {Object.entries(filterLabels).map(([key, label]) => (
          <label key={key} className={styles.filterItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={filters[key]}
              onChange={() => handleChange(key)}
            />
            {label}
          </label>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
