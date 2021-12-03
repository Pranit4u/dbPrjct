import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = ({user, setLoginUser}) => {
    let navigate = useNavigate();

    const logout = () => {
        setLoginUser({});
        navigate('/');
    }
    return (
        // <div style={{minHeight:721, backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg')", backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
        <div>
        <Navbar logout={logout} user={user}/>
        <div style={{paddingLeft:28,paddingRight:45}}>
        <div style={{textAlign:"end", color:"#F9F6EE"}}>
            <a>Welcome <b>{user.firstname}</b> <br/>
            This is a {user.isStud ? "Student" : "Contractor"} dashboard</a>
        </div>

        <div style={{color:"white"}}>
            {user.isStud ? 
            <ul>
                <li><nav><Link to="/chooseMess"style={{color:"white"}}>Choose Mess</Link></nav></li><br/>
                <li><nav><Link to="/viewMenu"style={{color:"white"}}>View Menu</Link></nav></li><br/>
                <li><nav><Link to="/takeFood"style={{color:"white"}}>Take Food</Link></nav></li><br/>
                <li><nav><Link to="/payBills" style={{color:"white"}}>Pay Bill</Link></nav></li><br/>
                <li><nav><Link to="/fileComplaint"style={{color:"white"}}>File Complaint</Link></nav></li><br/>
                <li><nav><Link to="/changePassword"style={{color:"white"}}>Change Password</Link></nav></li><br/>
            </ul> : 

            <ul>
                 <li><nav><Link to="/feedDetails" style={{color:"white"}}>Feed Details</Link></nav></li><br/>
                <li><nav><Link to="/giveFood"style={{color:"white"}}>Give Food</Link></nav></li><br/>
                <li><nav><Link to="/markEntries"style={{color:"white"}}>Mark Entries</Link></nav></li><br/>
                <li><nav><Link to="/generateBills"style={{color:"white"}}>Generate Bills</Link></nav></li><br/>
                <li><nav><Link to="/resolveComplaints"style={{color:"white"}}>Resolve Complaints</Link></nav></li><br/>
                
            </ul> 

            }
            

        </div>
        </div>
        </div>
    )
}

export default Dashboard
