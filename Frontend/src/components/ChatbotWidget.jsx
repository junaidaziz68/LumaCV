import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const ChatbotWidget = ({ missingSkills }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hi! I'm your AI Career Coach. I noticed you're missing a few skills for senior roles. Ask me anything about how to upskill!"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userText = inputValue;
        const newUserMsg = { id: Date.now(), sender: 'user', text: userText };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userText,
                    contextSkills: missingSkills || []
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "I'm having trouble connecting to the server. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 transform origin-bottom-right">

                    {/* Header */}
                    <div className="bg-brand-blue p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={24} />
                            <div>
                                <h3 className="font-bold text-sm">AI Career Coach</h3>
                                <p className="text-xs text-brand-blue-hover opacity-80">Always active</p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-white hover:text-slate-200 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="p-4 h-80 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex max-w-[85%] ${msg.sender === 'user' ? 'self-end justify-end' : 'self-start justify-start'}`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-brand-blue text-white rounded-br-sm'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                                    }`}>
                                    {/* Simple Markdown Link Parser */}
                                    <div dangerouslySetInnerHTML={{
                                        __html: msg.text
                                            .replace(/\n/g, '<br/>')
                                            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-brand-blue hover:underline font-bold">$1</a>')
                                            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                    }} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex max-w-[85%] self-start justify-start">
                                <div className="px-4 py-2.5 rounded-2xl text-sm bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm flex gap-1">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about your skills..."
                                disabled={isLoading}
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className="absolute right-2 p-1.5 bg-brand-blue text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blue-hover transition-colors flex items-center justify-center"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-brand-blue text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
};

export default ChatbotWidget;
