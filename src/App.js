import{useState,useEffect} from 'react'
import React from 'react';
import logo from './logo.svg'
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPerson } from "react-icons/go"
import './App.css';
import buttons from './buttons'



function App() {
      const[bill,setBill] = useState('')
      const[number,setNumber] = useState('')
      const[tip,setTip] = useState('0.00')
      const [custom,setCustom] = useState('')
      const[total,setTotal] = useState('0.00')
      const [activeButton, setActiveButton] = useState(0)
    useEffect(
      () => {
        let a = (bill / number).toFixed(2);
        if(custom){
          const percentageOfBill = (custom/100)*bill 
          const tipPerPerson = (percentageOfBill /number).toFixed(2)
          setTip(tipPerPerson);
          const tot = parseFloat(tipPerPerson) + parseFloat(bill/number)
          console.log(tot)
          setTotal(tot.toFixed(2))
        }
        else if(bill ==='0' || number ==='0' || bill==='' || number===''){
          setTotal('0.00')
        }
        else{
        setTotal(a)}
      },[bill,number,custom]
    )

    const tipFunction = (id) =>{
         buttons.map(button=>{
           if(button.id === id){
            const percentageOfBill = (button.value/100)*bill 
            const tipPerPerson = (percentageOfBill /number).toFixed(2)
            setTip(tipPerPerson);
            const tot = parseFloat(tipPerPerson) + parseFloat(bill/number)
            console.log(tot)
            setTotal(tot.toFixed(2))
           }
           return button;
         })    
    }
  
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
             <input type='text'  value={bill} onChange={e=>setBill(e.target.value)} className='input-width'></input>
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
                        tipFunction(id)
                        }
                       } 
                        className={`bg ${activeButton === index ? 'bg-2' : null}`} >{value}%</button>
                     )
                   })}
                   <input className="custom" type='text' placeholder='Custom' autoFocus={false} onChange={e=>setCustom(e.target.value)}></input>
              </div>
         </div>
         <div className='number' >
           <p className='text number-of-people'>Number of People<span className={number==='0'?'zero':'notZero'}>Number Cant be zero</span></p>
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
