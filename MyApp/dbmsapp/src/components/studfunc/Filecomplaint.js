import React, { useState } from 'react'
import axios from 'axios';

const Filecomplaint = ({user}) => {
    const [complaint, setUser] = useState({
        roll: user.roll,
        mess: user.mess,
        type: "",
        detail: ""
    })

    const fileComplaint = (e) => {
        e.preventDefault();
        if (complaint.roll.length === 0 || complaint.type.length === 0 || complaint.detail.length === 0){
            alert("Fields are required");
            return;
        }
        axios.post("http://localhost:5000/complaint/add", complaint)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Comlplaint was filed successfully");
                        setUser({...complaint, type: "", detail : ""});
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

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...complaint,//spread operator 
            [name]: value

        })
    }
    return (
        <div>
            <h3>Mention the complaint</h3>
            <form onSubmit={fileComplaint}>
            <input type="radio" checked={complaint.type === "foodquality"} id="foodquality" name="type" value="foodquality" onChange={handleChange}/>
              <label for="foodquality">Food Quality</label><br />
            <input type="radio" checked={complaint.type === "datamismatch"} id="datamismatch" name="type" value="datamismatch" onChange={handleChange}/>
              <label for="datamismatch">Data Mismatch</label><br />
            <input type="text" name="detail" value={complaint.detail} placeholder="Explain the problem" onChange={handleChange}>
            </input>
            <input type="submit" value="File Complaint" />
            </form>
        </div>
    )
}

export default Filecomplaint
