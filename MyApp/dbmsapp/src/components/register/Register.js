import React, { useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        batch: "",
        roll: "",
        mess: "",
        mob: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value

        })

    }

    //register function 
    const register = (e) => {
        e.preventDefault()
        const { firstname, lastname, batch, roll, mess, mob, email, password } = user;
        if (firstname.length === 0 || lastname.length === 0 || mob.length !== 10 || email.length === 0 || password.length == 0 || mess.length === 0 || batch.length === 0 || roll.length === 0) {
            alert("invalid details");
            return;
        }
        axios.post("http://localhost:5000/register/add", user)
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Bills Generated Successfully");
                        navigate('/login');

                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            })

    }



    return (
        <>

            <div>
                <div>
                    Create a new account
                </div>
                <span>
                    Already have an account ?
                    <nav>
                        <Link to="/login">Sign In</Link>
                    </nav>
                </span>
                <div>
                    <form onSubmit={register}>
                            <div>
                                <input type="text" id="create-account-firstname" name="firstname" value={user.firstname} onChange={handleChange} placeholder="First Name" />
                            </div>
                            <div>
                                <input type="text" id="create-account-lastname" name="lastname" value={user.lastname} onChange={handleChange} placeholder="Last Name" />
                            </div>
                            <div>
                                <input type="text" id="create-account-mob" name="mob" value={user.mob} onChange={handleChange} placeholder="Mobile No" />
                            </div>
                            <div>
                                <input type="text" id="create-account-roll" name="roll" value={user.roll} onChange={handleChange} placeholder="Roll No" />
                            </div>
                            <div>
                                Batch<br/>
                                <input type="radio" id="A" name="batch" value="A" onChange={handleChange}/>
                                    <label for="A">A</label>
                                <input type="radio" id="B" name="batch" value="B" onChange={handleChange}/>
                                    <label for="B">B</label>
                            </div>
                            <div>
                                Mess<br/>
                                <input type="radio" id="A" name="mess" value="A" onChange={handleChange}/>
                                    <label for="A">A</label>
                                <input type="radio" id="B" name="mess" value="B" onChange={handleChange}/>
                                    <label for="B">B</label>
                            </div>
                            <div>
                                <input type="text" id="create-account-email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                            </div>
                            <div>
                                <input type="password" id="create-account-password" name="password" value={user.password} onChange={handleChange} placeholder="password" />
                            </div>
                        <div>
                            <input name="Register" type="submit" />
                        </div>
                    </form>


                </div>
            </div>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                </nav>
            </div>
        </>
    )

}

export default Register
