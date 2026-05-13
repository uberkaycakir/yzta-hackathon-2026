import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Ekmek', stock: 12, status: 'critical', price: 10.00, category: 'Fırın' },
    { id: 2, name: 'Süt', stock: 45, status: 'overstock', price: 35.00, category: 'Süt ve Süt Ürünleri' },
    { id: 3, name: 'Yoğurt', stock: 24, status: 'normal', price: 45.00, category: 'Süt ve Süt Ürünleri' },
    { id: 4, name: 'Yumurta (30lu)', stock: 8, status: 'critical', price: 120.00, category: 'Gıda' },
  ]);

  const [sales, setSales] = useState([
    { id: 1, product: 'Ekmek', amount: 85, date: '2026-05-13', total: 850 },
    { id: 2, product: 'Süt', amount: 62, date: '2026-05-13', total: 2170 },
  ]);

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Hafta Sonu İndirimi', type: 'İndirim', status: 'Aktif', reach: '1.2k' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, supplier: 'Öz Süt A.Ş.', items: 'Süt, Yoğurt', status: 'Beklemede', total: '₺4.500' },
  ]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
      status: product.stock < 10 ? 'critical' : product.stock > 100 ? 'overstock' : 'normal',
      price: parseFloat(product.price)
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCampaign = (campaign) => {
    setCampaigns([...campaigns, { ...campaign, id: campaigns.length + 1, status: 'Aktif', reach: '0' }]);
  };

  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: orders.length + 1, status: 'Beklemede' }]);
  };

  const refreshData = () => {
    // Simulating data refresh
    console.log('Veriler güncelleniyor...');
    // We could add some random fluctuations here to show it "actually" updated
    setProducts(products.map(p => ({
      ...p,
      stock: Math.max(0, p.stock + Math.floor(Math.random() * 5) - 2)
    })));
  };

  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      sales, setSales,
      campaigns, addCampaign,
      orders, addOrder,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};
