// src/components/Topbar.js
import React, { useState } from 'react';
import styled from 'styled-components';

const TopbarWrapper = styled.div`
  height: 60px;
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const TopbarItem = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const NotificationPopup = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessagePopup = styled(NotificationPopup)`
  top: 120px;
`;

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <TopbarWrapper>
      <TopbarItem onClick={() => setShowNotifications(!showNotifications)}>
        Notifications
        {showNotifications && (
          <NotificationPopup>
            {/* Content for notifications */}
            You have 3 new notifications.
          </NotificationPopup>
        )}
      </TopbarItem>
      <TopbarItem onClick={() => setShowMessages(!showMessages)}>
        Messages
        {showMessages && (
          <MessagePopup>
            {/* Content for messages */}
            You have 2 new messages.
          </MessagePopup>
        )}
      </TopbarItem>
      {/* Add more topbar items here */}
    </TopbarWrapper>
  );
};

export default Topbar;
