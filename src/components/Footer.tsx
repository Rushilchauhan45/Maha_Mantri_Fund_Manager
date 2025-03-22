
import { ScrollArea } from "@/components/ui/scroll-area";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-auto">
      <div className="glass-card mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/80">
            🏛️ Maha-Mantri Community 🤝
            </h3>
            <p className="text-muted-foreground max-w-md">
            🌟 A Visionary Collective United by Purpose 🤝  
            We stand together, pooling our resources 💰 to build something greater than ourselves 🚀.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Community
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Values</h4>
            <ScrollArea className="h-24">
              <ul className="space-y-2">
                <li className="text-muted-foreground">Commitment to Excellence</li>
                <li className="text-muted-foreground">Integrity in Action</li>
                <li className="text-muted-foreground">Community First</li>
                <li className="text-muted-foreground">Progressive Thinking</li>
                <li className="text-muted-foreground">Collective Success</li>
              </ul>
            </ScrollArea>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {currentYear}©️ Maha-Mantri Community. All Rights Reserved.🚀
            <br /><br /><a href="https://www.linkedin.com/in/rushil-chauhan-b50529304/" target="_blank">Made By Rushil Chauhan</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
