let goals = JSON.parse(localStorage.getItem("goals")) || [];
let savedMoney = parseInt(localStorage.getItem("savedMoney")) || 0;

function displayAvailableMoney() {
    document.getElementById("availableMoneyDisplay").textContent = `$${savedMoney}`;
}

function displayGoals() {
    const tbody = document.getElementById('goalsTable');
    tbody.innerHTML = '';

    goals.forEach((goal, index) => {
        const newRow = tbody.insertRow();
        newRow.insertCell(0).textContent = goal.name;
        newRow.insertCell(1).textContent = goal.description;
        newRow.insertCell(2).textContent = goal.targetAmount;
        
        const currentAmountCell = newRow.insertCell(3);
        currentAmountCell.textContent = goal.currentAmount;

        const allocationCell = newRow.insertCell(4);
        if (goal.currentAmount < goal.targetAmount) {
            const allocateInput = document.createElement('input');
            allocateInput.type = "number";
            allocateInput.min = 0;
            allocateInput.placeholder = "Amount";
            allocationCell.appendChild(allocateInput);

            const allocateButton = document.createElement('button');
            allocateButton.textContent = "Allocate";
            allocateButton.addEventListener('click', () => {
                allocateMoneyToGoal(index, parseFloat(allocateInput.value));
            });
            allocationCell.appendChild(allocateButton);
        } else {
            newRow.style.backgroundColor = 'green';
            newRow.style.color = 'white';
        }
    });
}

function allocateMoneyToGoal(goalIndex, amount) {
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    
    if (amount > savedMoney) {
        alert("You don't have enough saved money for this allocation.");
        return;
    }

    const goal = goals[goalIndex];
    const totalAmountAfterAllocation = goal.currentAmount + amount;

    if (totalAmountAfterAllocation > goal.targetAmount) {
        const excess = totalAmountAfterAllocation - goal.targetAmount;
        savedMoney -= (amount - excess);
        goal.currentAmount = goal.targetAmount;
    } else {
        savedMoney -= amount;
        goal.currentAmount += amount;
    }

    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("savedMoney", savedMoney.toString());

    displayAvailableMoney();
    displayGoals();
}

function addGoal() {
    const goalName = document.getElementById('goalName').value;
    const goalDescription = document.getElementById('goalDescription').value;
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);

    const newGoal = {
        name: goalName,
        description: goalDescription,
        targetAmount: goalAmount,
        currentAmount: 0
    };

    goals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(goals));

    displayGoals();

    document.getElementById('goalName').value = '';
    document.getElementById('goalDescription').value = '';
    document.getElementById('goalAmount').value = '';
}

document.getElementById('addGoal').addEventListener('click', addGoal);
displayAvailableMoney();
displayGoals();
