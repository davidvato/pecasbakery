import type { RawMaterial, Product, Sale, Expense } from '../types';

export const mockRawMaterials: RawMaterial[] = [
  { id: 'rm1', name: 'Harina de Trigo', unit: 'kg', stock: 15, minStockAlert: 5, unitCost: 1.2 },
  { id: 'rm2', name: 'Azúcar Morena', unit: 'kg', stock: 8, minStockAlert: 10, unitCost: 1.5 },
  { id: 'rm3', name: 'Chispas de Chocolate', unit: 'kg', stock: 3, minStockAlert: 5, unitCost: 5.0 },
  { id: 'rm4', name: 'Mantequilla', unit: 'kg', stock: 12, minStockAlert: 4, unitCost: 4.5 },
  { id: 'rm5', name: 'Huevos', unit: 'pzas', stock: 120, minStockAlert: 30, unitCost: 0.15 },
  { id: 'rm6', name: 'Cacao en polvo', unit: 'kg', stock: 2, minStockAlert: 2, unitCost: 6.0 },
  { id: 'rm7', name: 'Empaques Individuales', unit: 'pzas', stock: 50, minStockAlert: 100, unitCost: 0.1 },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Galleta Choco Chips', category: 'Galletas', price: 2.5, estimatedCost: 0.8, stock: 45, status: 'Disponible' },
  { id: 'p2', name: 'Galleta Red Velvet', category: 'Galletas', price: 3.0, estimatedCost: 1.1, stock: 20, status: 'Disponible' },
  { id: 'p3', name: 'Brownie Clásico', category: 'Brownies', price: 3.5, estimatedCost: 1.2, stock: 15, status: 'Disponible' },
  { id: 'p4', name: 'Brownie con Nuez', category: 'Brownies', price: 4.0, estimatedCost: 1.5, stock: 5, status: 'Disponible' },
  { id: 'p5', name: 'Pack Mix 6 Galletas', category: 'Packs', price: 13.0, estimatedCost: 4.5, stock: 10, status: 'Disponible' },
  { id: 'p6', name: 'Pack Familiar Brownies', category: 'Packs', price: 20.0, estimatedCost: 7.0, stock: 0, status: 'Agotado' },
];

// Generate some mock sales for the last 7 days
const today = new Date();
export const mockSales: Sale[] = Array.from({ length: 15 }).map((_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - Math.floor(Math.random() * 7));
  
  const isCard = Math.random() > 0.5;
  const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
  const qty = Math.floor(Math.random() * 3) + 1;
  
  return {
    id: `s${i + 1}`,
    date: d.toISOString(),
    items: [
      {
        productId: product.id,
        quantity: qty,
        unitPrice: product.price,
        subtotal: product.price * qty,
      }
    ],
    total: product.price * qty,
    totalCost: product.estimatedCost * qty,
    paymentMethod: isCard ? 'Tarjeta' : 'Efectivo',
    customerType: 'Mostrador',
  };
});

export const mockExpenses: Expense[] = [
  { id: 'e1', date: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(), description: 'Alquiler Local', amount: 500, category: 'Alquiler' },
  { id: 'e2', date: new Date(today.getFullYear(), today.getMonth(), 5).toISOString(), description: 'Electricidad', amount: 80, category: 'Servicios' },
];
