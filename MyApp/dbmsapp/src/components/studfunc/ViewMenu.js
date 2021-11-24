import React, { useState, useEffect } from 'react'
import {getCurrentDate} from '../../utils'
import axios from 'axios';

const ViewMenu = ({user}) => {
    const date = getCurrentDate();
    const [menu, setMenu] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        date: date
    });
    const [food, setFood] = useState({
        breakfast: "",
        lunch: "",
        dinner: "",
    });

    const handleChange = e => {
        const { name, value } = e.target
        setFood({
            ...food,//spread operator 
            [name]: value
        })
    }

    useEffect(() => {
        getTodaysMenu()
    })

    const getTodaysMenu = async() => {
        const res = await axios.get('http://localhost:5000/viewMenu/add');
        if (res.data.length !== 0){
            setMenu(res.data[0]);
        }
        
    }

    const takeFood = (e) => {
        e.preventDefault();
        if(food.breakfast.length === 0 || food.lunch.length === 0 || food.dinner.length === 0){
            alert("Select Every Field");
            return;
        }
        const data = {
            roll: user.roll,
            date: date,
            meal: food
        }
        
        axios.post("http://localhost:5000/takeFood/add", data)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setFood({
                            breakfast: "",
                            lunch: "",
                            dinner: "",
                        });
                        alert("Food Taken");
                        break;
                    default:
                        alert("Something went wrong");
                        break;
            
                }
            })
            .catch((e) =>{ 
                alert("Error in server");
                console.log("error catch ->" + e)
            })
    }
    
    return (
        <form onSubmit={takeFood}>
            <div>
                take Extras
            </div>
            <div>
                Choose breakfast<br/>
                    {menu.breakfast.map((val,index) => {
                        return (
                            <div>
                            <input type="radio" checked={food.breakfast === val} id={val} name="breakfast" value={val} onChange={handleChange}/>
                                <label htmlFor={val}>{val}</label>
                            </div>
                        )
                    })}
            </div>
            <div>
                Choose lunch<br/>
                    {menu.lunch.map((val,index) => {
                        return (
                            <div>
                            <input type="radio" checked={food.lunch === val} id={val} name="lunch" value={val} onChange={handleChange} />
                                <label htmlFor={val}>{val}</label>
                            </div>
                        )
                    })}
            </div>
            <div>
                Choose dinner<br/>
                    {menu.dinner.map((val,index) => {
                        return (
                            <div>
                            <input type="radio" checked={food.dinner === val} id={val} name="dinner" value={val} onChange={handleChange}/>
                                <label htmlFor={val}>{val}</label>
                            </div>
                        )
                    })}
            </div>
            <input type="submit" />
            
        </form>
    )
}

export default ViewMenu
