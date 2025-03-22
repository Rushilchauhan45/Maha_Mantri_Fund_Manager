
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardStats from '@/components/DashboardStats';
import TransactionHistory from '@/components/TransactionHistory';
import { useTransactionData } from '@/lib/data';
import { toast } from 'sonner';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { 
    transactions, 
    totalBalance, 
    collectionGoal, 
    addTransaction, 
    updateMonthlyGoal,
    calculateBalance 
  } = useTransactionData();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access the dashboard");
      navigate('/login');
    }
    
    // Recalculate balance when component mounts
    calculateBalance();
  }, [isAuthenticated, navigate, calculateBalance]);
  
  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-24 px-4">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user.name}
            </h1>
            <p className="text-muted-foreground">
              {user.role === 'Maha-Mantri' 
                ? 'You have complete access to manage the community fund.' 
                : 'You can view the latest fund information and transaction history.'}
            </p>
          </div>
          
          <div className="space-y-8">
            <DashboardStats 
              totalBalance={totalBalance} 
              monthlyGoal={collectionGoal}
              onMonthlyGoalChange={user.role === 'Maha-Mantri' ? updateMonthlyGoal : undefined}
            />
            
            <TransactionHistory 
              transactions={transactions}
              onAddTransaction={addTransaction}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
