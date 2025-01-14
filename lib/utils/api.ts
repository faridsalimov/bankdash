import { readFileSync, writeFileSync } from "fs";
import path from "path";
import {
  User,
  Card,
  Transaction,
  Account,
  QuickTransferContact,
  UserPreferences,
} from "../types";

const DB_PATH = path.join(process.cwd(), "lib/db.json");

interface Database {
  users: User[];
  cards: Card[];
  transactions: Transaction[];
  accounts: Account[];
  quickTransferContacts: QuickTransferContact[];
  userPreferences: UserPreferences[];
  activityData: {
    weekly: Array<{ name: string; deposit: number; withdraw: number }>;
    monthly: Array<{ name: string; amount: number }>;
  };
  expenseCategories: Array<{ name: string; percentage: number }>;
  invoices: Array<{
    id: number;
    name: string;
    time: string;
    amount: number;
    icon: string;
  }>;
  balanceHistory: Array<{ name: string; value: number }>;
}

export function getDatabase(): Database {
  const data = readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export function writeDatabase(data: Database): void {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getCurrentUser(): User {
  const db = getDatabase();
  return db.users[0];
}

export function getUserCards(userId: string): Card[] {
  const db = getDatabase();
  return db.cards.filter((card) => card.userId === userId);
}

export function getUserTransactions(userId: string): Transaction[] {
  const db = getDatabase();
  return db.transactions.filter((transaction) => transaction.userId === userId);
}

export function getUserAccount(userId: string): Account | undefined {
  const db = getDatabase();
  return db.accounts.find((account) => account.userId === userId);
}

export function getQuickTransferContacts(): QuickTransferContact[] {
  const db = getDatabase();
  return db.quickTransferContacts;
}

export function getUserPreferences(
  userId: string
): UserPreferences | undefined {
  const db = getDatabase();
  return db.userPreferences.find((pref) => pref.userId === userId);
}

export function getActivityData() {
  const db = getDatabase();
  return db.activityData;
}

export function getExpenseCategories() {
  const db = getDatabase();
  return db.expenseCategories;
}

export function getInvoices() {
  const db = getDatabase();
  return db.invoices;
}

export function getBalanceHistory() {
  const db = getDatabase();
  return db.balanceHistory;
}

export function updateUserProfile(
  userId: string,
  userData: Partial<User>
): User {
  const db = getDatabase();
  const userIndex = db.users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  db.users[userIndex] = { ...db.users[userIndex], ...userData };
  writeDatabase(db);
  return db.users[userIndex];
}

export function updateUserPreferences(
  userId: string,
  preferences: Partial<UserPreferences>
): UserPreferences {
  const db = getDatabase();
  const prefIndex = db.userPreferences.findIndex(
    (pref) => pref.userId === userId
  );

  if (prefIndex === -1) {
    throw new Error("Preferences not found");
  }

  db.userPreferences[prefIndex] = {
    ...db.userPreferences[prefIndex],
    ...preferences,
  };
  writeDatabase(db);
  return db.userPreferences[prefIndex];
}

export function createTransaction(
  transaction: Omit<Transaction, "id">
): Transaction {
  const db = getDatabase();
  const newTransaction = {
    id: Math.random().toString(36).substr(2, 9),
    ...transaction,
  };

  db.transactions.push(newTransaction);
  writeDatabase(db);
  return newTransaction;
}

export function updateUserSecurity(
  userId: string,
  securityData: {
    twoFactorEnabled: boolean;
    currentPassword?: string;
    newPassword?: string;
  }
) {
  const db = getDatabase();
  const userPrefs = db.userPreferences.find((pref) => pref.userId === userId);

  if (!userPrefs) {
    throw new Error("User preferences not found");
  }

  writeDatabase(db);
  return userPrefs;
}
