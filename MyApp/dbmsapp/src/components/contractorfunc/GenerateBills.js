import React, { useState } from 'react'
import axios from 'axios';

const GenerateBills = ({user}) => {
    const d = new Date;
    const date = d.getDate();
    return (
        date === 1 ? <Generate user={user}/> : <div>You can perform this action only at start of the month</div>
    )
}

const Generate = ({user}) => {
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
        const res = await axios.get('https://nitc-mess-manager.herokuapp.com/bills/generate', {
            params: {
              sub: s,
              mess: user.mess
            }
          });
        setMeals(res.data)
        console.log(meals)
        let temp = {}
        meals.map((meal,index) => {
            if(temp[meal.roll]){
                temp[meal.roll] = Number(temp[meal.roll]) + Number(cost)
                if(meal.meal.extra !== ""){
                    temp[meal.roll] = Number(temp[meal.roll]) + 20
                }
            }
            else{
                temp[meal.roll] = Number(cost)
                if(meal.meal.extra !== ""){
                    temp[meal.roll] = Number(temp[meal.roll]) + 20
                }
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
        axios.post("https://nitc-mess-manager.herokuapp.com/bills/upload", {bills})
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
        <div style={{color:"white"}}>
            <a style={{fontSize:30}}>Bills Section</a>
        <form onSubmit={generate}>
            <div>
            Enter the food cost per day (in Rs.): 
            <input required={true} type="number" value={cost} onChange={handleChange} />
            </div>
            <div>
                <input className="btn btn-sm btn-primary" type="submit" value="Generate" />
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
        <button className="btn btn-sm btn-primary" onClick={upload}>Upload Bills</button>
        </div>
    )
}

export default GenerateBills
