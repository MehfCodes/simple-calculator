// declare variables
let box=document.querySelector('#label');
let input=document.querySelector('input');
let clean=document.querySelector('#clean');
let undo=document.querySelector('#undo');
let perecentage=document.querySelector('#percentage');
let division=document.querySelector('#division');
let times=document.querySelector('#times');
let minus=document.querySelector('#minus');
let plus=document.querySelector('#plus');
let equals=document.querySelector('#equals');
let numbers=document.querySelectorAll('.numbers');
let dat=document.querySelector('#dat');
//-----------------------------------------------------------------

//define varibles for stor values
let numberPLus=[]
let numberTimes=[]
let numberDivide=[0,1]
let numberMinus=[]
var tempPlus,tempTimes,tempDivide,tempMinus
var tempDat=false
//-------------------------------------------------------------------
/* get values from calculator board on screen*/
numbers.forEach(item=>{
    
    item.onclick=()=>{
     
         if(tempDat===true){
            input.value+=item.textContent
        }
        else if((tempPlus===parseFloat(input.value) 
            || tempTimes===parseFloat(input.value) ||
             numberDivide[0]===parseFloat(input.value)||
              tempMinus===parseFloat(input.value)) && tempDat===false )
        {
            console.log(tempPlus)
           input.value=item.textContent
        }
         
        else input.value+=item.textContent
    }
})
//------------------------------------------------------------------------------
// backspace 
undo.onclick=()=>{
    let val=input.value
    let newVal=val.substr(0,val.length-1)
    input.value=newVal
    
}

// clear all values
clean.onclick=()=>{
    input.value=''
    box.textContent=''
    tempPlus=0
    tempMinus=0
    tempTimes=0
    numberDivide=[0,1]
    numberMinus=[]
    numberPLus=[]
    numberTimes=[]
}

// plus operation happen
plus.onclick=()=>{
    operation('plus')
}
 // times operation happen
times.onclick=()=>{
    operation('times')
}

// divide operation happen
division.onclick=()=>{
    operation('divide')
}

// minus operation happen
minus.onclick=()=>{
    operation('minus')
}
// click point (dat)
dat.onclick=()=>{
    let val=input.value
    input.value=val+'.'
    tempDat=true
}

// eauals operation happen
equals.onclick=()=>
{
    operation('equals')
}

perecentage.onclick=()=>{
    operation('perecentage')
}
// choose operaton to calcute expression
function operation(op){
   
        {
            switch (op) {
                case 'plus':
                    
                   if(tempPlus!==parseFloat(input.value))
                   {
                        let val=input.value
                        console.log(val)
                        print(val,'plus') // print value in label box
                        numberPLus.push(parseFloat(val))
                        // tempPlus=0
                        
                        tempMinus=0
                        tempTimes=0
                        tempDat=false
                        numberDivide=[0,1]
                        numberMinus=[]
                        // numberPLus=[]
                        numberTimes=[]
                        // addition values and store in tempPlus
                        tempPlus=numberPLus.reduce((sum,item)=>{
                            return sum+=item
                        })
                        //put tempPlus in input box for result of calculation
                        input.value=tempPlus
                        
                   }
                   
                    break;
            case 'times':
               
                    if(tempTimes!==parseFloat(input.value))
                       {
                            let val2=input.value
                            
                            print(val2,'times') // print value in label box
                            numberTimes.push(parseFloat(val2))
                            tempPlus=0
                            tempDat=false
                            tempMinus=0
                            // tempTimes=0
                            numberDivide=[0,1]
                            numberMinus=[]
                            numberPLus=[]
                            // numberTimes=[]
                            // Multiplication values and store in tempTimes
                            tempTimes=numberTimes.reduce((sum,item)=>{
                                return sum*=item
                            })
                         //put tempTimes in input box for result of calculation
                            input.value=tempTimes
                           
                        }

                        break;

            case 'divide':
                       let val4=input.value
                       print(val4,'divide') // print value in label box
                    
                       numberDivide.push(parseFloat(val4))
                       if(numberDivide.length<4)
                       {
                        
                        let newVal=numberDivide[numberDivide.length-1]/numberDivide[numberDivide.length-2]
                        input.value=newVal
                        numberDivide[0]=newVal
                        numberDivide.push(newVal)
                       }
                       
                     else if(numberDivide.length>4)
                      {
                            /* division values and store
                            in first index of numberDivison as storage*/
                        let newVal=numberDivide[numberDivide.length-2]/numberDivide[numberDivide.length-1]
                        //put newVal in input box for result of calculation
                        input.value=newVal
                        numberDivide[0]=newVal //store newVal in first index of Array
                        numberDivide.push(newVal) // put it in Array for next division
                      }
                            tempDat=false
                            tempPlus=0
                            tempMinus=0
                            tempTimes=0 
                            numberMinus=[]
                            numberPLus=[]
                            numberTimes=[]
                          
                    break;


                    case 'minus':
                        {
                            if(tempMinus!==parseFloat(input.value))
                            {
                                let val5=input.value
                                
                                print(val5,'minus') // print value in label box
                                numberMinus.push(parseFloat(val5))
                                tempPlus=0
                                tempDat=false
                                // tempMinus=0
                                tempTimes=0
                                numberDivide=[0,1]
                                // numberMinus=[]
                                numberPLus=[]
                                numberTimes=[]
                                //subtraction values and store in tempMinus
                                tempMinus=numberMinus.reduce((sum,item)=>{
                                    return sum-=item
                                })
                                //put tempMinus in input box for result of calculation
                                input.value=tempMinus
                                
                            }
                        }
                        break;


                        case 'equals':
                                let boxLength=box.textContent.length
                            //check if execution ends with + or * or / or - 
                            if(box.textContent[boxLength-1]==='+'){
                                let val6=input.value
                                print(val6,'equals')
                                input.value=tempPlus+parseFloat(val6)
                            }
                           else if(box.textContent[boxLength-1]==='*' ||
                                   box.textContent[boxLength-3]==='.'){
                                let val6=input.value
                                print(val6,'equals')
                                input.value=tempTimes*parseFloat(val6)
                            }
                           else if(box.textContent[boxLength-1]==='/'){
                                let val6=input.value
                                print(val6,'equals')
                                input.value=numberDivide[0]/parseFloat(val6)
                            }
                          else if(box.textContent[boxLength-1]==='-'){
                                let val6=input.value
                                print(val6,'equals')
                                input.value=tempMinus-parseFloat(val6)
                            }
                            tempDat=false
                            tempPlus=0
                            tempMinus=0
                            tempTimes=0
                            numberDivide=[0,1]
                            numberMinus=[]
                            numberPLus=[]
                            numberTimes=[]
                            break;
                            
                case 'perecentage':
                    let val7=input.value
                    let newVal7=parseFloat(val7)/100
                    print(newVal7,'perecentage')
                    input.value=newVal7
                default: 'invalid operator'
                    break;
            }
        }
}



