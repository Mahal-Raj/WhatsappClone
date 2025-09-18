import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Smile, 
  Paperclip,
  Mic,
  Check,
  CheckCheck
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

interface ChatWindowProps {
  contact: Contact;
  onBack: () => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How are you doing today?",
    sent: false,
    timestamp: "10:30 AM",
    status: "read",
  },
  {
    id: "2",
    text: "I'm doing great! Just finished my workout 💪",
    sent: true,
    timestamp: "10:32 AM",
    status: "read",
  },
  {
    id: "3",
    text: "That's awesome! I should start working out too 😅",
    sent: false,
    timestamp: "10:33 AM",
    status: "read",
  },
  {
    id: "4",
    text: "You should! It's really refreshing. Want to join me tomorrow?",
    sent: true,
    timestamp: "10:35 AM",
    status: "delivered",
  },
  {
    id: "5",
    text: "Sure! What time works for you?",
    sent: false,
    timestamp: "10:40 AM",
    status: "read",
  },
];

export const ChatWindow = ({ contact, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent",
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === message.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 1000);
    }
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-whatsapp-green" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chat-bg">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-background border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="lg:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback className="bg-whatsapp-green/10 text-whatsapp-green font-semibold">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {contact.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online rounded-full border-2 border-background" />
          )}
        </div>
        
        <div className="flex-1">
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-xs text-muted-foreground">
            {contact.isOnline ? "online" : "last seen recently"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                  message.sent
                    ? "bg-chat-sent text-white rounded-br-md"
                    : "bg-chat-received text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs ${message.sent ? "text-white/70" : "text-muted-foreground"}`}>
                    {message.timestamp}
                  </span>
                  {message.sent && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 bg-background border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="rounded-2xl pr-12"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          
          {newMessage.trim() ? (
            <Button variant="whatsapp" size="icon" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};