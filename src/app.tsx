import { ChangeEvent, FormEvent } from 'react';
import { useTransactionStore } from './states';
import { TransactionForm } from './components/transaction-form';

const App = () => {
  const {
    transactions,
    addNewTransaction,
    removeTransaction,
    updateNewTransaction,
    newTransaction,
  } = useTransactionStore();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNewTransaction();
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateNewTransaction(e.target.id, e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 6,
      }}
    >
      <div
        style={{
          maxWidth: '400px',
        }}
      >
        <TransactionForm
          data={newTransaction.data}
          error={newTransaction.error}
          onFieldChange={handleFieldChange}
          onSubmit={handleFormSubmit}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
              }}
            >
              <div>{transaction.amount}</div>
              <div>{transaction.currency}</div>
              <button
                type="button"
                onClick={() => removeTransaction(transaction.id)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <span>No transactions found.</span>
        )}
      </div>
    </div>
  );
};

export { App };
