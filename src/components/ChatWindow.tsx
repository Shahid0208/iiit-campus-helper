import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import QuickReply from "./QuickReply";
import ConfirmationCard from "./ConfirmationCard";
import SuccessScreen from "./SuccessScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step =
  | "greeting"
  | "location-category"
  | "hostel-selection"
  | "nilgiri-selection"
  | "academic-selection"
  | "canteen-selection"
  | "common-area-selection"
  | "mess-selection"
  | "issue-category"
  | "mess-issue-category"
  | "details-input"
  | "confirmation"
  | "success";

interface FormData {
  locationCategory: string;
  specificLocation: string;
  issueType: string;
  description: string;
  roomNumber: string;
}

const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("greeting");
  const [formData, setFormData] = useState<FormData>({
    locationCategory: "",
    specificLocation: "",
    issueType: "",
    description: "",
    roomNumber: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isNilgiri, setIsNilgiri] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Place-specific issue mappings for Common Areas (normalized keys)
  const commonAreaIssues: Record<string, string[]> = {
    "football ground": [
      "Floodlights",
      "Ground Maintenance",
      "Seating / Benches",
      "Irrigation / Watering",
      "Cleaning",
      "Other",
    ],
    "felicity ground": [
      "Ground Maintenance",
      "Seating / Benches",
      "Lighting",
      "Cleaning",
      "Other",
    ],
    // Bakul Warehouse is used for festivals — provide event-specific issue categories
    "bakul warehouse": [
      "Event Setup / Stage",
      "Audio / PA System",
      "Lighting / Rigging",
      "Seating / Arrangement",
      "Power / Electrical",
      "Sanitation / Cleaning",
      "Security / Crowd Control",
      "Decoration",
      "Safety Hazard",
      "Other",
    ],
    // Amphitheatre is an open-air venue for cultural fests — include event/outdoor-specific issues
    "amphitheatre": [
      "Stage Setup / Backdrop",
      "Sound / PA System",
      "Lighting",
      "Seating / Audience Area",
      "Weather Protection / Tarping",
      "Power / Generators",
      "Sanitation / Portable Toilets",
      "Security / Crowd Control",
      "Safety Hazard",
      "Waste Management",
      "Other",
    ],
    "music room": [
      "Instrument Repair",
      "AC / Ventilation",
      "Sound System",
      "Cleaning",
      "Other",
    ],
    "gym": [
      "Equipment Repair",
      "AC / Heating",
      "Trainer / Staffing",
      "Cleaning",
      "Other",
    ],
    "open gym": ["Equipment Repair", "Safety Hazard", "Cleaning", "Other"],
    "basketball court": ["Net / Hoop Damage", "Surface Damage", "Lighting", "Cleaning", "Other"],
    "volleyball court": ["Net Repair", "Surface Damage", "Lighting", "Cleaning", "Other"],
    "cricket ground": ["Pitch Maintenance", "Boundary / Fencing", "Net Repair", "Lighting", "Other"],
    "lawn tennis court": ["Net Repair", "Surface Maintenance", "Lighting", "Cleaning", "Other"],
  };

  // Canteen-specific issues
  const canteenIssues: Record<string, string[]> = {
    "vindhya canteen": [
      "Food Quality",
      "Hygiene",
      "Billing Issue",
      "Queue Management",
      "Utensils / Cutlery",
      "Portion Size",
      "Service Delay",
      "Equipment / Appliances",
      "Other",
    ],
    "tantra": [
      "Food Quality",
      "Hygiene",
      "Menu Availability",
      "Billing Issue",
      "Service Delay",
      "Utensils / Cutlery",
      "Equipment / Appliances",
      "Other",
    ],
    "david": [
      "Food Quality",
      "Hygiene",
      "Billing Issue",
      "Allergy / Ingredient",
      "Service Delay",
      "Utensils / Cutlery",
      "Other",
    ],
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hello! I'm the Campus Service Assistant. I'm here to help you report issues on campus. Where is the issue located?"
        );
        setStep("location-category");
      }, 300);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isBot: true }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isBot: false }]);
  };

  const handleLocationCategory = (category: string) => {
    addUserMessage(category);
    setFormData((prev) => ({ ...prev, locationCategory: category }));

    setTimeout(() => {
      switch (category) {
        case "Hostel":
          addBotMessage("Which hostel?");
          setStep("hostel-selection");
          // Ensure Nilgiri context is cleared when user selects Hostel
          setIsNilgiri(false);
          break;
        case "Academic Block":
          addBotMessage("Which block? Please type the block name (e.g., A-Block, CSE, ECE).");
          setStep("academic-selection");
          setShowInput(true);
          break;
        case "Canteens":
          addBotMessage("Which canteen?");
          setStep("canteen-selection");
          break;
        case "Common Areas":
          addBotMessage("Which location?");
          setStep("common-area-selection");
          break;
        case "Mess":
          addBotMessage("Which mess?");
          setStep("mess-selection");
          break;
      }
    }, 500);
  };

  const handleSpecificLocation = (location: string) => {
    addUserMessage(location);
    setFormData((prev) => ({ ...prev, specificLocation: location }));

    setTimeout(() => {
      // Normalize location for comparisons
      const locNorm = location.trim().toLowerCase();
      const nilgiriKey = "nilgiri";
      const nilgiriSubs = [
        "electornic lab",
        "computer lab",
        "saranga hall",
        "msit",
        "placement office",
        "microlabs",
        "pdm space",
      ];

      // If user selected/typed Nilgiri, show Nilgiri-specific locations first
      if (locNorm === nilgiriKey) {
        setIsNilgiri(true);
        addBotMessage("Which location in Nilgiri? Please choose or type the location.");
        setStep("nilgiri-selection");
        setShowInput(true);
        return;
      }

      // If the user selected a Nilgiri sub-location (or we are already in Nilgiri flow), keep that context
      if (isNilgiri || nilgiriSubs.includes(locNorm)) {
        setIsNilgiri(true);
      } else {
        setIsNilgiri(false);
      }

      // Check if it's a mess location
      if (formData.locationCategory === "Mess") {
        addBotMessage("What kind of issue is this?");
        setStep("mess-issue-category");
      } else {
        addBotMessage("What kind of issue is this?");
        setStep("issue-category");
      }
      setShowInput(false);
    }, 500);
  };

  const handleIssueCategory = (issue: string) => {
    addUserMessage(issue);
    setFormData((prev) => ({ ...prev, issueType: issue }));

    setTimeout(() => {
      addBotMessage("Please provide a brief description of the issue and your room number or specific location.");
      setStep("details-input");
      setShowInput(true);
    }, 500);
  };

  const handleMessIssueCategory = (issue: string) => {
    addUserMessage(issue);
    setFormData((prev) => ({ ...prev, issueType: issue }));

    setTimeout(() => {
      addBotMessage("Please provide additional details about the issue.");
      setStep("details-input");
      setShowInput(true);
    }, 500);
  };

  const handleDetailsSubmit = () => {
    if (!inputValue.trim()) return;

    const [description, ...roomParts] = inputValue.split("\n");
    const roomNumber = roomParts.join(" ").trim();

    addUserMessage(inputValue);
    setFormData((prev) => ({
      ...prev,
      description: description.trim(),
      roomNumber: roomNumber || "Not specified",
    }));
    setInputValue("");
    setShowInput(false);

    setTimeout(() => {
      addBotMessage("Here's a summary of your request. Please review and confirm:");
      setStep("confirmation");
    }, 500);
  };

  const handleSubmit = () => {
    setStep("success");
  };

  const handleNewReport = () => {
    setMessages([]);
    setFormData({
      locationCategory: "",
      specificLocation: "",
      issueType: "",
      description: "",
      roomNumber: "",
    });
    setIsNilgiri(false);
    setStep("greeting");
    setTimeout(() => {
      addBotMessage(
        "Hello! I'm the Campus Service Assistant. I'm here to help you report issues on campus. Where is the issue located?"
      );
      setStep("location-category");
    }, 300);
  };

  const renderStepContent = () => {
    switch (step) {
      case "location-category":
        return (
          <QuickReply
            options={["Hostel", "Academic Block", "Canteens", "Mess", "Common Areas"]}
            onSelect={handleLocationCategory}
          />
        );

      case "hostel-selection":
        return (
          <QuickReply
            options={["Bakul Nivas", "Parijaat", "Kadamba Nivas", "Palash Nivas"]}
            onSelect={handleSpecificLocation}
          />
        );

      case "academic-selection":
        return (
          <>
            <QuickReply
              options={[
                "Nilgiri",
                "Kohli Research Block",
                "Himalaya Building",
                "Vindhya Building",
                "SERC building",
              ]}
              onSelect={handleSpecificLocation}
            />
            {/* Keep the text input fallback enabled (showInput remains true) */}
          </>
        );

      case "nilgiri-selection":
        return (
          <QuickReply
            options={[
              "ELECTORNIC LAB",
              "COMPUTER LAB",
              "SARANGA HALL",
              "MSIT",
              "PLACEMENT OFFICE",
              "MICROLABS",
              "PDM SPACE",
            ]}
            onSelect={handleSpecificLocation}
          />
        );

      case "canteen-selection":
        return (
          <QuickReply
            options={["Vindhya Canteen", "Tantra", "David"]}
            onSelect={handleSpecificLocation}
          />
        );

      case "common-area-selection":
        return (
          <QuickReply
            options={[
              "Football Ground",
              "Felicity Ground",
              "Bakul Warehouse",
              "Music Room",
              "Amphitheatre",
              "Gym",
              "Open Gym",
              "Basketball Court",
              "Volleyball Court",
              "Cricket Ground",
              "Lawn Tennis Court",
            ]}
            onSelect={handleSpecificLocation}
          />
        );

      case "mess-selection":
        return (
          <QuickReply
            options={["Kadamba Mess (Veg)", "Kadamba Mess (Non-Veg)", "Yuktahar Mess", "Palash Mess"]}
            onSelect={handleSpecificLocation}
          />
        );

      case "issue-category":
        {
          // If this report is for a Canteen, show canteen-specific issues when available
          if (formData.locationCategory === "Canteens") {
            const key = formData.specificLocation?.trim().toLowerCase() || "";
            const specific = canteenIssues[key];
            const options = specific ?? [
              "Food Quality",
              "Hygiene",
              "Billing Issue",
              "Service Delay",
              "Other",
            ];
            return <QuickReply options={options} onSelect={handleIssueCategory} />;
          }

          // If this report is for a Common Area, pick place-specific options when available
          if (formData.locationCategory === "Common Areas") {
            const key = formData.specificLocation?.trim().toLowerCase() || "";
            const specific = commonAreaIssues[key];
            const options = specific ?? ["Cleaning", "Lighting", "Maintenance", "Safety", "Other"];
            return <QuickReply options={options} onSelect={handleIssueCategory} />;
          }

          // Base options for other categories
          const baseOptions = [
            "Electrician",
            "Plumber",
            "Carpenter",
            "Internet / IT",
            "Cleaning",
            "Other",
          ];
          // Remove Plumber only when we're in Nilgiri context AND not reporting for a Hostel
          const options = isNilgiri && formData.locationCategory !== "Hostel"
            ? baseOptions.filter((o) => o !== "Plumber")
            : baseOptions;
          return <QuickReply options={options} onSelect={handleIssueCategory} />;
        }

      case "mess-issue-category":
        return (
          <QuickReply
            options={[
              "Food Quality",
              "Hygiene Issue",
              "Menu Complaint",
              "Service Issue",
              "Portion Size",
              "Late Service",
              "Other",
            ]}
            onSelect={handleMessIssueCategory}
          />
        );

      case "confirmation":
        return (
          <ConfirmationCard
            locationCategory={formData.locationCategory}
            specificLocation={formData.specificLocation}
            issueType={formData.issueType}
            description={formData.description}
            roomNumber={formData.roomNumber}
            onSubmit={handleSubmit}
          />
        );

      case "success":
        return <SuccessScreen onNewReport={handleNewReport} />;

      default:
        return null;
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (step === "academic-selection") {
      handleSpecificLocation(inputValue);
      setInputValue("");
    } else if (step === "details-input") {
      handleDetailsSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-chat-bg rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-border"
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Campus Service Assistant</h3>
              <p className="text-xs opacity-90">IIIT Hyderabad Help Portal</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isBot={msg.isBot} delay={0} />
            ))}
            {renderStepContent()}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {showInput && step !== "success" && (
            <form onSubmit={handleInputSubmit} className="p-4 border-t border-border">
              {step === "details-input" ? (
                <div className="space-y-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Description..."
                    className="resize-none min-h-[80px]"
                  />
                  <Button type="submit" className="w-full" disabled={!inputValue.trim()}>
                    Submit Details
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
