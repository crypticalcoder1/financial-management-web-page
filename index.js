// Initial transactions data
let transactions = [];

// Selecting DOM elements
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const balanceDisplay = document.getElementById('balance');
const transactionsList = document.getElementById('transactions');

// Function to calculate and update balance
function updateBalance() {
  const incomeTotal = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseTotal = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = incomeTotal - expenseTotal;
  balanceDisplay.textContent = balance.toFixed(2);
}

// Function to render transactions
function renderTransactions() {
  transactionsList.innerHTML = ''; // Clear existing list

  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add('px-4', 'py-2', 'flex', 'justify-between', 'items-center');

    const description = document.createElement('span');
    description.textContent = transaction.description;

    const amount = document.createElement('span');
    amount.textContent = transaction.amount.toFixed(2);
    amount.classList.add(transaction.type === 'income' ? 'text-green-600' : 'text-red-600');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('bg-red-500', 'text-white', 'py-1', 'px-3', 'rounded-md', 'hover:bg-red-600', 'transition', 'duration-200');
    deleteButton.addEventListener('click', () => deleteTransaction(transaction.id));

    li.appendChild(description);
    li.appendChild(amount);
    li.appendChild(deleteButton);

    transactionsList.appendChild(li);
  });
}

// Function to handle adding income or expense
function addTransaction(type, amount, description) {
  const newTransaction = {
    id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
    userId: 1, // Assuming user ID 1 for simplicity
    type: type,
    amount: parseFloat(amount),
    description: description
  };

  transactions.push(newTransaction);
  updateBalance();
  renderTransactions();
}

// Function to handle deleting a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateBalance();
  renderTransactions();
}

// Event listeners for income form submission
incomeForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = parseFloat(this['income-amount'].value);
  const description = this['income-description'].value.trim();

  if (amount && description) {
    addTransaction('income', amount, description);
    this.reset();
  } else {
    alert('Please enter both amount and description for income.');
  }
});

// Event listener for expense form submission
expenseForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = parseFloat(this['expense-amount'].value);
  const description = this['expense-description'].value.trim();

  if (amount && description) {
    addTransaction('expense', amount, description);
    this.reset();
  } else {
    alert('Please enter both amount and description for expense.');
  }
});

// Initial render of transactions and balance
updateBalance();
renderTransactions();


