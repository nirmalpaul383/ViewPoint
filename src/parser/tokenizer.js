export function tokenize(expr, context) {
    let tokens = [];
    let current = "";
    let quote = "";

    for (let i = 0; i < expr.length; i++) {

        let char = expr[i];

        const isOperator =
            char === '(' || char === ')' ||
            char === '^' || char === '*' ||
            char === '/' || char === '%' ||
            char === '+' || char === '-';

        const isQuote = char === '"' || char === "'" || char === "`";

        if (isQuote) {
            if (quote === "") {
                quote = char;
                current += char;
            } else if (quote === char) {
                current += char;
                quote = "";

                tokens.push(context.stringToJS(current, context.variablesDB));
                current = "";
            } else {
                current += char;
            }
            continue;
        }

        if (quote !== "") {
            current += char;
            continue;
        }

        if (char === "#") {

            let bracket = 0;
            let funcName = "";
            let arg = "";
            let args = [];
            let quoteFunc = "";

            while (i < expr.length - 1) {
                i++;
                char = expr[i];

                if (bracket === 0) {
                    if (char === "(") {
                        bracket++;
                        continue;
                    }

                    if (char === " ")
                        throw new Error("Function name cannot contain space");

                    if (isQuote)
                        throw new Error("Function name cannot contain quotes");

                    if (funcName === "" && /[0-9.]/.test(char))
                        throw new Error("Function name cannot start with number");

                    funcName += char;
                    continue;
                }

                if (isQuote) {
                    if (quoteFunc === "") quoteFunc = char;
                    else if (quoteFunc === char) quoteFunc = "";
                }

                if (quoteFunc === "") {

                    if (char === "(") bracket++;
                    else if (char === ")") {
                        bracket--;

                        if (bracket === 0) {
                            if (arg !== "") args.push(arg);
                            break;
                        }
                    }

                    if (char === "," && bracket === 1) {
                        if (arg === "")
                            throw new Error(`Missing argument in #${funcName}()`);

                        args.push(arg);
                        arg = "";
                        continue;
                    }
                }

                arg += char;
            }

            args = args.map(a => context.evaluate(a));

            let fn =
                context.func_DB_intrnl[funcName] ||
                context.func_DB_extrnl[funcName];

            if (!fn) {
                throw new Error(`#${funcName}() not defined`);
            }

            tokens.push(fn(...args));
            continue;
        }

        if (isOperator) {

            if (current !== "") {
                tokens.push(context.stringToJS(current, context.variablesDB));
                current = "";
            }

            tokens.push(char);
            continue;
        }

        if (char === " ") {
            if (current !== "") {
                tokens.push(context.stringToJS(current, context.variablesDB));
                current = "";
            }
            continue;
        }

        current += char;

        if (i === expr.length - 1 && current !== "") {
            tokens.push(context.stringToJS(current, context.variablesDB));
        }
    }

    if (quote !== "") {
        throw new Error("Unclosed string literal");
    }

    return tokens;
}