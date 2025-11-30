import React from 'react';
import ChatbotBasePage from './ChatbotBasePage';

const SuperAdminChatbotPage: React.FC = () => {
  return (
    <ChatbotBasePage
      title="Super Admin Chatbot"
      apiRole="superadmin"
    />
  );
};

export default SuperAdminChatbotPage;
