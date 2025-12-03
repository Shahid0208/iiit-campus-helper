import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  delay?: number;
}

const ChatMessage = ({ message, isBot, delay = 0 }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`flex gap-3 mb-4 ${isBot ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? "bg-accent" : "bg-primary"
        }`}
      >
        {isBot ? (
          <Bot className="h-5 w-5 text-accent-foreground" />
        ) : (
          <User className="h-5 w-5 text-primary-foreground" />
        )}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isBot
            ? "bg-chat-bot text-foreground rounded-tl-none"
            : "bg-chat-user text-primary-foreground rounded-tr-none"
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
