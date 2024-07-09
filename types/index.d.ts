declare type AccountHolder = {
  customer: string;
  type: string;
};

declare type LinkedAccount = {
  id: string;
  object: string;
  account_holder: AccountHolder;
  balance: number | null;
  balance_refresh: number | null;
  category: string;
  created: number;
  display_name: string;
  institution_name: string;
  last4: string;
  livemode: boolean;
  ownership: any | null;
  ownership_refresh: any | null;
  permissions: string[];
  status: string;
  subcategory: string;
  subscriptions: any[];
  supported_payment_method_types: string[];
  transaction_refresh: any | null;
};
