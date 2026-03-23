import React from "react";

function ClientSupportCard({ card }) {
  return (
    <article className="support-card">
      <h3>{card.title}</h3>
      {card.items.map((item) => (
        <div key={item.id} className="support-item">
          <i className={item.iconClass} />
          <div>
            {item.lines.map((line, index) => (
              <div key={`${item.id}-${index}`}>{line}</div>
            ))}
            <div className="support-meta">{item.meta}</div>
          </div>
        </div>
      ))}
    </article>
  );
}

export default ClientSupportCard;