import React, { useState } from 'react'
import '../../App.css';
import axios from 'axios';


const ChangePassword = ({ user, setLoginUser }) => {
    const [u, setUser] = useState({
        roll: user.roll,
        oldPassword: "",
        newPassword1: "",
        newPassword2: ""
    });

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...u,//spread operator 
            [name]: value

        })
    }

    const savePassword = (e) => {
        e.preventDefault();
        if (u.newPassword1 !== u.newPassword2) {
            alert("Incorrect new password entry");
            return;
        }
        axios.post("https://nitc-mess-manager.herokuapp.com/changePassword/add", u)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setLoginUser({ ...user, password: u.newPassword1 });
                        alert("Password Changed Successfully");
                        setUser({ ...u, oldPassword: "", newPassword1: "", newPassword2: "" });
                        break;
                    case "0":
                        alert("Invalid Old Password");
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
                            <h2 className="text-muted mb-4">Change Password</h2>
                        </div>
                    </div>

                    <div className="card-text">
                        <form onSubmit={savePassword}>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="oldPassword">Your old password</label>
                                <input type="password" id="oldPassword" name="oldPassword" value={u.oldPassword} onChange={handleChange} className="form-control form-control-sm" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="newPassword1">Your new password</label>
                                <input type="password" id="newPassword1" name="newPassword1" minLength={6} value={u.newPassword1} onChange={handleChange} className="form-control form-control-sm" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="newPassword2">Repeat new password</label>
                                <input type="password" id="newPassword1" name="newPassword2" minLength={6} value={u.newPassword2} onChange={handleChange} className="form-control form-control-sm" />
                            </div>
                            <input type="submit" value="Confirm" className="btn btn-primary btn-block submit-btn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ChangePassword

