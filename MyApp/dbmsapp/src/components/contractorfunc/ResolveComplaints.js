import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ResolveComplaints = ({user}) => {
    const [complaints, setComplaints] = useState([]);

    const getComplaints = async() => {
        const res = await axios.get('http://localhost:5000/resolveComplaints/add',{params:{
            mess: user.mess
        }});
        if (res.data.length !== 0){
            setComplaints(res.data);
        }else{
            setComplaints([])
        }
        
    }

    const resolve = (id) => {
        axios.post("http://localhost:5000/resolveComplaints/update", {id})
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        // getComplaints()
                        alert("Resolved Successfully");
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

    useEffect(() => {
        getComplaints()
    })

    return (
        <div>
            <h2>Complaints</h2>
            {complaints.length === 0 ? "No Complaints" : <div></div>}
            <ul>
                {complaints.map((complaint) => {
                    return(
                        <li key={complaint._id}>
                        Roll No: {complaint.roll} <br/>
                        type: {complaint.type} <br/>
                        detail: {complaint.detail}<br/>
                        <button  onClick={() => {resolve(complaint._id)}} className="btn btn-primary btn-block submit-btn">Resolved</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ResolveComplaints
