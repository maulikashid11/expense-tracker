import { createContext, useState } from "react";

export const ExpenseContext = createContext()

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || [])
    const [expense, setExpense] = useState({
        title: '',
        category: '',
        amount: '',
    })
    const [rowId, setRowId] = useState(null)
    return <ExpenseContext.Provider value={{ expenses, setExpenses, expense, setExpense, rowId, setRowId }}>
        {children}
    </ExpenseContext.Provider>
}