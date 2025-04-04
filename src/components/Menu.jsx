import React, { useContext } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'

function Menu({ menu, rowId }) {

  const { expenses, setExpenses, expense, setExpense } = useContext(ExpenseContext)
  return (
    <div className={`absolute ${menu.left === 0 ? 'hidden' : ''} border-[1px] border-zinc-600 bg-zinc-700 rounded-md`} style={{ display: 'absolute', ...menu, }}>
      <div onClick={(e) => {
        const expens = expenses.filter((expense) => expense.id === rowId)[0]
        setExpense({ ...expense, title: expens.title, amount: expens.amount })
        const removedExpenses = expenses.filter((expense) => expense.id !== rowId)
        setExpenses(removedExpenses)
      }} className='p-1 border-b-[1px] cursor-pointer border-b-zinc-600'>Edit</div>
      <div onClick={(e) => {
        let newExpenses = expenses.filter((expense) => expense.id !== rowId)
        setExpenses(newExpenses)
      }} className='p-1 cursor-pointer'>Delete</div>
    </div>
  )
}

export default Menu