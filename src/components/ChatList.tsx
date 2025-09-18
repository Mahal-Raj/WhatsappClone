import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Search, Plus, Menu, Settings, User } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatListProps {
  onSelectChat: (contact: Contact) => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    lastMessage: "Hey! Are we still on for lunch tomorrow?",
    lastMessageTime: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2", 
    name: "Mike Chen",
    lastMessage: "Thanks for the help with the project!",
    lastMessageTime: "1:15 PM",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Emily Davis",
    lastMessage: "Can you send me those photos?",
    lastMessageTime: "11:45 AM",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    lastMessage: "See you at the gym tonight 💪",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "5",
    name: "Lisa Wong",
    lastMessage: "Happy birthday! 🎉",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: true,
  },
];

export const ChatList = ({ onSelectChat, onOpenProfile, onOpenSettings }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenProfile}>
            <User className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenSettings}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-2xl"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectChat(contact)}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="bg-whatsapp-green/10 text-whatsapp-green font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online rounded-full border-2 border-background" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">{contact.name}</h3>
                  <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
              </div>
              
              {contact.unreadCount > 0 && (
                <div className="bg-whatsapp-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {contact.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};