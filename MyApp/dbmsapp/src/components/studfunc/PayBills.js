import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PayBills = ({user}) => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        getBills()
    });

    let navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    }

    const getBills = async() =>{
        const res = await axios.get('http://localhost:5000/bills/get', {
            params: {
              roll: user.roll
            }
          });
        if (res.data.length !== 0){
            setBills(res.data);
        }
    }

    return (
        bills.length === 0 ? <div>
        <h2 style={{ textAlign: "center" }} className="text-muted mb-4">No Dues Till Now</h2>
        <button onClick={goBack} style={{ marginLeft: "45%", marginRight: "55%" }} className="btn btn-sm btn-primary">Go Back</button>
    </div>
     :
        <div>
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
        </div>
    )
}

export default PayBills
