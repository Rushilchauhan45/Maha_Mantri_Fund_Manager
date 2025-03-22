
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunityMember from '@/components/CommunityMember';
import { Button } from '@/components/ui/button';
import { communityMembers } from '@/lib/data';
import { ArrowRight, LogIn } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const communityRef = useRef<HTMLDivElement>(null);
  
  // Animate elements when they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (communityRef.current) {
      observer.observe(communityRef.current);
    }
    
    return () => {
      if (communityRef.current) {
        observer.unobserve(communityRef.current);
      }
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-32">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-scale-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70">
              Maha-Mantri 
              </span>
              <br />
              <span className="mt-2 inline-block">Fund Community 💵</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            🤝Together We Rise 🚀. A visionary collective pooling resources🌟 
              to create extraordinary possibilities for our community.💪
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              {isAuthenticated ? (
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  size="lg" 
                  className="home-btn glass-card px-8 py-6 text-lg btn-hover"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/login')} 
                  size="lg" 
                  className="home-btn glass-card px-8 py-6 text-lg btn-hover"
                >
                  Login to Access
                  <LogIn className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
            
            <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 animate-bounce opacity-70 hidden md:block">
              <a href="#community" className="text-muted-foreground">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 4V20M12 20L18 14M12 20L6 14" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section id="community" ref={communityRef} className="py-16 md:py-24 px-4 bg-secondary/50 dark:bg-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">✨Our Community 🤝</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            👥 Meet the Visionaries Behind Jijs-Sala Community ✨  
            Each member brings unique strengths 💪 to our collective mission 🚀!  
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CommunityMember member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl">
          <blockquote className="glass-card p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl italic mb-6">
            🤝 "Unity is Strength... When There is Teamwork and Collaboration, ✨ Wonderful Things Can Be Achieved."🚀
            </p>
            <footer className="text-muted-foreground">
            📜 — Jijs-Sala Community Philosophy 🌍✨
            </footer>
          </blockquote>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
