import React, { useState, useEffect } from 'react'
import { getCurrentDate } from '../../utils'
import axios from 'axios';

const ViewMenu = ({ user }) => {
    const date = getCurrentDate();
    const [menu, setMenu] = useState({
        breakfast: ["11", "11"],
        lunch: ["11", "11"],
        dinner: ["11", "11"],
        extra: ["11", "11"],
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
        const res = await axios.get('http://localhost:5000/viewMenu/add');
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

        axios.post("http://localhost:5000/takeFood/add", data)
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
                            <h2 className="text-muted mb-4">Take Food</h2>
                        </div>
                    </div>
                    <form onSubmit={takeFood}>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group focused">
                                        <div>
                                            <h2 className="form-control-label">Choose Breakfast</h2>
                                            {menu.breakfast.map((val, index) => {
                                                return (
                                                    <div>
                                                        <input type="radio" checked={food.breakfast === val} id={val} name="breakfast" value={val} onChange={handleChange} />
                                                        <label className="form-control-label" htmlFor={val}>{val}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div>
                                            <h2 className="form-control-label">Choose Lunch</h2>
                                            {menu.lunch.map((val, index) => {
                                                return (
                                                    <div>
                                                        <input type="radio" checked={food.lunch === val} id={val} name="lunch" value={val} onChange={handleChange} />
                                                        <label className="form-control-label" htmlFor={val}>{val}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div>
                                            <h2 className="form-control-label">Choose dinner</h2>
                                            {menu.dinner.map((val, index) => {
                                                return (
                                                    <div>
                                                        <input type="radio" checked={food.dinner === val} id={val} name="dinner" value={val} onChange={handleChange} />
                                                        <label className="form-control-label" htmlFor={val}>{val}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div>
                                            <h2 className="form-control-label">Choose Extras</h2>
                                            {menu.extra.map((val, index) => {
                                                return (
                                                    <div>
                                                        <input type="radio" checked={food.extra === val} id={val} name="extra" value={val} onChange={handleChange} />
                                                        <label className="form-control-label" htmlFor={val}>{val}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input className="btn btn-sm btn-primary" type="submit" />
                    </form>
                </div></div></div>
    )
}

export default ViewMenu
