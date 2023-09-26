let monthlyIncome = 60;
let monthlyExpense = 40;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let debt = parseInt(localStorage.getItem("debt")) || 0;

let savedMoney = parseInt(localStorage.getItem("savedMoney")) || 0;
let incomeTotal = 0;
let expensesTotal = 0;

const ctx = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [incomeTotal, expensesTotal],
            backgroundColor: ['green', 'red']
        }],
        labels: ['Income', 'Expenses'],
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'top'
        }
    }
});

function addColorBox(row, color) {
    const colorCell = row.insertCell(4);
    const colorBox = document.createElement("div");
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.backgroundColor = color;
    colorBox.style.border = "1px solid #ccc";
    colorBox.style.borderRadius = "4px";
    colorCell.appendChild(colorBox);
}

function loadTransactions() {
    transactions.forEach(transaction => {
        const tbody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
        const newRow = tbody.insertRow();
        newRow.insertCell(0).textContent = transaction.type;
        newRow.insertCell(1).textContent = transaction.description;
        newRow.insertCell(2).textContent = transaction.amount;
        newRow.insertCell(3).textContent = transaction.date;

        if (transaction.type === "income") {
            incomeTotal += parseFloat(transaction.amount);
        } else {
            expensesTotal += parseFloat(transaction.amount);
        }
        addColorBox(newRow, transaction.color);
    });
    
    myPieChart.data.datasets[0].data[0] = incomeTotal;
    myPieChart.data.datasets[0].data[1] = expensesTotal;
    myPieChart.update();
    displayValues();
}

function addTransaction() {
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const floatAmount = parseFloat(document.getElementById('amount').value);
    const date = new Date().toLocaleDateString();
    const color = document.getElementById('colorPicker').value;

    const transaction = {
        type: type,
        description: description,
        amount: floatAmount,
        date: date,
        color: color
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    const tbody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
    const newRow = tbody.insertRow();
    newRow.insertCell(0).textContent = type;
    newRow.insertCell(1).textContent = description;
    newRow.insertCell(2).textContent = floatAmount;
    newRow.insertCell(3).textContent = date;

    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';

    if (type === "income") {
        incomeTotal += floatAmount;
        if (debt > 0) {
            const remainingDebt = debt - floatAmount;

            if (remainingDebt <= 0) {
                savedMoney += Math.abs(remainingDebt);
                debt = 0;
            } else {
                debt = remainingDebt;
            }
        } else {
            savedMoney += floatAmount;
        }

    } else {
        expensesTotal += floatAmount;
        savedMoney -= floatAmount;

        if (savedMoney < 0) {
            debt += Math.abs(savedMoney);
            savedMoney = 0;
        }
    }
    addColorBox(newRow, transaction.color);
    
    localStorage.setItem("savedMoney", savedMoney.toString());
    localStorage.setItem("debt", debt.toString());

    myPieChart.data.datasets[0].data[0] = incomeTotal;
    myPieChart.data.datasets[0].data[1] = expensesTotal;
    myPieChart.update();
    displayValues();
}

function displayValues() {
    document.getElementById("savedMoneyDisplay").textContent = savedMoney;
}

function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

document.getElementById('clearButton').addEventListener('click', clearLocalStorage);
loadTransactions();
displayValues();
