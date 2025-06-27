import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchTickets } from '../../store/ticketsSlice';
import Ticket from '../Ticket/Ticket';
import Loading from '../Loading/Loading';
import styles from './TicketsList.module.scss';

// const generateTicketKey = (ticket) =>
//   `${ticket.carrier}-${ticket.price}-${ticket.segments
//     .map((s) => `${s.date}-${s.duration}-${s.stops.join(',')}`)
//     .join('_')}`;

function TicketsList() {
  const dispatch = useDispatch();
  const { items: tickets, status, error } = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const sortType = useSelector((state) => state.sort.type);
  const [visibleCount, setVisibleCount] = useState(5);

  const memoizedTicketsWithId = useMemo(
    () =>
      tickets.map((ticket) => ({
        ...ticket,
        uuid: uuidv4(),
      })),
    [tickets],
  );

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const filteredAndSortedTickets = useMemo(() => {
    const getTransfersCount = (segment) => segment.stops.length;

    const allowedStops = [];
    if (filters.noTransfers) allowedStops.push(0);
    if (filters.oneTransfer) allowedStops.push(1);
    if (filters.twoTransfers) allowedStops.push(2);
    if (filters.threeTransfers) allowedStops.push(3);
    if (allowedStops.length === 0) return [];

    const visibleTickets = memoizedTicketsWithId.filter((ticket) =>
      ticket.segments.every((segment) => allowedStops.includes(getTransfersCount(segment))),
    );

    return [...visibleTickets].sort((a, b) => {
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
  }, [memoizedTicketsWithId, filters, sortType]);

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

  if (filteredAndSortedTickets.length === 0) {
    return <p>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <div className={styles.ticketsList}>
      {filteredAndSortedTickets.slice(0, visibleCount).map((ticket) => (
        <Ticket key={ticket.uuid} ticket={ticket} />
      ))}

      {visibleCount < filteredAndSortedTickets.length && (
        <button type="button" className={styles.loadMore} onClick={() => setVisibleCount((prev) => prev + 5)}>
          Показать ещё 5 билетов!
        </button>
      )}
    </div>
  );
}

export default TicketsList;
