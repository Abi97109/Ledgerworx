import React from "react";

function ClientSubServiceItem({ item, index, onSelect }) {
  return (
    <li className="subservice-item">
      <button
        type="button"
        className="subservice-trigger"
        data-name={item.name}
        data-description={item.description}
        data-amount={item.amount}
        data-years={item.years}
        onClick={() => onSelect(item)}
      >
        <span className="subservice-name">{item.name}</span>
        <span className="subservice-index">{index + 1}</span>
      </button>
    </li>
  );
}

export default ClientSubServiceItem;