import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PayBills = ({user}) => {
    const [bills, setBills] = useState([]);

    useEffect ( () => {

        getBills()

    });

    let navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    }

    const getBills = async() =>{
        const res = await axios.get('https://nitc-mess-manager.herokuapp.com/bills/get', {
            params: {
              roll: user.roll
            }
          });
        if (res.data.length !== 0){
            setBills(res.data);
        }
    }

    

    return (
        <div style={{paddingTop:15}}>
        {bills.length === 0 ? <div style={{ textAlign: "center" }}>
        <b >No Dues Till Now</b><br/><br/>
        <button onClick={goBack}  className="btn btn-sm btn-primary">Go Back</button>
    </div>
     :
        <div style={{color:"white"}}>
            <a>Unpaid Bills</a><br/>
            <ul>
            {bills.map((bill,index) => {
                return(
                    <li key={index}>
                        Amount: {bill.amount}<br/>
                        Month: {bill.month}
                        <br/>
                    </li>
                )
            })}
            </ul>
        <button onClick={goBack}  className="btn btn-sm btn-primary">Go Back</button>
        </div>}
        </div>
    )
}

export default PayBills
