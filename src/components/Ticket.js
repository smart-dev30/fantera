import Border from "./Border";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ticket = ({ ticket, onClick, isSelected }) => {
  const {id, title, duration, time,  price} = ticket
  return (
      <div className={isSelected ? 'ticket selected' : 'ticket'} onClick={() => onClick(id)}>
        <div className="ticket-item">
          <Border />
          <h3 className='ticket-item__description title'>{title}</h3>
          <div className="ticket-item__description duration">{`${duration}min`}</div>
          <div className='ticket-item__description price'><sup>$</sup>{`${price}`}</div>
          <Border middle />
          <div className="ticket-item__description clock">
            <i className='uil uil-clock-two mt-3'></i>
            <FontAwesomeIcon icon='fa-clock' /> 
          </div>
          <div className="ticket-item__description time">
            2:00 pm - 2:30 pm
          </div>
          <Border />
        </div>
      </div>
  );
};

export default Ticket