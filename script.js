//button DOM
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");

const acButton = document.querySelector(".ac-btn");
const deleteButton = document.querySelector(".del-btn");
const equalButton = document.querySelector(".equal-btn");
const decimalButton = document.querySelector(".decimal-btn");

//Calc Screen DOM
const displaySteps = document.querySelector(".display-steps");
const displayAnswer = document.querySelector(".display-answer");

//global variables
let num1;
let num2;
let operator;
handleNum2 = false;

init();

function init()
{
    handleNumberDisplay();
    handleOperatorButtons();
    handleClearButton();
    handleDecimalButton();
    handleDeleteButton();
    handleKeyboardInput();
}

function handleNumberDisplay()
{
    numberButtons.forEach((btn) =>
    {
        btn.addEventListener("click", () =>
        {
            displaySteps.textContent += btn.textContent;
            if (num1 !== undefined)
            {
                handleNum2 = true;
            }
        })
    })
}

function handleOperatorButtons()
{
    operatorButtons.forEach((btn) =>
    {
        btn.addEventListener("click", () =>
        {
            // insert operator to display
            if (operator === undefined && displaySteps.textContent.length !== 0)
            {
                num1 = +displaySteps.textContent;
                console.log(num1);

                if (btn.textContent !== "=")
                {
                    operator = btn.textContent;
                    displaySteps.textContent += ` ${operator} `;
                }
                
                else
                {
                    displayAnswer.textContent = num1;
                }
            }

            //change or handle duplicate operator
            else if (handleNum2)
            {

                num2 = +displaySteps.textContent.slice(displaySteps.textContent.indexOf(operator) + 2)
                console.log(num2);
                num1 = operate(num1, num2, operator); 

                if (btn.textContent === "=")
                {
                    console.log("is equal");
                    operator = undefined;
                    displaySteps.textContent = num1;
                }

                else
                {
                    operator = btn.textContent;
                    displaySteps.textContent = num1 + ` ${operator} `;
                }

                displayAnswer.textContent = num1;
                num2 = undefined;                    
                handleNum2 = false;
            }

            //operator & num2 already exists so handle calculation
            else if (displaySteps.textContent.length !== 0)
            {
                if (btn.textContent !== "=")
                {
                    operator = btn.textContent;
                    displaySteps.textContent = `${displaySteps.textContent.slice(0, displaySteps.textContent.length - 3)} ${operator} `;
                }
            }

        })
    })
}

function handleClearButton()
{
    acButton.addEventListener("click", () =>
    {
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        displaySteps.textContent = "";
        displayAnswer.textContent = "";
    })
}

function handleDeleteButton()
{
    let checkOperators = "+-×/"
    let deleteOp = false;

    deleteButton.addEventListener("click", () =>
    {
        if (displaySteps.textContent.length >= 2)
        {
            for (op of checkOperators)
            {
                if (displaySteps.textContent[displaySteps.textContent.length - 2].includes(op))
                {
                    displaySteps.textContent = displaySteps.textContent.slice(0, displaySteps.textContent.length - 3);
                    operator = undefined;
                    handeNum2 = false;
                    deleteOp = true;
                }
            }
        }

        if (!deleteOp && displaySteps.textContent.length > 0)
        {
            displaySteps.textContent = displaySteps.textContent.slice(0, displaySteps.textContent.length - 1)
        }
        
        deleteOp = false;

    })
}

function handleDecimalButton()
{
    decimalButton.addEventListener("click", () =>
    {
        if (operator === undefined && !displaySteps.textContent.includes("."))
        {
            displaySteps.textContent += ".";
        }

        //decimal for num2
        else if (!displaySteps.textContent.slice(displaySteps.textContent.indexOf(operator) + 1).includes("."))
        {
            displaySteps.textContent += ".";
        }
        
    })
}

function handleKeyboardInput()
{
    window.addEventListener("keyup", (e) =>
    {
        if (e.key >= 0 && e.key <= 9)
        {
            for (btn of numberButtons)
            {
                if (btn.textContent === e.key)
                {
                    btn.click();
                }
            }
        }

        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '=')
        {
            for (btn of operatorButtons)
            {
                if (e.key === '*' && btn.textContent === '×')
                {
                    btn.click();
                }
                else if (btn.textContent === e.key)
                {
                    btn.click();
                }
            }
        }

        if (e.key === "Backspace")
        {
            deleteButton.click();
        }

    })
}

function operate(num1, num2, operator)
{
    if (operator === "+") return add(num1, num2);
    if (operator === "-") return subtract(num1, num2);

    if (operator === "×") return +multiply(num1, num2).toFixed(5);
    if (operator === "/") return +divide(num1, num2).toFixed(5);
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
    return num1 * num2;
}

function divide(num1, num2)
{
    //account for division by 0
    if (num2 === 0)
    {
        alert("ERROR, DIVISION BY 0")
        return num1;
    }
    return num1 / num2;
}