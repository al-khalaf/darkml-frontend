import React from 'react';
import ChatbotBasePage from './ChatbotBasePage';

const TeacherChatbotPage: React.FC = () => {
  return (
    <ChatbotBasePage
      title="Teacher Chatbot"
      apiRole="teacher"
    />
  );
};

export default TeacherChatbotPage;
