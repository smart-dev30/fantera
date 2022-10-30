import CardDisplay from 'react-credit-card-display'

const CreditCard = ({ cardInfo, value, isChecked, handleChange, handleDelete }) => {
  const handleRadioChange = e => {
    const { id } = e.currentTarget;
    handleChange(id);
  };

  return (
    <div className="card-item">
      <input
        type="radio"
        className="custom-radio"
        id={value} 
        checked={isChecked}
        onChange={handleRadioChange}
      />
      <label className="label" htmlFor={value}>
        <CardDisplay number={cardInfo.number} expand={true} square={true} />
        <p className="name">{cardInfo.name}</p>
        <p className="issur">{cardInfo.issur}</p>
        <p className="expiry">exp. {cardInfo.expiry}</p>
      </label>
      <div>
        <button onClick={() => handleDelete(value)}>delete</button>
      </div>
    </div>
  );
};

export default CreditCard