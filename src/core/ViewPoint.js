import { tokenize } from "../parser/tokenizer.js";
import { infixToPostfix } from "../parser/infixToPostfix.js";
import { evaluatePostfix } from "../parser/evaluator.js";

import { mathOperations } from "../math/operations.js";

import { internalFunctions } from "../functions/internalFunctions.js";
import { externalFunctions } from "../functions/externalFunctions.js";

import { variablesDB } from "../variables/variables.js";

import { stringToJS } from "../utils/typeConverter.js";

class ViewPoint {

    constructor() {
        // Shared state
        this.variablesDB = variablesDB;
        this.func_DB_intrnl = internalFunctions;
        this.func_DB_extrnl = externalFunctions;

        this.operator_precedence = mathOperations.operator_precedence;
    }

    // ================= VARIABLES =================
    setVariable(name, value) {
        this.variablesDB[name] = value;
    }

    // ================= FUNCTIONS =================
    addFunction(name, fn) {
        this.func_DB_extrnl[name] = fn;
    }

    // ================= TYPE CONVERTER =================
    stringToJS(str) {
        return stringToJS.call(this, str, this.variablesDB);
    }

    // ================= MAIN EVALUATOR =================
    evaluate(expr) {

        if (typeof expr !== "string") {
            throw new Error("Expression must be a string");
        }

        const context = {
            variablesDB: this.variablesDB,
            func_DB_intrnl: this.func_DB_intrnl,
            func_DB_extrnl: this.func_DB_extrnl,
            stringToJS: this.stringToJS.bind(this),
            evaluate: this.evaluate.bind(this)
        };

        // Step 1: Tokenize
        const tokens = tokenize(expr, context);

        // Step 2: Infix → Postfix
        const postfix = infixToPostfix(
            tokens,
            this.operator_precedence
        );

        // Step 3: Evaluate Postfix
        const result = evaluatePostfix(
            postfix,
            mathOperations
        );

        return result;
    }
}

export default ViewPoint;