import { useState } from "react";
import Header from "@/components/Header";
import ChatButton from "@/components/ChatButton";
import ChatWindow from "@/components/ChatWindow";

const offices = [
  { name: "Academic Office", category: "academic" },
  { name: "Faculty", category: "faculty" },
  { name: "Library Office", category: "library" },
  { name: "Student Affairs Office", category: "student" },
  { name: "Accounts Office", category: "admin" },
  { name: "GAD Office", category: "admin" },
  { name: "Mess Admin Office", category: "mess" },
  { name: "Unassigned", category: "other" },
  { name: "Admissions Office", category: "academic" },
  { name: "Hostel Office", category: "hostel" },
  { name: "Online ClassRoom", category: "it" },
  { name: "Web Administration", category: "it" },
  { name: "Alumni Office", category: "outreach" },
  { name: "HR & Personnel Office", category: "admin" },
  { name: "Outreach Office", category: "outreach" },
  { name: "Communications Office", category: "outreach" },
  { name: "IIIT Home page", category: "it" },
  { name: "Placements Office", category: "placements" },
  { name: "Engineering Office", category: "facilities" },
  { name: "IT Services Office", category: "it" },
  { name: "R&D Office", category: "research" },
];

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Offices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-3">
          {offices.map((office) => (
            <a
              key={office.name}
              href="#"
              className="text-primary hover:underline text-sm transition-colors"
            >
              {office.name}
            </a>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-accent border-l-4 border-primary rounded p-6">
          <h3 className="text-lg font-semibold text-accent-foreground mb-2">
            Need to Report an Issue?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Use our Campus Service Assistant to quickly report maintenance issues, facilities problems, 
            or service requests across hostels, academic blocks, canteens, and common areas.
          </p>
          <p className="text-sm text-accent-foreground">
            Click the <strong>chat button</strong> in the bottom-right corner to get started.
          </p>
        </div>
      </main>

      {/* Chat Components */}
      <ChatButton onClick={() => setIsChatOpen(!isChatOpen)} isOpen={isChatOpen} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
