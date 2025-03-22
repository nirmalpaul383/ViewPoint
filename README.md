# ViewPoint
ViewPoint is a math expression parser and evaluator with the support of runtime data-type checking written in vanila JS. It allows you to evaluate mathematical expressions with ease while ensuring the correctness of the input data.

## Features
1. **<ins>Expression Evaluation:</ins>**
     - <ins>Parses and evaluates</ins> mathematical expressions like '5*52+285/2'
     - Supports basic <ins>arithmetic operators</ins> (+, -, \*, /,^, %) [Note: here % is implemented as modules / reminder operator]
     - Supports <ins>nested expressions</ins> with parentheses (e.g. (36/2)-4)
     - Allows complex expressions with <ins>multiple levels of nesting </ins>  (e.g (52/8+2)+56*((25/2)*4+(8-2))
     - Supports <ins>multiple datatypes</ins> e.g expressions with decimal / floating points numbers, BigInt, String, and Boolean datatype
2. **<ins>Expression Tokenization:</ins>**
     - It can tokenize a mathematical expression into individual tokens and can returns <ins> tokenized expression as an array</ins> (e.g expression = "5 + 7*2+(85^2+1)", token = [5,'+',7,'*',2,'+','(',85,'^',2,'+',1,')'])
3. **<ins>Infix to Postfix Conversion:</ins>**
     - It can convert <ins>infix expressions to postfix notation</ins> and return as an array
4.  **<ins>JavaScript Variable Support:</ins>**
     - ViewPoint supports using of <ins> JavaScript variables </ins> in an expressions using ```${}``` and backticks (``` ` ```)
5. **<ins>External Variable Support:</ins>**
     - Allows users to <ins>define external variables</ins> using the ```.var()``` method
6. **<ins>Operator Order Control:</ins>**
     - <ins>Follows PEMDAS</ins> (Parentheses, Exponents, Multiplication and Division, and Addition and Subtraction) order of operations by default
     - Allows users to define their <ins>own custom order of operations</ins> (if needed)
7. **<ins>Customizable Operator Behavior:</ins>**
     - Allows users to <ins>re-define the math operator (e.g. '*' or '%') behavior</ins> to suit specific requirements (if needed)
  
## How to include this library in your project?
To use this evaluator/library, firstly, you need to link **ViewPoint.js** to your project. You can do that by using two ways:
1. **Download/Clone and Use:** Download or clone the repository and use the **ViewPoint.js** file in your project.
2. **Use via CDN:** Use the library directly via CDN using the following script tag: ```https://cdn.jsdelivr.net/gh/nirmalpaul383/ViewPoint/ViewPoint.js```

## How to use this library?
### After including this library, you will need to:
+ **<ins>create a ViewPoint object </ins> using ` new ViewPoint() ` keywords:**
```JavaScript
//Create a new ViewPoint object with ViewPoint class
let ViewPoint_obj = new ViewPoint();
```
+ **<ins>Store your expression in string format:</ins>**
```JavaScript
////Sample Expression
const expresion = `((52/8+2)+56*((25/2)*4+(8-2)))*2`;
```
+ **<ins>For evaluating an expression use ```.evaluate()``` method:</ins>**
```JavaScript
//Expression evaluating
let output = ViewPoint_obj.evaluate(expresion);

//For output
console.log(output); //Output 6289 to the console
```
## Other usages and methods
+ ### Expression Tokenization using ```.tokenize()``` method
```Javascript
//Create a new ViewPoint object with the viewpoint class
let ViewPoint_obj = new ViewPoint();

//Sample expression with number, operators, BigInt, parentheses, floating point number, quoted text, and white space 
const expresion = `2 / 5.04 +5n +"Sample quoted text"  + (40*(45-2))`;

//For tokenization of expression and storing into the token array
let token_array = ViewPoint_obj.tokenize(expresion)

//For output the token array into the console
console.log(token_array)
/*
[ 2, '/', 5.04, '+', 5n, '+', 'Sample quoted text', '+', '(', 40, '\*', '(', 45, '-', 2, ')', ')' ]
*/
```
+ ### Infix to Postfix Conversion using ```.infix_to_postfix()``` method
```javascript
//Create a new ViewPoint object with viewpoint class
let VP = new ViewPoint();

//Sample expression 
const expresion = `4+8*(5-1)`;

//For tokenization of expression and storing into the token array
let token_array = VP.tokenize(expresion)

//For converting an infix expression array to its equivalent postfix expression array and storing into the postfix array
let postFix_Array = VP.infix_to_postfix(...token_array)

//For output the postfix expression array into the console
console.log(postFix_Array) //Output: [ 4, 8, 5, 1, '-', '*', '+' ]

```
+ ### Using JavaScript variable directly in the expression using ```${}``` and ``` ` ```
```javascript
//Create a new ViewPoint object with the ViewPoint class
let VP = new ViewPoint();

//Sample JavaScript variable
let a = 5;

//Sample expression with JavaScript variable
const expresion = `35 +(${a}*9)*2`;

//Expression evaluating and storing the result into the output variable
let output = VP.evaluate(expresion);

//For output the result
console.log(output); //Output: 125
```
+ ### Using an external variable in the expression using ```.var(name,value)``` method
```javascript
//Create a new ViewPoint object with viewpoint class
let ViewPoint_obj = new ViewPoint();

//Defining external variable with the name of "myVar"
ViewPoint_obj.var("myVar", 400);

//Sample expression with JavaScript variable
const expresion = `35 *100 -myVar`;

//Expression evaluating and storing the result into the output variable
let output = ViewPoint_obj.evaluate(expresion);

//For output the result
console.log(output); //Output: 3100
```
+ ### Changing the default operator precedence  using ```.ViewPoint_math_def.operator_precedence``` property
```javascript
//Create a new ViewPoint object with viewpoint class
let ViewPoint_obj = new ViewPoint();

//Sample expression
const expresion = `4*2+1`;

//Expression evaluating with default operator precedence
let output = ViewPoint_obj.evaluate(expresion);

//Changing the default operator_precedence in the ViewPoint Obejct
//promote '+' and '-' operator to highest precedence
ViewPoint_obj.ViewPoint_math_def.operator_precedence = {
    '^': 1,
    '*': 1,
    '/': 1,
    '%': 1, 
    '+': 2,
    '-': 2,
}

//Expression re-evaluating
let output2 = ViewPoint_obj.evaluate(expresion);

//For output the actual result
console.log(output); //Output: 9 (First * then +)

//For output the re-evaluating result (after changing the default operator_precedence)
console.log(output2); //Output: 12 (First + then *)
```
+ ### Changing the default behavior of a operator using ```.ViewPoint_math_def.<method_name>```
```javascript
//Create a new ViewPoint object with viewpoint class
let ViewPoint_obj = new ViewPoint();

//Sample expression
const expresion = `4*2`;

//Expression evaluating with default operator behavior
let output = ViewPoint_obj.evaluate(expresion);

//Override default behavior of multiplication ('*') operator in the ViewPoint object and redefine * operator to behave like '+' (addition) operator
ViewPoint_obj.ViewPoint_math_def.multiplication = function (val1, val2) {
    return val1 + val2;
}
//Expression re-evaluating
let output2 = ViewPoint_obj.evaluate(expresion);

//For output the actual result
console.log(output); //Output: 8 (multiplication ('*') operator works as multiplication)

//For output the re-evaluating result (multiplication ('*') operator works as addition ('+'))
console.log(output2); //Output: 6
```
## ```ViewPoint_math_def```:
This object is used for defining of some basic math logic and math operations for ViewPoint
|  Name | Type | Details |
| - | - |- |
|**operator_precedence**|**Object**|This object contains operator's precedence value according to the BODMAS or PEMDAS rule|
|**exponents(value1, value2)**|**Method**|Definition of Power(^) operator Behavior|
|**multiplication(value1, value2)**|**Method**|Definition of Multiplication(*) operator Behavior|
|**division(value1, value2)**|**Method**|Definition of Division(/) operator Behavior|
|**modulus(value1, value2)**|**Method**|Definition of Modulus(%) operator Behavior|
|**addition(value1, value2)**|**Method**|Definition of Addition(+) operator Behavior|
|**subtraction(value1, value2)**|**Method**|Definition of Subtraction(-) operator Behavior|


## Thanks
If you like this project please give a star to [this project](https://github.com/nirmalpaul383/ViewPoint) . This project is originally made by me(N Paul). My [github profile](https://github.com/nirmalpaul383/) , [My youtube page](https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/) , [facebook page](https://facebook.com/a.new.way.Technical/)
<br> This is an open-source program. You are welcome to modify it...

**Thank you for trying it out!**
