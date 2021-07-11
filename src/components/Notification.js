import React from 'react';
import './Notification.scss';

const Notification = ({notificationMessage}) => (
  <div className="Notification">
    {
      notificationMessage.isSuccessful ?
      <p className="Notification__message Notification__message--success">{notificationMessage.content}</p>
      :
      <p className="Notification__message Notification__message--error">{notificationMessage.content}</p>
    }
  </div>
);

export default Notification;
