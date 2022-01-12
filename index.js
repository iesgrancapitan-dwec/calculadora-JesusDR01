//@ts-check
/**
 * @author Jesús Díaz Rivas
 *
 * @description Calculadora
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del
 *  objeto predefinido document.
 *  */

const myCalculator = {
    // Variables
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
        // Inicialmente en el display aparece el cero sin decimal.
        // En el display sólo puede aparecer un punto decimal.
        // A la izquierda del punto sólo puede aparecer un cero ("00.1" no es válido).
        // No hay que escribir "0." para que te acepte el decimal. Basta con que pulse la coma decimal. Entonces el resto se consideran decimales.
        // En el display siempre ha de haber un dígito. En caso de usar el retroceso y ser el último carácter aparecerá un cero.
        // El cero negativo no existe ("-0" no es válido)
        myCalculator.wrapper.childNodes.forEach((element) => {
            switch (true) {
                case /[0-9]/g.test(element.value):
                    element.addEventListener('click', () => {
                        myCalculator.display.value =
                            myCalculator.display.value === '0'
                                ? element.value
                                : myCalculator.display.value + element.value;
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
                        if (value.includes(',') && value.split(',')[1].length === 1) {
                            decreaseFactor--;
                        }
                        myCalculator.display.value =
                            value.length <= 1 ? '0' : value.slice(0, decreaseFactor);
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
            }
        });
    },
};
myCalculator.init();
