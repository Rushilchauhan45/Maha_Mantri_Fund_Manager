
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown, DollarSign, Target } from 'lucide-react';

interface DashboardStatsProps {
  totalBalance: number;
  monthlyGoal: number;
  onMonthlyGoalChange?: (amount: number) => void;
}

const DashboardStats = ({ totalBalance, monthlyGoal, onMonthlyGoalChange }: DashboardStatsProps) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [goalInput, setGoalInput] = useState(monthlyGoal.toString());
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  useEffect(() => {
    // Calculate percentage of goal achieved
    const percentage = Math.min(100, (totalBalance / monthlyGoal) * 100);
    setProgressPercentage(percentage);
  }, [totalBalance, monthlyGoal]);
  
  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onMonthlyGoalChange) {
      onMonthlyGoalChange(Number(goalInput));
    }
    setEditing(false);
  };
  
  // Determine if balance increased or decreased based on current value vs goal
  const balanceStatus = totalBalance >= monthlyGoal ? 'increase' : 'pending';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            
            💰 Total Balance
          </CardTitle>
          <CardDescription>🏦 Current Community Fund</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ₹{totalBalance.toLocaleString()}
          </div>
          <div className="flex items-center mt-2 text-sm">
            {balanceStatus === 'increase' ? (
              <>
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">🎯 Goal Achieved</span>
              </>
            ) : (
              <>
                <ArrowDown className="mr-1 h-4 w-4 text-amber-500" />
                <span className="text-amber-500">
                  ₹{(monthlyGoal - totalBalance).toLocaleString()} More to reach goal📈
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            
            📅 Monthly Goal 🎯
          </CardTitle>
          <CardDescription>
            {user?.role === 'Maha-Mantri' ? (
              <button 
                onClick={() => setEditing(true)} 
                className="text-xs text-primary dark:text-blue-400 hover:underline"
              >
                ✏️ Edit Goal
              </button>
            ) : (
              "Target collection amount"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {editing && user?.role === 'Maha-Mantri' ? (
            <form onSubmit={handleGoalSubmit} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="text-3xl font-bold">
              ₹{monthlyGoal.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">📊 Progress</CardTitle>
          <CardDescription>Current funding status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>{progressPercentage.toFixed(0)}% of goal🎯</div>
              <div>
                ₹{totalBalance.toLocaleString()} / ₹{monthlyGoal.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
