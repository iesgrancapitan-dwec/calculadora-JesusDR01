//@ts-check
/**
 * @author Jesús Díaz Rivas
 *
 * @description Calculadora
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del
 *  objeto predefinido document.
 *  */
{
    const myCalculator = {
        // Variables
        operand1: undefined,
        operand2: undefined,
        operator: undefined,
        operating: false,
        buttons: [
            "CE",
            "←",
            "%",
            "+",
            "7",
            "8",
            "9",
            "-",
            "4",
            "5",
            "6",
            "x",
            "1",
            "2",
            "3",
            "÷",
            "0",
            "±",
            ",",
            "=",
        ],
        init: () => {
            let display = document.createElement("input");
            display.setAttribute("type", "text");
            display.setAttribute("id", "display");
            display.setAttribute("name", "display");
            display.setAttribute("value", "0");
            myCalculator.wrapper = document.createElement("div");
            myCalculator.addWrapperCss();
            myCalculator.display = display;
            myCalculator.addDisplayCss();

            display.addEventListener("keydown", myCalculator.displayBehaviourBeforeDisplayChange);
            display.addEventListener("input", myCalculator.displayBehaviourAfterDisplayChange);

            myCalculator.wrapper.appendChild(myCalculator.display);

            myCalculator.buttons.forEach((button) => {
                let btn = document.createElement("button");
                btn.setAttribute("id", button);
                btn.setAttribute("value", button);
                btn.innerHTML = button;
                myCalculator.addBtnCss(btn);
                myCalculator.wrapper.appendChild(btn);
                btn.addEventListener("click", myCalculator.addBehaviour(button));
            });
            document.body.appendChild(myCalculator.wrapper);
        },
        addBehaviour: (buttonContent) => {
            switch (buttonContent) {
                case "CE":
                    return () => {
                        myCalculator.display.value = "0";
                        myCalculator.reset();
                    };
                case "←":
                    return () => {
                        const displayValue = myCalculator.display.value;
                        let decreaseFactor = -1;
                        let limitFactor = 1;
                        if (displayValue.includes(",") && displayValue.split(",")[1].length === 1) {
                            decreaseFactor--;
                        }
                        if (displayValue.includes("-")) {
                            limitFactor++;
                        }
                        myCalculator.display.value =
                            displayValue.length <= limitFactor
                                ? "0"
                                : displayValue.slice(0, decreaseFactor);
                        if (myCalculator.display.value === "-0") {
                            myCalculator.display.value = "0";
                        }
                    };
                case "%":
                case "+":
                case "-":
                case "x":
                case "÷":
                    return () => {
                        if (myCalculator.operator) {
                            myCalculator.operate();
                        }
                        myCalculator.operand1 = myCalculator.display.value;
                        myCalculator.operator = buttonContent;
                        myCalculator.operating = true;
                    };

                case "=":
                    return myCalculator.operate;
                case "±":
                    return () => {
                        if (myCalculator.display.value === "0") return;
                        myCalculator.display.value = myCalculator.display.value.includes("-")
                            ? myCalculator.display.value.slice(1)
                            : `-${myCalculator.display.value}`;
                    };
                case ",":
                    return () => {
                        if (!myCalculator.display.value.includes(",")) {
                            myCalculator.display.value =
                                myCalculator.display.value.concat(buttonContent);
                        }
                    };
                default:
                    return () => {
                        if (myCalculator.operating) {
                            myCalculator.operating = false;
                            myCalculator.display.value = buttonContent;
                        } else {
                            myCalculator.display.value =
                                myCalculator.display.value === "0"
                                    ? buttonContent
                                    : myCalculator.display.value + buttonContent;
                        }
                    };
            }
        },
        displayBehaviourBeforeDisplayChange: (e) => {
            if (e.key === "Backspace" && myCalculator.display.value.length === 1) {
                myCalculator.display.value = "0";
                e.preventDefault();
            }
            if (/\D/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
            }
            if (/\d/.test(e.key) && myCalculator.display.value === "0") {
                myCalculator.display.value = myCalculator.display.value.slice(2);
            }
        },
        displayBehaviourAfterDisplayChange: () => {
            //I don't know if 0 will be right or left when e.key === '0' is pressed, so I will control it here.
            if (
                myCalculator.display.value !== "0" &&
                myCalculator.display.value.indexOf("0") === 0
            ) {
                myCalculator.display.value = myCalculator.display.value.slice(1);
            }
        },
        calculate: () => {
            let result = 0;
            const { operand1, operand2, operator } = myCalculator;
            switch (operator) {
                case "+":
                    result = operand1 + operand2;
                    break;
                case "-":
                    result = operand1 - myCalculator.operand2;
                    break;
                case "x":
                    result = operand1 * operand2;
                    break;
                case "÷":
                    result = operand1 / operand2;
                    break;
                case "%":
                    result = operand1 % operand2;
            }
            return result;
        },
        operate: () => {
            if (myCalculator.operator && !myCalculator.operating) {
                myCalculator.operand2 = myCalculator.display.value;
                myCalculator.operand1 = parseFloat(myCalculator.operand1.replace(",", "."));
                myCalculator.operand2 = parseFloat(myCalculator.operand2.replace(",", "."));
                const result = myCalculator.calculate();

                myCalculator.display.value = isNaN(result)
                    ? "0" //0/0
                    : result.toString().replace(".", ",");
                if (myCalculator.display.value.length > 10) {
                    myCalculator.display.style.fontSize = "1em";
                }
                myCalculator.reset();
            }
        },
        reset: () => {
            myCalculator.operand1 = undefined;
            myCalculator.operand2 = undefined;
            myCalculator.operator = undefined;
            myCalculator.operating = false;
        },
        addWrapperCss: () => {
            myCalculator.wrapper.style.cssText = `
            justify-content: center;
            box-shadow: 0px 0px 5px;
            height: 396px;
            padding: 20px;
            width: 301px;
            grid-auto-flow: row;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 15px;
            background-color: #EEEEEE;`;
        },
        addDisplayCss: () => {
            myCalculator.display.style.cssText = `
            grid-area: 1/1/1/5;
            text-align: right;
            font-size: 2em;
            `;
        },
        addBtnCss: (btn) =>{
           btn.style.cssText = `
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgb(188 188 188 / 38%) 50%);
            font-size: 2em;
            `;
        }
    };
    window.addEventListener("DOMContentLoaded", myCalculator.init);
}
