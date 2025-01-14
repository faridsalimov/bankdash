export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  cardHolder: string;
  validThru: string;
  balance: number;
  type: "credit" | "debit";
}

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  transactionId: string;
  type: "Shopping" | "Transfer" | "Service";
  amount: number;
  date: string;
  status: "Pending" | "Completed";
  cardLastFour: string;
  direction: "incoming" | "outgoing";
}

export interface Account {
  id: string;
  userId: string;
  balance: number;
  income: number;
  expense: number;
  totalSaving: number;
}

export interface QuickTransferContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface UserPreferences {
  currency: string;
  timezone: string;
  notifications: {
    digitalCurrency: boolean;
    merchantOrder: boolean;
    recommendations: boolean;
  };
}
