const expressionElement = document.querySelector('#expression');
const resultElement = document.querySelector('#result');
const keypad = document.querySelector('.keypad');

let expression = '';
let justCalculated = false;

function formatNumber(value) {
  if (!Number.isFinite(value)) return 'Error';
  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}

function tokenize(input) {
  const tokens = [];
  let index = 0;
  while (index < input.length) {
    const character = input[index];
    if (/\s/.test(character)) { index += 1; continue; }
    if (/\d|\./.test(character)) {
      const start = index;
      let decimalCount = 0;
      while (index < input.length && /[\d.]/.test(input[index])) {
        if (input[index] === '.') decimalCount += 1;
        index += 1;
      }
      if (decimalCount > 1 || input.slice(start, index) = == '.') throw new Error('Invalid number');
      tokens.push(Number(input.slice(start, index)));
      continue;
    }
    if ('+-*/%()'.includes(character)) { tokens.push(character); index += 1; continue; }
    throw new Error('Invalid character');
  }
  return tokens;
}

function evaluate(input) {
  const tokens = tokenize(input);
  let position = 0;

  function parseExpression() {
    let value = parseTerm();
    while (tokens[position] === '+' || tokens[position] === '-') {
      const operator = tokens[position++];
      const nextValue = parseTerm();
      value = operator === '+' ? value + nextValue : value - nextValue;
    }
    return value;
  }

  function parseTerm() {
    let value = parseUnary();
    while (['*', '/', '%'].includes(tokens[position])) {
      const operator = tokens[position++];
      const nextValue = parseUnary();
      if ((operator === '/' || operator === '%') && nextValue === 0) throw new Error('Division by zero');
      if (operator === '*') value *= nextValue;
      if (operator === '/') value /= nextValue;
      if (operator === '%') value %= nextValue;
      }
    return value;
  }

  function parseUnary() {
    if (tokens[position] === '+' || tokens[position] === '-') {
      const operator = tokens[position++];
      const value = parseUnary();
      return operator === '-' ? -value : value;
    }
    return parsePrimary();
  }

  function parsePrimary() {
    if (tokens[position] === '(') {
      position += 1;
      const value = parseExpression();
      if (tokens[position++] !== ')') throw new Error('Missing parenthesis');
      return value;
    }
    const value = tokens[position++];
    if (typeof value !== 'number') throw new Error('Incomplete expression');
    return value;
  }

  if (!tokens.length) return 0;
  const value = parseExpression();
  if (position !== tokens.length) throw new Error('Incomplete expression');
  return value;
}

function render() {
  expressionElement.textContent = expression || '0';
  if (!expression) { resultElement.textContent = '0'; return; }
  try { resultElement.textContent = formatNumber(evaluate(expression)); }
  catch { resultElement.textContent = '...'; }
}

function appendValue(value) {
  if (justCalculated && /[\d.]/.test(value)) expression = '';
  justCalculated = false;
  const lastCharacter = expression.at(-1);
  if (value === '.' && (lastCharacter === '.' || /[+\-*/%]$/.test(expression) && expression.endsWith('..'))) return;
  if (/[+\-*/%]/.test(value) && /[+\-*/%]$/.test(expression)) expression = expression.slice(0, -1);
  expression += value;
  render();
}

function calculate() {
  if (!expression) return;
  try {
    const value = evaluate(expression);
    if (Number.isFinite(value)) { expression = formatNumber(value); justCalculated = true; render(); }
  } catch { resultElement.textContent = 'Error'; }
}

function clear() { expression = ''; justCalculated = false; render(); }
function backspace() { expression = expression.slice(0, -1); justCalculated = false; render(); }
function toggleSign() { expression = expression ? `-(${expression})` : '-'; justCalculated = false; render(); }

keypad.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.action === 'clear') clear();
  else if (button.dataset.action === 'backspace') backspace();
  else if (button.dataset.action === 'toggle-sign') toggleSign();
  else if (button.dataset.action === 'equals') calculate();
  else appendValue(button.dataset.value);
});

document.addEventListener('keydown', (event) => {
  const keyMap = { Enter: 'equals', Escape: 'clear', Backspace: 'backspace' };
  if (keyMap[event.key]) { event.preventDefault(); document.querySelector(`[data-action="${keyMap[event.key]}"]`).click(); return; }
  if (/^[0-9.]$/.test(event.key) || /^[+\-*/%]$/.test(event.key)) appendValue(event.key);
});

render();