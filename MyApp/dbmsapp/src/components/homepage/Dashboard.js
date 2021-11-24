import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = ({user, setLoginUser}) => {
    let navigate = useNavigate();

    const logout = () => {
        setLoginUser({});
        navigate('/');
    }
    return (
        <div>
        <div>
            <a>this is dashboard of {user.email} hi.</a>
            <h3>this is a {user.isStud ? "Student" : "Contractor"}</h3>
        </div>

        <div>
            {user.isStud ? 
            <ul>
                <li><button onClick={logout}>LogOut</button></li>
                <li><nav><Link to="/payBills">Pay Bill</Link></nav></li>
                <li><nav><Link to="/viewMenu">Take Food</Link></nav></li>
                <li><nav><Link to="/viewMenu">View Menu</Link></nav></li>
                <li><nav><Link to="/chooseMess">Choose Mess</Link></nav></li>
                <li><nav><Link to="/profile">Profile</Link></nav></li>
                <li><nav><Link to="/changePassword">Change Password</Link></nav></li>
                <li><nav><Link to="/fileComplaint">File Complaint</Link></nav></li>
            </ul> : 

            <ul>
                <li><button onClick={logout}>LogOut</button></li>
                <li>Feed Details</li>
                <li><nav><Link to="/generateBills">Generate Bills</Link></nav></li>
                <li><nav><Link to="/resolveComplaints">Resolve Complaints</Link></nav></li>
                <li><nav><Link to="/giveFood">Give Food</Link></nav></li>
                <li>Mark Entries</li>
                
            </ul> 

            }
            

        </div>
        </div>
    )
}

export default Dashboard
