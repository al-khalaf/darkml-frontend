import React from 'react';
import ChatbotBasePage from './ChatbotBasePage';

const AdminChatbotPage: React.FC = () => {
  return (
    <ChatbotBasePage
      title="Admin Chatbot"
      apiRole="admin"
    />
  );
};

export default AdminChatbotPage;
