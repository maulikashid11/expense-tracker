import Form from "./components/Form"
import Table from "./components/Table"
import { ExpenseProvider } from "./contexts/ExpenseContext"

function App() {

  return (
    <main className="w-full min-h-screen md:flex md:gap-5 bg-zinc-800 p-5 text-white">
      <ExpenseProvider>
        <Form />
        <Table />
      </ExpenseProvider>
    </main>
  )
}

export default App
