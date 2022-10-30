import { useState } from 'react'
import Card from 'react-credit-cards'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../utils'

function CreditForm({connectCard, initialValue, initialAmount, customRef, isVisible, onClose}) {
  const [cardInfo, setCardInfo] = useState({ ...initialValue})

  const [focused, setFocused] = useState()
  const [issuer, setIssuer] = useState()
  const [isValidNum, setIsValidNum] = useState(false)
  const [amount, setAmount] = useState(initialAmount)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("c", issuer)
    if(!isValidNum) {
      NotificationManager.warning('Enter valid card number', 'Wanning', 3000)
    }else if(issuer !== '' && cardInfo.name !== '' && cardInfo.number !== '' && cardInfo.expiry !== '' && cardInfo.cvc !== '' && amount!==0) {
        connectCard(issuer, cardInfo, amount)
        setCardInfo({...initialValue})
    }
  }

  const handleCallback = ({ issuer }, isValid) => {
    console.log(issuer, isValid)
    if(isValid) {
      setIssuer(issuer)
      setIsValidNum(true)
    } else {
      setIsValidNum(false)
    }
  };

  const handleInputChange = ({target}) => {
    if (target.name === "number") {
      setCardInfo({...cardInfo, number: formatCreditCardNumber(target.value)})
    } else if (target.name === "expiry") {
      setCardInfo({...cardInfo, expiry: formatExpirationDate(target.value)})
    } else if (target.name === "cvc") {
      setCardInfo({...cardInfo, cvc: formatCVC(target.value)})
    } else if (target.name === "name") {
      setCardInfo({...cardInfo, name: target.value})
    } else if(target.name === "amount"){
      setAmount(Math.max(1, target.value) )
    }
    
  }

  const handleInputFocus = (e) => {
    setFocused(e.target.name)
  }

  return (
    <div className={isVisible ? 'modal visible': 'modal'} ref={customRef}>
      <div className='modal-wrapper'>
        <h2 className='modal-wrapper__title'>Check <FontAwesomeIcon icon='fa-credit-card' /> Payment</h2>
        {
        amount && <div className='modal-wrapper__amount'> 
            <p>Ticket Quantity</p>
            <input 
              type='number'
              name='amount' 
              value={amount}
              onChange={handleInputChange} 
            />
          </div>
        }  
        <Card
          number={cardInfo.number}
          name={cardInfo.name}
          expiry={cardInfo.expiry}
          cvc={cardInfo.cvc}
          focused={focused}
          callback={handleCallback}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              value={cardInfo.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              value={cardInfo.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                value={cardInfo.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              pattern="\d{3,4}"
              required
              value={cardInfo.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-pay">Check</button>
          </div>
        </form>
        <NotificationContainer />
        <button className='btn btn-close' onClick={onClose}><FontAwesomeIcon icon='fa-close' /></button>
      </div>
    </div>
  );
}

export default CreditForm;
