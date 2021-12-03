import React, { useState, useEffect } from 'react'
import axios from 'axios';

const FeedDetails = ({user}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents()
    });

    const getStudents = async() =>{
        const res = await axios.get('https://nitc-mess-manager.herokuapp.com/feedDetails/get', {
            params: {
              mess: user.mess
            }
          });
        if (res.data.length !== 0){
            setStudents(res.data);
        }
    }

    return (
        <div style={{padding:15}}>
            <a style={{fontSize:30, color:"black"}}>Students Enrolled in mess <b>{user.mess}</b></a><br/>
            {students.length === 0 ? <h4>No Students Registered in your mess</h4> : 
                <ol>
                {students.map((student,index)=> {
                    return(
                        <div>
                        <li key={index} style={{color:"black"}}>
                            <b>Name:</b> <a style={{color:"white"}}>{student.firstname} {student.lastname}</a><br/>
                            <b>Roll:</b> <a style={{color:"white"}}>{student.roll}</a><br/>
                            <b>Mob:</b> <a style={{color:"white"}}>{student.mob}</a><br/>
                            <b>Email:</b> <a style={{color:"white"}}>{student.email}</a>
                        </li>
                        <br/>
                        </div>

                    )
                })}
                </ol>
            }
        </div>
    )
}

export default FeedDetails
