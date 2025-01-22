import { useState } from 'react';
import { Settings, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ServerStatus from './ServerStatus';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useTheme } from '../hooks/useTheme';
import logo from '../assets/Logo.png'
import axios from 'axios';

export const Chatbot = () => {
  const { isDark, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([{
    text: "Hello! I'm your Education Assistant. I can help you with college admissions, enrollment processes, course information, and any other academic queries. How may I assist you today?",
    isUser: false
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const getResponseFromBackend = async (message: string) => {
    try {
      const response = await axios.post("https://career-advisor-assistan.onrender.com/GetResult", { query: message });

      let responseText = typeof response.data.results === 'string'
        ? response.data.results
        : JSON.stringify(response.data);

      let responseArray: string[] = responseText.split("**");
      let newResponse = responseArray.map((item, index) =>
        (index % 2 !== 1) ? item : `<b>${item}</b>`
      ).join('');

      newResponse = newResponse
        .replace(/\*/g, '</br><b>•</b> ')
        .replace(/(\r?\n\s*){2,}/g, '</br> ')
        .replace(/- <b>/g, '</br> - <b> ');

      const url_re = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

      newResponse = newResponse.replace(url_re, (url) => {
        const fullUrl = url.startsWith("www.") ? `http://${url}` : url;
        return `<a href="${fullUrl}" style="color: #1a73e8; text-decoration: underline; class="highlight" target="_blank">${url}</a>`;
      });

      return newResponse;
    } catch (error) {
      console.error("Error fetching response from backend:", error);
      return "Sorry, I couldn't process that request right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage = inputMessage;
      setInputMessage('');
      setIsLoading(true);

      setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await getResponseFromBackend(userMessage);

      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Campus Advisor"
              className="h-16 w-auto relative z-10 rounded-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <ServerStatus />
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <Link to="/system-design" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Settings className="h-5 w-5" />
              <span>System</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[calc(100vh-8rem)]">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} {...message} />
              ))}
            </div>
            <ChatInput
              value={inputMessage}
              onChange={setInputMessage}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
            <p className="p-4 mt-0 text-sm font-bold text-center text-gray-600 dark:text-gray-300">
              Please note that this chatbot is designed specifically to assist with college-related inquiries and not for general conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
