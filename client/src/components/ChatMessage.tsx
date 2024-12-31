import React from 'react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[70%] rounded-lg p-3 ${
        isUser
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
      }`}
      dangerouslySetInnerHTML={{ __html: text }} // Rendering HTML here
    />
  </div>
);
