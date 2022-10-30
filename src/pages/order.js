import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import CreditForm from '../components/CreditForm';
import fee from '../consts/fee';
import CreditCard from '../components/CreditCard';

function Order() {
  const location = useLocation();
  const { ticketInfo, amount, cardInfo } = location.state

  const [seletctedCardId, setSelectedCardId] = useState(0)
  const [cards, setCards] = useState([{...cardInfo}])
  const [formVisible, setFormVisible] = useState(false)
  const navigate = useNavigate()

  const handleCardChannge = (id) => {
    setSelectedCardId(id)
  }

  const addNewCard = () => {
    setFormVisible(true)
  }

  const handleCardDelete = (id) => {
    if(cards.length === 1) {
      navigate('/')
    }
    const cardList = [...cards]
    cardList.splice(id, 1)
    setCards(cardList)
    setSelectedCardId(0)
  }

  const connectCard = (issur, cardInfo) => {
   setCards([...cards, {issur, ...cardInfo}])
  }

  const { issur } = cards[seletctedCardId]
  const { price, notes, name } = ticketInfo
  const selectedFee = fee[issur]
  const totalPrice = (price + price*selectedFee.service)*amount + price*selectedFee.process

  return (
    <div className="order">
      <div className="payment">
        <p className="total-title">payment</p>
        <p className='subtitle'> use Credit/Debit Card </p>
        <div className="card-list">
          {
            cards.map((info, index) => 
                <CreditCard 
                  key={index}
                  value={index}
                  cardInfo={info}
                  isChecked={ index == seletctedCardId}
                  handleChange = {handleCardChannge}
                  handleDelete = {handleCardDelete}
                />
            )
          }
        </div>
        <button onClick={addNewCard}> Add New Card </button>
      </div>
      <div className="total">
        <h1>{name}</h1>
        <div className="row">
          <p className="total-title">Total</p>
          <p> {`$${totalPrice.toFixed(3)}`} </p> 
        </div>  
        <div className="row">
          <p>{`Resale Tickets: $${price}*${amount}`}</p>
          <p> {`$${price * amount}`}</p> 
        </div>  
        <div>
          <p>Notes From Seller</p>
          <p> {notes}</p> 
        </div>  
        <p>Fees</p>
        <div className="row">
          <p>{`Service Fee: $${(price*selectedFee.service).toFixed(4)}*${amount}`}</p>
          <p> {`$${(price*selectedFee.service * amount).toFixed(4)}`}</p> 
        </div>
        <div className="row">
          <p>{`Order Processing Fee: `}</p>
          <p> {`$${ (price*selectedFee.process).toFixed(4) }`}</p> 
        </div>
        
        <button>Place Order</button>
      </div>
      { formVisible && <CreditForm 
        connectCard={connectCard} 
        initialValue ={{ name: '', number: '', expiry: '', cvc: ''}}
        initialAmount = {null}
    /> }
    </div>
  );
}

export default Order;
