import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Wrench, FileText, Home } from "lucide-react";

interface ConfirmationCardProps {
  locationCategory: string;
  specificLocation: string;
  issueType: string;
  description: string;
  roomNumber: string;
  onSubmit: () => void;
}

const ConfirmationCard = ({
  locationCategory,
  specificLocation,
  issueType,
  description,
  roomNumber,
  onSubmit,
}: ConfirmationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ml-11 mb-4"
    >
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-primary">Request Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Location Type</p>
              <p className="text-sm font-medium">{locationCategory}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Specific Location</p>
              <p className="text-sm font-medium">{specificLocation}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Wrench className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Issue Type</p>
              <p className="text-sm font-medium">{issueType}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="text-sm">{description}</p>
              {roomNumber && (
                <p className="text-xs text-muted-foreground mt-1">Room: {roomNumber}</p>
              )}
            </div>
          </div>

          <Button onClick={onSubmit} className="w-full mt-2">
            Submit Request
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConfirmationCard;
