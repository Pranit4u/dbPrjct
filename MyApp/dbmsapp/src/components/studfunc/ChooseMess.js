import React, { useState } from 'react'
import axios from 'axios';

const ChooseMess = ({user, setLoginUser}) => {
    const d = new Date;
    const date = d.getDate();
    console.log(user)
    return (
        date === 19 ? <Choose user={user} setLoginUser = {setLoginUser} /> : <div>You can perform this action only at start of the month</div>
    )
}

const Choose = ({user, setLoginUser}) => {
    const [mess, setMess] = useState(user.mess)
    const handleChange = e => {
        const { name, value } = e.target
        setMess(value)
    }

    const chooseMess = (e) =>{
        e.preventDefault();
        if (mess === ""){
            alert("Choose a mess");
        }
        axios.post("http://localhost:5000/update/add", {...user,mess: mess})
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setMess("");
                        setLoginUser({...user,mess: mess});
                        alert("Mess Chosen Successfully");
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

    return(
        <div>
            <h3>Choose Mess </h3>
            <form onSubmit={chooseMess}>
            <input type="radio" checked={mess === "A"} id="A" name="mess" value="A" onChange={handleChange}/>
              <label for="A">A</label><br />
            <input type="radio" checked={mess === "B"} id="B" name="mess" value="B" onChange={handleChange}/>
              <label for="B">B</label><br />
            <input type="submit" value="Choose" />
            </form>
        </div>
    )
}

export default ChooseMess
