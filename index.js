/**
 * @author Jesús Díaz Rivas
 *
 * @description Calculadora
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del
 *  objeto predefinido document.
 *  */
window.addEventListener("DOMContentLoaded", () => {
    //Crear elementos
    let display = document.createElement("input");
    display.setAttribute("type", "number");
    display.setAttribute("id", "display");
    display.setAttribute("name", "display");
    display.setAttribute("value", "0");
    
    let btnCE = document.createElement("button");
    let btnBorrar = document.createElement("button");
    let btnModulo = document.createElement("button");
    let btnSuma = document.createElement("button");
    let btnResta = document.createElement("button");
    let btnMultiplicacion = document.createElement("button");
    let btnDivision = document.createElement("button");
    let btnIgual = document.createElement("button");
    let btnPunto = document.createElement("button");
    let btn0 = document.createElement("button");
    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let btn3 = document.createElement("button");
    let btn4 = document.createElement("button");
    let btn5 = document.createElement("button");
    let btn6 = document.createElement("button");
    let btn7 = document.createElement("button");
    let btn8 = document.createElement("button");
    let btn9 = document.createElement("button");   
    let btnMasMenos = document.createElement("button");
    let wrapper = document.createElement("div");
    //Añadir elementos
    wrapper.appendChild(display);
    wrapper.appendChild(btnCE);
    wrapper.appendChild(btnBorrar);
    wrapper.appendChild(btnModulo);
    wrapper.appendChild(btnSuma);
    wrapper.appendChild(btn7);
    wrapper.appendChild(btn8);
    wrapper.appendChild(btn9);
    wrapper.appendChild(btnResta);
    wrapper.appendChild(btn4);
    wrapper.appendChild(btn5);
    wrapper.appendChild(btn6);
    wrapper.appendChild(btnMultiplicacion);
    wrapper.appendChild(btn1);
    wrapper.appendChild(btn2);
    wrapper.appendChild(btn3);
    wrapper.appendChild(btnDivision);
    wrapper.appendChild(btn0);
    wrapper.appendChild(btnMasMenos);
    wrapper.appendChild(btnPunto);
    wrapper.appendChild(btnIgual);
    
    document.body.appendChild(wrapper);
    //Añadir contenido 
    btnCE.innerHTML = "CE";
    btnBorrar.innerHTML = "←";
    btnModulo.innerHTML = "%";
    btnSuma.innerHTML = "+";
    btn7.innerHTML = "7";
    btn8.innerHTML = "8";
    btn9.innerHTML = "9";
    btnResta.innerHTML = "-";
    btn4.innerHTML = "4";
    btn5.innerHTML = "5";
    btn6.innerHTML = "6";
    btnMultiplicacion.innerHTML = "x";
    btn1.innerHTML = "1";
    btn2.innerHTML = "2";
    btn3.innerHTML = "3";
    btnDivision.innerHTML = "/";
    btn0.innerHTML = "0";
    btnMasMenos.innerHTML = "+/-";
    btnPunto.innerHTML = ".";
    btnIgual.innerHTML = "=";
    
});
