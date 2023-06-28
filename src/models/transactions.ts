enum Currency {
  EUR = 'Eur',
  USD = 'Usd',
  PLN = 'Zloty',
}

type NewTransaction = {
  currency?: Currency;
  amount?: string;
};

export type { NewTransaction };
export { Currency };
