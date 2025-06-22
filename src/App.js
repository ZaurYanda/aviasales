import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import { fetchTickets } from './store/ticketsSlice';
import SortingTabs from './Components/SortingTabs/SortingTabs';
import TicketsList from './Components/TicketsList/TicketsList';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <Sidebar />
          <main className={styles.main}>
            <SortingTabs />
            <TicketsList />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
