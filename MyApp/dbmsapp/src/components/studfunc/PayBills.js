import React, { useState, useEffect } from 'react'
import axios from 'axios';


const PayBills = ({user}) => {
    const [bills, setBills] = useState([{
        roll: user.roll,
        amount: 0,
        month: 0,
        paid: false
    }]);

    useEffect(() => {
        getBills()
    });

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
