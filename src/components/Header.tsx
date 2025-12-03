import { NavLink } from "@/components/NavLink";

const Header = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="bg-muted border-b border-border px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              My page
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Offices
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Help
            </a>
          </div>
          <div className="text-muted-foreground text-xs">
            Logged in as: <span className="text-foreground">student@students.iiit.ac.in</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-nav text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">Help@IIIT, Hyderabad</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-nav text-white border-t border-nav-hover">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1">
            <NavLink
              to="/"
              end
              className="px-4 py-2 text-sm hover:bg-nav-hover transition-colors"
              activeClassName="bg-nav-hover font-medium"
            >
              Offices
            </NavLink>
            <a
              href="#"
              className="px-4 py-2 text-sm hover:bg-nav-hover transition-colors"
            >
              Activity
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm hover:bg-nav-hover transition-colors"
            >
              Issues
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm hover:bg-nav-hover transition-colors"
            >
              Spent time
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm hover:bg-nav-hover transition-colors"
            >
              Gantt
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm hover:bg-nav-hover transition-colors"
            >
              Calendar
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
