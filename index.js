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
    init() {
        window.addEventListener('DOMContentLoaded', () => {
            let display = document.createElement('input');
            display.setAttribute('type', 'text');
            display.setAttribute('id', 'display');
            display.setAttribute('name', 'display');
            display.setAttribute('value', '0');
            this.wrapper = document.createElement('div');
            this.display = display;

            this.wrapper.appendChild(this.display);
            this.buttons.forEach((button) => {
                let btn = document.createElement('button');
                btn.setAttribute('id', button);
                btn.setAttribute('value', button);
                btn.innerHTML = button;
                this.wrapper.appendChild(btn);
            });
            document.body.appendChild(this.wrapper);

            this.initBehaviour();
        });
    },
    initBehaviour() {
            // Inicialmente en el display aparece el cero sin decimal.
            // En el display sólo puede aparecer un punto decimal.
            // A la izquierda del punto sólo puede aparecer un cero ("00.1" no es válido).
            // No hay que escribir "0." para que te acepte el decimal. Basta con que pulse la coma decimal. Entonces el resto se consideran decimales.
            // En el display siempre ha de haber un dígito. En caso de usar el retroceso y ser el último carácter aparecerá un cero.
            // El cero negativo no existe ("-0" no es válido)
        this.wrapper.childNodes.forEach((element) => {
            switch (true) {
                case /[0-9]/g.test(element.id):
                    element.addEventListener('click', () => {
                        this.display.value = this.display.value === '0' ? element.id : this.display.value + element.id;
                    });
                    break;
                case element.id ==='CE':
                    element.addEventListener('click', () => {
                        this.display.value = '0';
                    });
                    break;
                case element.id ==='←':
                    element.addEventListener('click', () => {
                        this.display.value = this.display.value.length > 1 ? this.display.value.slice(0, -1) : '0';
                    });
                    break;
                case element.id ===',':
                    element.addEventListener('click', (e) => {
                        if (this.display.value.includes(',')) {
                            e.preventDefault();
                        };
                        this.display.value = this.display.value.concat(element.id);
                    });
                    break;
                case element.id ==='±':
                    element.addEventListener('click', () => {
                        this.display.value = parseInt(this.display.value) * -1;
                    });
            }
        });
    },
};
myCalculator.init();
