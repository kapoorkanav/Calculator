function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b==0) return "lol";
    return a/b;
}
const buttonOrder=[7,8,9,'+',4,5,6,'-',1,2,3,'/',"AC",0,'=', '*'];
const ops=['+', '-', '*', '/'];
const opsFunctions=[add, subtract, multiply, divide];
let eneteredDigit=-1;
let n1=0, n2=0;
let currentNumber=0;
let readingFirstNumber=true;
let completedOperation=false;
let operation;
function calculate(fn){
    console.log(n1+" "+currentNumber);
    return fn(n1, currentNumber);
}

function displayNumber(){
    const display=document.querySelector(".display");
    if(currentNumber>=99999999) {
        // console.log("too big");
        currentNumber=NaN;
    }
    if(Number.isInteger(currentNumber)||currentNumber=="lol"||currentNumber==currentNumber.toPrecision(7))display.textContent=currentNumber;
    else display.textContent=currentNumber.toPrecision(7);
}

function loadButtons(){
    const mainButtons=document.querySelector(".main-buttons");
    for(let i=0;i<buttonOrder.length;i++){
        const button=document.createElement("div");
        button.className="button";
        if(Number.isInteger(buttonOrder[i])){
            // console.log("adding "+buttonOrder[i]);
            button.textContent=buttonOrder[i];
            button.addEventListener("click",()=>{
                if(completedOperation){
                    currentNumber=0;
                    completedOperation=false;
                }
                // console.log("we came to update");
                currentNumber=(currentNumber*10)+buttonOrder[i];
                displayNumber();
                // console.log("current is "+currentNumber);
            });
        }
        else{
            button.textContent=buttonOrder[i];
            if(buttonOrder[i]=="AC"){
                button.addEventListener("click", ()=>{
                    n1=0;
                    n2=0;
                    currentNumber=0;
                    readingFirstNumber=true;
                    completedOperation=false;
                    displayNumber();
                })
            }
            else if(buttonOrder[i]=="="){
                button.addEventListener("click", ()=>{
                    if(readingFirstNumber==false){
                        currentNumber=calculate(operation);
                        displayNumber();
                        n1=currentNumber;
                        completedOperation=true;
                    }
                })
            }
            else{
                for(let k=0;k<4;k++){
                    if(ops[k]==buttonOrder[i]){
                        button.addEventListener("click", ()=>{
                            // console.log("entered");
                            readingFirstNumber=false;
                            operation=opsFunctions[k];
                            // console.log(operation);
                            n1=currentNumber;
                            currentNumber=0;
                        })
                    }
                }
            }
        }
        mainButtons.append(button);
    }
    const extraButtons=document.querySelector(".extra-buttons");
    const dec=document.createElement("div");
    dec.className="button";
    dec.textContent=".";
    const backspace=document.createElement("div");
    backspace.className="button";
    backspace.textContent="<--"
    backspace.addEventListener("click", ()=>{
        if(completedOperation){
            n1=0;
            n2=0;
            currentNumber=0;
            readingFirstNumber=true;
            completedOperation=false;
            displayNumber();
        }
        else{
            currentNumber=Math.floor(currentNumber/10);
            displayNumber();
        }
    })
    extraButtons.append(dec);
    extraButtons.append(backspace);
}
loadButtons();
displayNumber();