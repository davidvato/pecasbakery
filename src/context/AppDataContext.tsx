import React, { createContext, useContext, useState, useEffect } from 'react';
import { RawMaterial, Product, Sale, Expense, SaleItem } from '../types';
import { mockRawMaterials, mockProducts, mockSales, mockExpenses } from '../data/mockData';

interface AppDataContextType {
  rawMaterials: RawMaterial[];
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  updateProductStock: (productId: string, quantity: number) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>(mockRawMaterials);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  // Load from local storage if needed later, but using mock data for demo
  
  const updateProductStock = (productId: string, quantitySold: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock - quantitySold);
        return { ...p, stock: newStock, status: newStock === 0 ? 'Agotado' : 'Disponible' };
      }
      return p;
    }));
  };

  const addSale = (saleData: Omit<Sale, 'id' | 'date'>) => {
    const newSale: Sale = {
      ...saleData,
      id: `s_${Date.now()}`,
      date: new Date().toISOString(),
    };
    setSales(prev => [newSale, ...prev]);
    
    // Deduct inventory
    saleData.items.forEach(item => {
      updateProductStock(item.productId, item.quantity);
    });
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `e_${Date.now()}`,
      date: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  return (
    <AppDataContext.Provider value={{
      rawMaterials,
      products,
      sales,
      expenses,
      addSale,
      updateProductStock,
      addExpense
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
