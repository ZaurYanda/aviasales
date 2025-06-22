import React from 'react';
import PropTypes from 'prop-types';

import styles from './Ticket.module.scss';

function Ticket({ ticket }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const formatStops = (stops) => {
    const count = stops.length;
    if (count === 0) return 'БЕЗ ПЕРЕСАДОК';
    if (count === 1) return '1 ПЕРЕСАДКА';
    return `${count} ПЕРЕСАДКИ`;
  };

  const getCarrierLogo = (carrier) => `https://pics.avs.io/99/36/${carrier}.png`;

  const getEndTime = (startDate, duration) => new Date(new Date(startDate).getTime() + duration * 60000);

  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <div className={styles.price}>
          {ticket.price.toLocaleString('ru-RU')}
          {' Р'}
        </div>

        <div className={styles.carrier}>
          <img src={getCarrierLogo(ticket.carrier)} alt={ticket.carrier} />
        </div>
      </div>

      {ticket.segments.map((segment) => {
        const key = `${segment.origin}-${segment.destination}-${segment.date}`;
        return (
          <div key={key} className={styles.segment}>
            <div className={styles.segmentInfo}>
              <div className={styles.infoBlock}>
                <div className={styles.label}>
                  <span>
                    {segment.origin}
                    {' – '}
                    {segment.destination}
                  </span>
                </div>
                <div className={styles.value}>
                  <div>
                    {formatTime(segment.date)}
                    {' – '}
                    {formatTime(getEndTime(segment.date, segment.duration))}
                  </div>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.label}>В ПУТИ</div>
                <div className={styles.value}>{formatDuration(segment.duration)}</div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.label}>{formatStops(segment.stops)}</div>
                <div className={styles.value}>{segment.stops.join(', ') || '—'}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number.isRequired,
    carrier: PropTypes.string.isRequired,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        stops: PropTypes.arrayOf(PropTypes.string).isRequired,
        duration: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default Ticket;
