
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import tickets from '../consts/tickets'
import CreditForm from '../components/CreditForm';

function Main() {
  const [selectedId, setSelectedId] = useState(0)
  const [formVisible, setFormVisible] = useState(false)
  const navigate = useNavigate()

  const connectCard = (issur, cardInfo, amount) => {
    const seletctedTicket = tickets.filter(ticket => ticket.id === selectedId)[0]
    navigate(`/${selectedId}`, { state: {ticketInfo: seletctedTicket, amount: amount, cardInfo: {issur: issur, ...cardInfo} } })
  }

  const hadnleTicketClick = (id) => {
    setSelectedId(id)
  }

  const handleBuy = () => {
    setFormVisible(true)
  }
  
  return (
    <div className="main">
    <div className="ticket-container">
      { tickets.map(({ id, name, price }) => {
        return (
          <div key={id} className="ticket" onClick={() => hadnleTicketClick(id)}>
            <span className="name">{name}</span>
            <span className="price">{`$${price}`}</span>
          </div>
        )
      }) }
    </div>
    <button onClick={handleBuy}>Buy</button>
    { formVisible && <CreditForm 
      connectCard = {connectCard} 
      initialValue = {{ name: '', number: '', expiry: '', cvc: ''}}
      initialAmount = {1}
    /> }
  </div>
  );
}

export default Main;
