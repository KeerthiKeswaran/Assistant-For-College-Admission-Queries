import React from 'react';
import { ArrowLeft, Database, Cpu, MessageSquare, Languages, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const SystemDesign = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Chat</span>
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1 dark:text-white">System Architecture</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">SIH'24 AI-Powered Student Assistance Chatbot</h2>
          
          <div className="space-y-12">
            {/* Query Gateway Section */}
            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow-md">
                  <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <h3 className="text-lg font-semibold dark:text-white">Query Gateway</h3>
                  <div className="flex space-x-4 mt-4">
                    <span className="bg-blue-50 dark:bg-blue-800 px-3 py-1 rounded-full text-sm">Audio Query</span>
                    <span className="bg-blue-50 dark:bg-blue-800 px-3 py-1 rounded-full text-sm">Text Query</span>
                  </div>
                </div>
              </div>

              {/* Processing Pipeline */}
              <div className="flex justify-center space-x-8 mb-8">
                <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow-md">
                  <Cpu className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <h3 className="text-lg font-semibold dark:text-white">Pre-Processing</h3>
                  <p className="text-sm mt-2 dark:text-gray-300">Speech Detection & Query Processing</p>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg shadow-md">
                  <Languages className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <h3 className="text-lg font-semibold dark:text-white">Language Processing</h3>
                  <p className="text-sm mt-2 dark:text-gray-300">Detection & Translation</p>
                </div>
              </div>

              {/* Database and Model Section */}
              <div className="flex justify-center space-x-8">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg shadow-md">
                  <Database className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-2" />
                  <h3 className="text-lg font-semibold dark:text-white">Semantic Search</h3>
                  <p className="text-sm mt-2 dark:text-gray-300">ChromaDB Integration</p>
                </div>

                <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg shadow-md">
                  <Brain className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />
                  <h3 className="text-lg font-semibold dark:text-white">Model Pipeline</h3>
                  <p className="text-sm mt-2 dark:text-gray-300">Transfer Learning & Fine-tuning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;