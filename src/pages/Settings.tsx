import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Volume2, 
  Vibrate, 
  Shield, 
  Download, 
  Wifi,
  Database,
  Smartphone,
  Globe
} from "lucide-react";

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [autoDownload, setAutoDownload] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);
  const [dataBackup, setDataBackup] = useState(true);

  const settingsGroups = [
    {
      title: "Appearance",
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: "Dark mode",
          description: "Switch between light and dark themes",
          control: <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        }
      ]
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Volume2,
          label: "Sound",
          description: "Play notification sounds",
          control: <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
        },
        {
          icon: Vibrate,
          label: "Vibration",
          description: "Vibrate for notifications",
          control: <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
        }
      ]
    },
    {
      title: "Media & Storage",
      items: [
        {
          icon: Download,
          label: "Auto-download media",
          description: "Automatically download photos and videos",
          control: <Switch checked={autoDownload} onCheckedChange={setAutoDownload} />
        },
        {
          icon: Wifi,
          label: "WiFi only",
          description: "Download media only on WiFi",
          control: <Switch checked={wifiOnly} onCheckedChange={setWifiOnly} />
        },
        {
          icon: Database,
          label: "Backup chats",
          description: "Automatically backup your chat history",
          control: <Switch checked={dataBackup} onCheckedChange={setDataBackup} />
        }
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
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Volume Control */}
          {soundEnabled && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Volume</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Notification volume</span>
                  <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-whatsapp-green" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {item.control}
                  </div>
                ))}
              </div>
              {groupIndex < settingsGroups.length - 1 && <Separator />}
            </div>
          ))}

          {/* App Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl">
                <div className="w-10 h-10 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-whatsapp-green" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">App version</p>
                  <p className="text-sm text-muted-foreground">WhatsApp MVP v1.0.0</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl">
                <div className="w-10 h-10 bg-whatsapp-green/10 rounded-2xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-whatsapp-green" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Built with</p>
                  <p className="text-sm text-muted-foreground">Lovable & React</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};