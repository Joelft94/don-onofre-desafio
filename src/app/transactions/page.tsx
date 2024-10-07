
import React from 'react';
import TransactionsTable from '@/components/TransactionsTable';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Transacciones</h1>
        <div className="bg-white shadow-sm rounded-lg">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}