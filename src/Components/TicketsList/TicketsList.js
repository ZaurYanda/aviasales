import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../store/ticketsSlice';
import Ticket from '../Ticket/Ticket';
import Loading from '../Loading/Loading';
import styles from './TicketsList.module.scss';

function TicketsList() {
  const dispatch = useDispatch();
  const { items: tickets, status, error } = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const sortType = useSelector((state) => state.sort.type);

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const getTransfersCount = (segment) => segment.stops.length;

  const isTicketVisible = (ticket) => {
    const allowedStops = [];
    if (filters.noTransfers) allowedStops.push(0);
    if (filters.oneTransfer) allowedStops.push(1);
    if (filters.twoTransfers) allowedStops.push(2);
    if (filters.threeTransfers) allowedStops.push(3);

    return ticket.segments.every((segment) => allowedStops.includes(getTransfersCount(segment)));
  };

  const visibleTickets = tickets.filter(isTicketVisible);

  const sortedTickets = [...visibleTickets].sort((a, b) => {
    if (sortType === 0) return a.price - b.price;
    if (sortType === 1) {
      const durationA = a.segments.reduce((sum, s) => sum + s.duration, 0);
      const durationB = b.segments.reduce((sum, s) => sum + s.duration, 0);
      return durationA - durationB;
    }
    if (sortType === 2) {
      const scoreA = a.price + a.segments.reduce((sum, s) => sum + s.duration, 0);
      const scoreB = b.price + b.segments.reduce((sum, s) => sum + s.duration, 0);
      return scoreA - scoreB;
    }
    return 0;
  });

  if (status === 'loading') return <Loading />;
  if (status === 'failed') {
    return (
      <p>
        <span>Ошибка:</span>
        <br />
        <span>{error}</span>
      </p>
    );
  }

  if (sortedTickets.length === 0) {
    return <p>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <div className={styles.ticketsList}>
      {sortedTickets.slice(0, visibleCount).map((ticket) => (
        <Ticket key={ticket.price + ticket.carrier + ticket.segments[0].date} ticket={ticket} />
      ))}

      {visibleCount < sortedTickets.length && (
        <button type="button" className={styles.loadMore} onClick={() => setVisibleCount((prev) => prev + 5)}>
          Показать ещё 5 билетов!
        </button>
      )}
    </div>
  );
}

export default TicketsList;
