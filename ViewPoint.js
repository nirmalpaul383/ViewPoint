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

            //Multiplication operator (used for implementing unary minus)
            //Basicly its function is same as '*' but with higher precedence
            '×': 12,

            //Basic math operators 's precedence
            '^': 11,
            '**': 11,
            '*': 10,
            '/': 9,
            '%': 9, //'%' is a Modulus (Remainder) operator
            '+': 8,
            '-': 8,

            //Comparison operators 's precedence
            '<': 7,
            '>': 7,
            '<=': 7,
            '>=': 7,
            '==': 6,
            '!=': 6,


            //Logical operators 's precedence
            '&': 5,
            '|': 4,
            '&&': 3,
            '||': 2,

            //Assignment operators 's precedence
            '=': 1,
            '+=': 1,
            '-=': 1,
            '*=': 1,
            '/=': 1,

            //New line operator 's precedence
            '\n': 0,
            '\r': 0,
            ';': 0,

        },

        //For defining the supported characters
        character_def: {

            //Supported number characters
            //0 to 9 or "."
            //or and '.' character is used as a decimal point
            num: [
                '0', '1', '2', '3',
                '4', '5', '6', '7',
                '8', '9', '.'
            ],

            //Supported operator characters
            //math operator character (e.g. "+" or "^")
            //or a logic operator character (e.g. "&" , "<")
            operator: [
                '×',
                '^', '*', '/', '%',
                '+', '-', '&', '|', '!',
                '~', '>', '<', '=', '?'
            ],

            //Supported parentheses characters
            parentheses: ['(', ')'],

            //Supported semicolon character
            semicolon: [";"],

            //Supported colon character
            colon: [":"],

            //Supported coma character
            coma: [","],

            //Supported space character
            space: [" "],

            //Supported quotation characters
            quotation: ['"', "'", '`'],

            //Supported new line characters
            newLine: ["\n", "\r"],

            //This method will test and return the character type value based on the ViewPoint 's character defination
            getCharType(character) {

                //If the character belong to the ViewPoint 's supported numbers character
                if (this.num.includes(character)) {
                    return 'num';
                }

                //If the character belong to the ViewPoint 's supported operators character
                else if (this.operator.includes(character)) {
                    return 'operator';
                }

                //If the character belong to the ViewPoint 's supported parentheses character
                else if (this.parentheses.includes(character)) {
                    return 'parentheses';
                }

                //If the character belong to the ViewPoint 's supported semicolon character
                else if (this.semicolon.includes(character)) {
                    return 'semicolon';
                }

                //If the character belong to the ViewPoint 's supported colon character
                else if (this.colon.includes(character)) {
                    return 'colon';
                }


                //If the character belong to the ViewPoint 's supported coma character
                else if (this.coma.includes(character)) {
                    return 'coma';
                }

                //If the character belong to the ViewPoint 's supported space character
                else if (this.space.includes(character)) {
                    return 'space';
                }

                //If the character belong to the ViewPoint 's supported quotation character
                else if (this.quotation.includes(character)) {
                    return 'quotation';
                }

                //If the character belong to the ViewPoint 's supported new line character
                else if (this.newLine.includes(character)) {
                    return 'newLine';
                }


            }

        },

        //For defining the supported operators
        operator_def: {

            operators: [

                //Multiplication operator (used for implementing unary minus)
                '×',

                //Basic math operators
                '^', '**', '*', '/', '%', '+', '-',

                //Comparison operators
                '<', '>', '<=', '>=', '==', '!=',

                //Logical operators
                '&', '|', '&&', '||',

                //Assignment operators
                '=', '+=', '-=', '*=', '/=',

                //New Line characters
                ';', '\n', '\r',
            ]

        },

        //For defining the supported reserve keywords
        keywords_def: {
            keys: [
                //'rest' keyword can be used to collect multiple values in inline functions
                "rest",

                //'clr' keyword can be used for clearing a variable
                "clr",

                //'func' keyword can used to defined an in-line function
                "func",

                //'clrFn' keyword can be used for clearing a user defined function (both in-line and external)
                "clrFn",

                //'clean' keyword can be used for clearing all user defined variables and all user defined functions
                //(both in-line and external)
                "clean"
            ],

        },



        //Basic math operators 's functions definations

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


        //Comparison operators 's functions

        //Less than ('<') operator
        isLessThan(value1, value2) {

            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 < value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Less than ('<') operator requires both operands to be either numbers or BigInts.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Greater than ('>') operator
        isGreatThan(value1, value2) {

            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 > value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Greater than ('>') operator requires both operands to be either numbers or BigInts.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Less than or Equal('<=') operator
        isLessThanEq(value1, value2) {

            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 <= value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Less than or Equal('<=') operator requires both operands to be either numbers or BigInts.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Greater than or Equal('>=') operator
        isGreatThanEq(value1, value2) {

            //If both operands are number data types (default number type in JavaScript is floating point number) or BigInt number data types
            //Only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && ((typeof (value1) === 'number') || (typeof (value1) === 'bigint'))) {

                return (value1 >= value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Greater than or Equal('<=') operator requires both operands to be either numbers or BigInts.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },


        //Equal('==') operator
        isEqual(value1, value2) {

            //If both operands are same data types only then this operation will be performed otherwise an error message will be thrown
            if (typeof (value1) === typeof (value2)) {

                return (value1 === value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Equal('==') operator requires both operands to be in same data types.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Not Equal('!=') operator
        isNotEqual(value1, value2) {

            //If both operands are same data types only then this operation will be performed otherwise an error message will be thrown
            if (typeof (value1) === typeof (value2)) {

                return (value1 !== value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Not Equal('==') operator requires both operands to be in same data types.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },


        //Logical operators 's functions

        //Bit Wise And ('&') operator
        bitWiseAnd(value1, value2) {

            //If both operands are boolean data types only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && (typeof (value1) === 'boolean')) {

                return (value1 & value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Bit Wise And ('&') operator requires both operands to be in boolean data types.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Bit Wise Or ('|') operator
        bitWiseOr(value1, value2) {

            //If both operands are boolean data types only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && (typeof (value1) === 'boolean')) {

                return (value1 | value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Bit Wise Or ('|') operator requires both operands to be in boolean data types.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Logical And ('&&') operator
        logicalAnd(value1, value2) {

            //If both operands are boolean data types only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && (typeof (value1) === 'boolean')) {

                return (value1 && value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Logical And ('&&') operator requires both operands to be in boolean data types.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Logical Or ('||') operator
        logicalOr(value1, value2) {

            //If both operands are boolean data types only then this operation will be performed otherwise an error message will be thrown
            if ((typeof (value1) === typeof (value2)) && (typeof (value1) === 'boolean')) {

                return (value1 || value2);

            }

            //Throw typeError
            else {
                let errMsg = `Data Type Error: Logical Or ('||') operator requires both operands to be in boolean data types.
Received ${value1} type of ${typeof (value1)} and ${value2} type of ${typeof (value2)}`;

                throw new Error(errMsg);


            }

        },

        //Assignment operators: equal assignment operator (=), addition assignment operator (+=),
        //subtraction assignment operator (-=), multiplication assignment operator (*=),
        //division assignment operator (/=) 
        assign(varName, varValue, assignType) {


            //For accessing the ViewPoint class from here.
            //Note: if we used 'this' keyword here it only point to the ViewPoint_math_def object
            let it = this.ViewPointThis;

            //If the assignment operator is a equal assignment operator (=)
            if (assignType === '=') {
                varValue = varValue;
            }

            //If the assignment operator is a addition assignment operator (+=)
            else if (assignType === '+=') {

                //For getting previous value of the given variable
                //from the ViewPoint 's class variables_DB
                let prv_value = it.variables_DB[varName];

                //If the previous value is undefined thats mean the
                //variable is not yet existed in the ViewPoint 's class variables_DB
                if (prv_value === undefined) {

                    //For setting the previous value to 0
                    prv_value = 0;
                }

                //For storing the new value
                varValue = prv_value + varValue;
            }

            //If the assignment operator is a subtraction assignment operator (-=)
            else if (assignType === '-=') {

                //For getting previous value of the given variable
                //from the ViewPoint 's class variables_DB
                let prv_value = it.variables_DB[varName];

                //If the previous value is undefined thats mean the
                //variable is not yet existed in the ViewPoint 's class variables_DB
                if (prv_value === undefined) {

                    //For setting the previous value to 0
                    prv_value = 0;
                }

                //For storing the new value
                varValue = prv_value - varValue;
            }

            //If the assignment operator is a multiplication assignment operator (*=)
            else if (assignType === '*=') {

                //For getting previous value of the given variable
                //from the ViewPoint 's class variables_DB
                let prv_value = it.variables_DB[varName];

                //If the previous value is undefined thats mean the
                //variable is not yet existed in the ViewPoint 's class variables_DB
                if (prv_value === undefined) {

                    //For setting the previous value to 0
                    prv_value = 0;
                }

                //For storing the new value
                varValue = prv_value * varValue;
            }

            //If the assignment operator is a division assignment operator (/=)
            else if (assignType === '/=') {

                //For getting previous value of the given variable
                //from the ViewPoint 's class variables_DB
                let prv_value = it.variables_DB[varName];

                //If the previous value is undefined thats mean the
                //variable is not yet existed in the ViewPoint 's class variables_DB
                if (prv_value === undefined) {

                    //For setting the previous value to 0
                    prv_value = 0;
                }

                //For storing the new value
                varValue = prv_value / varValue;
            }



            //For using ViewPoint 's class 's .var method for variable assignment
            it.var(varName, varValue);


            //For returning value2 (actual value)
            return varValue;
        },



        //New line operator ('\n' , '\r') or semicolon operator (';')
        //Note: newLine (as operator) is only callable if the evaluate 's interpreter_mode is disabled.
        //If interpreter_mode is disabled, encountering a newline will throw an error,
        //indicating that multi-line evaluation requires interpreter_mode to be enabled.'
        newLine(value1, value2) {

            let msg = "New line detected, please turn on the interpreter_mode. ViewPoint.evaluate (expression, ***true***)";

            //For throwing the error message
            throw new Error(msg);
        },

        //ViewPointThis will be used for accessing whole ViewPoint class from inside of any object or method
        ViewPointThis: this,



    }

    //For storing variables
    variables_DB = {

    }

    //For storing ViewPoint 's built-in functions
    func_DB_intrnl = {



        //For defining the #and function
        //#and will test each of its arguments , if all are true then it will return true
        "and": function (...inputArray) {

            //Will be used for storing the output
            let output = true; //The default value is set to true

            //For testing each of the element of the inputArray
            for (let i = 0; i <= (inputArray.length - 1); i++) {

                //When the ouput value and the element value both are true only then the output will be set to true,
                //otherwise the output variable becomes false.
                output = (output && inputArray[i]);

                //Once a output becomes a false, there is no need to continuing the for loop for testing.
                //The for loop must be break
                if (output === false) {
                    break; //For stopping the for loop
                };

            };

            //For returning the ouput
            return output;
        },

        //For defining the #&& function (shortcut of #and function)
        "&&": function (...inputArray) {

            //For storing the output using the #and function
            let output = this['and'](...inputArray);

            //For returning the output
            return output;
        },

        //For defining the #or function
        //#or will test each of its arguments , if any of its arguments is true then it will return true
        "or": function (...inputArray) {

            //Will be used for storing the output
            let output = false; //The default value is set to false

            //For testing each of the element of the inputArray
            for (let i = 0; i <= (inputArray.length - 1); i++) {

                //If any of its element 's value is true then the output will be set to true
                output = (output || inputArray[i]);

                //Once a output becomes a true, there is no need to continuing the for loop for testing.
                //The for loop must be break
                if (output === true) {
                    break; //For stopping the for loop
                };

            };

            //For returning the ouput
            return output;
        },

        //For defining the #|| function (shortcut of #or function)
        "||": function (...inputArray) {

            //For storing the output using the #or function
            let output = this['or'](...inputArray);

            //For returning the output
            return output;
        },

        //For defining the #not function
        //#not will change 'true' value to a 'false' value and 'false' value to a 'true' value
        "not": function (input) {

            //For returning the ouput
            return !(input);
        },

        //For defining the #! function (shortcut of #not function)
        "!": function (input) {

            //For storing the output using the #not function
            let output = this['not'](input);

            //For returning the output
            return output;
        },

        //For defining the #greaterThan function
        //#greaterThan will takes 2 parameters and compare if that the 1st parameter is greater than the second parameter or not
        "greaterThan": function (fstVal, sndVal) {

            //For comparing the 1st value with the 2nd vale and store it to the output value
            let ouput = (fstVal > sndVal);

            //For returning the ouput
            return ouput;
        },

        //For defining the #> function (shortcut of #greaterThan function)
        ">": function (input1, input2) {

            //For storing the output using the #greaterThan function
            let output = this['greaterThan'](input1, input2);

            //For returning the output
            return output;
        },

        //For defining the #lessThan function
        //#lessThan will takes 2 parameters and compare if that the 1st parameter is less than the second parameter or not
        "lessThan": function (fstVal, sndVal) {

            //For comparing the 1st value with the 2nd vale and store it to the output value
            let ouput = (fstVal < sndVal);

            //For returning the ouput
            return ouput;
        },

        //For defining the #< function (shortcut of #lessThan function)
        "<": function (input1, input2) {

            //For storing the output using the #lessThan function
            let output = this['lessThan'](input1, input2);

            //For returning the output
            return output;
        },

        //For defining the #isEqual function
        //#isEqual will takes 2 parameters and compare if that the both parameter is same numerical value or not
        "isEqual": function (fstVal, sndVal) {

            //For comparing the 1st value with the 2nd vale and store it to the output value
            let ouput = (fstVal === sndVal);

            //For returning the ouput
            return ouput;
        },

        //For defining the #== function (shortcut of #isEqual function)
        "==": function (input1, input2) {

            //For storing the output using the #isEqual function
            let output = this['isEqual'](input1, input2);

            //For returning the output
            return output;
        },

        //For defining the #greaterThanOrEqual function
        //#greaterThanOrEqual will takes 2 parameters and compare if that the 1st parameter is greater than or
        //equal to the second parameter or not
        "greaterThanOrEqual": function (fstVal, sndVal) {

            //For comparing the 1st value with the 2nd vale and store it to the output value
            let ouput = (fstVal >= sndVal);

            //For returning the ouput
            return ouput;
        },

        //For defining the #>= function (shortcut of #greaterThanOrEqual function)
        ">=": function (input1, input2) {

            //For storing the output using the #greaterThanOrEqual function
            let output = this['greaterThanOrEqual'](input1, input2);

            //For returning the output
            return output;
        },

        //For defining the #lessThanOrEqual function
        //#lessThanOrEqual will takes 2 parameters and compare if that the 1st parameter is less than or
        //equal to the second parameter or not
        "lessThanOrEqual": function (fstVal, sndVal) {

            //For comparing the 1st value with the 2nd vale and store it to the output value
            let ouput = (fstVal <= sndVal);

            //For returning the ouput
            return ouput;
        },

        //For defining the #<= function (shortcut of #lessThanOrEqual function)
        "<=": function (input1, input2) {

            //For storing the output using the #lessThanOrEqual function
            let output = this['lessThanOrEqual'](input1, input2);

            //For returning the output
            return output;
        },

        //For defining the #if function
        //#if takes 3 parameters. 1st parameter is a condition parameter, if the condition is true then
        //it returns 2nd parameter otherwise it returns 3rd parameter (if the 3rd parameter is not
        //specified then its default value false will be return)
        "if": function (condition, valueIftrue, valueIfFalse = false) {

            //If the condition is true then the 2nd parameter will be returned
            if (condition === true) {
                //For returning the 2nd parameter
                return valueIftrue;
            }
            //If the condition is false then the 3rd parameter will be returned
            else if (condition === false) {
                //For returning the 3rd parameter
                return valueIfFalse;
            }


        },

        //For defining the #string function. #string function takes the data and returns its string form.
        "string": function (data) {

            //Will be used for storing the String form of the data
            let output = '';

            //For converting the data into a String form and storing that to the output variable
            output = String(data);

            //For returning the string form of the data
            return output;
        },

        //For defining the #typeof function. #typeof takes data as its input parameter and returns the
        //type of that parameter
        "typeof": function (data) {

            //Will be used for storing the data type result
            let type = '';

            //For testing the data type and stor it to the type variable
            type = typeof (data);

            //For accessing the list of available built-in functions
            let lstOfBuiltInFunc = this.ViewPointThis.func_DB_intrnl;

            //For accessing the list of available user-defined functions
            let lstOfExtrnalFunc = this.ViewPointThis.func_DB_extrnl;

            //For accessing the list of available user-defined inline functions
            let lstOfInlineFunc = this.ViewPointThis.func_DB_inline;

            //If the data type is a string and that string match with the name of any available functions,
            //thats mean current data is a function type
            if ((type === 'string') && ((data in lstOfBuiltInFunc) || (data in lstOfExtrnalFunc) || (data in lstOfInlineFunc) || (data in Math))) {

                //For setting the type to 'function'
                type = 'function';
            }

            //For returning the type result
            return type;

        },

        //For defining the #Const (Constant) function using JavaScript's built-in Math object.
        //Const function takes the name of Constant (in string format) and returns the result
        //by calling the corresponding Math property / constant name
        "Const": function (name) {
            //If the name is not in string
            if (typeof (name) !== "string") {
                //For throwing the error
                throw new Error(`Name of the property / constant of JS 's Math object must be in string`);

            }
            //If the name is a empty string
            else if (name === "") {
                //For throwing the error
                throw new Error(`Name of the property / constant of JS 's Math object must not be a empty string`);
            }
            else {

                //If the name is available in the JS 's Math object
                if (name in Math) {

                    //This  variable will be used for storing the result
                    let output = 0;

                    //For calling the corresponding property / constant from the JS 's Math object
                    output = Math[name]

                    //For returning the output
                    return output;
                }

                //If the name is not available in the JS 's Math object
                else {
                    throw new Error(`There is no property / constant named ${name} in the Math object in this runtime`)
                }
            }

        },

        //For defining the #degToRad function
        //#degToRad function takes input in degree form and returns the output in radian form
        "degToRad": function (degInput) {
            //Will be used for storing the output result
            let radOutput = 0;

            //For calculating the result
            radOutput = ((Math.PI * degInput) / 180);

            //For return the result
            return radOutput;
        },

        //For defining the #sum function, which returns the sum of all provided parameters
        "sum": function (...inputArray) {

            //Will be used for storing the result
            let output = 0;


            //For looping through each element of the inputArray
            for (let i = 0; i <= (inputArray.length - 1); i++) {

                //For adding the current element value to the result
                output += inputArray[i];
            };

            //For returning the output
            return output;
        },

        //For defining the #count function, which returns the total numbers of the given parameters
        "count": function (...inputArray) {

            //Will be used for storing the result
            let output = 0;

            //For counting the total numbers of the given parameters and storing its to the output variable
            output = inputArray.length;

            //For returning the output
            return output;
        },

        //For defining the #avg function, which returns the average value of the given parameters
        "avg": function (...inputArray) {

            //For calculating and storing the sum of all provided parameters
            let sum = this.sum(...inputArray);

            //For calculating and storing total numbers of the given parameters
            let count = this.count(...inputArray);

            //For calculating and storing the average value
            let output = (sum / count);

            //For returning the output
            return output;


        },

        //ViewPointThis will be used for accessing whole ViewPoint class from inside of any object or method
        ViewPointThis: this,


    }

    //For storing user-defined functions
    func_DB_extrnl = {

    }

    //For storing user-defined inline functions
    func_DB_inline = {

    }


    //This method will store user-defined function to the to the ViewPoint 's func_DB_extrnl
    addFunc(name, funcCode) {

        //For storing user defined function to the ViewPoint 's func_DB_extrnl
        this.func_DB_extrnl[`${name}`] = funcCode;

    }


    //This method will add variable(s) to the ViewPoint 's variables_DB
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

    //This method can clear a previously added variable from the ViewPoint 's 'variables_DB'
    varClr(name) {

        //If variable name is not defined
        if (name === undefined) {
            //Throw error regarding empty variable name
            throw new Error("Variable Name Error: Variable name is required and cannot be empty.");
        } else {

            //For deleting the specified variable from the ViewPoint 's variables_DB
            delete this.variables_DB[name];

        }

    }

    //This method can clear a previously added function from the ViewPoint 's 'func_DB_extrnl' or 'func_DB_inline'
    funcClr(name) {
        //If function name is not defined
        if (name === undefined) {
            //Throw error regarding empty variable name
            throw new Error("Function Name Error: Function name is required and cannot be empty.");
        } else {

            //For deleting the specified function from the ViewPoint 's 'func_DB_extrnl'
            delete this.func_DB_extrnl[name];

            //For deleting the specified function from the ViewPoint 's 'func_DB_inline'
            delete this.func_DB_inline[name];

        }
    }

    //This method will clear / reset the ViewPoint 's 'variables_DB', 'func_DB_extrnl' and 'func_DB_inline'.
    //This will clean the ViewPoint 's object for fresh evalution / interpretion
    clean() {

        //For cleaning the ViewPoint 's 'variables_DB'
        //(Deleting all user stored variables and their values)
        this.variables_DB = {};

        //For cleaning the ViewPoint 's 'func_DB_extrnl'
        //(Deleting all user stored functions from the 'func_DB_extrnl')
        this.func_DB_extrnl = {};

        //For cleaning the ViewPoint 's 'func_DB_inline'
        //(Deleting all user stored functions from the 'func_DB_inline')
        this.func_DB_inline = {};
    }

    //This method converts a string representation of a data types to its actual JavaScript data type
    // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true ; externl_Var_Name -> value (if previously defined))
    string_to_js_data_types(str, next_element, previous_ele) {

        let first_char = str[0]; //For getting the fisrt character of the string

        let last_char = str[str.length - 1]; //For getting the last character of the string

        //For getting the character type of the first character
        let charTypeFirst = this.ViewPoint_math_def.character_def.getCharType(first_char);


        //For getting the character type of the last character
        let charTypeLast = this.ViewPoint_math_def.character_def.getCharType(last_char);


        //For accessing the reserve keywords list
        let reserveKeys = this.ViewPoint_math_def.keywords_def.keys;


        //For Number data types (for both normal numbers and BigInt number)
        //If the first character of the string is a "num" character and if
        //the string is not a 'n' then the string will be converted to a number.
        //Note: If the string is 'n' thats mean there 'n' is used as name
        //instead of the BigInt 's 'n' suffix.
        if ((charTypeFirst === "num") && (str !== 'n')) {

            //For normal JS number types (for both int or float types) (e.g. 4, 254 , 2.2, 50.20005)

            //If last character is not a "n' ("n" is used in BigInt number type) then the actual data types of this string is number
            if (last_char !== "n") {
                return Number(str); //For returning the actual JavaScript Number data type value 
            }
            //For JavaScript 's BigInt data types (e.g. 4525n). Unicode value of 'n' is 110. BigInt cannot have a decimal point (.) because it's an integer data type.
            else if (last_char === "n") {

                //For getting a new string containing the extracted part of the original string
                //(inclusive of the first element (index: 0) but exclusive of the last element (index: length-1))
                let modified_str = str.slice(0, (str.length - 1));
                return BigInt(modified_str); //For returning the actual JavaScript BigInt data type value 
            }

        }

        //For String data types
        else if (charTypeFirst === "quotation") {

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

        //For ViewPoint 's operators, parentheses, semiColon, coma
        //do nothing and return the original inputed string
        else if ((charTypeFirst === "operator") || (charTypeFirst === "parentheses") || (charTypeFirst === "semicolon") || (charTypeFirst === "coma") || (charTypeFirst === "newLine")) {

            //Return the original string
            return str;
        }

        //If the next element is a assignment operator
        //do nothing and return the original inputed string (assignment operator)
        else if (['=', '+=', '-=', '*=', '/='].includes(next_element)) {

            //Return the original string
            return str;
        }

        //If the current element is a ViewPoint 's reserve keywords
        else if (reserveKeys.includes(str)) {

            //Return the original string (reserve keyword)
            return str;

        }

        //For all others
        else {

            //If the given string is a a previously stored function name in the func_DB_intrnl,
            //func_DB_extrnl, func_DB_inline and JS 's default Math object
            if ((str in this.func_DB_intrnl) || (str in this.func_DB_extrnl) || (str in this.func_DB_inline) || (str in Math)) {

                //For returning the original string (function name)
                return str;

            }

            //For variables data from variables_DB object
            //For checking if the given string is a previously stored variable name in the variables_DB object or not
            else if (str in this.variables_DB) {

                //For getting the variable 's value with its name property from ViewPoint 's variables_DB object.
                let value = this.variables_DB[str];

                //For returning the value
                return value;
            }


            //For thorwing error regarding un-known token
            else {
                //Thorw error indicating that the token is un-known
                throw new Error(`${str} is not defined.`)

            }
        }

    }

    //This method will convert the expression into tokenized expresion (e.g. expression = "5 + 7*2+(85^2+1)" , token = [5,'+',7,'*',2,'+','(',85,'^',2,'+',1,')'])
    tokenize(expr) {

        //For storing tokenize expresion (e.g. expression = "5 + 7*2+(85^2+1)" , token = [5,'+',7,'*',2,'+','(',85,'^',2,'+',1,')'])
        let token = []

        //For storing character sequence(s) before pushing this to the token array
        let current_token = ``;

        //This variable will be used for storing the type of current token
        //(e.g. operator: "+", "-" ; number: "45", "56" ; logicalOperator: "<", ">" ; identifer: "max", "price"; etc )
        let token_type = "";

        /* This variable will be used for checking whether the current character sequence is within a quoted string.
            When a quote character (", ', or `) is encountered, this variable stores the quote character. */
        let quote_block = "";

        //For looping through each character of the expression string
        for (let index_of_expr = 0; (index_of_expr <= (expr.length - 1)); index_of_expr++) {

            //For getting the current character from the expression string
            let char = expr[index_of_expr];

            //For getting the character type of the current character
            let characterType = this.ViewPoint_math_def.character_def.getCharType(char);

            //If the current character is a number character
            let is_Crnt_Char_Num_Char = (characterType === "num");

            //If the current selected character is a math operator character (e.g. "+" or "^")
            //or a logic operator character (e.g. "&" , "<"), then this variable will be set to true otherwise false
            let is_Crnt_Char_Operator_Char = (characterType === "operator");

            //If the current character is a parentheses character
            let is_Crnt_Char_Paren_Char = (characterType === "parentheses");

            //If the current character is a semicolon character
            let is_Crnt_Char_SemiCol_Char = (characterType === "semicolon");

            //If the current character is a semicolon character
            let is_Crnt_Char_Col_Char = (characterType === "colon");

            //If the current character is a coma character
            let is_Crnt_Char_Coma_Char = (characterType === "coma");

            //If the current character is a space character
            let is_Crnt_Char_Space_Char = (characterType === "space");

            //If the current selected character is a quote character
            let is_Crnt_Char_Quot_Char = (characterType === "quotation");

            //If the current selected character is a new line character
            let is_Crnt_Char_NewLine_Char = (characterType === "newLine");

            //If the current character is a name character (alphabetic character (from a to z or A to Z) or special character ($ , _))
            let is_Crnt_Char_Name_Char = /[a-zA-Z$_]/.test(char);


            //If the quotation mode is enable (i.e quote_block variable is not empty)
            if (quote_block !== "") {


                //If the current character is matching with the quotation mode starter quote character
                if (char === quote_block) {

                    //For concataning current quote character into the current_token variable
                    current_token += char;

                    //For disabling the quotation mode
                    quote_block = "";

                    //For pushing the current_token value into the token array;
                    token.push(current_token);

                    //For clearing the current_token variable
                    current_token = "";
                }
                else {
                    //For concataning current character into the current_token variable
                    current_token += char;

                }

            }

            //If the quotation mode is disable (i.e quote_block is empty)
            else if (quote_block === "") {

                //For storing token type value before checking the current character
                let token_type_before_char = token_type;

                //If the currentr character is a quotation character (" or ' or `)
                if (is_Crnt_Char_Quot_Char) {

                    //For starting the quotation mode
                    quote_block = char;

                    //If the current_token is not empty
                    if (current_token !== "") {

                        //For pushing the current_token value into the token array;
                        token.push(current_token);

                        //For clearing the current_token variable
                        current_token = "";
                    }


                }

                //If the current character is a space or a parentheses or a semicolon or a colon or a coma or a new line character
                else if (is_Crnt_Char_Space_Char || is_Crnt_Char_Paren_Char || is_Crnt_Char_SemiCol_Char || is_Crnt_Char_Col_Char || is_Crnt_Char_Coma_Char || is_Crnt_Char_NewLine_Char) {

                    //If the current_token variable is previously set
                    if (current_token !== "") {

                        //For pushing the current_token value into the token array;
                        token.push(current_token);

                        //For clearing the current_token variable
                        current_token = "";

                        //For clearing the token_type
                        token_type = "";

                    }
                }

                //If the current character is a number character
                else if (is_Crnt_Char_Num_Char) {

                    //For storing the token type value after checking the current character
                    token_type = 'number';

                    //If the previous token type is 'name' and current token type is a 'number'
                    //thats mean actual token type should be a 'name' type.
                    //For example in the expression "var1 + 5" ; (previous) token type of
                    //character 'r' is 'name' but the (current) token type of character 1
                    //is 'number', but in this case we want to use 1 as name of the variable
                    //so we need to set the (current) token type of character 1 to 'name
                    if ((token_type_before_char === 'name') && (token_type === 'number')) {
                        token_type = 'name';
                    }

                }

                //If the current character is a alphabetic character
                else if (is_Crnt_Char_Name_Char) {

                    //For storing the token type value after checking the current character
                    token_type = 'name';

                    //If the current character is 'n' and previous character of 'n' is a number from 0-9,
                    //thats mean the current character 'n' is working as 'number' (instead of 'name')
                    if (char === 'n' && (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(expr[index_of_expr - 1]))) {
                        token_type = 'number';
                    }

                }

                //If the current character is a operator character
                else if (is_Crnt_Char_Operator_Char) {

                    //For storing the token type value after checking the current character
                    token_type = 'operator';
                };


                //If the current token type is matching with the last token type value and if the current_token variable is previously set
                if ((token_type_before_char !== token_type) && (current_token !== "")) {

                    //For pushing the current_token value into the token array;
                    token.push(current_token);

                    //For clearing the current_token variable
                    current_token = "";



                };

                //If the current character is  a space character
                if (char === " ") {
                    //Do nothing (for ignoring space character)

                }
                //For all other characters
                else {
                    //For concataning current character into the current_token variable
                    current_token += char;
                };


                //If the current character is the last character of the expression string
                if (index_of_expr === (expr.length - 1)) {

                    //If the current_token variable is previously set
                    if (current_token !== "") {

                        //For pushing the current_token value into the token array;
                        token.push(current_token);

                        //For clearing the current_token variable
                        current_token = "";

                        //For clearing the token_type
                        token_type = "";

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

    //This method will take tokenized expresion and returned refined tokenized expresion
    refine(...tokenized_expr) {

        //This variable will be used for storing refined array
        let refined_Array = [];

        //For accessing the list of available built-in functions
        let lstOfBuiltInFunc = this.func_DB_intrnl;

        //For accessing the list of available user-defined functions
        let lstOfExtrnalFunc = this.func_DB_extrnl;

        //For accessing the list of available user-defined inline functions
        let lstOfInlineFunc = this.func_DB_inline;

        //For looping through each element of the tokenized expresion array
        for (let indx_of_Token_Arry = 0; (indx_of_Token_Arry <= (tokenized_expr.length - 1)); indx_of_Token_Arry++) {


            //For getting the current element value from the tokenized expresion array
            let ele = tokenized_expr[indx_of_Token_Arry];

            //For getting the next element value (after the current element) from the tokenized expresion array
            let nxt_ele = tokenized_expr?.[indx_of_Token_Arry + 1];

            //For getting the previous element value (before the current element) from the tokenized expresion array
            let prev_ele = tokenized_expr?.[indx_of_Token_Arry - 1];


            //If the current element is a string type
            if (typeof (ele) === 'string') {


                //For ViewPoint 's function call handeling:
                //If the element value is matching with the availiable function name
                //and if the next element is a opening bracket / parentheses ("(")
                if (((ele in lstOfBuiltInFunc) || (ele in lstOfExtrnalFunc) || (ele in lstOfInlineFunc) || (ele in Math)) && (nxt_ele === "(")) {


                    //For  storing the function name
                    let funcName = ele;

                    //For incrementing index to skip the function name token and point to the next token
                    indx_of_Token_Arry = indx_of_Token_Arry + 1;

                    //Will be used for counting the matching opening and closing bracket / parentheses ("(" or ")")
                    let bracktCount = 0;

                    //Will be used for storing current function argument tokenized expresion array
                    let crntFuncArg = [];

                    //Will be used for storing all function arguments in array format
                    let funcArgArry = [];

                    //Will be used for storing the output value of a function
                    let funcOutput = 0;

                    //For looping through tokens starting right after the function name index to the end of the array
                    while (indx_of_Token_Arry <= (tokenized_expr.length - 1)) {

                        //For getting the current element value from the tokenized expresion array
                        ele = tokenized_expr[indx_of_Token_Arry];

                        //If the current element is a opening bracket / parentheses ("(")
                        if (ele === "(") {

                            //For incrementing bracktCount variable
                            bracktCount = bracktCount + 1;
                        }

                        //If the current element is a closing bracket / parentheses ("(")
                        else if (ele === ")") {

                            //For decrementing bracktCount variable
                            bracktCount = bracktCount - 1;

                            //If bracktCount variable value is 0 after checking the closing parentheses (")"), thats mean
                            //the function has now ended.
                            if (bracktCount === 0) {


                                //If crntFuncArg is empty, accessing its elements would return undefined.
                                //To avoid passing undefined into the function (which could result in NaN),
                                //we replace the empty array with [0].
                                //This ensures the function receives a default value of 0 when no arguments are provided.
                                if (crntFuncArg.length === 0) {
                                    crntFuncArg = ['0'];
                                };


                                //For storing tokenized-refined infix expresion of the crntFuncArg array into the refined_Token array
                                let refined_Token = this.refine(...crntFuncArg);

                                //For converting and storing the infix expression array to its equivalent postfix expression array
                                let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

                                //For storing the output after evaluating the postfix expression array
                                let output = this.postfix_exp_evaluator(...postFix_expr_arry);

                                //For pushing the output to the funcArgArry
                                funcArgArry.push(output)

                                //For clearing the crntFuncArg array
                                crntFuncArg = [];

                                //For stopping the while loop
                                break;

                                //Note: We have only stopped the while loop, but the main loop is still running

                            }


                        };

                        //If the bracketCount value is equal or greater than 1, thats mean we have
                        //now entered the actual function arguments position of the function
                        if (bracktCount >= 1) {

                            //If the bracktCount variable value is 1 thats mean we are at the root position of the function
                            if (bracktCount === 1) {

                                //If the current element is a coma (",") that means it is a function argument separator
                                if (ele === ",") {

                                    //If crntFuncArg array is empty then a error messaage will be thrown
                                    if (crntFuncArg.length === 0) {
                                        throw new Error(`Expected argument before the "," character in the function '${funcName}'`);
                                    }
                                    else {
                                        //For storing tokenized-refined infix expresion of the crntFuncArg array into the refined_Token array
                                        let refined_Token = this.refine(...crntFuncArg);

                                        //For converting and storing an infix expression array to its equivalent postfix expression array
                                        let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

                                        //For storing the output after evaluating a postfix expression array
                                        let output = this.postfix_exp_evaluator(...postFix_expr_arry);

                                        //For returning the calculated value to its caller
                                        funcArgArry.push(output);

                                        //For clearing the crntFuncArg array
                                        crntFuncArg = [];

                                    }
                                }

                                //When bracktCount === 1 (as per the outer if condition) and current element
                                //is "(" thats mean the function has just now started and we need to ignore
                                //this opening parentheses "("
                                else if (ele === "(") {
                                    //Do nothing
                                }

                                //For all other characters
                                else {
                                    //For pushing the current element to the crntFuncArg array
                                    crntFuncArg.push(ele);

                                }
                            }

                            //If the bracktCount variable value is greater than 1 thats mean we are inside of any
                            //expression which is inside the root function 's argument
                            else if (bracktCount > 1) {
                                //For pushing the current element to the crntFuncArg array
                                crntFuncArg.push(ele);
                            };

                        };

                        //If current element of the tokenized expresion array is the last element but bracktCount variable
                        //is still not 0, thats mean there are some missing closing parentheses (")") of the function
                        if ((indx_of_Token_Arry === (tokenized_expr.length - 1)) && (bracktCount !== 0)) {

                            //For throwing error about missing closing parentheses (")") of the function
                            throw new Error(`Missing closing parentheses (")") detected. '${funcName}' function does not en-closed properly.`)
                        }

                        //For incrementing index
                        indx_of_Token_Arry = indx_of_Token_Arry + 1;

                    }

                    //If the current function is available in the built-in functions list
                    if (funcName in lstOfBuiltInFunc) {

                        //For calling that function with all the function arguments and storing the result in the funcOutput variable
                        funcOutput = lstOfBuiltInFunc[funcName](...funcArgArry)

                    }

                    //If the current function is available in the external user-defined functions list
                    else if (funcName in lstOfExtrnalFunc) {

                        //For calling that function with all the function arguments and storing the result in the funcOutput variable
                        funcOutput = lstOfExtrnalFunc[funcName](...funcArgArry)

                    }



                    //If the current function is available in the user-defined inline functions list
                    else if (funcName in lstOfInlineFunc) {


                        //For accessing the inline function parameters from the func_DB_inline
                        let parm = lstOfInlineFunc[funcName]['param'];

                        //For accessing the inline function defination tokens from the func_DB_inline
                        let funcTkns = lstOfInlineFunc[funcName]['funcDefTkns'];

                        //Will be used for tempory storing the function defination tokens value for parameters 's substitute processing
                        let temp_funcTkns = [];

                        //This object will be used for storing the function parameters (placeholders) with restpect
                        //to the matching arguments (actual value)
                        let parmToArg = {};

                        //For looping through each element of the param in the inline function
                        for (let indx = 0; indx <= (parm.length - 1); indx++) {

                            //For accessing the value of each element in the defined function 's parameter (param)
                            let parmVal = parm[indx];

                            //If the parameter is not a 'rest' keyword
                            if (parmVal !== 'rest') {

                                //For adding function parameters with the matching arguments value to the parmToArg object
                                parmToArg[parmVal] = funcArgArry[indx]
                            }

                            else {

                                //For storing rest of the function arguments values to the parmToArg object with 'rest'
                                //parameter property.
                                //The array .slice() method is used for slicing funcArgArry because in function like
                                // 'maxPlusFirst (first, rest) = first + max(rest)'
                                // actual expression -> 'maxPlusFirst (25, 10, 20 ,30)' should be process as
                                // 'maxPlusFirst (First (i.e. 25) , rest (i.e. 10, 20 ,30 ))'. So we have to slice the
                                // function arguments array (funcArgArry) from the index where the 'rest' keyword actually
                                // start in the parameter of the in-line function defination.
                                parmToArg['rest'] = funcArgArry.slice(indx, (funcArgArry.length));

                            }
                        }

                        //If the number of provided arguments matches with the number of parameters defined in the in-line function
                        //or the in-line function defination has 'rest' keyword in its defined parameters'
                        if ((funcArgArry.length === parm.length) || (parm.includes('rest'))) {

                            //For replacing function defination tokens ('funcDefTkns') parameters 's value with its actual
                            //matching arguments value

                            //For looping through each element of funcDefTkns in the inline function
                            for (let indx = 0; indx <= (funcTkns.length - 1); indx++) {

                                //For accessing the value of the element of the funcDefTkns array
                                let funcTknVal = funcTkns[indx];

                                //If the current element value of funcDefTkns matchs with previously defined function parameter
                                if (funcTknVal in parmToArg) {

                                    //If the current element is not a 'rest' keyword
                                    if (funcTknVal !== 'rest') {

                                        //For parameters 's substitute processing:
                                        //For pushing the actual value (function 's argument) to the temp_funcTkns array
                                        temp_funcTkns.push(parmToArg[funcTknVal]);

                                    }

                                    //If the current element is a 'rest' keyword
                                    else {

                                        //For looping through each argument of the 'rest' paramater 's argument list
                                        parmToArg['rest'].forEach((crtArg, crtArgIndx) => {

                                            //For parameters 's substitute processing:
                                            //For pushing the each actual value (function 's argument) to the temp_funcTkns array
                                            temp_funcTkns.push(crtArg);


                                            //For pushing a coma (',') character in between the previously pushed rest 's argument values
                                            //except for the last one.
                                            //If the crtArgIndx is not the last element 's index 
                                            if (crtArgIndx !== ((parmToArg['rest'].length) - 1)) {

                                                //For pushing a coma (',') character in the temp_funcTkns array
                                                temp_funcTkns.push(',');

                                            }

                                        })

                                    }
                                }

                                //Otherwise push the current element value to the temp_funcTkns array
                                else {
                                    temp_funcTkns.push(funcTknVal);
                                }


                            }

                            //As we have already push all element of the funcTkns (funcDefTkns) array to the temp_funcTkns.
                            //After replacing all the function parameters with the actual function argument.
                            //We can now safely clear funcTkns for future useage
                            funcTkns = [];

                            //For storing the function defination tokens (after replacement of all prarameters
                            //value to the arguments value) to funcTkns for evaluating
                            funcTkns = temp_funcTkns;

                            console.log(funcTkns)

                            //For refining the funcTkns array and stores it back to the funcTkns array
                            funcTkns = this.refine(...funcTkns);

                            //For converting and storing the infix expression array to its equivalent postfix expression array
                            let postFix_expr_arry = this.infix_to_postfix(...funcTkns);

                            //For storing the output after evaluating a postfix expression array
                            funcOutput = this.postfix_exp_evaluator(...postFix_expr_arry);

                        }

                        //If the number of provided arguments is greater than the number of parameters defined in the in-line function.
                        //More arguments are provided than the decleared parameters number
                        //And the in-line function defination does not have 'rest' keyword in its defined parameters'
                        else if ((funcArgArry.length > parm.length) && (!parm.includes('rest'))) {
                            throw new Error(`Less arguments are expected in the '${funcName}()' function.
Total expected number of arguments is ${parm.length}, actual number of arguments received ${funcArgArry.length}.`);

                        }

                        //If the number of provided arguments is less than the number of parameters defined in the in-line function.
                        //Less arguments are provided than the decleared parameters number
                        //And the in-line function defination does not have 'rest' keyword in its defined parameters'
                        else if ((funcArgArry.length < parm.length) && (!parm.includes('rest'))) {
                            throw new Error(`More arguments are expected in the '${funcName}()' function.
Total expected number of arguments is ${parm.length}, actual number of arguments received ${funcArgArry.length}.`);

                        }

                    }

                    //If the current function is available in JavaScript 's Math object 's method list
                    else if (funcName in Math) {

                        //For calling that function with all the function arguments and storing the result in the funcOutput variable
                        funcOutput = Math[funcName](...funcArgArry)

                    }

                    //If the current function is not available in the both internal and the external functions list
                    else {

                        let msg = `The '${funcName}()' function is not found in the internal or external functions list. To use #${funcName}() function you need to define it first`;

                        //For throwing error message regarding unavailability of the current function
                        throw new Error(msg);
                    }


                    //For pushing the function output value to the refined_Array
                    refined_Array.push(funcOutput);


                }

                //For ViewPoint 's in-line function assignment keyword ('func') handeling:
                //If the current element is 'funcs keyword
                else if (ele === 'func') {

                    //For incrementing index to skip the 'func' keyword token and point to the next token
                    //(i.e. the function name 's token)
                    indx_of_Token_Arry = indx_of_Token_Arry + 1;

                    //For storing the currently pointed token value (i.e. the function name value)
                    let funcName = nxt_ele;

                    //If the function name is undefined thats mean the currently pointed element is not availiable
                    if (funcName === undefined) {
                        //For throwing the error message regading unexpected end of input
                        throw new Error('Unexpected end of input. "func" keyword needs function name')
                    }

                    //Will be used for counting the matching opening and closing bracket / parentheses ("(" or ")")
                    let bracktCount = 0;

                    //Will be used for storing current function parameter
                    let crntFuncParm = [];

                    //Will be used for storing all function parameters in array format
                    let funcParmArry = [];

                    //Will be used for storing function 's actual expression tokens
                    let funcExprArry = [];


                    //For getting the function parameter list
                    //For looping through tokens starting right after the function name index to the end of the array
                    //This loop will be broken when function parameter defination ends (e.g. in 'f(x,y) = x + y , loop
                    //will be broken when encounter the last ")")
                    while (indx_of_Token_Arry <= (tokenized_expr.length - 1)) {

                        //For getting the current element value from the tokenized expresion array
                        ele = tokenized_expr[indx_of_Token_Arry];

                        //If the current element is a opening bracket / parentheses ("(")
                        if (ele === "(") {

                            //For incrementing bracktCount variable
                            bracktCount = bracktCount + 1;
                        }

                        //If the current element is a closing bracket / parentheses ("(")
                        else if (ele === ")") {

                            //For decrementing bracktCount variable
                            bracktCount = bracktCount - 1;

                            //If bracktCount variable value is 0 after checking the closing parentheses (")"), thats mean
                            //the function has now ended.
                            if (bracktCount === 0) {


                                //For converting and storing the raw crntFuncParm (infix) expression array to its
                                //equivalent postfix expression array. This process will clean any unnecessery brackets
                                //from the parameter (e.g. in 'f( x, ((y)), z)' -> processing of '((y))' will become -> 'y')
                                let postFix_expr_arry = this.infix_to_postfix(...crntFuncParm);

                                //If postFix_expr_arry 's length is more than 1 thats mean the current function parameter had
                                //multiple tokens
                                if (postFix_expr_arry.length > 1) {

                                    //For throwing error regarding multiple tokens detected 
                                    throw new Error(`Multiple tokens detected in ${funcName} function 's parameter`);
                                }
                                else if (postFix_expr_arry.length === 1) {

                                    //For pushing the first and only element (unnecessery brackets less parameter) to the funcParmArry
                                    funcParmArry.push(postFix_expr_arry[0]);

                                    //For clearing crntFuncParm array
                                    crntFuncParm = [];
                                };

                                //For incrementing the index and pointing to the next token
                                indx_of_Token_Arry = indx_of_Token_Arry + 1;

                                //For getting the current element value from the tokenized expresion array
                                ele = tokenized_expr[indx_of_Token_Arry];

                                //For stopping the while loop
                                break

                                //Note: We have only stopped this while loop


                            }

                        };

                        //If the bracketCount value is equal or greater than 1, thats mean we have
                        //now entered the actual function defenation 's parasmeter position of the function
                        if (bracktCount >= 1) {

                            //If the bracktCount variable value is 1 thats mean we are at the root position of the function
                            if (bracktCount === 1) {

                                //When bracktCount === 1 (as per the outer if condition) and current element
                                //is "(" thats mean the function has just now started and we need to ignore
                                //this opening parentheses "("
                                if (ele === "(") {
                                    //Do nothing
                                }
                                //If the current element is a coma (",") that means it is a function parameter separator
                                else if (ele === ",") {

                                    //If crntFuncParm array is empty then a error messaage will be thrown
                                    if (crntFuncParm.length === 0) {
                                        throw new Error(`Expected parameter before the "," character in the function '${funcName}'`);
                                    }
                                    else {
                                        //For converting and storing the raw crntFuncParm (infix) expression array to its
                                        //equivalent postfix expression array. This process will clean any unnecessery brackets
                                        //from the parameter (e.g. in 'f( x, ((y)), z)' -> processing of '((y))' will become -> 'y')
                                        let postFix_expr_arry = this.infix_to_postfix(...crntFuncParm);

                                        //If postFix_expr_arry 's length is more than 1 thats mean the current function parameter had
                                        //multiple tokens
                                        if (postFix_expr_arry.length > 1) {

                                            //For throwing error regarding multiple tokens detected 
                                            throw new Error(`Multiple tokens detected in ${funcName} function 's parameter`);
                                        }
                                        else if (postFix_expr_arry.length === 1) {

                                            //For pushing the first and only element (unnecessery brackets less parameter) to the funcParmArry
                                            funcParmArry.push(postFix_expr_arry[0]);

                                            //For clearing crntFuncParm array
                                            crntFuncParm = [];
                                        };


                                    }
                                }


                                //For any other element (other than opening parentheses "(")
                                else {
                                    //For pushing the current element to the crntFuncParm
                                    crntFuncParm.push(ele);
                                }

                            }

                            //If the bracktCount variable value is  greater than 1
                            else {
                                //For pushing the current element to the crntFuncParm
                                crntFuncParm.push(ele);
                            }
                        }



                        //For incrementing the index and pointing to the next token
                        indx_of_Token_Arry = indx_of_Token_Arry + 1;

                    };

                    //If the assignment operator is missing
                    if (ele !== '=') {
                        //Throws an error regarding the missing assignment operator ('=')
                        throw new Error(`Expected assignment operator ('=') after the '${funcName}(${funcParmArry})'`)
                    };

                    //For pointing to the next token (i.e. function expression starting point)
                    indx_of_Token_Arry = indx_of_Token_Arry + 1;

                    //For getting the function expression
                    //For looping through each element from the index point of '=' character to the last character point
                    //of the expression. This loop will be broken when the last character or new line character ('\n' or '\r')
                    //or a semicolon (';') is found
                    while (indx_of_Token_Arry <= (tokenized_expr.length - 1)) {

                        //For getting the current element value from the tokenized expresion array
                        ele = tokenized_expr[indx_of_Token_Arry];

                        //If the current character is a new line character ('\n' , '\r') or a semicolon (';') character
                        if (['\n', '\r', ';'].includes(ele)) {

                            //For stopping this while loop
                            break;
                        }

                        //For implementing comment ("//") operator
                        else if (ele === '//') {
                            //For incrementing index to skip the comment ("//") operator token and point to the next token
                            indx_of_Token_Arry = indx_of_Token_Arry + 1;

                            //For looping through tokens starting right after the comment ("//") operator index to the end
                            //of the array expression
                            while (indx_of_Token_Arry <= (tokenized_expr.length - 1)) {

                                //For getting the current element value from the tokenized expresion array
                                ele = tokenized_expr[indx_of_Token_Arry];

                                //If the current element is the new line or a semicolon character (":") or the the current
                                //element is the last element of the tokenized_expr array
                                if (['\n', '\r', ';'].includes(ele) || (indx_of_Token_Arry === tokenized_expr.length - 1)) {


                                    //For stopping this while loop
                                    break;

                                    //Note: We have only stopped the while loop, but the main loop is still running
                                }
                                //For all other characters / tokens (after the comment ('//') operator)
                                else {
                                    //For ignoring the rest of the tokens
                                    //Do nothing

                                }

                                //For incrementing index
                                indx_of_Token_Arry = indx_of_Token_Arry + 1;
                            }
                        }

                        //For all other characters
                        else {
                            //For pushing the current element to the funcExprArry
                            funcExprArry.push(ele);
                        }

                        //For pointing to the next token
                        indx_of_Token_Arry = indx_of_Token_Arry + 1;
                    };

                    //For registering the in-line function to the func_DB_inline object
                    this.func_DB_inline[funcName] = {
                        "param": funcParmArry,
                        "funcDefTkns": funcExprArry
                    }


                    //For providing feedback that the inline-function was registered
                    refined_Array.push(`The '${funcName}(${funcParmArry})' was registered.`);


                }

                //For implementing unary minus ('-xxx', unary minus ('-')) or unary plus ('+xxx', unary plus ('+')) operator

                //For handling unary '+' or '-' at the start of the expression or after '(' or after
                //any basic math operator (i.e. '^', '**', '*', '/', '%', '+', '-' )
                else if ((ele === '-' || ele === '+') && ((prev_ele === '(') || (prev_ele === undefined) || (['^', '**', '*', '/', '%', '+', '-'].includes(prev_ele)))) {

                    //For unary minus (-)
                    if (ele === '-') {

                        //For pushing the negetive one (-1) value to the refined_Array
                        refined_Array.push(-1);

                        //For pushing the higher precedence multipication operator ('×') (more precedence even than
                        //the power operator ('^' or '**')) to the refined_Array
                        refined_Array.push('×');

                    }

                    //For unary plus (+)
                    else if (ele === '+') {

                        //For ignoring the unary plus (operator)
                        //Do nothing
                    }

                }

                //For handeling unary '+' or '-' reside after (concatinated with) the basic math operator in the current element
                //(i.e. '^-', '**-', '*-', '/-', '%-', '+-', '--' or '^+', '**+', '*+', '/+', '%+', '++', '-+' )
                else if (['^-', '**-', '*-', '/-', '%-', '+-', '--', '^+', '**+', '*+', '/+', '%+', '++', '-+'].includes(ele)) {

                    //For unary minus (-)
                    if (['^-', '*-', '/-', '%-', '+-', '--'].includes(ele)) {

                        //For pushing the only 1st operator character in the refined_Array
                        //(e.g. if the current character is '*-' ,then push '*' in the refined_Array)
                        refined_Array.push(ele[0]);

                        //For pushing the negetive one (-1) value to the refined_Array
                        refined_Array.push(-1);

                        //For pushing the higher precedence multipication operator ('×') (more precedence even than
                        //the power operator ('^' or '**')) to the refined_Array
                        refined_Array.push('×');
                    }
                    else if (ele === '**-') {

                        //For pushing the only 1st two operator character (i.e. '**') in the refined_Array
                        refined_Array.push(ele.slice(0, 2));

                        //For pushing the negetive one (-1) value to the refined_Array
                        refined_Array.push(-1);

                        //For pushing the higher precedence multipication operator ('×') (more precedence even than
                        //the power operator ('^' or '**')) to the refined_Array
                        refined_Array.push('×');
                    }


                    //For unary minus (+)
                    else if (['^+', '*+', '/+', '%+', '++', '-+'].includes(ele)) {

                        //For pushing the only 1st operator character in the refined_Array
                        //(e.g. if the current character is '*+' ,then push '*' in the refined_Array)
                        refined_Array.push(ele[0]);
                    }
                    else if (ele === '**+') {

                        //For pushing the only 1st two operator character (i.e. '**') in the refined_Array
                        refined_Array.push(ele.slice(0, 2));

                    }
                }

                //For implementing unary not (!) operator
                else if (ele === '!') {

                    //If the next element is 'false'
                    if (nxt_ele === 'false') {

                        //For pushing the inverted value of false (i.e. true)
                        refined_Array.push(true);
                    }

                    //If the next element is 'true'
                    else if (nxt_ele === 'true') {
                        //For pushing the inverted value of true (i.e. false)
                        refined_Array.push(false)
                    }

                    //If the next token is neither 'true' nor 'false'.
                    //Note: In here the not function call ('!(...)') ('!' with next element of '(')
                    //can not be existed as functions calls handeling implementation are top of the if-else
                    //ladder in this refine method.
                    else {
                        //For throwing the error message
                        throw new Error(`Data Type Error: '!' operator can only be used with boolean values`)
                    }
                }

                //For implementing ternary ( (condition) ? (value if true) :(value if false) )operator
                else if (ele === '?') {

                    //For getting the index value of the question mark character ('?')
                    let indxOfQuesMrk = indx_of_Token_Arry;

                    //Will be used for storing the index point of the ternary 's condition starting index
                    let indxOfCondiStart = 0;

                    //Will be used for storing the condition part of the ternary operation in an array format
                    let tenaryCond = [];

                    //Will be used for storing the ternary 's condition part evalutation result
                    let tenaryCondResult = false;

                    //Will be used for storing ternary expression evalutation result
                    let tenaryExprOutput = '';

                    //For getting the condition part of the ternary operation
                    //For looping from the index position of the question mark ('?') character toward the beginning of the expression
                    //This loop will be broken once the ternary 's condition part is identified
                    for (let indxForCondi = indxOfQuesMrk; indxForCondi >= 0; indxForCondi = (indxForCondi - 1)) {

                        //For getting the current character value from the tokenized expresion array
                        let crntValue = tokenized_expr[indxForCondi];


                        //For ignoring ternary 's question mark ('?') character
                        if (crntValue === '?') {
                            //Do nothing
                        }

                        //If the current character is a new line character ('\n' or '\r') or a semicolon character (';')
                        else if (crntValue === '\n' || crntValue === '\r' || crntValue === ';') {
                            //For getting and storing the index just before the current character 's index (index before
                            //the new line character ('\n' or '\r') or a semicolon character (';')) 
                            indxOfCondiStart = indxForCondi + 1;

                            //For stoping the for loop
                            break;
                        }

                        //If the current character is the first character
                        else if (indxForCondi === 0) {
                            //For storing 0 as the ternary 's condition starting index position
                            indxOfCondiStart = 0;

                            //For stoping the for loop
                            break;
                        }

                        //If the current character is a assignment character
                        else if (['=', '+=', '-=', '*=', '/='].includes(crntValue)) {

                            //For getting and storing the index just before the assignment character 's index (index before
                            //the '=', '+=', '-=', '*=', '/=' character) 
                            indxOfCondiStart = indxForCondi + 1;

                            //For stoping the for loop
                            break;

                        }


                    }


                    //For storing the ternary 's condition part by slicing the tokenized_expr array from the index of ternary 's
                    //condition starting index (included) to the index of ternary 's question mark ('?') 's index (excluded)
                    tenaryCond = tokenized_expr.slice(indxOfCondiStart, indxOfQuesMrk)


                    //For storing tokenized-refined infix expresion of the tenaryCond array into the refined_Token array
                    let refined_Token = this.refine(...tenaryCond);


                    //For converting and storing the infix expression array to its equivalent postfix expression array
                    let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

                    //For storing the output (ternary 's condition evalutation result) after evaluating the postfix expression array
                    tenaryCondResult = this.postfix_exp_evaluator(...postFix_expr_arry);



                    //For getting the ternary operation 's 'value if true' and ' value if false' 's part (part from the '?' to ':'
                    //and part from ':' to end of the expression):

                    //Will be used for storing the ternary operation 's 'value if true' expression in array format
                    let ter_valIfTrue = [];

                    //Will be used for storing the ternary operation 's 'value if false' expression in array format
                    let ter_valIfFalse = [];

                    //Will be used for identifying if the current token is part of ternary operation 's 'value if true' or 'value if false'
                    let isPartOfTrueVal = true;

                    //For incrementing index to skip the '?' character token and point to the next token
                    indx_of_Token_Arry = indx_of_Token_Arry + 1;

                    //Will be used for counting the matching "?" and ":" pairs
                    let ter_Count = 1;


                    //For looping through tokens starting right after '?' character index to the end of the array
                    while (indx_of_Token_Arry <= (tokenized_expr.length - 1)) {


                        //For getting the current element value from the tokenized expresion array
                        ele = tokenized_expr[indx_of_Token_Arry];

                        //If the current element is a ternary "?" character
                        if (ele === "?") {

                            //For incrementing ter_Count variable
                            ter_Count = ter_Count + 1;
                        }

                        //If the current element is a ternary ":" character
                        else if (ele === ":") {

                            //For decrementing ter_Count variable
                            ter_Count = ter_Count - 1;

                            //If the ter_Count variable becomes 0 (after encountering ":" element (as per the outer
                            //if condition))
                            if (ter_Count === 0) {
                                //For setting the 'isPartOfTrueVal' variable to false
                                //So in the next iteration elements will be pushed to the 'ter_valIfFalse' array
                                isPartOfTrueVal = false;
                            }
                        };


                        //If the current element is the new line or a semicolon character (";")
                        if (ele === '\n' || ele === '\r' || ele === ';') {

                            //For stopping this while loop
                            break;
                        };



                        //If the 'isPartOfTrueVal' variable is true
                        if (isPartOfTrueVal === true) {
                            //For pushing the current element value to the ter_valIfTrue array
                            ter_valIfTrue.push(ele);
                        }
                        //If the 'isPartOfTrueVal' variable is false
                        else if (isPartOfTrueVal === false) {

                            //If the current character is a ":" character and 'ter_valIfFalse' array is not set
                            //(i.e. 'ter_valIfFalse' array's length is 0). Thats mean the current ":" character
                            //is used as value seperator between ternary 's true and false value
                            if ((ele === ":") && (ter_valIfFalse.length === 0)) {
                                //Do nothing
                            }
                            //For all other case and characters
                            else {
                                //For pushing the current element value to the ter_valIfFalse array
                                ter_valIfFalse.push(ele);
                            }
                        }


                        //For incrementing index
                        indx_of_Token_Arry = indx_of_Token_Arry + 1;
                    }

                    //If the ternary 's condition part is true
                    if (tenaryCondResult === true) {
                        //For storing tokenized-refined infix expresion of the ter_valIfTrue array into the refined_Token array
                        let refined_Token = this.refine(...ter_valIfTrue);

                        //For converting and storing the infix expression array to its equivalent postfix expression array
                        let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

                        //For storing the output (ternary expression evalutation result) after evaluating the postfix expression array
                        tenaryExprOutput = this.postfix_exp_evaluator(...postFix_expr_arry);
                    }
                    //If the ternary 's condition part is false
                    else if (tenaryCondResult === false) {
                        //For storing tokenized-refined infix expresion of the ter_valIfFalse array into the refined_Token array
                        let refined_Token = this.refine(...ter_valIfFalse);

                        //For converting and storing the infix expression array to its equivalent postfix expression array
                        let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

                        //For storing the output (ternary expression evalutation result) after evaluating the postfix expression array
                        tenaryExprOutput = this.postfix_exp_evaluator(...postFix_expr_arry);
                    }


                    //For modifying the refined_Array from the ternary 's condition starting index point ('indxOfCondiStart') by removing
                    //of the elements (from the index of 'indxOfCondiStart' to the end of the refined array) and adding the ternary
                    //expression evalutation result (value of 'tenaryExprOutput') at the end of the refined array.
                    refined_Array.splice(indxOfCondiStart, (refined_Array.length - indxOfCondiStart), tenaryExprOutput);


                }

                //For implementing comment ("//") operator
                else if (ele === '//') {

                    //For stopping the loop
                    break
                }

                //For implementing variable clear keyword ('clr')
                else if (ele === 'clr') {

                    //For clearing the given variable by its name (name is on the next element)
                    this.varClr(nxt_ele);

                    //For pushing the feedback about that the variable is cleared
                    refined_Array.push(`Variable '${nxt_ele}' is cleared`)

                    //For stopping the loop
                    break;

                }
                //For implementing function clear keyword ('clrFn')
                else if (ele === 'clrFn') {

                    //For clearing the given function by its name (name is on the next element)
                    this.funcClr(nxt_ele);

                    //For pushing the feedback that the the function is cleared
                    refined_Array.push(`Function '${nxt_ele}' is cleared`)

                    //For stopping the loop
                    break;

                }

                //For implementing 'clean' keyword
                else if (ele === 'clean') {

                    //For clearing all variables and user-defined functions from the ViewPoint
                    this.clean();

                    //For stopping the loop
                    break;
                }

                //For all others types of elements
                else {

                    //For converting string representation of the data types to its actual JavaScript data type and storing that to the current_token
                    // (e.g. "4525" -> 4525 ; "'sample string'" -> 'sample string' ; 'true' -> true)
                    ele = this.string_to_js_data_types(ele, nxt_ele, prev_ele);

                    //For storing the current element to the refined_Array
                    refined_Array.push(ele);

                }
            }

            //If the current element is not a string type
            else {
                //Push the current element to the refined_Array
                refined_Array.push(ele)
            }


        }
        //For returning refined_Array
        return refined_Array;


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

            //For testing if the current element is a operator or not and storing the result
            let isOperator = (this.ViewPoint_math_def.operator_def.operators.includes(token_value));

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

        //For accessing ViewPoint 's math definations
        let math_def = this.ViewPoint_math_def;

        //For looping through each element index of the postfix expression array
        for (let ele_index = 0; ele_index <= (postfix_expr.length - 1); ele_index++) {

            //For getting the current element value of the postfix expression array using its index value
            let ele_value = postfix_expr[ele_index];


            //For testing if the current element is a operator or not and storing the result
            let isOperator = (math_def.operator_def.operators.includes(ele_value));


            //For throwing error for unknown operator
            //If the current element is not a operator but the current element starts with a operator character
            if ((isOperator === false) && (math_def.character_def.getCharType(ele_value[0]) === 'operator')) {

                //For throwing error message for unkown operator
                throw new Error(`Unkown Operator: ${ele_value} is found in the expression`);
            }


            //For testing if the current element is a operand or not and storing the result
            let isOperand = (!(isOperator));


            //If the current element of the postfix expression array is a operand (e.g. 5, 6, 7 etc...):
            if (isOperand) {

                //Push the current element to the expression stack
                expr_stack.push(ele_value);

            }
            //If the current element of the postfix expression array is a operator (e.g. '^','*','/','+','-'):
            else if (isOperator) {

                //Pop the value from the top of the expression stack and store it as the second operand
                let secnd_value = expr_stack.pop();

                //Pop the value from top of the expression stack, and store it as the first operand
                let frst_value = expr_stack.pop();

                //If the second value or the first value is undefined, thats mean the expression is invalid
                //and likely contains a missing operand(s)
                if ((secnd_value === undefined) || (frst_value === undefined)) {
                    //For throwing the error regarding invalid expression
                    throw new Error(`Invalid expression: Missing operands detected in the expression`);
                }

                //For exponential / power operator (^) or (**)
                if (ele_value === '^' || ele_value === "**") {

                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.exponents(frst_value, secnd_value));
                }
                //For multiplication operator (*) or a higher precedence multiplication operator
                //(×) (used for implementing unary minus)
                else if ((ele_value === '*') || (ele_value === '×')) {
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

                //For Less than operator (<)
                else if (ele_value === '<') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.isLessThan(frst_value, secnd_value));
                }

                //For Greater than operator (>)
                else if (ele_value === '>') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.isGreatThan(frst_value, secnd_value));
                }

                //For Less than or Equal operator (<=)
                else if (ele_value === '<=') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.isLessThanEq(frst_value, secnd_value));
                }

                //For Greater than or Equal operator (>=)
                else if (ele_value === '>=') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.isGreatThanEq(frst_value, secnd_value));
                }

                //For Equal operator (==)
                else if (ele_value === '==') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.isEqual(frst_value, secnd_value));
                }

                //For Not Equal operator (!=)
                else if (ele_value === '!=') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.isNotEqual(frst_value, secnd_value));
                }

                //For Bit Wise And operator (&)
                else if (ele_value === '&') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.bitWiseAnd(frst_value, secnd_value));
                }

                //For Bit Wise Or operator (|)
                else if (ele_value === '|') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.bitWiseOr(frst_value, secnd_value));
                }

                //For Logical And operator (&&)
                else if (ele_value === '&&') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.logicalAnd(frst_value, secnd_value));
                }

                //For Logical Or operator (||)
                else if (ele_value === '||') {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.logicalOr(frst_value, secnd_value));
                }

                //For assignment operators ('=', '+=', '-=', '*=', '/=')
                else if (['=', '+=', '-=', '*=', '/='].includes(ele_value)) {
                    //For pushing the calculation value on to the top of the expression stack
                    expr_stack.push(math_def.assign(frst_value, secnd_value, ele_value));
                }

                //For new line ('\n' , '\r') or semicolon operator (';')
                else if (ele_value === '\n' || ele_value === '\r' || ele_value === ';') {
                    expr_stack.push(math_def.newLine(frst_value, secnd_value));
                }

            }

        }

        //If exactly one value remains on the stack, thats mean the expression was evaluated successfully
        if (expr_stack.length === 1) {

            //For poping the value from the expression array and storing it into the output variable
            let output = expr_stack.pop();

            //For returning the output value
            return output;
        }
        //If there is more than one element in the expr_stack array, thats mean the expression was
        //invalid and likely contains a missing operator
        else if ((expr_stack.length) > 1) {

            //For throwing the error regarding missing operator
            throw new Error(`Invalid expression: Missing operator detected in the expression`);
        }

    }

    //This method evaluates a mathematical expression represented as a string and returns the calculated result
    evaluate(expression_Str) {

        //Input must be a string type.
        if (typeof (expression_Str) === 'string') {

            //For storing tokenized infix expresion into token array
            let token = this.tokenize(expression_Str);

            //For storing tokenized-refined infix expresion into token array
            let refined_Token = this.refine(...token);

            //For converting and storing an infix expression array to its equivalent postfix expression array
            let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

            //For storing the output after evaluating a postfix expression array
            let output = this.postfix_exp_evaluator(...postFix_expr_arry);

            //If the output is not defined
            if (output === undefined) {
                //For setting the output variable to blank string
                output = '';
            };

            //For returning the calculated value to its caller
            return output;

        }
        else {
            throw new Error('Expression must be a string');
        }
    }

    //This method interprets and executes one or more expressions/statements represented as a string and returns
    //the calculated results as an array format
    interpret(expression_Str) {

        //Input must be a string type.
        if (typeof (expression_Str) === 'string') {

            //For storing tokenized infix expresion into token array
            let token = this.tokenize(expression_Str);

            //Will be used for temporary storing the token array 's elements before evaluating
            let tmp_Token_Arry = [];

            //Will be used for storing the outputs in array format
            let output_Arry = [];

            //Will be used for storing the current line number of the expression (which line number is currently being evaluating)
            let lineCount = 0;

            //For looping through each index of the token array
            for (let indx_of_refnd_tkn_arr = 0; indx_of_refnd_tkn_arr <= (token.length - 1); indx_of_refnd_tkn_arr++) {

                //For getting the current element 's value and store it into the ele_val variable
                let ele_val = token[indx_of_refnd_tkn_arr];

                //If the current token element is a new line characters ('\n', '\r') or a semicolon (';') or last element of
                //the token array
                if (['\n', '\r', ';'].includes(ele_val) || indx_of_refnd_tkn_arr === (token.length - 1)) {

                    //If the token element is the last element of the token array
                    if (indx_of_refnd_tkn_arr === (token.length - 1)) {

                        //If the current last element is a new line characters ('\n', '\r') or a semicolon (';')
                        if ((ele_val === '\n') || (ele_val === '\r') || (ele_val === ';')) {

                            //Do nothing
                        }
                        else {
                            //For pushing the current last token element to the tmp_Token_Arry
                            tmp_Token_Arry.push(ele_val);
                        }
                    }

                    //For incrementing the current line counter (lineCount variable) (before evaluating)
                    lineCount = lineCount + 1;

                    //If the tmp_Token_Arry is previously set
                    if (tmp_Token_Arry.length !== 0) {

                        //Try to evaluating the expression
                        try {

                            //For evaluating temporary stored tokens (i.e. for evaluting tmp_Token_Arry):

                            //For refining temporary stored infix expression tokens (tmp_Token_Arry) into the
                            //refined_Token array (still in infix expression form)
                            let refined_Token = this.refine(...tmp_Token_Arry);

                            //For converting and storing the infix expression array to its equivalent postfix expression array
                            let postFix_expr_arry = this.infix_to_postfix(...refined_Token);

                            //For storing the output after evaluating a postfix expression array
                            let output = this.postfix_exp_evaluator(...postFix_expr_arry);

                            //If the output is not defined
                            if (output === undefined) {
                                //For setting the output variable to blank string
                                output = '';
                            };

                            //For pushing the evaluated result (output) value to the output_Arry
                            output_Arry.push(output);

                            //For clearing the tmp_Token_Arry
                            tmp_Token_Arry = [];
                        }
                        //Catch the error (if any error occured)
                        catch (error) {
                            throw new Error(`${error}
Error in line number: ${lineCount}`)

                        }

                    }
                    else {
                        //Do nothing
                    }
                }
                else {
                    //For pushing the current token element to the tmp_Token_Arry
                    tmp_Token_Arry.push(ele_val);
                }

            }


            return output_Arry;




        }
        else {
            throw new Error('Expression must be a string');
        }
    }

}









