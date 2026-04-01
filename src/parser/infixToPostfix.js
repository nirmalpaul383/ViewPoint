export function infixToPostfix(tokens, operator_precedence) {
    let output = [];
    let stack = [];

    for (let i = 0; i < tokens.length; i++) {

        let token = tokens[i];

        const isOperator =
            token === '^' || token === '*' ||
            token === '/' || token === '%' ||
            token === '+' || token === '-';

        const isLeftParen = token === "(";
        const isRightParen = token === ")";

        const isOperand = !isOperator && !isLeftParen && !isRightParen;

        if (isOperand) {
            output.push(token);
        }

        else if (isOperator) {

            while (stack.length > 0) {

                let top = stack[stack.length - 1];

                if (top === "(") break;

                let topPrec = operator_precedence[top] || 0;
                let currPrec = operator_precedence[token];

                // Right associativity for ^
                if (
                    (token === '^' && currPrec < topPrec) ||
                    (token !== '^' && currPrec <= topPrec)
                ) {
                    output.push(stack.pop());
                } else {
                    break;
                }
            }

            stack.push(token);
        }

        else if (isLeftParen) {
            stack.push(token);
        }

        else if (isRightParen) {

            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                output.push(stack.pop());
            }

            if (stack.length === 0) {
                throw new Error("Mismatched parentheses: missing '('");
            }

            stack.pop();
        }
    }

    while (stack.length > 0) {

        let top = stack.pop();

        if (top === "(" || top === ")") {
            throw new Error("Mismatched parentheses");
        }

        output.push(top);
    }

    return output;
}