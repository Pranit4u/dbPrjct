import React, { useState } from 'react'
import '../../App.css';
import axios from 'axios';


const Profile = ({user, setLoginUser}) => {
    const [u, setUser] = useState(user);
    const [canEdit, setCanEdit] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...u,//spread operator 
            [name]: value

        })
    }

    const save = () => {
        if(u.firstname.length === 0 || u.lastname.length === 0 || u.mob.length !== 10){
            alert("Invalid Data");
            return;
        }
        axios.post("http://localhost:5000/update/add", u)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        setCanEdit(false);
                        setLoginUser(u);
                        
                        alert("User Updated Successfully");
                        break;
                    case "0":
                        alert("Something went wrong");
                        break;
                }
            })
            .catch((e) =>{ 
                console.log("error catch ->" + e)
            })
    }

    const allowEdit = () =>{
        setCanEdit(true);
    }

    return (
        <body>
            <div className="main-content">
                <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                    <div className="container-fluid">
                    <b>User profile</b>
                        <ul className="navbar-nav align-items-center d-none d-md-flex">
                            <li className="nav-item dropdown">
                                <div className="nav-link pr-0">
                                    <div className="media align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img alt="Image placeholder" src="https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg"/>
                                        </span>
                                        <div className="media-body ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm  font-weight-bold">{user.firstname + " " + user.lastname}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"  style={{minHeight: 600,  backgroundPosition: "center top", backgroundSize: "cover"}}>
                    <span className="mask bg-gradient-default opacity-8"></span>
                    <div className="container-fluid d-flex align-items-center">
                        <div className="row">
                            <div className="col-lg-7 col-md-10">
                                <h1 className="display-2 text-white">Hello {user.roll}</h1>
                                <p className="text-white mt-0 mb-5">This is your profile page. You can change your personal details.</p><br/>
                                <button onClick={allowEdit} className="btn btn-info">Edit profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt--7">
                    <div className="row">
                        <div className="col-xl-8 order-xl-1">
                            <div className="card bg-secondary shadow">
                                <div className="card-header bg-white border-0">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h3 className="mb-0">My account</h3>
                                        </div>
                                        <div className="col-4 text-right">
                                            <button onClick={save} className="btn btn-sm btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">User information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" for="input-username">Username</label>
                                                        <input type="text" disabled={true} id="input-username" className="form-control form-control-alternative" placeholder="Username" value={u.roll} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="input-email">Email address</label>
                                                        <input type="email" disabled={true} id="input-email" className="form-control form-control-alternative" placeholder="jesse@example.com" value={u.email}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" for="input-first-name">First name</label>
                                                        <input type="text" name="firstname" disabled={!canEdit} id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value={u.firstname} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" for="input-last-name">Last name</label>
                                                        <input type="text" name="lastname" disabled={!canEdit} id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" value={u.lastname} onChange={handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" for="input-mess">Mess</label>
                                                        <input type="text" disabled={true} id="input-mess" className="form-control form-control-alternative" placeholder="Mess" value={u.mess}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group focused">
                                                        <label className="form-control-label" for="input-batch">Batch</label>
                                                        <input type="text" disabled={true} id="input-batch" className="form-control form-control-alternative" placeholder="Batch" value={u.batch}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className ="heading-small text-muted mb-4">Contact information</h6>
                                        <div className ="pl-lg-4">
                                        <div className ="row">
                                        <div className ="col-lg-4">
                                        <div className ="form-group focused">
                                        <label className ="form-control-label" for="input-mobile">Mobile No</label>
                                        <input type = "number" name="mob" disabled={!canEdit} id="input-mobile" className ="form-control form-control-alternative" placeholder="Mobile No" value={u.mob} onChange={handleChange}/>
                                        </div>
                                        </div>

                                        </div>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body> 
  )
}

export default Profile
