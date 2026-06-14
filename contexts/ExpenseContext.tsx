import React, { createContext, ReactNode, useContext, useState } from "react";

// Simulated electricity data indexed by month (0=Jan)
const ELECTRICITY_DATA: Expense[] = [
  { type: "electricity", monthId: 0, bill: 140 },
  { type: "electricity", monthId: 1, bill: 90 },
  { type: "electricity", monthId: 2, bill: 200 },
  { type: "electricity", monthId: 3, bill: 130 },
  { type: "electricity", monthId: 4, bill: 80 },
  { type: "electricity", monthId: 5, bill: 120 },
  { type: "electricity", monthId: 6, bill: 0 },
  { type: "electricity", monthId: 7, bill: 0 },
  { type: "electricity", monthId: 8, bill: 0 },
  { type: "electricity", monthId: 9, bill: 160 },
  { type: "electricity", monthId: 10, bill: 75 },
  { type: "electricity", monthId: 11, bill: 190 },
];

// Simulated water data indexed by month (0=Jan)
const WATER_DATA: Expense[] = [
  { type: "water", monthId: 0, bill: 55 },
  { type: "water", monthId: 1, bill: 40 },
  { type: "water", monthId: 2, bill: 80 },
  { type: "water", monthId: 3, bill: 80 },
  { type: "water", monthId: 4, bill: 90 },
  { type: "water", monthId: 5, bill: 70 },
  { type: "water", monthId: 6, bill: 0 },
  { type: "water", monthId: 7, bill: 0 },
  { type: "water", monthId: 8, bill: 0 },
  { type: "water", monthId: 9, bill: 0 },
  { type: "water", monthId: 10, bill: 35 },
  { type: "water", monthId: 11, bill: 90 },
];

export interface Expense {
  type: "water" | "electricity";
  monthId: number;
  bill: number;
}

interface ExpenseContextType {
    electricityExpenses: Expense[],
    setElectricityExpenses: React.Dispatch<
        React.SetStateAction<Expense[]>
    >;

    waterExpenses: Expense[];
    setWaterExpenses: React.Dispatch<
        React.SetStateAction<Expense[]>
    >;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

export function ExpenseProvider({
  children,
}: ExpenseProviderProps) {
  const [electricityExpenses, setElectricityExpenses] =
    useState<Expense[]>(ELECTRICITY_DATA);

  const [waterExpenses, setWaterExpenses] =
    useState<Expense[]>(WATER_DATA);

  return (
    <ExpenseContext.Provider
      value={{
        electricityExpenses,
        setElectricityExpenses,
        waterExpenses,
        setWaterExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context
}
