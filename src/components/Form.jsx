import React, { useContext, useState } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

function Form() {
  const { expenses, setExpenses, expense, setExpense, rowId, setRowId } = useContext(ExpenseContext)
  const [titleError, setTitleError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [amountError, setAmountError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!expense.title) {
      setTitleError(true)
      return
    }
    if (!expense.category) {
      setCategoryError(true)
      return

    }
    if (!expense.amount) {
      setAmountError(true)
      return

    }
    setExpenses([...expenses, { ...expense, id: crypto.randomUUID() }])
    setExpense({ title: '', category: '', amount: '' })
  }
  useLocalStorage('expenses', expenses)

  return (
    <form onSubmit={handleSubmit} className='mb-10 md:w-[50%] w-full'>
      <h1 className='text-2xl font-bold mb-5'>Add Expense</h1>
      <div className='mb-5'>
        <label htmlFor="title">Title:</label>
        <input value={expense.title} onChange={(e) => { setExpense(prevData => ({ ...prevData, title: e.target.value })); setTitleError(false) }} className='block border-[1px] border-zinc-600 rounded-md text-lg outline-none p-2 w-full' type="text" id='title' />
        {
          titleError && <p className='text-red-500 text-sm mt-2'>Please Enter Title</p>
        }
      </div>
      <div className='mb-5'>
        <label htmlFor="title">Category:</label>
        <select value={expense.category} onChange={(e) => { setExpense(prevData => ({ ...prevData, category: e.target.value })); setCategoryError(false) }} className='block border-[1px] border-zinc-600 rounded-md text-lg outline-none p-2 w-full' id="category">
          <option className='bg-zinc-700' hidden value="All">All</option>
          <option className='bg-zinc-700' value="Grocery">Grocery</option>
          <option className='bg-zinc-700' value="Bills">Bills</option>
          <option className='bg-zinc-700' value="Education">Education</option>
          <option className='bg-zinc-700' value="Medicine">Medicine</option>
        </select>
        {
          categoryError && <p className='text-red-500 text-sm mt-2'>Please select category</p>
        }
      </div>
      <div className='mb-5'>
        <label htmlFor="amount">Amount:</label>
        <input value={expense.amount} onChange={(e) => { setExpense(prevData => ({ ...prevData, amount: e.target.value })); setAmountError(false) }} className='block  border-[1px] border-zinc-600 rounded-md text-lg outline-none p-2 w-full [&::-webkit-inner-spin-button]:appearance-none' type="number" id='amount' />
        {
          amountError && <p className='text-red-500 text-sm mt-2'>Please Enter Amount</p>
        }
      </div>
      <input type="submit" value={`${rowId && expense.title ? 'Save' : 'Add'}`} className='block  bg-blue-500  rounded-md cursor-pointer text-lg outline-none p-2 w-full' />
    </form>
  )
}

export default Form