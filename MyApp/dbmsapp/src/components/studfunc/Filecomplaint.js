import React, { useState } from 'react'
import axios from 'axios';

const Filecomplaint = ({ user }) => {
    const [complaint, setUser] = useState({
        roll: user.roll,
        mess: user.mess,
        type: "",
        detail: ""
    })

    const fileComplaint = (e) => {
        e.preventDefault();
        if (complaint.roll.length === 0 || complaint.type.length === 0 || complaint.detail.length === 0) {
            alert("Fields are required");
            return;
        }
        axios.post("http://localhost:5000/complaint/add", complaint)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Comlplaint was filed successfully");
                        setUser({ ...complaint, type: "", detail: "" });
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

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...complaint,//spread operator 
            [name]: value

        })
    }
    return (
            <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h2 className="text-muted mb-4">File Complaint</h2>
                        </div>
                    </div>
                    <form onSubmit={fileComplaint}>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group focused">
                                        <input type="radio" checked={complaint.type === "foodquality"} id="foodquality" name="type" value="foodquality" onChange={handleChange} />
                                          <label className="form-control-label" htmlFor="foodquality">Food Quality</label><br />
                                        <input type="radio" checked={complaint.type === "datamismatch"} id="datamismatch" name="type" value="datamismatch" onChange={handleChange} />
                                          <label className="form-control-label" htmlFor="datamismatch">Data Mismatch</label><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group focused">
                                        <label htmlFor="text-complaint" className="form-control-label" >Explain your concern</label>
                                        <input type="text" id="text-complaint" name="detail" value={complaint.detail} placeholder="Explain the problem" onChange={handleChange} className="form-control form-control-alternative" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <input className="btn btn-sm btn-primary" type="submit" value="File Complaint" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Filecomplaint
