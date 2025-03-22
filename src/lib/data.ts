
import { useState, useEffect } from 'react';

export interface Member {
  id: string;
  name: string;
  role: 'Maha-Mantri' | 'Mantri';
  description: string;
  image: string;
}

export interface Transaction {
  id: string;
  date: string;
  memberId: string;
  memberName: string;
  role: 'Maha-Mantri' | 'Mantri';
  amount: number;
}

// Community member data
export const communityMembers: Member[] = [
  {
    id: '1',
    name: 'Parth Kacha',
    role: 'Maha-Mantri',
    description: '🚀 Leading with vision and purpose. Guiding our community to new heights of excellence. 🌟',
    image: '/imgs/Maha(2).png'
  },
  {
    id: '2',
    name: 'Vimal Chauhan',
    role: 'Mantri',
    description: '🌱 Dedicated to community growth. Creating opportunities for everyone to succeed together. 🤝',
    image: '/imgs/Maha(2).png'
  },
  {
    id: '3',
    name: 'Dhaval Chauhan',
    role: 'Mantri',
    description: '🏗️ Building a stronger future through strategic planning and committed action. 📈',
    image: '/imgs/Maha(2).png'
  },
  {
    id: '4',
    name: 'Mihir Chauhan',
    role: 'Mantri',
    description: '💡 Championing innovation and resilience. Pushing boundaries for collective success. 🔥',
    image: '/imgs/Maha(2).png'
  },
  {
    id: '5',
    name: 'Rushil Chauhan',
    role: 'Mantri',
    description: '🏆 Devoted to excellence and reliability. Making every project a testament to our values. 💯',
    image: '/imgs/Maha(2).png'
  }
];

// Initial transactions
const initialTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-02-22',
    memberId: '1',
    memberName: 'Parth Kacha',
    role: 'Maha-Mantri',
    amount: 0
  },
  {
    id: '2',
    date: '2025-02-22',
    memberId: '2',
    memberName: 'Vimal Chauhan',
    role: 'Mantri',
    amount: 50
  },
  {
    id: '3',
    date: '2025-02-22',
    memberId: '3',
    memberName: 'Dhaval Chauhan',
    role: 'Mantri',
    amount: 50
  },
  {
    id: '4',
    date: '2025-02-22',
    memberId: '4',
    memberName: 'Mihir Chauhan',
    role: 'Mantri',
    amount: 50
  },{
    id: '5',
    date: '2025-02-22',
    memberId: '5',
    memberName: 'Rushil Chauhan',
    role: 'Mantri',
    amount: 50
  },
];

// Monthly collection goal
let monthlyGoal = 200;

// Use local storage to persist data
export const useTransactionData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [collectionGoal, setCollectionGoal] = useState(monthlyGoal);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    const storedGoal = localStorage.getItem('monthlyGoal');
    
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(initialTransactions);
      localStorage.setItem('transactions', JSON.stringify(initialTransactions));
    }
    
    if (storedGoal) {
      setCollectionGoal(Number(storedGoal));
    } else {
      localStorage.setItem('monthlyGoal', monthlyGoal.toString());
    }
    
    calculateBalance();
  }, []);
  
  // Calculate total balance
  const calculateBalance = () => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      const total = parsedTransactions.reduce((sum: number, tx: Transaction) => sum + tx.amount, 0);
      setTotalBalance(total);
    }
  };
  
  // Add a new transaction
  const addTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const date = new Date();
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: date.toISOString().split('T')[0],
      ...newTransaction
    };
    
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    calculateBalance();
    
    return transaction;
  };
  
  // Update monthly goal
  const updateMonthlyGoal = (amount: number) => {
    setCollectionGoal(amount);
    monthlyGoal = amount;
    localStorage.setItem('monthlyGoal', amount.toString());
  };
  
  return {
    transactions,
    totalBalance,
    collectionGoal,
    addTransaction,
    updateMonthlyGoal,
    calculateBalance
  };
};
