import CardDisplay from 'react-credit-card-display'

const CreditCard = ({ cardInfo, value, isChecked, handleChange, handleDelete }) => {
  const handleRadioChange = e => {
    const { id } = e.currentTarget;
    handleChange(id);
  };

  return (
    <div className={isChecked ? 'check-card checked' : 'check-card'}>
      <input
        type="radio"
        className="custom-radio"
        id={value} 
        checked={isChecked}
        onChange={handleRadioChange}
      />
      <label className="label" htmlFor={value}>
        <CardDisplay number={cardInfo.number} expand={true} square={true} />
        <div className='check-card__info'>
          <p className="issur">{cardInfo.issur}</p>
          <p className="name"><span>{cardInfo.name} | </span><span>exp. {cardInfo.expiry}</span></p>
          <button className='delete' onClick={() => handleDelete(value)}>delete</button>
        </div>
      </label>
    </div>
  );
};

export default CreditCard