import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getCurrentDate } from '../../utils'
import { useNavigate } from 'react-router-dom';


const MarkEntries = ({user}) => {
    const date = getCurrentDate();
    const [meals, setMeals] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getMeals()
    });

    const markEntries = (e) =>{
        alert("Entries are marked");
        navigate('/');
    } 

    const getMeals = async() =>{
        const res = await axios.get('http://localhost:5000/takeFood/get', {
            params: {
              mess: user.mess, date:date
            }
          });
        if (res.data.length !== 0){
            setMeals(res.data);
        }
    }

    return (
        <div>
            <a style={{fontSize:30}}>Mark Entry</a>
            {meals.length === 1 ? <h3>No meals taken today yet</h3> : 
                <div style={{color:'white'}}>
                <ol>
                    {meals.map((meal,index) => {
                    return(
                        <li key={index}>
                            Roll: {meal.roll}<br/>
                            Breakfast: {meal.meal.breakfast}<br/>
                            Lunch: {meal.meal.lunch}<br/>
                            Dinner: {meal.meal.dinner}
                        </li>
                    )
                })}
                </ol>
                <button type="button" className="btn btn-sm btn-primary" onClick={markEntries}>Mark Entries</button>
                </div>
            }

        </div>
)
}

export default MarkEntries
