import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isOpen ? 90 : 0 }}
    >
      <div className="p-4">
        <MessageCircle className="h-6 w-6" />
      </div>
      {!isOpen && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="pr-4 font-medium whitespace-nowrap"
        >
          Need Help?
        </motion.span>
      )}
    </motion.button>
  );
};

export default ChatButton;
