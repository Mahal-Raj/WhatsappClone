import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Camera, 
  Edit2, 
  Bell, 
  Shield, 
  Lock, 
  Eye, 
  LogOut,
  Trash2,
  Phone,
  Mail,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  onBack: () => void;
}

export const UserProfile = ({ onBack }: UserProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [userBio, setUserBio] = useState("Hey there! I am using WhatsApp.");
  const [notifications, setNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [lastSeen, setLastSeen] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(true);

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Privacy", description: "Manage your privacy settings" },
        { icon: Lock, label: "Security", description: "Two-step verification, change number" },
        { icon: Bell, label: "Notifications", description: "Message, group & call tones" },
        { icon: Globe, label: "Storage and data", description: "Network usage, auto-download" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: Mail, label: "Help", description: "Help center, contact us, privacy policy" },
        { icon: Phone, label: "Tell a friend", description: "Share WhatsApp with others" },
      ]
    }
  ];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32">
                <AvatarImage src="" />
                <AvatarFallback className="bg-whatsapp-green/10 text-whatsapp-green text-4xl font-semibold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="whatsapp"
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-3">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">About</Label>
                    <Textarea
                      id="bio"
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      className="text-center resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="whatsapp" onClick={handleSaveProfile}>
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-semibold">{userName}</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{userBio}</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Read receipts</p>
                  <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                </div>
                <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Last seen</p>
                  <p className="text-sm text-muted-foreground">Show when you were last online</p>
                </div>
                <Switch checked={lastSeen} onCheckedChange={setLastSeen} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile photo</p>
                  <p className="text-sm text-muted-foreground">Who can see your profile photo</p>
                </div>
                <Switch checked={profilePhoto} onCheckedChange={setProfilePhoto} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive message notifications</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-whatsapp-green" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="w-5 h-5 mr-3" />
                Log out
              </Button>
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-5 h-5 mr-3" />
                Delete account
              </Button>
            </div>
          </div>

          {/* App Info */}
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>WhatsApp MVP v1.0.0</p>
            <p>Built with ❤️ using Lovable</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};