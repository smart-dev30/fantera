import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {NotificationContainer, NotificationManager} from 'react-notifications'

import tickets from '../database/tickets'
import CreditForm from '../components/CreditForm';
import Ticket from '../components/Ticket';

function Main() {
  const [selectedId, setSelectedId] = useState("")
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
    const seletctedTickets = tickets.filter(ticket => ticket.id === selectedId)
    if(seletctedTickets.length === 0){
      NotificationManager.warning('Select the ticket', 'Wanning', 3000)
      return
    }
    setFormVisible(true)
  }
  
  const handleClose = () => {
    setFormVisible(false)
  }
  return (
    <div className='main'>
      <div className='container'>
        <h1 className='main-title'>Choose <FontAwesomeIcon icon='fa-bus-simple' /> ticket</h1>
        <div className='tickets-container'>
          { tickets.map((ticket) => {
            return (
              <Ticket key={ticket.id} isSelected={selectedId === ticket.id} ticket={ticket} onClick={hadnleTicketClick} />
            )
          }) }
        </div>
        <button className='btn btn-buy' onClick={handleBuy}><FontAwesomeIcon icon='fa-ticket' /> Buy Ticket</button>
        { <CreditForm 
          connectCard = {connectCard} 
          initialValue = {{ name: '', number: '', expiry: '', cvc: ''}}
          initialAmount = {1}
          isVisible={formVisible}
          onClose={handleClose}
      /> }
      <NotificationContainer />
      </div>
  </div>
  );
}

export default Main;
