import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChooseMess = ({ user, setLoginUser }) => {
    const d = new Date;
    const date = d.getDate();
    console.log(user)
    return (
        
        date === 7 ? <Choose user={user} setLoginUser={setLoginUser} /> : <Temp />
    )
}

const Choose = ({ user, setLoginUser }) => {
    let navigate = useNavigate();
    const [mess, setMess] = useState(user.mess)
    const handleChange = e => {
        const { name, value } = e.target
        setMess(value)
    }

    const chooseMess = (e) => {
        e.preventDefault();
        if (mess === "") {
            alert("Choose a mess");
        }

        axios.post("https://nitc-mess-manager.herokuapp.com/update/add", { ...user, mess: mess })
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setMess("");
                        setLoginUser({ ...user, mess: mess });
                        alert("Mess Chosen Successfully");
                        navigate('/');
                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            })
            .catch((e) => {
                console.log("error catch ->" + e)
            })
            
    }

    return (
        <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h2 className="text-muted mb-4">Choose Mess</h2>
                        </div>
                    </div>
                    <form onSubmit={chooseMess}>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group focused">
                                        <input type="radio" checked={mess === "A"} id="A" name="mess" value="A" onChange={handleChange} />
                                        <label className="form-control-label" htmlFor="A">A</label><br />
                                        <input type="radio" checked={mess === "B"} id="B" name="mess" value="B" onChange={handleChange} />
                                        <label className="form-control-label" htmlFor="B">B</label><br />
                                        <input className="btn btn-sm btn-primary" type="submit" value="Choose" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const Temp = () => {
    let navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    }
    return (
        <div>
            <h1 style={{ textAlign: "center", color:"white"}}>You can perform this action only at start of the month</h1>
            <button onClick={goBack} style={{ marginLeft: "45%" }} className="btn btn-sm btn-primary">Go Back</button>
        </div>
    )
}

export default ChooseMess
