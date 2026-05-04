// src/components/layout/ChatWindow.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, Smile, X, Bot, UserIcon } from 'lucide-react'; // Using Bot and UserIcon from lucide

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false); // Controlled by ChatButton for now
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm Frenzy, your Fashion Frenzy assistant. How can I help you today?", sender: 'bot', timestamp: '2:45 PM' },
    { id: '2', text: "Hi! I need help finding a denim jacket", sender: 'user', timestamp: '2:46 PM' },
    { id: '3', text: "Great choice! We have several denim jackets from small brands. Would you like recommendations based on your style preferences?", sender: 'bot', timestamp: '2:46 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // This state would typically be managed by a global state or context if ChatButton controls it
  // For now, let's assume ChatButton passes a prop or uses a shared state to toggle this.
  // To make this example self-contained for toggling, we can use a local event listener
  // or expect a prop. Let's simulate a global event for simplicity here.

  useEffect(() => {
    const handleToggleChat = () => setIsOpen(prev => !prev);
    window.addEventListener('toggleChatWindow', handleToggleChat);
    return () => window.removeEventListener('toggleChatWindow', handleToggleChat);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot reply
    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm still learning, but I'll do my best to assist.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 sm:right-4 w-full max-w-md bg-card rounded-t-lg shadow-xl overflow-hidden border border-border transition-all duration-300 ease-in-out transform translate-y-0">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="mr-2 h-5 w-5" /> {/* Using Bot icon */}
          <h3 className="font-semibold">Live Chat Support</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/80">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="h-80 overflow-y-auto p-4 bg-background space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2 shrink-0">
                <Bot className="text-secondary-foreground h-5 w-5" />
              </div>
            )}
            <div className={`p-3 rounded-lg shadow-sm max-w-[80%] ${msg.sender === 'user' ? 'bg-primary/10 text-primary-foreground' : 'bg-card'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-right text-muted-foreground/80' : 'text-muted-foreground/80'}`}>
                {msg.timestamp}
              </p>
            </div>
             {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ml-2 shrink-0">
                <UserIcon className="text-muted-foreground h-5 w-5" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card">
        <div className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border-border focus:ring-ring"
          />
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground rounded-full w-10 h-10">
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">
          Our team typically replies within a few minutes.
        </p>
      </form>
    </div>
  );
}

// Helper to dispatch the global event for ChatButton to consume
export const toggleChat = () => {
  window.dispatchEvent(new CustomEvent('toggleChatWindow'));
};
