// ---------- Elements ----------
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

// ---------- Handle button clicks ----------
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    const value = button.getAttribute('data-value');

    if (action === 'clear') {
      expression = '';
    } else if (action === 'delete') {
      expression = expression.slice(0, -1);
    } else if (action === 'calculate') {
      expression = calculateResult(expression);
    } else if (value) {
      expression += value;
    }

    display.value = expression;
  });
});

// ---------- Safely evaluate the expression ----------
function calculateResult(expr) {
  // Only allow numbers, operators, decimal points and parentheses
  if (!/^[0-9+\-*/.%()\s]*$/.test(expr) || expr === '') {
    return 'Error';
  }

  try {
    const result = Function(`"use strict"; return (${expr})`)();

    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      return 'Error';
    }

    // Round to avoid floating point issues, e.g. 0.1 + 0.2
    return String(Math.round(result * 100000) / 100000);
  } catch (err) {
    return 'Error';
  }
}

// ---------- Allow keyboard input ----------
document.addEventListener('keydown', (e) => {
  if (/[0-9+\-*/.%]/.test(e.key)) {
    expression += e.key;
    display.value = expression;
  } else if (e.key === 'Enter' || e.key === '=') {
    expression = calculateResult(expression);
    display.value = expression;
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (e.key === 'Escape') {
    expression = '';
    display.value = expression;
  }
});