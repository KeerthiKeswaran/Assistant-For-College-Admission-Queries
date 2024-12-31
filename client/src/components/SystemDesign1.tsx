import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {ArrowLeft, Database, MessageSquare, Cpu, Languages, Search, RefreshCw, Server } from 'lucide-react';
import ThemeToggle from './ThemeToggle'; 
import { useTheme } from '../hooks/useTheme';

const steps = [
    {
        id: 'client',
        title: 'Client Application',
        description: 'The journey starts with the client application where users can input their queries through text or voice.',
        icon: MessageSquare,
    },
    {
        id: 'query-gateway',
        title: 'Query Gateway',
        description: 'Queries are processed through the gateway which routes them to appropriate handlers for audio or text.',
        icon: Server,
    },
    {
        id: 'preprocessing',
        title: 'Query Pre-processing',
        description: 'Queries undergo preprocessing including hate-speech detection and language detection.',
        icon: RefreshCw,
    },
    {
        id: 'language',
        title: 'Language Processing',
        description: 'Non-English queries are translated while English queries proceed directly to semantic search.',
        icon: Languages,
    },
    {
        id: 'semantic-search',
        title: 'Semantic Search',
        description: 'ChromaDB performs semantic search on the university information database.',
        icon: Search,
    },
    {
        id: 'model',
        title: 'AI Model Processing',
        description: 'The transfer learning model processes the query and generates an appropriate response.',
        icon: Cpu,
    },
    {
        id: 'database',
        title: 'Database Operations',
        description: 'The system stores and retrieves information from various databases for model fine-tuning.',
        icon: Database,
    },
];

const SystemDesign: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
            }, 3000);
        }
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
              <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
                <div className="max-w-7xl mx-auto flex items-center">
                  <Link to="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Chat</span>
                  </Link>
                  <h1 className="text-2xl font-bold text-center flex-1 dark:text-white">System Architecture</h1>
                  <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                </div>
              </nav>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 mt-12">
                    <h1 className="text-4xl font-bold dark:text-white mb-4">
                        Learn About the Pipeline
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        An interactive tour of the system architecture
                    </p>
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isAutoPlaying ? 'Pause Tour' : 'Start Auto Tour'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* System Diagram */}
                    <div className="bg-white  dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="relative aspect-square">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={step.id}
                                        className={`absolute p-4 rounded-lg ${currentStep === index
                                            ? 'bg-blue-100 border-2 border-blue-500'
                                            : 'bg-gray-50'
                                            }`}
                                        style={{
                                            top: `${(index * 100) / steps.length}%`,
                                            left: index % 2 === 0 ? '10%' : '60%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        animate={{
                                            scale: currentStep === index ? 1.1 : 1,
                                            opacity: currentStep === index ? 1 : 0.7,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setCurrentStep(index)}
                                    >
                                        <Icon className="w-8 h-8 text-blue-600 mb-2" />
                                        <h3 className="text-sm font-semibold">{step.title}</h3>
                                    </motion.div>
                                );
                            })}

                            {/* Connecting Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {steps.map((_, index) => {
                                    if (index === steps.length - 1) return null;
                                    return (
                                        <motion.line
                                            key={index}
                                            x1={index % 2 === 0 ? "20%" : "70%"}
                                            y1={`${(index * 100) / steps.length + 8}%`}
                                            x2={index % 2 === 0 ? "70%" : "20%"}
                                            y2={`${((index + 1) * 100) / steps.length + 8}%`}
                                            stroke={currentStep === index ? "#2563EB" : "#E5E7EB"}
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Step Description */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white  dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                    >
                        <div className="flex items-center mb-6">
                            {steps[currentStep].icon && (
                                React.createElement(steps[currentStep].icon, { className: "w-10 h-10 text-blue-600 mr-4" })
                            )}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {steps[currentStep].title}
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {steps[currentStep].description}
                        </p>
                        <div className="mt-8 flex justify-between">
                            <button
                                onClick={() => setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SystemDesign;