export function evaluatePostfix(postfix, mathOperations) {

    let stack = [];

    const isOperator = (val) =>
        val === '^' || val === '*' ||
        val === '/' || val === '%' ||
        val === '+' || val === '-';

    for (let i = 0; i < postfix.length; i++) {

        let token = postfix[i];

        if (!isOperator(token)) {
            stack.push(token);
            continue;
        }

        if (stack.length < 2) {
            throw new Error("Invalid expression: insufficient operands");
        }

        let b = stack.pop(); // second
        let a = stack.pop(); // first

        let result;

        switch (token) {
            case '^':
                result = mathOperations.power(a, b);
                break;
            case '*':
                result = mathOperations.multiply(a, b);
                break;
            case '/':
                result = mathOperations.divide(a, b);
                break;
            case '%':
                result = mathOperations.modulus(a, b);
                break;
            case '+':
                result = mathOperations.add(a, b);
                break;
            case '-':
                result = mathOperations.subtract(a, b);
                break;
        }

        stack.push(result);
    }

    if (stack.length !== 1) {
        throw new Error("Invalid expression: leftover values in stack");
    }

    return stack[0];
}