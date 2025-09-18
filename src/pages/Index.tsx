import { useState } from "react";
import { AuthScreen } from "@/components/AuthScreen";
import { ChatList } from "@/components/ChatList";
import { ChatWindow } from "@/components/ChatWindow";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
  };

  const handleSelectChat = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleBackToList = () => {
    setSelectedContact(null);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthComplete={handleAuthComplete} />;
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Chat List - Hidden on mobile when chat is selected */}
      <div className={`${selectedContact ? "hidden lg:flex" : "flex"} lg:w-1/3 xl:w-1/4 flex-col`}>
        <ChatList onSelectChat={handleSelectChat} />
      </div>

      {/* Chat Window - Full width on mobile, remaining space on desktop */}
      <div className={`${selectedContact ? "flex" : "hidden lg:flex"} flex-1 flex-col`}>
        {selectedContact ? (
          <ChatWindow contact={selectedContact} onBack={handleBackToList} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-chat-bg">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 opacity-20">
                <svg viewBox="0 0 303 172" className="w-full h-full">
                  <path
                    fill="currentColor"
                    d="M229.565 160.229c-6.589 0-13.103-2.631-17.855-7.248l-84.749-82.655c-9.504-9.28-9.504-24.384 0-33.664s24.96-9.28 34.464 0l84.749 82.655c4.736 4.624 7.296 10.736 7.296 17.216s-2.56 12.592-7.296 17.216c-4.752 4.608-11.008 7.248-17.856 7.248z"
                  />
                  <path
                    fill="currentColor"
                    d="M73.435 160.229c-6.848 0-13.104-2.64-17.856-7.248-4.736-4.624-7.296-10.736-7.296-17.216s2.56-12.592 7.296-17.216l84.749-82.655c9.504-9.28 24.96-9.28 34.464 0s9.504 24.384 0 33.664l-84.749 82.655c-4.752 4.617-11.267 7.248-17.855 7.248z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-light text-muted-foreground mb-2">
                WhatsApp Web
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Send and receive messages without keeping your phone online.
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;