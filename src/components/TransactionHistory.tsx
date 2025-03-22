
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Transaction } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { communityMembers } from '@/lib/data';
import { toast } from 'sonner';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const TransactionHistory = ({ transactions, onAddTransaction }: TransactionHistoryProps) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [amount, setAmount] = useState('');
  
  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.date.includes(searchTerm)
  );
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleAddTransaction = () => {
    if (!selectedMember || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    const member = communityMembers.find(m => m.id === selectedMember);
    if (!member) {
      toast.error("Selected member not found");
      return;
    }
    
    onAddTransaction({
      memberId: member.id,
      memberName: member.name,
      role: member.role,
      amount: Number(amount)
    });
    
    toast.success("Transaction added successfully");
    setOpen(false);
    setSelectedMember('');
    setAmount('');
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>📜 Transaction History</CardTitle>
            <CardDescription>💰 Recent Fund Contributions</CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {user?.role === 'Maha-Mantri' && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>➕ Add New Transaction</DialogTitle>
                    <DialogDescription>
                      Record a new fund contribution from a community member.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="member" className="text-sm font-medium">
                        Member
                      </label>
                      <Select 
                        value={selectedMember} 
                        onValueChange={setSelectedMember}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Members</SelectLabel>
                            {communityMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name} ({member.role})
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="amount" className="text-sm font-medium">
                        Amount (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          className="pl-8"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddTransaction}>➕ Add Transaction</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((tx) => (
                  <TableRow key={tx.id} className="animate-fade-in">
                    <TableCell>{tx.date}</TableCell>
                    <TableCell className="font-medium">{tx.memberName}</TableCell>
                    <TableCell>{tx.role}</TableCell>
                    <TableCell className="text-right">₹{tx.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                  🚫 No Transactions Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
