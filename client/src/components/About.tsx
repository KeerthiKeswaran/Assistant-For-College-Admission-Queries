import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Chat</span>
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">About</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Student Assistance Chatbot</h2>
          
          <div className="space-y-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our AI-powered chatbot is designed to revolutionize student assistance by providing instant, accurate responses to academic queries. Built with cutting-edge technology, it supports both text and voice interactions, making information access more natural and accessible.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Multi-language support with automatic language detection</li>
                <li>Real-time response generation using advanced AI models</li>
                <li>Continuous learning from user interactions</li>
                <li>Semantic search for accurate information retrieval</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Technology Stack</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Frontend: React with TypeScript</li>
                <li>UI Framework: Tailwind CSS</li>
                <li>Database: ChromaDB for semantic search</li>
                <li>AI Models: Transfer Learning Pipeline</li>
                <li>Speech Processing: Advanced audio processing pipeline</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to make education more accessible and efficient by providing students with an intelligent assistant that understands their needs and delivers accurate, relevant information instantly. Our chatbot learns and improves with each interaction, ensuring increasingly better assistance over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;