const output = document.querySelector(".output");
const buttons = document.querySelectorAll(".item");

let equation = "";
let number = "";
let id = "";
let type = "";
let square = false;


for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		id = this.getAttribute("data-id");
		type = this.getAttribute("data-type");

        switch (type) {
			case "clear":
				Clear();
				break;

			case "operator":
				Operator();
				break;

			case "symbol":
				Symbol();
				break;

            case "equal":
                Equal();
                break;

            case "backspace":
                Backspace();
                break;

            case "square":
                Square();
                break;

            case "percent":
                Percent();
                break;

			default:
				Default();
				break;
		}
	});
}

function Clear() {
	number = "";
	equation = "";
	output.value = 0;
}

function Operator() {
	if (number !== "") { 
        equation += number + " " + id + " "; 
        output.value = equation.trim();
        number = ""; 
    } else {
        if (square) {
            equation += id + " "; 
            output.value = equation.trim();
            number = "";
        }
    }
}

function Symbol() {
    number += id; 
    output.value = equation + number; 
}

function Equal() {
    if (number !== "") { 
        equation += number; 
        let result;
        try {
            result = eval(equation); 
        } catch (error) {
            result = "Error"; 
        }
        output.value = result; 
        equation = ""; 
        number = ""; 
    } else {
        if (square) {
            equation += number; 
            let result;
            try {
                result = eval(equation); 
            } catch (error) {
                result = "Error"; 
            }
            output.value = result; 
            equation = ""; 
            number = ""; 
            square = false;
        }
    }
}

function Backspace() {
    if (number !== "") {
        number = number.slice(0, -1);
        output.value = equation + number; 
    } else if (equation !== "") {
        const lastSpaceIndex = equation.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            equation = equation.slice(0, lastSpaceIndex); 
        } else {
            equation = ""; 
        }
        output.value = equation; 
    }
}

function Square() {
    if (number !== "") {
        const num = parseFloat(number);
        const squared = Math.sqrt(num);
        equation += squared + " "; 
        output.value = equation.trim(); 
        number = '';
        square = true;
    } 
}

function Default() {
	number += id; 
    output.value = equation + number; 
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    
    if (key === 'Enter') {
        document.getElementById("equal").click();
    } else if (key === 'Backspace') {
        Backspace();
    } else if ("0123456789".includes(key)) {
        const button = Array.from(buttons).find(btn => btn.getAttribute("data-id") === key);
        if (button) button.click();
    } else if ("+-*/.".includes(key)) {
        const button = Array.from(buttons).find(btn => btn.getAttribute("data-id") === key);
        if (button) button.click();
    }
});

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
