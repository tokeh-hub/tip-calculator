import{useState,useEffect} from 'react'
import React from 'react';
import logo from './assets/logo.svg'
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPerson } from "react-icons/go"
import './App.css';
import buttons from './buttons'

function App() {
     //Declare state values of different variables
      const[bill,setBill] = useState('')
      const[number,setNumber] = useState('')
      const[tip,setTip] = useState('0.00')
      const [custom,setCustom] = useState('')
      const[total,setTotal] = useState('0.00')
      const [activeButton, setActiveButton] = useState(0)
   
      //  Calculate and update total and tip amounts as bills,number and custom value changes
    useEffect(
      () => {
        if(custom && bill && number){
          setActiveButton(null)
          const percentageOfBill = (custom/100)*bill 
          const tipPerPerson = (percentageOfBill /number).toFixed(2)
          setTip(tipPerPerson);
          const tot = parseFloat(tipPerPerson) + parseFloat(bill/number)
          console.log(tot)
          setTotal(tot.toFixed(2))
        }
        if(bill < 0 || number < 0){return;}
        if(bill === '' || number==='' || number==='0' || bill==='0'){setTip('0.00');setTotal('0.00')}
        else{
        setTotal((bill / number).toFixed(2))}
      },[bill,number,custom]
    )

    // Calculate and update total and tip amounts as bills,number and activeButton changes
  
   useEffect(()=>{
     if(bill && number && bill > 0 && number>0){
     buttons.map((button,index)=>{
       if(activeButton===index){
        const percentageOfBill = (button.value/100)*bill
        const tipPerPerson = (percentageOfBill /number).toFixed(2)
        const tot = parseFloat(tipPerPerson) + parseFloat(bill/number)
        setTip(tipPerPerson);
        setTotal(tot.toFixed(2))
       }
       return button 
     })}
   },[bill,number,activeButton])

  //  tipFunction

    const tipFunction = (id) =>{
      if(number <= 0 || bill <= 0){return;}
         buttons.map((button)=>{
           if(button.id === id ){
            const percentageOfBill = (button.value/100)*bill 
            const tipPerPerson = (percentageOfBill /number).toFixed(2)
            setTip(tipPerPerson);
            const tot = parseFloat(tipPerPerson) + parseFloat(bill/number)
            setTotal(tot.toFixed(2))
           }
           return button;
         })    
    }
  
    // reset to default
    
    const resetBills = ()=>{
      setBill('');
      setNumber('');
      setTip('0.00')
      setTotal('0.00')
    }
      
  return (
    <>
    <img src={logo} alt='logo'></img>
    <div className='container'>
        <section className='first'>
            <div className='bill'>
                <p className='text'>Bill</p>
                <div className='form-container'>
                    <BsCurrencyDollar className='icon icon-dollar'/>
                    <input type='text' 
                       value={bill} 
                       onChange={e=>{
                       //  regex that matches only numbers
                       const re = /^[0-9\b]+$/;
                       //  check if input value is either empty or matches the regex:
                       if(re.test(e.target.value) || e.target.value === '')
                       {setBill(e.target.value)}
                       }} 
                       className='input-width'>
                    </input>
                </div>
         </div>
         <div >
             <p className='text'>Select Tip %</p>
              <div className='buttons'>
                   {buttons.map((button,index)=>{
                     const{id,value} = button
                     return(
                       <button key={id} onClick={()=>{
                         setActiveButton(index)
                         tipFunction(id);

                        }
                       } 
                        className={`bg ${activeButton === index ? 'bg-2' : null}`} >{value}%</button>
                     )
                   })}
                   <input className="custom" type='text' placeholder='Custom' autoFocus={false} onChange={e=>setCustom(e.target.value)}></input>
              </div>
         </div>
         <div className='number' >
           <p className='text number-of-people'>Number of People<span className={number==='0'?'zero':'notZero'}>Cant be zero</span></p>
           <div className='form-container2'>
             <GoPerson className='icon icon-person'/>
           <input type='number'className='number-input input-width' min='0'  value={number} onChange={e=>setNumber(e.target.value)} ></input>
           </div>
         </div>
        </section>
        <section className='second'>
        <div className='tip'>
           <div>
            <h5>Tip Amount</h5>
            <p className='text'>/ person</p>
           </div>
           <h2>${tip}</h2>
         </div>
         <div className='total'>
           <div>
            <h5>Total</h5>
            <p className='text'>/ person</p>
           </div>
           <h2>${total}</h2>
         </div>
         <button className='reset' onClick={resetBills}>Reset</button>
        </section>

    </div>
    </>
  )
}

export default App;
