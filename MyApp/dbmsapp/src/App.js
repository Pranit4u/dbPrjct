import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login'
import Register from './components/register/Register';
import Dashboard from './components/homepage/Dashboard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Filecomplaint from './components/studfunc/Filecomplaint';
import ChangePassword from './components/studfunc/ChangePassword';
import Profile from './components/studfunc/Profile';
import ChooseMess from './components/studfunc/ChooseMess';
import ViewMenu from './components/studfunc/ViewMenu';
import PayBills from './components/studfunc/PayBills';
import ResolveComplaints from './components/contractorfunc/ResolveComplaints';
import GiveFood from './components/contractorfunc/GiveFood';
import GenerateBills from './components/contractorfunc/GenerateBills';
import FeedDetails from './components/contractorfunc/FeedDetails';
import MarkEntries from './components/contractorfunc/MarkEntries';

function App() {

  const [user, setLoginUser] = useState({
  })

  return (
    <div style={{minHeight:721, backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <Router>
        <Routes>
          <Route path="/" element={user && user.email ? <Dashboard user={user} setLoginUser={setLoginUser} /> : <ToLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedDetails" element={<FeedDetails user={user} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/fileComplaint" element={<Filecomplaint user={user} />} />
          <Route path="/changePassword" element={<ChangePassword user={user} setLoginUser={setLoginUser} />} />
          <Route path="/profile" element={<Profile user={user} setLoginUser={setLoginUser} />} />
          <Route path="/chooseMess" element={<ChooseMess user={user} setLoginUser={setLoginUser} />} />
          <Route path="/viewMenu" element={<ViewMenu user={user} />} />
          <Route path="/payBills" element={<PayBills user={user} />} />
          <Route path="/resolveComplaints" element={<ResolveComplaints user={user} />} />
          <Route path="/giveFood" element={<GiveFood user={user} />} />
          <Route path="/generateBills" element={<GenerateBills user={user} />} />
          <Route path="/markEntries" element={<MarkEntries user={user} />} />

        </Routes>
       </Router>
    </div>

  );
}

function ToLogin() {
  return (
<div style={{ color: "white", textAlign:"center"}}>
  You are logged out!<br/><br/>
<Link to="/login" style={{ color: "white" }} className="btn btn-sm btn-primary">Log In </Link>

</div>
  )
}

export default App;
