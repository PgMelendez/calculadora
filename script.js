document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');

    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    function updateDisplay() {
        display.value = currentInput || '0';
    }

    function handleNumberClick(number) {
        if (currentInput === '0' || currentInput === null) {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function handleOperatorClick(op) {
        if (operator && currentInput !== '') {
            calculateResult();
        }
        firstOperand = currentInput;
        operator = op;
        currentInput = '';
    }

    function handleEqualsClick() {
        if (operator) {
            calculateResult();
            operator = null;
        }
    }

    function handleClearClick() {
        currentInput = '';
        operator = null;
        firstOperand = null;
        updateDisplay();
    }

    function handleDecimalClick() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }


    function calculateResult() {
        let secondOperand = currentInput;
        let result;

        if (operator === '+') {
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
        } else if (operator === '-') {
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
        } else if (operator === '*') {
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
        } else if (operator === '/') {
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
        }

        currentInput = String(result);
        updateDisplay();
        firstOperand = null;
        operator = null;
    }

    buttons.addEventListener('click', (event) => {
        if (event.target.classList.contains('number')) {
            handleNumberClick(event.target.textContent);
        } else if (event.target.classList.contains('operator')) {
            if (event.target.textContent !== 'C') {
                handleOperatorClick(event.target.textContent);
            } else {
                handleClearClick();
            }
        } else if (event.target.classList.contains('equals')) {
            handleEqualsClick();
        } else if (event.target.classList.contains('decimal')) {
            handleDecimalClick();
        }
    });
});

