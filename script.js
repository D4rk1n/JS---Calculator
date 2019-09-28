class Calcualtor {
    constructor(preDisplay,currDisplay) 
    {   
        this.preDisplay = preDisplay;
        this.currDisplay = currDisplay;
        this.preDisplay.innerText = "";
        this.currDisplay.innerText = "";
        this.currOperand = "";
        this.preOperand = "";
        this.appendOp = false;
        this.parenthesis = false;
        this.negative = true;
        this.rP = 0;
        this.lP = 0;
    }
    append(no)
    {
        this.currOperand = this.currOperand.toString();
        if(no=='.'&& this.currOperand.includes('.')) return;
        if(no=='0' && this.currOperand == "" ) return;
        this.currOperand += no;
        this.update();
        this.appendOp = true;
    }
    operate(op)
    {
        this.currOperand = this.currOperand.toString();
        if(this.currOperand.slice(-1) == '.')
        {
            this.currOperand = this.currOperand.slice(0,-1);
        }
        if(this.appendOp)  
        {
            this.preOperand = this.preOperand + this.currOperand + op;
            this.currOperand = "" ;
            this.currDisplay.innerText = this.currOperand;
            this.appendOp = false;
            
        }
        else if(this.negative&& (this.currOperand == "" || this.currOperand == "(" ) && op=='-')
        {
            if(this.preOperand.slice(-1) == '-' && !this.currOperand == "(")
            {
                this.preOperand = this.preOperand.slice(0,-1);
                this.preOperand += "+" ;
            }
            else 
            {
            this.currOperand += op;
            }
        }
        this.update();
    }
    parentheses(p)
    {
        if(p=='(' && !this.appendOp)
        {
            this.parenthesis = true ;
            this.rP += 1;
            this.currOperand += p;
        }
        else if (this.appendOp && this.parenthesis && p == ')' )
        {
            this.lP +=1;
            if(this.lP == this.rP) 
                this.parenthesis = false;
            this.currOperand += p;
        }
        this.update();
    }
    update()
    {
        this.currDisplay.innerText = this.currOperand;
        this.preDisplay.innerText = this.preOperand;
    }
    delete()
    {
        this.currOperand = this.currOperand.toString();
        this.currOperand = this.currOperand.slice(0, -1);
        this.update();
    }
    clear()
    {
        this.currOperand = "";
        this.preOperand = "";
        this.appendOp = false;
        this.parenthesis = false;
        this.rP = 0;
        this.lP = 0;
        this.update();
    }
    calculate()
    {
        
        var result = this.preDisplay.innerText+this.currDisplay.innerText;
        if(this.currDisplay.innerText=='(')
            result = result.slice(0,-2);
        if(this.currDisplay.innerText=="")
            result = result.slice(0,-1);
        if(result.slice(-1) == '.')
            result = result.slice(0,-1);
        while(result.includes('×') || result.includes('÷') )
        {
            result = result.replace('×','*');
            result = result.replace('÷','/');
        }
        while(this.rP > this.lP)
        {
            this.rP -=1;
            let i = result.indexOf('(');
            if(result[i+1] == '-'&&result[i-1] == '-')
            {
                result=result.replace('-','');
                result=result.replace('-','+');
            }
            result=result.replace('(','');
            console.log(result);
            if(result.indexOf('(') > result.indexOf(')') )
            {
                
                result=result.replace(')','');
                console.log(result);
                this.lP -=1;
            }
        }
        this.clear();
        this.currOperand = eval(result);
        this.update();
        this.appendOp = true ;
        
    }
}


const noBtns = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const parentheses = document.querySelectorAll('[data-p]');
const equalBtn = document.querySelector('[data-equal]');
const deleteBtn = document.querySelector('[data-del]');
const clearBtn = document.querySelector('[data-clear]');
const preDisplay = document.querySelector(".pre-calc")
const currDisplay = document.querySelector(".curr-calc")

const calc = new Calcualtor(preDisplay,currDisplay);
equalBtn.addEventListener("click",()=>{
    calc.calculate();
})
clearBtn.addEventListener("click",()=>{
    calc.clear();
})
deleteBtn.addEventListener("click",()=>{
    calc.delete();
})
noBtns.forEach(btn => {
    btn.addEventListener("click" , ()=> {
        calc.append(btn.innerText);
    })
})
operations.forEach(op => {
    op.addEventListener("click",()=>{
        calc.operate(op.innerText);
    })
})
parentheses.forEach(p => {
    p.addEventListener("click",()=>{
        calc.parentheses(p.innerText);
    })
})