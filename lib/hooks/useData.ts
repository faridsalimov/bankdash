"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to fetch data");
  }
};

export function useUser() {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR("/api/user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: accountData,
    error: accountError,
    isLoading: accountLoading,
  } = useSWR(
    userData?.id ? `/api/accounts?userId=${userData.id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    user: userData ? { ...userData, ...accountData } : undefined,
    isLoading: userLoading || accountLoading,
    error: userError || accountError,
  };
}

export function useCards(userId: string | undefined) {
  const { data, error, isLoading } = useSWR(
    userId ? `/api/cards?userId=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    cards: data,
    isLoading,
    error,
  };
}

export function useTransactions(userId: string | undefined) {
  const { data, error, isLoading } = useSWR(
    userId ? `/api/transactions?userId=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    transactions: data,
    isLoading,
    error,
  };
}

export function useActivityData() {
  const { data, error, isLoading } = useSWR("/api/activity", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    activityData: data,
    isLoading,
    error,
  };
}

export function useExpenseCategories() {
  const { data, error, isLoading } = useSWR("/api/expenses", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    categories: data,
    isLoading,
    error,
  };
}

export function useQuickTransferContacts() {
  const { data, error, isLoading } = useSWR("/api/contacts", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    contacts: data,
    isLoading,
    error,
  };
}

export function useInvoices() {
  const { data, error, isLoading } = useSWR("/api/invoices", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    invoices: data,
    isLoading,
    error,
  };
}

export function useBalanceHistory() {
  const { data, error, isLoading } = useSWR("/api/balance-history", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    history: data,
    isLoading,
    error,
  };
}
