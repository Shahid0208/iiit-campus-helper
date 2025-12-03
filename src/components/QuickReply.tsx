import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
  delay?: number;
}

const QuickReply = ({ options, onSelect, delay = 0.2 }: QuickReplyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-wrap gap-2 mb-4 ml-11"
    >
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + index * 0.05 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(option)}
            className="rounded-full hover:bg-accent hover:border-primary transition-all"
          >
            {option}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickReply;
