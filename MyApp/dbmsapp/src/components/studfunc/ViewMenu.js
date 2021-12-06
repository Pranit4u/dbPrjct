import React, { useState, useEffect } from 'react'
import { getCurrentDate } from '../../utils'
import axios from 'axios';

const ViewMenu = ({ user }) => {
    const date = getCurrentDate();
    const [menu, setMenu] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        extra: [],
        date: date
    });
    const [food, setFood] = useState({
        breakfast: "",
        lunch: "",
        dinner: "",
        extra: ""
    });

    const handleChange = e => {
        const { name, value } = e.target
        setFood({
            ...food,
            [name]: value
        })
    }

    useEffect(() => {
        getTodaysMenu()
    })

    const getTodaysMenu = async () => {
        const res = await axios.get('https://nitc-mess-manager.herokuapp.com/viewMenu/add');
        if (res.data.length !== 0) {
            setMenu(res.data[0]);
        }

    }

    const takeFood = (e) => {
        e.preventDefault();
        if (food.breakfast.length === 0 || food.lunch.length === 0 || food.dinner.length === 0) {
            alert("Select Every Field");
            return;
        }
        const data = {
            roll: user.roll,
            date: date,
            meal: food,
            mess: user.mess
        }

        axios.post("https://nitc-mess-manager.herokuapp.com/takeFood/add", data)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setFood({
                            breakfast: "",
                            lunch: "",
                            dinner: "",
                            extra: ""
                        });
                        alert("Food Taken");
                        break;
                    default:
                        alert("Something went wrong");
                        break;

                }
            })
            .catch((e) => {
                alert("Error in server");
                console.log("error catch ->" + e)
            })
    }

    return (
        <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h2 className="text-muted mb-4">View Menu</h2>
                        </div>
                    </div>
                    <form onSubmit={takeFood}>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group focused">
                                        <div>
                                            <h2 className="form-control-label">Breakfast</h2>
                                            <ul>
                                            {menu.breakfast.map((val, index) => {
                                                return (
                                                    <li>
                                                        {val}
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        </div>

                                        <div>
                                            <h2 className="form-control-label">Lunch</h2>
                                            <ul>
                                            {menu.lunch.map((val, index) => {
                                                return (
                                                    <li>
                                                        {val}
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className="form-control-label">Dinner</h2>
                                            <ul>
                                            {menu.dinner.map((val, index) => {
                                                return (
                                                    <li>
                                                        {val}
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className="form-control-label">Extras</h2>
                                            <ul>
                                            {menu.extra.map((val, index) => {
                                                return (
                                                    <li>
                                                        {val}
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                </div></div></div>
    )
}

export default ViewMenu
