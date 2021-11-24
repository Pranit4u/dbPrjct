import React, { useState } from 'react'
import '../../App.css';
import axios from 'axios';


const ChangePassword = ({user, setLoginUser}) => {
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
        if(u.newPassword1 !== u.newPassword2){
            alert("Incorrect new password entry");
            return;
        }
        axios.post("http://localhost:5000/changePassword/add", u)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setLoginUser({...user,password: u.newPassword1});
                        alert("Password Changed Successfully");
                        setUser({...u,oldPassword: "", newPassword1: "", newPassword2:""});
                        break;
                    case "0":
                        alert("Invalid Old Password");
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


        return (
            <div className="card login-form">
                <div className="card-body">
                    <h3 className="card-title text-center">Change password</h3>


                    <div className="card-text">
                        <form onSubmit={savePassword}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Your old password</label>
                                <input type="password" name="oldPassword" value={u.oldPassword} onChange={handleChange} className="form-control form-control-sm"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Your new password</label>
                                <input type="password" name="newPassword1" minLength={6} value={u.newPassword1} onChange={handleChange} className="form-control form-control-sm"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Repeat new password</label>
                                <input type="password" name="newPassword2" minLength={6} value={u.newPassword2} onChange={handleChange} className="form-control form-control-sm"/>
                            </div>
                            <input type="submit" value="Confirm" className="btn btn-primary btn-block submit-btn"/>
                        </form>
                    </div>
                </div>
            </div>
        )

}

export default ChangePassword

