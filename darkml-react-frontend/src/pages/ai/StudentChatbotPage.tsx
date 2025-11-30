import React from 'react';
import ChatbotBasePage from './ChatbotBasePage';

const StudentChatbotPage: React.FC = () => {
  return (
    <ChatbotBasePage
      title="Student Chatbot"
      apiRole="student"
      enableTutorMode={true}
    />
  );
};

export default StudentChatbotPage;