const print=(val,op)=>{
    let boxLength=box.textContent.length
    //print operators
    switch (op) {
        case 'plus':
            //check if operation going to change or not
                    if(box.textContent[boxLength-1]!=='+' && boxLength>=2)
                    {
                        
                        let str = box.textContent.slice(0, -1) + '+'
                        box.textContent=str
                    }
                    else
                    box.textContent+=val+'+'
              
            break;


        case 'times':
             //check if operation going to change or not
            if(box.textContent[boxLength-1]!=='*' && boxLength>=2)
            {
                
                let str = box.textContent.slice(0, -1) + '*'
                box.textContent=str
            }
           else
                box.textContent+=val+'*'
                break;


        case 'divide':
             //check if operation going to change or not
                if(box.textContent[boxLength-1]!=='/' && boxLength>=2)
                {
                    let str = box.textContent.slice(0, -1) + '/'
                    box.textContent=str
                }
               else
                    box.textContent+=val+'/'
                    break;

        case 'minus':
                 //check if operation going to change or not
                 if(box.textContent[boxLength-1]!=='-' && boxLength>=2)
                {
                    let str = box.textContent.slice(0, -1) + '-'
                    box.textContent=str
                }

               else
                    box.textContent+=val+'-'
                    break;

        case 'equals':
                box.textContent+=val+'='
                break;
        case 'perecentage':
                // if(box.textContent[box.textContent.length-1]!=='%' && box.textContent.length>=2)
                // {
                //     let str = box.textContent.slice(0, -1) + '%'
                //     box.textContent=str
                // }

            //    else
                    box.textContent+=val+" "
                    break;
        default:  box.textContent='plz enter number'
            break;
    }
    
}



window.onkeydown=(evt)=>{

    switch (evt.key) {
        case '0':
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='0'
                  }
                  else input.value+='0'
            break;
        case '1':
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='1'
                  }
                  else input.value+='1'
                  break;
        case '2':
                        if(tempPlus===parseFloat(input.value) 
                        || tempTimes===parseFloat(input.value) ||
                         numberDivide[0]===parseFloat(input.value)||
                          tempMinus===parseFloat(input.value)) 
                          {
                              input.value='2'
                          }
                          else input.value+='2'
                          break;
                    
        case '3':
        
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='3'
                  }
                  else input.value+='3'
                  break;
        case '4':
        
                        if(tempPlus===parseFloat(input.value) 
                        || tempTimes===parseFloat(input.value) ||
                         numberDivide[0]===parseFloat(input.value)||
                          tempMinus===parseFloat(input.value)) 
                          {
                              input.value='4'
                          }
                          else input.value+='4'
                          break;
        case '5':
        
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value=''
                  }
                  else input.value+='5'
                  break;
        case '6':
        
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='6'
                  }
                  else input.value+='6'
                  break;
        case '7':
        
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='7'
                  }
                  else input.value+='7'
                  break;
        case '8':
        
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='8'
                  }
                  else input.value+='8'
                  break;
        case '9':
        
                if(tempPlus===parseFloat(input.value) 
                || tempTimes===parseFloat(input.value) ||
                 numberDivide[0]===parseFloat(input.value)||
                  tempMinus===parseFloat(input.value)) 
                  {
                      input.value='9'
                  }
                  else input.value+='9'
                  break;
        case 'Backspace':
                        let val=input.value
                        let newVal=val.substr(0,val.length-1)
                        input.value=newVal
                        break;
        case 'Delete':
                input.value=''
                box.textContent=''
                tempPlus=0
                tempMinus=0
                tempTimes=0
                numberDivide=[0,1]
                numberMinus=[]
                numberPLus=[]
                numberTimes=[]
                break;
        case '/':
            operation('divide')
            break;
        case '*':
            operation('times')
            break;
        case '-':
            operation('minus')
            break;
        case '+':
            operation('plus')
            break;
        case 'Enter':
            operation('equals')
            break;
        case '%':
            operation('perecentage')
            break;
        case '.':
                let v=input.value
                input.value=v+'.'
                break;
        default:'plz enter number'
            break;
    }

 
}







