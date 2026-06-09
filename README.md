# ViewPoint
ViewPoint is a math expression parser and evaluator that supports runtime data-type checking written in native JS. It allows you to evaluate mathematical expressions with ease while ensuring the correctness of the input data.

## ViewPoint example usage screenshot:
![ViewPoint Screenshot:](https://raw.githubusercontent.com/nirmalpaul383/ViewPoint/refs/heads/main/Screenshots/Screenshot%201.jpg)

## What's new
  - ### v2.1.1
      1. <ins>Bug fixed related to the `rest` keyword:</ins> Fixed an issue where only the last argument of a rest parameter was processed during function evaluation.
      2. <ins>Bug fixed related to missing operator detection:</ins> ViewPoint now throws a missing operators error if the operator is missing in the expression (e.g. `25 30` will throw an error).
      3. <ins>Bug fixed related to missing operand detection:</ins> Fixed an issue where operators without operands (e.g. `/ +`) produced a data type error. The ViewPoint now reports regarding the missing operand error.
      4. <ins> Bug fixed for variable names beginning with the character `n`:</ins> Fixed an issue where variable names beginning with `n` could evaluate incorrectly.
  - ### v2.1.0
      1. Improved the `.tokenize()` method to support more complex infix expressions and advanced calculations more accurately
      2. Added support for more operators:
         - <ins> Arithmetic operators:</ins> `^` , `**` , `*` , `/` , `%` , `+` , `-` can be used for performing math operations.
         - <ins>Comparison operators:</ins> `<` , `>` , `<=` , `>=` , `==` , `!=` can be used for performing comparison operations in the expression.
         - <ins>Logical operators:</ins> `&` , `|` , `&&` , `||` can be used for performing logical operations in the expression.
         - <ins>Unary operators:</ins> `+` , `-` , `!()` can be used for performing unary operations in the expression.
         - <ins>Ternary operator:</ins> `?` and `:` pairs can be used for performing ternary operations in the expression.
         - <ins>Assignment operators:</ins> `=` , `+=` , `-=` , `*=` , `/=` can be used for performing in-line variable assignment operations in the expression. 
         - <ins>New line operator:</ins> A new line character (`\n` or `\r`) or a semicolon (`;`) character can be used for separating multiple expressions.
      3. Added support for multiple nested ternary operations in expression.
      4. ViewPoint functions can now be used without the `#` character prefix (e.g. `max(478, 52)` can now be used directly instead of `#max(478, 52)`)
      5. Added support for more built-in functions:
         - `string()` takes the data and returns its string form.
         - `typeof()` takes data as its input parameter and returns the data type of that parameter
         - `Const()` function takes the name of Constant (in string format) and returns the result by calling the corresponding Math object 's property / constant name
         - `degToRad()` function takes input in degree form and returns the output in radian form
         - `sum()` function returns the sum of all provided parameters
         - `count()` function returns the total numbers of the given parameters
         - `avg()` function returns the average value of the given parameters
      6. Added support for all functions from JavaScript 's `Math` object.
      7. Added support for in-line variable definition within expressions (using the assignment operators `= , += , -= , *= , /=`).
      8. Added support for in-line function definition within expressions (using the `func` keyword).
      9. Added supports for variable clearing directly from the expressions (using the `clr variableName` keyword).
      10. Added supports for function clearing directly from the expressions (using the `clrFn functionName` keyword).
      11. Added supports for clearing all user-defined variables and functions directly from the expressions (using the `clean` keyword)
      12. Added an interpreter execution mode (`.interpret()`) that interprets and executes one or more expressions/statements represented as a string and returns the calculated results as an array format

  - ### v2.0.0
      1. The v 2.0.0 update introduces support for a variety of built-in functions, along with the ability to define and use custom user functions. ViewPoint v2.0 's function must be started with `#` character (e.g. `#max(478 , 52)`)
      2. Supports various inbuilt functions:
         1. `#max()`
         2. `#min()`
         3. `#and()` or `#&&()`
         4. `#or()` or `#||()`
         5. `#not()` or `#!()`
         6. `#greaterThan()` or `#>()`
         7. `#lessThan()` or `#<()`
         8. `#isEqual()` or `#==()`
         9. `#greaterThanOrEqual()` or `#>=()`
         10. `#lessThanOrEqual()' or '#<=()`
         11. `#if()`
     3. Supports for user defined function using external way (using `.addFunc( )` method)

  - ### v1.0.1
      1. Fixed calculation issues for BigInt datatypes.
      2. Error message for unclosed quoted text is fixed.

  - ## v1.0.0
      1. Supports for basic arithmetic operators (`+`, `-`, `*`, `/`,`^`, `%`).
      2. Supports string concatination operator (`+`).
      3. Supports nested math expression. (e.g `(52/8+2)+56*((25/2)*4+(8-2))`)
      4. Supports multiple datatypes (e.g. expressions with decimal / floating points numbers, BigInt, String, and Boolean datatype)
      5. Supports runtime data-type checking.
      6. Support for defination of variables using external way (using `.var()` method).
      7. Support for custom order of operations (default is `PEMDAS`).

## Features
1. **<ins>Expression Evaluation:</ins>**
     - <ins>Parses and evaluates</ins> mathematical expressions like '5*52+285/2'
     - Supports <ins>multiple types of operators:</ins>
       - **Arithmetic operators:** `^` , `**` , `\*` , `/` , `%` , `+` , `-` can be used for performing math operations. (e.g. `7+5*2 + 4/2` -> 19)
       - **Comparison operators:** `<` , `>` , `<=` , `>=` , `==` , `!=` can be used for performing comparison operations in the expression. (e.g. `50 > 60` -> false)
       - **Logical operators:** `&` , `|` , `&&` , `||` can be used for performing logical operations in the expression. (e.g. `true && false` -> false)
       - **Unary operators:** `+` , `-` , `!()` can be used for performing unary operations in the expression. (e.g. `-4*-2` -> 8  or  `! (true)` -> false )
       - **Ternary operator:** `?` and `:` pairs can be used for performing ternary operations in the expression. (e.g. `45 > 4 ? "Yes" : "No"` -> 'Yes')
       - **Assignment operators:** `=` , `+=` , `-=` , `*=` , `/=`  can be used for performing in-line variable assignment operations in the expression. (e.g. `a = 56` , `a+4` -> 60)
       - **New line operator:** A new line character (`\n` or `\r`) or a semicolon (`;`) character can be used for separating multiple expressions. [Note: Multiple expression evalution can be performed using the ViewPoint 's `.interpret()` method]
     - Supports <ins>nested expressions</ins> with parentheses:
       - Supports complex nested expression with multiple levels of nesting (e.g. `((2 + 3) * (4 - (6 / (1 + 1))))` -> 5 )
       - Supports multiple nested function expression (e.g. `(max(sum(4,5,2),avg(50,60,70,20,150)) + count(45,25,36,52,500) +1.6)*5` -> 383)
       - Supports multiple nested ternary operations in expression (e.g. `40 > 2 ? 25 > 7? 4 < 1? "a" : "b" : "c" : "d"` -> 'b')
     - Supports <ins>multiple datatypes</ins> e.g expressions with decimal / floating points numbers, BigInt, String, and Boolean datatype
2. **<ins>Data Type Validation:</ins>**
     - Validates data types during expression evaluation, throwing errors for invalid operations (e.g., attempting sum or multiplication between strings and numbers).
3. **<ins>Function(s) in the expression (added in v2.0.0) (improved in v2.1.0): </ins>**
     - Function(s) can be used in the expression string for complex expression computing (e.g. ```and()``` function for using logical and to the expression or ```if(condition, whatIfTrue, whatIfFalse)``` for using the 'if testing').
     - It has various built-in function (e.g. ```max()``` ,```min()``` etc...)
     - User can also add their own function
       - using external way: Using the ```.addFunc( )``` method of the ViewPoint object
       - using in-line expression way: Using the ```func``` keyword e.g. ```func addTwoNum(x,y) = x + y``` can create `addTwoNum()` function which takes two parameters and give output of their addition.
4. **<ins>Expression Tokenization:</ins>**
     - It can tokenize a expression into individual tokens and can return <ins> tokenized expression as an array</ins> (e.g expression = "5 + 7*2+(85^2+1)", ```tokens = [5,'+',7,'*',2,'+','(',85,'^',2,'+',1,')']```)
5. **<ins>Infix to Postfix Conversion:</ins>**
     - It can convert <ins>infix expressions to postfix notation</ins> and return as an array
6.  **<ins>JavaScript Variable Support:</ins>**
     - ViewPoint supports using of <ins> JavaScript variables </ins> in an expressions using ```${}``` and backticks (``` ` ```)
7. **<ins>ViewPoint 's Variables Support:</ins>**
     - ViewPoint allows users to define variables in 2 ways
       - <ins>External way:</ins> using the ```.var()``` method of the ViewPoint object.
       - <ins>In-line expression way:</ins> Variables can be created directly in the expression using any of these assignment operators `'=' , '+=' , '-=' , '*=' , '/='`
8. **<ins>Operator Order Control:</ins>**
     - <ins>Follows PEMDAS</ins> (Parentheses, Exponents, Multiplication and Division, and Addition and Subtraction) order of operations by default
     - Allows users to define their <ins>own custom order of operations</ins> (if needed)
9. **<ins>Customizable Operator Behavior:</ins>**
     - Allows users to <ins>re-define the math operator (e.g. '*' or '%') behavior</ins> to suit specific requirements (if needed)
  
## How to include this library in your project?
To use this evaluator/library, firstly, you need to link **ViewPoint.js** to your project. You can do that by using two ways:
1. **Download/Clone and Use:** Download or clone the repository and use the **ViewPoint.js** file in your project.
2. **Use via CDN:**
     - Use the library directly via CDN using the following script tag: ```https://cdn.jsdelivr.net/gh/nirmalpaul383/ViewPoint/ViewPoint.js```
     - For using it in browser/webpage you can use ```<script src="https://cdn.jsdelivr.net/gh/nirmalpaul383/ViewPoint/ViewPoint.js"></script>```

## How to use this library?
### After including this library, you will need to:
+ **<ins>create a ViewPoint object </ins> using ` new ViewPoint() ` keywords:**
```JavaScript
//Create a new ViewPoint object with ViewPoint class
let ViewPoint_obj = new ViewPoint();
```
+ **<ins>Store your expression in string format:</ins>**
```JavaScript
//Sample Expression
const expresion = `((52/8+2)+56*((25/2)*4+(8-2)))*2`;
```
+ **<ins>For evaluating an expression use ```.evaluate()``` method:</ins>**
```JavaScript
//Expression evaluating
let output = ViewPoint_obj.evaluate(expresion);

//For output
console.log(output); //Output 6289 to the console
```
+ **<ins>For interpreting multiple expressions use ```.interpret()``` method:</ins>**
```JavaScript
let multipleExpr = `5+5
a = 45
a += 5
func area (l, w) = l*w //Defining area function
area(a, 40) //Using area function
-5*+2 //Expression with Unary operators
`

//Expression interpreting
let output = ViewPoint_obj.interpret(expresion);

//For output
console.log(output); //Output [ 10, 45, 50, "The 'area(l,w)' was registered.", 2000, -10 ] to the console
```

## Expression evaluation
### ViewPoint supports two types of evalutaion mode:
+ ### Single expression evaluation:
  `.evaluate()` method evaluates a expression represented as a string and returns the calculated result 
```javascript
//Create a new ViewPoint object with ViewPoint class
let ViewPoint_obj = new ViewPoint();

//Simple Expression evaluation
console.log(ViewPoint_obj.evaluate(`25+5*2`)); //Output 35 to the console

//Nested expression evaluation
console.log(ViewPoint_obj.evaluate(`((52/8+2)+56*((25/2)*4+(8-2)))*2`)); //Output 6289 to the console

//BigInt Expression evaluation
console.log(ViewPoint_obj.evaluate(`11n ^2n`)); //Output 121n to the console

//String concatenation: '+' Operator behaves as concatenation operator if all operands are string
console.log(ViewPoint_obj.evaluate(`"Hello " + "World"`)); //Output "Hello World" to the console

//Boolean data operation using logical operators
console.log(ViewPoint_obj.evaluate(`(true && false) || (true && !(false))`)); //Output true to the console

//Using ternary operations in the expression
console.log(ViewPoint_obj.evaluate('20 > 18? "You can drive": "You can not drive"')); //Output 'You can drive' to the console


//Invalid Expression: One operand is a string and another one is number
console.log(ViewPoint_obj.evaluate(`"45" + 5`)); //Throws a datatype error

//Invalid Expression: One operand is a number and another one is boolean
console.log(ViewPoint_obj.evaluate(`45 * true`)); //Throws a datatype error

//Invalid Expression: unclosed quoted text
console.log(ViewPoint_obj.evaluate(`"Hello World `)); //Throws a error message for unclosed quoted text

```
+ ### Multiple expression evaluation:
`.interpret()` method interprets and executes one or more expressions/statements represented as a string and returns the calculated results as an array format
```javascript
//Create a new ViewPoint object with ViewPoint class
let ViewPoint_obj = new ViewPoint();

let multipleExpr = `"Example for: multiple expression interpretation:";

//Price of sugar per kg
Sugar = 42

//Custom function defination of price of sugar
func priceOfSugar (qty) = qty * Sugar

//Calculating the price of 4.5 Kg sugar
priceOfSugar (10)

//Using built-in function 'if()'
if(priceOfSugar(10) > 100, "Use online payment for purchase", "Cash can be used for purchase")
`

console.log(ViewPoint_obj.interpret(multipleExpr));

// Output: ['Example for: multiple expression interpretation:','',42,'',"The 'priceOfSugar(qty)' was registered.",'',420,'','Use online payment for purchase'] to the console



```

## Functions and Variables
### Functions(...):
#### Using the function in the expression:

```javascript
//Create a new expression evaluator object with ViewPoint class
let VP_Obj = new ViewPoint();

//Example 1: using the built-in function 'max'

//Expression 1 (simple expression with multiple layer of brackets and 'max' function):
let expr1 = "2*(500-4*(25+ max(8, (2*6))+45)) +39";

//Output to the console
console.log(VP_Obj.evaluate(expr1)); //Output 383


//Example 2: using the built-in function 'if' and 'and'

//For creating 3 variables in our ViewPoint object using the in-line variable defination
VP_OBJ.interpret(`Eng = 45 //Marks for english subject
Math = 85 //Marks for math subject
FA = 55 //Marks for financial accounting subject`)

//For creating Passmark variable in our ViewPoint object using '.var()' method
VP_Obj.var("Pass", 35); //Passmark

//Expression 2 with advance function like 'and()' and 'if()'
let expr2 = "if(and(Eng >= Pass , Math >= Pass, FA >= Pass), 'All Cleared', 'Fail')";

//Output to the console
console.log(VP_Obj.evaluate(expr2)); //Output 'All Cleared'
```
#### Function definations:
  - Function defination using <ins>external way</ins> (using ```.addFunc()``` method):
```javascript
//Create a new expression evaluator object with ViewPoint class
let VP_Obj = new ViewPoint();

//Function defination using external way (using ```.addFunc()``` method):
//Example 1: adding 'greet()' function which return "Hello!" string

//For defining and storing user-defining function to the ViewPoint object
VP_Obj.addFunc("greet", ()=>{return "Hello!"})

//For defining and storing user-defining function to the ViewPoint object
VP_Obj.addFunc("myName", (name)=>{return String(name)})

//Using our custom function in expression
let expr4 = "greet() + ` ` + myName('Nirmal') " ;

//Output to the console
console.log(VP_Obj.evaluate(expr4)) //Output 'Hello! Nirmal'
```
  - Function defination directly in the expression (<ins>in-line expression way</ins>) (using ```func``` keyword):
```javascript

//Function defination using in-line expression way (using the 'func' keyword):

//Create a new expression evaluator object with ViewPoint class
let VP_Obj = new ViewPoint();

//Defination of our custom function: area, which takes two parameters and returns the multiplication of those two parameters
let expr_for_inline_func = `func area(length, width) = length * width //Defination of the 'area()' function`;

//Evaluating for defining the in-line function
VP_Obj.evaluate(expr_for_inline_func);

//Output to the console
console.log(VP_Obj.evaluate('area(11,21)')) //Output 231
```

#### ViewPoint 's built-in functions list:
ViewPoint has some built-in functions, here is a complete list
|  Function Name | Details | Example |
| - | - |- |
|**and** <br> or <br> **&&**| **and()** or **&&** tests each of its arguments , if all are true then it will return true | ```"and(true , true, false)" //returns false ``` <br> <br> ```"&&(true , true, false)" //returns false ```|
|**or** <br> or <br> **\|\|** | **or()** or **\|\|()** tests each of its arguments , if any of its arguments is true then it will return true | ```"or(true , true, false)" //returns true ``` <br> <br> ```"\|\|(true , true, false)" //returns true```|
|**not** <br> or <br> **!**| **not()** or **!()** changes 'true' value to a 'false' value and 'false' value to a 'true' value | ```"not(true)" //returns false ``` <br> <br> ```"!(true)" //returns false ``` |
|**greaterThan** <br> or <br> **>**| **#greaterThan()** or **>()** takes 2 parameters and compare if that the 1st parameter is greater than the second parameter or not | ```"greaterThan(67 , 5)" //returns true ``` <br> <br>```">(67 , 5)" //returns true ``` |
|**lessThan** <br> or <br> **<**| **lessThan()** or **<()** takes 2 parameters and compare if that the 1st parameter is less than the second parameter or not | ```"lessThan(67 , 5)" //returns false ``` <br> <br>```"<(67 , 5)" //returns false ``` |
|**isEqual** <br> or <br> **==**| **isEqual()** or **==()** takes 2 parameters and compare if that the both parameter is same numerical value or not | ```"isEqual(60 , 50+10)" //returns true ``` <br> <br>```"==(60 , 50+10)" //returns true ``` |
|**if**| **if()** takes 3 parameters. 1st parameter is a condition parameter, if the condition is true then it returns 2nd parameter otherwise it returns 3rd parameter (if the 3rd parameter is not specified then its default value false will be return) | ```"if(true , 5, 80)" //returns 80 ``` <br> <br> ```"if(50 < 100 , '50 is less than 100', '100 is less than 50')" //returns '50 is less than 100' ```|
|**string**|**string()** takes the data and returns its string form| ```"string(20) + '26'" //returns '2026'```| 
|**typeof**|**typeof()** takes data as its input parameter and returns the data type of that parameter | ```"typeof(67)" //returns 'number'``` <br> ```"typeof(max)" //returns 'function'```
|**Const**| **Const()** function takes the name of Constant (in string format) and returns the result by calling the corresponding Math object 's property / constant name | ```"Const(PI)" //returns 3.141592653589793``` <br> <br>```"Const(SQRT2)" ///returns 1.4142135623730951```|
|**degToRad**| **degToRad()** function takes input in degree form and returns the output in radian form| ```"tan(degToRad(45))" //returns 1```|
|**sum**| **sum()** function returns the sum of all provided parameters| ```"sum(40,10,200,500,100)" //returns 850```|
|**count**| **count()** function returns the total numbers of the given parameters| ```"count(40,10,200,500,100)" //returns 5```|
|**avg**| **avg()** function returns the average value of the given parameters| ```"avg(40,10,200,500,100)" //returns 170```|

> <ins>[NOTE: ] </ins><br>
> In addition to these functions, ViewPoint also supports all functions from JavaScript’s `Math` object — but without the `Math` prefix.  
> For example, `Math.sin()` can be used in ViewPoint simply as `sin()`. <br>
> `Math.random()` can be used in ViewPoint simply as `random()`.

### Variables:
+ #### Using <ins>JavaScript variable</ins> directly in the expression using ```${}``` and ``` ` ```
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
+ #### Using <ins> ViewPoint 's variable</ins> in the expression [defined using external way: (`.var( name, value)` method)]
```javascript
//Create a new ViewPoint object with viewpoint class
let ViewPoint_obj = new ViewPoint();

//Defination of ViewPoint 's variable using external way (using .var(name, value) method):
ViewPoint_obj.var("myVar", 400);

//Sample expression with an external variable
const expresion = `35 *100 - myVar`;

//Expression evaluating and storing the result into the output variable
let output = ViewPoint_obj.evaluate(expresion);

//For output the result
console.log(output); //Output: 3100
```
+ #### Using <ins> ViewPoint 's variable</ins> in the expression [defined directly using in-line expression way: (`with assignment operators`)]
```javascript
//Create a new ViewPoint object with viewpoint class
let VP_obj = new ViewPoint();

//Expression evaluating for assignmenting of myVar2 variable
VP_obj.evaluate(`myVar2 = 400`);

//Sample expressions with variable
let expression = `35 * 100 - myVar2`;

//Expression evaluating and storing the result into the output variable
let output = VP_obj.evaluate(expression);

//For output the result
console.log(output); //Output: 3100


//Example 2 (in interpret mode)
let expr = `myVar3 = 500
45 + myVar3 *(50-2)`

//for interpreting the expression and output the result
console.log(VP_obj.interpret(expr)) //Output: [500 ,  24045]


```
> [NOTE:] <br>
> Starting from ViewPoint v2.1.0 there are various assignment operators for variable assignment:
> 1. Equal assignment operator (`=`)
> 2. Addition assignment operator (`+=`)
> 3. Subtraction assignment operator (`-=`)
> 4. Multiplication assignment operator (`*=`)
> 5. Division assignment operator (`/=`)

## Keywords
Starting from ViewPoint v2.1.0 there are some keywords for various purpose:
| Keyword|Syntax | Purpose | Example useage|
| - | -|- |- |
|`func`| `func name_of_function(parm1, parm2,..parmN) = ...`|`func` keyword can used to defined an in-line function| ```func greet(x) = "Hello " + x; //Greet function defination```|
|`rest`| `func name_of_function (rest) = ...`|`rest` keyword can be used to collect multiple parameters values in inline functions| ```func max_plus_two(rest) = max(rest) + 2; //Will define a function which can takes any numbers of parameters and returns their maximum number + 2```
|`clr`| `clr variable_Name`|`clr` keyword can be used for clearing a variable by its name|```clr myVar2 ; //Will clear myVar2 variable (if defined early)``` |
|`clrFn`| `clrFn function_Name`|`clrFn` keyword can be used for clearing a user defined function|```clrFn greet ; //Will clear 'greet()` function (if defined early)```|
|`clean`|`clean`|`clean` keyword can be used for clearing all user defined variables and all user defined functions. It can be useful for freshly running the .evaluate() or .interpret() method| ```clean ; //Will clear all the user-defined variables and all the user-defined functions.```|


## Other useful usages and methods
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
#### Default operator's precedence:
```javascript
//Default operator's precedence:

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

        }
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
#### ```ViewPoint_math_def```:
This object is used for defining of the math logic and math operations for ViewPoint
|  Name | Type | Details |
| - | - |- |
|**operator_precedence**|**Object**|This object contains the operator's precedence value according to the BODMAS or PEMDAS rule | 
|**exponents (value1, value2)**|**Method**|Definition of Power(`^` or `**`) operator Behavior|
|**multiplication (value1, value2)**|**Method**|Definition of Multiplication(`*`) operator Behavior|
|**division (value1, value2)**|**Method**|Definition of Division(`/`) operator Behavior|
|**modulus (value1, value2)**|**Method**|Definition of Modulus(`%`) operator Behavior|
|**addition (value1, value2)**|**Method**|Definition of Addition(`+`) and concatenation(`+`) operator Behavior|
|**subtraction (value1, value2)**|**Method**|Definition of Subtraction(`-`) operator Behavior|
|**isLessThan (value1, value2)**|**Method**|Definition of Less than (`<`) operator Behavior|
|**isGreatThan (value1, value2)**|**Method**|Definition of Greater than (`>`) operator Behavior|
|**isLessThanEq (value1, value2)**|**Method**|Definition of Less than or Equal(`<=`) operator Behavior|
|**isGreatThanEq (value1, value2)**|**Method**|Definition of Greater than or Equal(`>=`) operator Behavior|
|**isEqual (value1, value2)**|**Method**|Definition of Equal(`==`) operator Behavior|
|**isNotEqual (value1, value2)**|**Method**|Definition of Not Equal(`!=`) operator Behavior|
|**bitWiseAnd (value1, value2)**|**Method**|Definition of Bit Wise And (`&`) operator Behavior|
|**bitWiseOr (value1, value2)**|**Method**|Definition of Bit Wise Or (`\|`) operator Behavior|
|**logicalAnd (value1, value2)**|**Method**|Definition of Logical And (`&&`) operator Behavior|
|**logicalOr (value1, value2)**|**Method**|Definition of Logical Or (`\|\|`) operator Behavior|
|**assign (varName, varValue, assignType)**|**Method**|Definition of Assignment operator (equal assignment operator (`=`), addition assignment operator (`+=`), subtraction assignment operator (`-=`), multiplication assignment operator (`*=`), division assignment operator (`/=`)) Behavior|


## Thanks
If you like this project please give a star to [this project](https://github.com/nirmalpaul383/ViewPoint) . This project is originally made by me(N Paul). My [github profile](https://github.com/nirmalpaul383/) , [My youtube page](https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/) , [facebook page](https://facebook.com/a.new.way.Technical/)
<br> This is an open-source program. You are welcome to modify it...

**Thank you for trying it out!**
