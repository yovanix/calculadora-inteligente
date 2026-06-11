const display = document.getElementById('display');
const historyEntries = [];

function appendToDisplay(value) {
    if (!display) return;
    display.value += value;
}

function clearDisplay() {
    if (!display) return;
    display.value = '';
}

function calculate() {
    if (!display) return;
    const expression = display.value;
    if (!expression) return;

    try {
        const result = Function(`"use strict"; return (${expression})`)();
        display.value = result;
        historyEntries.unshift(`${expression} = ${result}`);
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

function showHistory() {
    const historyDiv = document.getElementById('history');
    if (!historyDiv) return;

    if (historyEntries.length === 0) {
        historyDiv.textContent = 'No hay cálculo realizado';
    } else {
        historyDiv.innerHTML = historyEntries
            .map(entry => `<div class="history-item">${entry}</div>`)
            .join('');
    }

    historyDiv.style.display = 'block';
}

window.addEventListener('keydown', (event) => {
    if (!display) return;
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendToDisplay(key);
        event.preventDefault();
        return;
    }

    if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        appendToDisplay(key);
        event.preventDefault();
        return;
    }

    if (key === 'Enter') {
        calculate();
        event.preventDefault();
        return;
    }

    if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
        event.preventDefault();
        return;
    }

    if (key === 'Escape') {
        clearDisplay();
        event.preventDefault();
    }
});
