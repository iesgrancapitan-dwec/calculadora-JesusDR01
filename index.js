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
            'CE',
            '←',
            '%',
            '+',
            '7',
            '8',
            '9',
            '-',
            '4',
            '5',
            '6',
            'x',
            '1',
            '2',
            '3',
            '÷',
            '0',
            '±',
            ',',
            '=',
        ],
        init: () => {
            window.addEventListener('DOMContentLoaded', () => {
                let display = document.createElement('input');
                display.setAttribute('type', 'text');
                display.setAttribute('id', 'display');
                display.setAttribute('name', 'display');
                display.setAttribute('value', '0');
                myCalculator.wrapper = document.createElement('div');
                myCalculator.display = display;

                myCalculator.wrapper.appendChild(myCalculator.display);
                myCalculator.buttons.forEach((button) => {
                    let btn = document.createElement('button');
                    btn.setAttribute('id', button);
                    btn.setAttribute('value', button);
                    btn.innerHTML = button;
                    myCalculator.wrapper.appendChild(btn);
                });
                document.body.appendChild(myCalculator.wrapper);

                myCalculator.initBehaviour();
            });
        },
        initBehaviour: () => {
            myCalculator.wrapper.childNodes.forEach((element) => {
                switch (true) {
                    case element.name === 'display':
                        element.addEventListener('keydown', (e) => {
                            if (e.key === 'Backspace' && myCalculator.display.value.length === 1) {
                                myCalculator.display.value = '0';
                                e.preventDefault();
                            }
                            if (/\D/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault();
                            }
                            if (/\d/.test(e.key) && myCalculator.display.value === '0') {
                                myCalculator.display.value = myCalculator.display.value.slice(2);
                            }
                        });
                        break;
                    case /[0-9]/g.test(element.value):
                        element.addEventListener('click', () => {
                            if (myCalculator.operating) {
                                myCalculator.operating = false;
                                myCalculator.display.value = element.value;
                                
                            } else {
                                myCalculator.display.value =
                                    myCalculator.display.value === '0'
                                        ? element.value
                                        : myCalculator.display.value + element.value;
                            }
                        });
                        break;
                    case element.value === 'CE':
                        element.addEventListener('click', () => {
                            myCalculator.display.value = '0';
                        });
                        break;
                    case element.value === '←':
                        element.addEventListener('click', () => {
                            const value = myCalculator.display.value;
                            let decreaseFactor = -1;
                            let limitFactor = 1;
                            if (value.includes(',') && value.split(',')[1].length === 1) {
                                decreaseFactor--;
                            }
                            if (value.includes('-')) {
                                limitFactor++;
                            }
                            myCalculator.display.value =
                                value.length <= limitFactor ? '0' : value.slice(0, decreaseFactor);
                            if (myCalculator.display.value === '-0') {
                                myCalculator.display.value = '0';
                            }
                        });
                        break;
                    case element.value === ',':
                        element.addEventListener('click', () => {
                            if (!myCalculator.display.value.includes(',')) {
                                myCalculator.display.value = myCalculator.display.value.concat(
                                    element.value
                                );
                            }
                        });
                        break;
                    case element.value === '±':
                        element.addEventListener('click', () => {
                            if (myCalculator.display.value === '0') return;
                            myCalculator.display.value = myCalculator.display.value.includes('-')
                                ? myCalculator.display.value.slice(1)
                                : `-${myCalculator.display.value}`;
                        });
                        break;
                    case /[\+\-\x\÷\%]/g.test(element.value):
                        element.addEventListener('click', () => {
                            if (myCalculator.operator) {
                                myCalculator.operate();
                            }
                            myCalculator.operand1 = myCalculator.display.value;
                            myCalculator.operator = element.value;
                            myCalculator.operating = true;
                            
                        });
                        break;
                    case element.value === '=':
                        element.addEventListener('click', myCalculator.operate);
                        break;
                }
            });
        },
        calculate: () => {
            let result = 0;
            switch (myCalculator.operator) {
                case '+':
                    result = parseFloat(myCalculator.operand1) + parseFloat(myCalculator.operand2);
                    break;
                case '-':
                    result = parseFloat(myCalculator.operand1) - parseFloat(myCalculator.operand2);
                    break;
                case 'x':
                    result = parseFloat(myCalculator.operand1) * parseFloat(myCalculator.operand2);
                    break;
                case '÷':
                    result = parseFloat(myCalculator.operand1) / parseFloat(myCalculator.operand2);
                    break;
                case '%':
                    result = parseFloat(myCalculator.operand1) % parseFloat(myCalculator.operand2);
            }
            return result;
        },
        operate: () => {
            if (myCalculator.operator && !myCalculator.operating) {
                myCalculator.operand2 = myCalculator.display.value;
                myCalculator.operand1 = myCalculator.operand1.replace(',', '.');
                myCalculator.operand2 = myCalculator.operand2.replace(',', '.');
                const result = myCalculator.calculate();

                myCalculator.display.value = isNaN(result)
                    ? '0' //0/0
                    : result.toString().replace('.', ',');
                if (myCalculator.display.value.length > 10) {
                    myCalculator.display.style.fontSize = '1em';
                }
                myCalculator.operand1 = undefined;
                myCalculator.operand2 = undefined;
                myCalculator.operator = undefined;
            }
        }
    };
    myCalculator.init();
}
