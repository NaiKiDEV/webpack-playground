import { ChangeEvent, FC, FormEvent } from 'react';
import { Currency, NewTransaction } from '../models';

type TransactionFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onFieldChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  data?: NewTransaction;
  error?: string;
};

const TransactionForm: FC<TransactionFormProps> = ({
  data,
  error,
  onSubmit,
  onFieldChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <span style={{ color: 'red' }}>{error}</span>
        <div
          style={{
            display: 'flex',
            gap: 6,
          }}
        >
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            value={data?.amount || ''}
            onChange={onFieldChange}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
          }}
        >
          <label htmlFor="currency">Currency</label>
          <select id="currency" name="currency" onBlur={onFieldChange}>
            {Object.values(Currency).map((currency) => (
              <option
                key={currency}
                value={currency}
                selected={currency === data?.currency}
              >
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create New Transaction</button>
      </div>
    </form>
  );
};

export { TransactionForm };
