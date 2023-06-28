import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { Currency, NewTransaction } from '../models';

// Types, could be moved to models
type Transaction = {
  id: string;
  currency: Currency;
  amount: string;
  dateAdded?: string;
};

type NewTransactionForm = {
  data?: NewTransaction;
  error?: string;
};

type TransactionState = {
  transactions: Transaction[];
  newTransaction: NewTransactionForm;

  addNewTransaction: () => void;
  updateNewTransaction: (fieldName: string, value: string) => void;
  clearNewTransaction: () => void;
  removeTransaction: (id: string) => void;
};

const transactionService = {
  // Fake API call which just returns new resource
  create: (transaction?: NewTransaction): Transaction => {
    if (!transaction) {
      throw new Error('Transaction is not defined.');
    }

    if (!transaction.amount) {
      throw new Error('Transaction Amount is required.');
    }

    return {
      id: uuid(),
      amount: transaction.amount,
      currency: transaction.currency || Currency.EUR,
      dateAdded: new Date().toUTCString(),
    };
  },
};

const useTransactionStore = create<TransactionState>()(
  devtools((setState, getState) => ({
    transactions: [],
    newTransaction: {},

    updateNewTransaction: (fieldName, value) =>
      setState((state) => ({
        newTransaction: {
          ...state.newTransaction,
          data: { ...state.newTransaction.data, [fieldName]: value },
        },
      })),

    clearNewTransaction: () => setState(() => ({ newTransaction: {} })),

    addNewTransaction: () => {
      const { transactions, newTransaction, clearNewTransaction } = getState();

      try {
        const createdTransaction = transactionService.create(
          newTransaction.data
        );

        transactions.push(createdTransaction);

        setState(() => ({
          transactions,
        }));

        clearNewTransaction();
      } catch (error) {
        setState((state) => ({
          newTransaction: {
            ...state.newTransaction,
            error: (error as Error).message,
          },
        }));
      }
    },

    removeTransaction: (id) => {
      const { transactions } = getState();
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );

      setState(() => ({
        transactions: filteredTransactions,
      }));
    },
  }))
);

export { useTransactionStore };
