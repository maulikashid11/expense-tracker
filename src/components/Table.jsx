import React, { useContext, useState } from 'react'
import { ExpenseContext } from '../contexts/ExpenseContext'
import Menu from './Menu'

function Table() {
  const [menu, setMenu] = useState({
    left: 0,
    top: 0
  })
  const [query, setQuery] = useState('')
  const { expenses, setExpenses, expense, setExpense, rowId, setRowId } = useContext(ExpenseContext)
  const total = expenses.filter((expense) => expense.category.includes(query)).reduce((accumulator, current) => accumulator + (+current.amount), 0)
  return (
    <div className='mb-10 md:w-[50%] w-full' onClick={(e) => {
      setMenu({
        left: 0,
        top: 0
      })
    }}>
      <Menu menu={menu} rowId={rowId} />
      <h2 className='text-2xl font-bold mb-5'>Your Expenses</h2>
      <div className="expenses-container ">
        <div className='flex items-center px-10 py-2 rounded-md border-[1px] border-zinc-600'>
          <span className='w-full'>Title</span>
          <span className='w-full'><select onChange={(e) => { setQuery(e.target.value == 'All' ? '' : e.target.value) }} className='rounded-md outline-none' id="category">
            <option className='bg-zinc-700' hidden value="Category">Category</option>
            <option className='bg-zinc-700' value="All">All</option>
            <option className='bg-zinc-700' value="Grocery">Grocery</option>
            <option className='bg-zinc-700' value="Bills">Bills</option>
            <option className='bg-zinc-700' value="Education">Education</option>
            <option className='bg-zinc-700' value="Medicine">Medicine</option>
          </select></span>
          <span className='flex items-center w-full'>Amount (₹)
            <span>
              <svg onClick={(e) => { expenses.sort((a, b) => +a.amount - +b.amount) }} xmlns="http://www.w3.org/2000/svg" className='cursor-pointer ml-2 mb-1' viewBox="0 0 24 24" width="24" height="24" color="#fff" fill="none">
                <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg onClick={(e) => { expenses.sort((a, b) => +b.amount - +a.amount) }} xmlns="http://www.w3.org/2000/svg" className='cursor-pointer ml-2' viewBox="0 0 24 24" width="24" height="24" color="#fff" fill="none">
                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </div>
        <div className="expenses">
          {
            expenses.filter((expense) => expense.category.includes(query)).map((el, i) =>
              <div key={el.id} onContextMenu={(e) => {
                e.preventDefault()
                setMenu({
                  left: e.clientX + 4 + 'px',
                  top: e.clientY + 4 + 'px'
                })
                setRowId(el.id)
              }} className='flex my-3 items-center px-10 py-2 rounded-md border-[1px] border-zinc-600'>
                <span className='w-full'>{el.title}</span>
                <span className='w-full'>{el.category}</span>
                <span className='w-full'>{el.amount}</span>
              </div>
            )
          }
        </div>
        <div className='flex my-3 items-center px-10 py-2 rounded-md border-[1px] border-zinc-600'>
          <span className='w-full'>Total</span>
          <span className='w-full'></span>
          <span className='w-full'>{total}</span>
        </div>
      </div>
    </div>
  )
}

export default Table