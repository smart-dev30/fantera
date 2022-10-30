
import { useState } from 'react'
import Card from 'react-credit-cards'
import {NotificationContainer, NotificationManager} from 'react-notifications'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../utils'

function CreditForm({connectCard, initialValue, initialAmount, customRef}) {
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
    <div className="card-container" ref={customRef}>
      {
       amount && <div className='amount'> 
          <p>Amount</p>
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
          <small>E.g.: 49..., 51..., 36..., 37...</small>
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
        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
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
        </div>
        {/* <input type="hidden" name="issuer" value={issuer} /> */}
        <div className="form-actions">
          <button className="btn btn-primary btn-block">Pay</button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
}

export default CreditForm;
