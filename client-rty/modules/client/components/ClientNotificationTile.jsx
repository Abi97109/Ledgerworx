import React from "react";

function ClientNotificationTile({ notification, isSeen, onSelect }) {
  const dotClass = isSeen ? "notification-dot seen" : "notification-dot unseen";

  return (
    <article
      className="notification-tile"
      data-id={notification.id}
      data-title={notification.title}
      data-time={notification.dateTime}
      data-seen={isSeen ? "true" : "false"}
      onClick={() => onSelect(notification.id)}
    >
      <div className="tile-top">
        <div className="tile-title-row">
          <span className={dotClass} />
          <h3 className="tile-title">{notification.title}</h3>
        </div>
      </div>
      <span className="tile-time">{notification.timeLabel}</span>
      <p className="tile-msg">{notification.message}</p>
      <span className="tile-tag">{notification.tag}</span>
    </article>
  );
}

export default ClientNotificationTile;