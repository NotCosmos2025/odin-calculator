const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const displaySteps = document.querySelector(".display-steps");
const displayAnswer = document.querySelector(".display-answer")
const equalButton = document.querySelector(".equal-btn");
const delButton = document.querySelector(".del-btn");
const acButton = document.querySelector(".AC-btn");

let num1;
let operator;
let num2;

let checkOperators = "+-×/=";

function initialiseCalculator()
{
    handleEvents();
}

initialiseCalculator();

function handleEvents()
{
    //make numbers show up on the display
    numberButtons.forEach((btn) =>
    {
        btn.addEventListener("click", (e) =>
        {
            displaySteps.textContent += e.target.textContent;
        })
    })

    //handle operations and operator checking
    operatorButtons.forEach((btn) => 
    {
        btn.addEventListener("click", (e) =>
        {
            handleOperations(e);
        }) 
    })

    equalButton.addEventListener("click", () =>
    {
        handleEqual();
    })

    acButton.addEventListener("click", () =>
    {
        allClear();
    })

}

function handleOperations(e)
{
    let hasDuplicate = false;

    let numberOnePortion = displaySteps.textContent.slice(0, displaySteps.textContent.length - 2);
    let clickedOperator = e.target.textContent;

    if (displaySteps.textContent.length === 0) return;

    //check if there is a duplicate operator at the end, and replace it instead of appending
    for (op of checkOperators)
    {
        if (displaySteps.textContent[displaySteps.textContent.length - 2] === op)
        {
            hasDuplicate = true;
            num1 = Number.parseFloat(numberOnePortion);
            displaySteps.textContent = numberOnePortion + ` ${clickedOperator} `
        }
    }

    //append operator if there is no operator yet
    if (!hasDuplicate && !displaySteps.textContent.includes("="))
    {
        if (operator === undefined)
        {
            num1 = Number.parseFloat(displaySteps.textContent);
            console.log(num1);
            displaySteps.textContent += ` ${clickedOperator} `;
        }

        //operate and display answer if there is currently an operator
        else
        {
            num1 = operate(num1, num2, operator);

            operator = clickedOperator;
            displaySteps.textContent = num1 + ` ${operator} `;
            displayAnswer.textContent = num1;
            num2 = undefined;
        }
   
    }

    operator = clickedOperator;
    console.log(operator);

}


function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1*num2;
}

function divide(num1, num2)
{
    return num1/num2;
}

function operate(num1, num2, operator)
{

    num2 = Number.parseFloat(displaySteps.textContent.slice(displaySteps.textContent.indexOf(operator) + 2));
    if (operator === "+")
    {
        return add(num1, num2);
    }
    if (operator === "-")
    {
        return subtract(num1, num2);
    }
    if (operator === "×")
    {
        return multiply(num1, num2);
    }
    if (operator === "/")
    {
        return divide(num1, num2);
    }

}

function deleteText()
{
     
}

function allClear()
{
    num1 = undefined;
    operator = undefined;
    num2 = undefined;

}

function handleEqual(e)
{

    let canEqual = true;
    for (op of checkOperators)
    {
        if (displaySteps.textContent[displaySteps.textContent.length - 2] === op)
        {
                console.log("cannot equal yet");
                canEqual = false;
        }
    }

    if (canEqual && operator !== undefined)
    {
        displaySteps.textContent += ' = ';
        num1 = operate(num1, num2, operator);
        displayAnswer.textContent = num1;
    }

}