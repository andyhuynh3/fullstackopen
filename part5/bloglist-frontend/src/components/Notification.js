import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) {
    return <></>;
  }
  return (
    <div className={notification.className}>
      {notification.message}
    </div>
  );
};

export default Notification;
