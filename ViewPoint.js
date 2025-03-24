'use strict'
// This is project ViewPoint, a Math expression parser and evaluator with support of runtime data-type checking
// written in vanila JS. This is originally written by me (N Paul) (https://github.com/nirmalpaul383). ViewPoint
// is licensed under the GNU General Public License v3.0 (GPLv3). Additionally, while not legally required, I
// kindly request that if you use, modify, or distribute this project, please give credit to the original author
// name, Nirmal Paul (N Paul) (https://github.com/nirmalpaul383). I have dedicated significant time to developing
// this project, ensuring that every line of code is clean, well-structured, and easy to understand. Therefore, I
// would appreciate it if you acknowledge my name, Nirmal Paul (N Paul) (https://github.com/nirmalpaul383), as the
// original author when using or distributing this work. I appreciate your understanding and cooperation. You can
// download source files from my github profile https://github.com/nirmalpaul383 . 
// My YouTube Page: https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
// FaceBook Page: https://www.facebook.com/a.New.Way.Technical/
// GitHub Page: https://github.com/nirmalpaul383

//Class definition for ViewPoint
class ViewPoint {

    //For defining of some basic math logic and math operations for ViewPoint
    ViewPoint_math_def = {

        //operator_precedence:
        //This object contains operator 's precedence value according to the BODMAS (Brackets, Orders, Division, Multiplication, Addition, and Subtraction)
        //or PEMDAS (Parentheses, Exponents, Multiplication, Division, Addition and Subtraction) rule, which is about the order of operations for
        //mathematical expressions

        //Note: That the precedence of '+' and '-' can be interchangeable, but for '*' and '/', it's better to prioritize '*' over '/'
        // This is because in expressions like 2/3*6:
        //  Evaluating 2/3 first (resulting in 0.666...6) and then multiplying by 6 will output an approximate result  3.9999...9, due to precision issues.
        //  In contrast, evaluating 2*6 first (resulting in 12) and then dividing by 3 will output the exact result 4.
        operator_precedence: {
            '^': 4,
            '*': 3,
            '/': 2,
            '%': 2, //'%' is a Modulus (Remainder) operator
            '+': 1,
            '-': 1,
        },

        //Power(^) calculation
        exponents(value1, value2) {
            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then the math operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                //Using '**' operator instead of Math.pow() for power calculations, as Math.pow() doesn't support BigInt data types
                return (value1 ** value2);
            }

            //Throw Data Type Error
            else {
                let errMsg = `Data Type Error: Power operator (^) requires both operands to be either numbers (default number type in JavaScript is floating-point) or BigInts.
Received: ${value1} type of: ${typeof (value1)} and ${value2} type of: ${typeof (value2)}`
                throw new Error(errMsg);
            }
        },

