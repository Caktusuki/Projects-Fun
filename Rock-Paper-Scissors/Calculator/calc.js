function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let display = document.getElementById('display');
    let expression = display.value;

    try {
        expression = expression.replace(/\^/g, '**');
        
        if (expression.includes('!')) {
            expression = expression.replace(/(\d+)!/g, (_, num) => factorial(num));
        }
        
        expression = evaluateTrigFunctions(expression);
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');

        // Sanitize and safely evaluate the expression
        let result = Function('"use strict";return (' + expression + ')')();
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function factorial(n) {
    if (n < 0) return 'Error';
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function evaluateTrigFunctions(expression) {
    expression = expression.replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(toRadians(${angle}))`);
    expression = expression.replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(toRadians(${angle}))`);
    expression = expression.replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(toRadians(${angle}))`);
    return expression;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
