const inputName = document.querySelector('#name');
const inputCategory = document.querySelector('#category');
const categoryTable = document.querySelector('#category-table')
const inputAmount = document.querySelector('#amount');
const addBtn = document.querySelector('.add-btn');
const tBody = document.querySelector('.tbody')
const total = document.querySelector('.total')
let allExpenses = JSON.parse(localStorage.getItem('expenses')) || []
let expense = {
    name: '',
    category: '',
    amount: null
}
inputName.addEventListener("change", (e) => {
    expense.name = e.target.value
})
inputCategory.addEventListener("change", (e) => {
    expense.category = e.target.value
})
inputAmount.addEventListener("change", (e) => {
    expense.amount = +e.target.value
})
addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (expense.name != '' && expense.category != '' && expense.amount != null) {
        allExpenses.push({...expense,id:crypto.randomUUID()});
        inputName.value = ''
        inputCategory.value = ''
        inputAmount.value = ''
        main()
        localStorage.setItem('expenses',JSON.stringify(allExpenses))
    }
})
categoryTable.addEventListener('change', (e) => {
    main()
})
tBody.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        const id = e.target.parentElement.parentElement.id
        allExpenses = [...allExpenses].filter(item=>item.id !== id)
        main()
        localStorage.setItem('expenses',JSON.stringify(allExpenses))
    }
})
function main() {
    tBody.innerText = ''
    allExpenses.filter((item) => item.category.includes(categoryTable.value)).map(item => {
        const tr = document.createElement('tr')
        tr.id = item.id
        tr.innerHTML = `<td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>$${item.amount} <span class="delete">delete</span></td>`
        tBody.append(tr)
    })
    total.innerText = `$${allExpenses.reduce((accumulator, item) => accumulator + item.amount, 0)}`
}

main()