import React, { useState } from 'react'
import axios from 'axios';

const GenerateBills = () => {
    const d = new Date;
    const date = d.getDate();
    return (
        date === 19 ? <Generate /> : <div>You can perform this action only at start of the month</div>
    )
   
}

const Generate = () => {
    const [cost, setCost] = useState()
    const [meals,setMeals] = useState([])
    const [bills, setBills] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setCost(value)
    }

    const generate = async(e) =>{
        e.preventDefault();
        if (cost < 0){
            alert("Enter valid value")
            return
        }
        let d = new Date()
        let m = d.getMonth()
        let y = d.getFullYear()
        const s = `${y}-${m<10?`0${m}`:`${m}`}-`
        const res = await axios.get('http://localhost:5000/bills/generate', {
            params: {
              sub: s
            }
          });
        setMeals(res.data)
        console.log(meals)
        let temp = {}
        meals.map((meal,index) => {
            if(temp[meal.roll]){
                temp[meal.roll] = Number(temp[meal.roll]) + Number(cost)
            }
            else{
                temp[meal.roll] = Number(cost)
            }
        })
        setBills(temp)
    }

    const upload = (e) => {
        e.preventDefault()
        if (cost < 0){
            alert("Enter valid value")
            return
        }
        axios.post("http://localhost:5000/bills/upload", {bills})
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setCost("");
                        alert("Bills Generated Successfully");
                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            })
            .catch((e) =>{ 
                console.log("error catch ->" + e)
            })
    }

    return (
        <div>
            <h2>Bills Section</h2>
        <form onSubmit={generate}>
            <div>
            Enter the food cost per day
            <input required={true} type="number" value={cost} onChange={handleChange} />
            </div>
            <div>
                <input type="submit" value="Generate" />
            </div>
        </form>

        {Object.keys(bills).length === 0 ? "No Bills" : 
            <ul>
            {Object.keys(bills).map((roll,index)=>{
                return(
                <li key={index}>
                    Roll No.<b> {roll} </b>: {bills[roll]} Rs.
                </li>
                )
            })}
            </ul>
        }
        <br/>
        <button onClick={upload}>Upload Bills</button>
        </div>
    )
}

export default GenerateBills
