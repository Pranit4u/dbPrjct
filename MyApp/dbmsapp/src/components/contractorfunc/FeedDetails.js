import React, { useState, useEffect } from 'react'
import axios from 'axios';

const FeedDetails = ({user}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents()
    });

    const getStudents = async() =>{
        const res = await axios.get('http://localhost:5000/feedDetails/get', {
            params: {
              mess: user.mess
            }
          });
        if (res.data.length !== 0){
            setStudents(res.data);
        }
    }

    return (
        <div>
            <a style={{fontSize:30}}>Students Enrolled in mess <b>{user.mess}</b></a><br/>
            {students.length === 0 ? <h4>No Students Registered in your mess</h4> : 
                <ol>
                {students.map((student,index)=> {
                    return(
                        <li key={index}>
                            Name: {student.firstname} {student.lastname}<br/>
                            Roll: {student.roll}<br/>
                            Mob: {student.mob}<br/>
                            Email: {student.email}
                        </li>
                    )
                })}
                </ol>
            }
        </div>
    )
}

export default FeedDetails
