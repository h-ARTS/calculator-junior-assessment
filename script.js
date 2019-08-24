function Calculator(previousOperandTextElement, currentOperandTextElement) {
  this.previousOperandTextElement = previousOperandTextElement;
  this.currentOperandTextElement = currentOperandTextElement;
  this.clear();

  this.getDisplayNumber = function (number) {
    var stringNumber = number.toString();
    var integerDigits = parseFloat(stringNumber.split('.')[0]);
    var decimalDigits = stringNumber.split('.')[1];
    var integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    if (decimalDigits != null) {
      return integerDisplay + '.' + decimalDigits;
    } else {
      return integerDisplay;
    }
  }
}

Calculator.prototype.clear = function () {
  this.previousOperand = '';
  this.currentOperand = '';
  this.operation = undefined;
}

Calculator.prototype.delete = function () {
  this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

Calculator.prototype.appendNumber = function (number) {
  if (number === '.' && includes(this.currentOperand, '.')) return;
  this.currentOperand = this.currentOperand.toString() + number.toString();
}

Calculator.prototype.chooseOperation = function (operation) {
  if (this.currentOperand === '') return;
  if (this.previousOperand !== '') {
    this.compute();
  }
  this.operation = operation;
  this.previousOperand = this.currentOperand;
  this.currentOperand = '';
}

Calculator.prototype.compute = function () {
  var computation;
  var prev = parseFloat(this.previousOperand);
  var current = parseFloat(this.currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (this.operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return;
  }
  this.currentOperand = computation;
  this.operation = undefined;
  this.previousOperand = '';
}

Calculator.prototype.updateDisplay = function () {
  this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + ' ' + this.operation;
  } else {
    this.previousOperandTextElement.innerText = '';
  }
}

var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');

var calc = new Calculator(previousOperandTextElement, currentOperandTextElement);

for (var i = 0; i < numberButtons.length; i++) {
  (function () {
    var btn = numberButtons[i];
    btn.addEventListener('click', function () {
      calc.appendNumber(btn.innerText);
      calc.updateDisplay();
    });
  }());
}

for (var i = 0; i < operationButtons.length; i++) {
  (function () {
    var btn = operationButtons[i];
    btn.addEventListener('click', function () {
      calc.chooseOperation(btn.innerText);
      calc.updateDisplay();
    });
  }());
}

allClearButton.addEventListener('click', function () {
  calc.clear();
  calc.updateDisplay();
});

equalsButton.addEventListener('click', function () {
  calc.compute();
  calc.updateDisplay();
});

deleteButton.addEventListener('click', function () {
  calc.delete();
  calc.updateDisplay();
});

// Alternative to String.prototype.includes
function includes(container, value) {
  var returnValue = false;
  var pos = container.indexOf(value);
  if (pos >= 0) {
    returnValue = true;
  }
  return returnValue;
}