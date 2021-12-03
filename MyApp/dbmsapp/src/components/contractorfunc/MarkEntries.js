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
        const res = await axios.get('https://nitc-mess-manager.herokuapp.com/takeFood/get', {
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
            <a style={{color:"black", fontSize:30}}>Mark Entry</a>
            {meals.length === 1 ? <h3>No meals taken today yet</h3> : 
                <div style={{color:'black'}}>
                <ol>
                    {meals.map((meal,index) => {
                    return(
                        <div>
                        <li key={index}>
                            Roll: <a style={{color:"whiteSmoke"}}>{meal.roll}</a><br/>
                            Breakfast: <a style={{color:"whiteSmoke"}}>{meal.meal.breakfast}</a><br/>
                            Lunch: <a style={{color:"whiteSmoke"}}>{meal.meal.lunch}</a><br/>
                            Dinner: <a style={{color:"whiteSmoke"}}>{meal.meal.dinner}</a>
                        </li>
                        <br/>
                        </div>
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