        //Multiplication(*) calculation
        multiplication(value1, value2) {

            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then the math operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 * value2);
            }

            //Throw Data Type Error
            else {
                let errMsg = `Data Type Error: Multiplication operator (*) requires both operands to be either numbers (default number type in JavaScript is floating-point) or BigInts.
Received: ${value1} type of: ${typeof (value1)} and ${value2} type of: ${typeof (value2)}`
                throw new Error(errMsg);
            }

        },

        //Division(/) calculation
        division(value1, value2) {
            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then the math operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 / value2);
            }

            //Throw Data Type Error
            else {
                let errMsg = `Data Type Error: Division operator (/) requires both operands to be either numbers (default number type in JavaScript is floating-point) or BigInts.
Received: ${value1} type of: ${typeof (value1)} and ${value2} type of: ${typeof (value2)}`
                throw new Error(errMsg);
            }


        },

        //Modulus(%) calculation
        modulus(value1, value2) {
            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then the math operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 % value2);
            }

            //Throw Data Type Error
            else {
                let errMsg = `Data Type Error: Modulus operator (%) requires both operands to be either numbers (default number type in JavaScript is floating-point) or BigInts.
Received: ${value1} type of: ${typeof (value1)} and ${value2} type of: ${typeof (value2)}`
                throw new Error(errMsg);
            }


        },


        //Addition(+) calculation or String Concatenation
        addition(value1, value2) {
            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types only then the math operation will be performed.
            //Otherwise if both operands are string type then concatenation will be performed
            //Otherwise, an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 + value2);
            }
            else if ((typeof (value1) === typeof (value2)) && (typeof (value1) === 'string')) {
                //Returns the concatenated string value
                return (value1.concat(value2));
            }

            //Throw TypeError
            else {
                let errMsg = `Data Type Error: Addition operator (+): requires both operands to be either numbers (default number type in JavaScript is floating-point) or BigInts.
Concatenation operator (+): requires both operands to be string.
Received: ${value1} type of: ${typeof (value1)} and ${value2} type of: ${typeof (value2)}`
                throw new Error(errMsg);
            }


        },

        //Subtraction(-) calculation
        subtraction(value1, value2) {
            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then the math operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 - value2);
            }

            //Throw TypeError
            else {
                let errMsg = `Data Type Error: Subtraction operator (-) requires both operands to be either numbers (default number type in JavaScript is floating-point) or BigInts.
Received: ${value1} type of: ${typeof (value1)} and ${value2} type of: ${typeof (value2)}`
                throw new Error(errMsg);
            }
        },


    }

    //For storing external variables
    variables_DB = {

    }

    //This method will add external variable(s) to the ViewPoint 's variables_DB
    var(name, value) {

        //Regex for pattern that matches a string that starts with a letter (a-z, A-Z), an underscore (_), or a dollar sign ($)
        //Will be used for checking if the name qualifies as a valid JavaScript variable name
        const regex = /^[a-zA-Z_$]/;

        //If variable name is not defined
        if (name === undefined) {
            //Throw error regarding empty variable name
            throw new Error("Variable Name Error: Variable name is required and cannot be empty.");
        }

        //For checking if the variable name qualifies as a valid variable name or not
        else if (regex.test(name) === false) {
            //Throw error regarding invalid variable value
            throw new Error("Variable Name Error: Variable name is not valid");
        }

        //If the value is not defined
        else if (value === undefined) {
            //Throw error regarding empty variable value
            throw new Error(`Variable Value Error: Value for variable '${name}' is required and cannot be empty.`);
        }


        //For adding new property and value to the variables_DB object
        this.variables_DB[name] = value;
    }

    //This method converts a string representation of a data types to its actual JavaScript data type
    // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true ; externl_Var_Name -> value (if previously defined))
    string_to_js_data_types(str) {

        let char_code_first = str.charCodeAt(0); //For getting Unicode value of the fisrt character of the string

        let char_code_last = str.charCodeAt(str.length - 1); //For getting Unicode value of the last character of the string

        //For Number data types (for both normal numbers and BigInt number)
        //(char code: 46 for "." and char code from 48 to 57 = number 0 to number 9)
        if ((char_code_first === 46) || ((char_code_first >= 48) && (char_code_first <= 57))) {

            //For normal JS number types (for both int or float types) (e.g. 4, 254 , 2.2, 50.20005)
            //If last character is also a number (0 to 9), then the actual data types of this string is number
            if ((char_code_last >= 48) && (char_code_last <= 57)) {
                return Number(str); //For returning the actual JavaScript Number data type value 
            }
            //For JavaScript 's BigInt data types (e.g. 4525n). Unicode value of 'n' is 110. BigInt cannot have a decimal point (.) because it's an integer data type.
            else if ((char_code_last === 110)) {

                //For getting a new string containing the extracted part of the original string
                //(inclusive of the first element (index: 0) but exclusive of the last element (index: length-1))
                let modified_str = str.slice(0, (str.length - 1));
                return BigInt(modified_str); //For returning the actual JavaScript BigInt data type value 
            }

        }

        //For String data types (char code: 39 for ' (Single Quote); char code: 34 for " (Double Quote); char code: 96 for ` (Backtick)
        else if ((char_code_first === 39) || (char_code_first === 34) || (char_code_first === 96)) {

            //If the string is properly enclosed by matching quotes, return the string content (excluding the first and last quote characters).
            //(e.g. '"This is example string"' -> "This is example string" )
            if (str[0] === str[str.length - 1]) {

                //For getting a new string containing the extracted part of the original string
                //(Exclusive of the first element (index: 0) and exclusive of the last element (index: length-1))
                let modified_str = str.slice(1, (str.length - 1));
                return modified_str; //For returning the string data

            }

            //If the string is not properly enclosed by matching quotes (i.e If the first and last characters of the string do not
            //match (e.g., '"Hello' or "'Hello]")) ,then throw an error indicating that the string text is not properly enclosed.
            else {
                throw new Error(`Unmatched or missing quotes: ${str} text is not properly enclosed.`)
            }


        }
        //For Boolean data types
        else if ((str === 'true') || (str === 'false')) {

            //If the string is equal to the "true" string then it must returns boolean true
            if (str === 'true') {
                //For returning the boolean value: true
                return true;
            }
            //If the string is equal to the "false" string then it must returns boolean true
            else if (str === 'false') {
                //For returning the boolean value: false
                return false;
            }
        }

        //For external variables data from variables_DB object
        else {

            //Try to get the external variable 's value with its name property from ViewPoint 's variables_DB object.
            //"?"" is for optional chaining. It is a feature in JavaScript that allows to access nested properties of
            //an object without worrying about null or undefined errors
            let value = this.variables_DB?.[str];

            //For checking if the given string is a valid property key in the variables_DB object or not
            if (str in this.variables_DB) {
                //For getting the external variable 's value with its name property from ViewPoint 's variables_DB object.
                let value = this.variables_DB[str];

                //For returning the value
                return value;
            }

            //If the given string is not a valid property key in the variables_DB object or not
            else {
                //Thorw error indicating that the external variable is not defined
                throw new Error(`${str} is not defined. To use ${str} kindly define ${str} using .var(${str}, some_value) method first`)
            }
        }

    }

    //This method will convert the expression into tokenized expresion (e.g. expression = "5 + 7*2+(85^2+1)" , token = [5,'+',7,'*',2,'+','(',85,'^',2,'+',1,')'])
    tokenize(expr) {

        //For storing tokenize expresion (e.g. expression = "5 + 7*2+(85^2+1)" , token = [5,'+',7,'*',2,'+','(',85,'^',2,'+',1,')'])
        let token = []


        //For storing character sequence(s) before pushing this to the token array
        let current_token = ``;

        /* This variable will be used for checking whether the current character sequence is within a quoted string.
            When a quote character (", ', or `) is encountered, this variable stores the quote character. */
        let quote_block = "";

        //For looping through each character of the expression string
        for (let index_of_expr = 0; (index_of_expr <= (expr.length - 1)); index_of_expr++) {

            //For getting the current character from the expression string
            let char = expr[index_of_expr];

            //If the current selected character is a operator character (e.g. "+" or "^") or parentheses ("(" and ")"), then this variable will be set to true otherwise false
            let is_Crnt_Char_Operator_Char = (char === '(') || (char === ')') || (char === '^') || (char === '*') || (char === '/') || (char === '%') || (char === '+') || (char === '-');

            //If the current selected character is a quote character (", ', or `), then this variable will be set to true otherwise false
            let is_Crnt_Char_Quot_Char = (char === "'") || (char === '"') || (char === "`");


            //For quotation mode enabling or disabling or handeling the quote character (", ', or `) within the part of the quoted string sequence:
            //If the current character is a quote character (", ', or `) then:
            if (is_Crnt_Char_Quot_Char) {

                //For enabling quotation mode:
                // If the quote_block is previously not set thats mean current quote character is the the opening quote */
                if (quote_block === ``) {

                    //the quote_block variable will be used to store that quote character.
                    quote_block = char;

                    //Concatenating the current_token value with the current quote character (", ', or `) and re-store that in the current_token
                    current_token += char;

                }

                //If the quote_block is not empty, then the current quote character (", ', or `) is either the closing quote or the part of the quoted string sequence
                else if (quote_block !== ``) {

                    //For disabling quotation mode:
                    //If the current quote character (", ', or `) does match with the quote block thats mean current quote character (", ', or `) is the the ending quote
                    if (char === quote_block) {

                        //For clearing the quote_block to end the quotation mode
                        quote_block = "";

                        //Concatenating the current_token value with the current quote character (", ', or `) and re-store that in the current_token
                        current_token += char;

                        //For converting string representation of the data types to its actual JavaScript data type and storing that to the current_token
                        // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true)
                        current_token = this.string_to_js_data_types(current_token);

                        //For pushing the current_token into the token array
                        token.push(current_token);

                        //Clearing the current_token string
                        current_token = "";
                    }

                    //For handeling the quote character (", ', or `) within the part of the quoted string sequence:
                    // If the current quote character (", ', or `) does not match with the quote block thats mean the current quote character (", ', or `)
                    // is in the the part of the quoted string sequence
                    else {
                        //Concatenating the current_token value with the current quote character (", ', or `) and re-store that in the current_token
                        current_token += char;
                    }
                }
            }

            //If quote block is not empty thats mean the current character is the part of the quoted string sequence and that need to be store as it is
            else if (quote_block !== "") {
                //Concatenating the current_token value with the current character and re-store that in the current_token
                current_token += char;
            }

            //If quote_block is empty thats mean the quotation mode is disable
            else if (quote_block === "") {

                //If the current selected character is a operator character (e.g. "+" or "^") or parentheses ("(" and ")")
                if (is_Crnt_Char_Operator_Char) {

                    //If the current_token string is previously not set, then do nothing
                    if (current_token === ``) {
                        //Do nothing
                    }

                    //If the current_token string is previously set, then:
                    else {

                        //For converting string representation of the data types to its actual JavaScript data type and storing that to the current_token
                        // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true)
                        current_token = this.string_to_js_data_types(current_token);

                        //immediately push the current_token into the token array
                        token.push(current_token);

                        //Clearing the current_token string
                        current_token = ``;
                    }

                    //For pushing current operator character to the token array
                    token.push(char);
                }

                //For ignoring the whitespace (" ") from the expression string and for previous pushing current_token value into the token array
                else if (char === ` `) {


                    //If current_token is previously set, only then the current token will be pushed into the token array
                    if (current_token !== '') {
                        //For converting string representation of the data types to its actual JavaScript data type and storing that to the current_token
                        // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true)
                        current_token = this.string_to_js_data_types(current_token);

                        //For pushing the current_token into the token array
                        token.push(current_token);

                        //Clearing the current_token string
                        current_token = ``;
                    }


                }

                //For all other types of characters
                else if ((is_Crnt_Char_Operator_Char === false) && (char !== ` `)) {

                    //Concatenating the current_token value with the current character and re-store that in the current_token
                    current_token += char;

                    //If the current selected character is the last character of the expression string
                    //then push the current_token string into the token array
                    if (index_of_expr === (expr.length - 1)) {

                        //For converting string representation of the data types to its actual JavaScript data type and storing that to the current_token
                        // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true)
                        current_token = this.string_to_js_data_types(current_token);

                        //For pushing the current_token into the token array
                        token.push(current_token);

                        //Clearing the current_token string
                        current_token = ``;
                    }
                }

            }
        }

        //For detecting Unclosed quoted text error:
        //If the loop completes iterating through the entire expression string, but the quote_block is still not empty, it indicates an unclosed quoted text,
        //meaning there is a text section that was started with a quotation character but not properly terminated with a matching quotation character.
        if (quote_block !== "") {
            // For throwing an error message indicating that the string contains unclosed quoted text
            throw new Error(`Unclosed quoted text detected: ${expr} contains unclosed quoted text`)
        }

        else {
            //For returning the token array to its caller
            return token;
        }
    }

    //This method takes an infix expression array (e.g. [5,'*',4,'+',2] and returns its equivalent postfix expression array (e.g. [5,4,'*',2,'+']))
    infix_to_postfix(...infix_expr_array) {

        let postfix_expr_array = []; //For storing postfix expression elements

        let stack = []; //This array will be used for storing operators and parentheses during the postfix conversion

        //For accessing operator precedence table from the ViewPoint 's math_logic_DB
        const operator_precedence_DB = this.ViewPoint_math_def.operator_precedence

        //For looping through each token in the infix_expression_array
        for (let token_index = 0; token_index <= (infix_expr_array.length - 1); token_index++) {

            //For getting current token value from the infix_expr_array using its index
            let token_value = infix_expr_array[token_index];

            //For checking if the current token is a operator (^ ,*, /, +, -) or not
            let isOperator = ((token_value === '^') || (token_value === '*') || (token_value === '/') || (token_value === '%') || (token_value === '+') || (token_value === '-'));

            //For checking if the current token is a parentheses ("(" or ")") or not
            let isParentheses = ((token_value === '(') || (token_value === ')'));

            //For checking if the current token is a operands (e.g. 5, 52n, 41 etc..) or not
            let isOperand = (isOperator === false) && (isParentheses === false);

            //If the current token is a operands:
            if (isOperand) {
                //Push the current operands to the postfix_expr_array
                postfix_expr_array.push(token_value);
            }
            //If the current token is a operator:
            else if (isOperator) {

                //For checking the precedence of the last element of the stack array
                let lst_stack_ele_prece = operator_precedence_DB[stack[(stack.length - 1)]]

                //If the last element of the stack array has undefined precedence, either the stack is empty or the last element of the stack array
                //is a left parenthesis '(' (As we only push left Parentheses ("(") and operator to the stack). Since parentheses act as boundaries,
                //we manually set the last element's precedence to 0, preventing operators inside the parentheses from interacting with those outside.
                if (lst_stack_ele_prece === undefined) {
                    lst_stack_ele_prece = 0;
                };

                //Precedence of the current operator token
                let crnt_token_prece = operator_precedence_DB[token_value];

                //While the stack is not empty and the current operator token 's precedence is less than or equal to the precedence of the last
                //element of the stack, until then the loop will be go on
                while ((stack.length !== 0) && (crnt_token_prece <= lst_stack_ele_prece)) {
                    //For Removeing the last element from the stack array and push it to the postfix_expr_array
                    postfix_expr_array.push(stack.pop());

                    //For re-checking the Precedence of the last element of the stack array
                    lst_stack_ele_prece = operator_precedence_DB[stack[(stack.length - 1)]]
                }

                //Push the current operator to the stack array
                stack.push(token_value);
            }
            else if (isParentheses) {
                //If the token is a left parenthesis:
                if (token_value === "(") {
                    //Push the left parenthesis in to the stack
                    stack.push(token_value);
                }
                //If the token is a right parenthesis
                else if (token_value === ")") {

                    //For getting the value of the last element of the stack
                    let lst_ele_of_stack = stack[stack.length - 1]

                    //Pop operators from the top of the stack and push them to the to postfix_expr_array until top of the stack element is '('
                    while (lst_ele_of_stack !== "(") {

                        //For poping operators from the top of the stack and push them to the to postfix_expr_array
                        postfix_expr_array.push(stack.pop());

                        //For rechecking the value of the last element of the stack
                        lst_ele_of_stack = stack[stack.length - 1];
                    }

                    //For poping the left parenthesis from the top of the stack
                    stack.pop();
                };

            }

        }
        //When looping through each token in the infix_expression_array is being completed, then we need to pop any remaining operators from
        //the top of the stack and push them to the to postfix_expr_array until the stack is empty
        while ((stack.length) !== 0) {
            postfix_expr_array.push(stack.pop());
        }

        //Return the postfix_expr_array
        return postfix_expr_array;
    }

    //This method takes a postfix expression array as input, parses it, and returns the calculated result
    postfix_exp_evaluator(...postfix_expr) {

        //This array will be used to store the postFix expression during the evalutation / calculation
        let expr_stack = []

        //For storing some methods for checking if the current value is a operator or a operand
        let value_ckecker = {
            //Method for checking if the given value is a operator (^ ,*, /, +, -) or not
            isOperator: function (value) {
                let isOperator = ((value === '^') || (value === '*') || (value === '/') || (value === '%') || (value === '+') || (value === '-'));

                //Returning the boolean value output
                return isOperator;
            },
            //Mathod for checking if the given value is a operands (e.g. 5, 52n, 41 etc..) or not
            isOperand: function (value) {
                //For checking if the current value is a operator or not
                let isOperator = ((value === '^') || (value === '*') || (value === '/') || (value === '%') || (value === '+') || (value === '-'));


                let isOperand = false;
                //If isOperator is false thats mean the given value is a operator
                if (isOperator === false) {
                    isOperand = true;
                };

                //Returning the boolean value output
                return isOperand;
            }
        }

        //For accessing ViewPoint 's math definations
        let math_def = this.ViewPoint_math_def;

        //For looping through each element index of the postfix expression array
        for (let ele_index = 0; ele_index <= (postfix_expr.length - 1); ele_index++) {

            //For getting the current element value of the postfix expression array using its index value
            let ele_value = postfix_expr[ele_index];

            //If the current element of the postfix expression array is a operand (e.g. 5, 6, 7 etc...):
            if (value_ckecker.isOperand(ele_value)) {

                //Push the current element to the expression stack
                expr_stack.push(ele_value);

            }
            //If the current element of the postfix expression array is a operator (i.e. '^','*','/','+','-'):
            else if (value_ckecker.isOperator(ele_value)) {

                //Pop the value from the top of the expression stack and store it as the second operand
                let secnd_value = expr_stack.pop();

                //Pop the value from top of the expression stack, and store it as the first operand
                let frst_value = expr_stack.pop();

                //For exponential / power operator (^)
                if (ele_value === '^') {

                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.exponents(frst_value, secnd_value));
                }
                //For multiplication operator (*)
                else if (ele_value === '*') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.multiplication(frst_value, secnd_value));
                }
                //For division operator (/)
                else if (ele_value === '/') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.division(frst_value, secnd_value));
                }

                //For modulus operator (%)
                else if (ele_value === '%') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.modulus(frst_value, secnd_value));
                }

                //For addition operator (+)
                else if (ele_value === '+') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.addition(frst_value, secnd_value));
                }
                //For subtraction operator (-)
                else if (ele_value === '-') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.subtraction(frst_value, secnd_value));
                }



            }

        }

        //For poping the value from the expression array and storing it into the output variable
        let output = expr_stack.pop();

        //For returning the output value
        return output;


    }

    //This method evaluates a mathematical expression represented as a string and returns the calculated result
    evaluate(expression_Str) {

        //Input must be a string type.
        if (typeof (expression_Str) === 'string') {

            //For storing tokenized infix expresion into token array
            let token = this.tokenize(expression_Str);

            //For converting and storing an infix expression array to its equivalent postfix expression array
            let postFix_expr_arry = this.infix_to_postfix(...token);

            //For storing the output after evaluating a postfix expression array
            let output = this.postfix_exp_evaluator(...postFix_expr_arry);

            //For returning the calculated value to its caller
            return output;
        }
        else {
            throw new Error('Expression must be a string');
        }
    }

}

