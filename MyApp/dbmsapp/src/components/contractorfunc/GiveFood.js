import React, { useState } from 'react'
import axios from 'axios';

const GiveFood = () => {
    const [breakfast, setBreakfast] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])

    const giveFood = () => {
        const b = breakfast.filter(Boolean);
        const l = lunch.filter(Boolean);
        const d = dinner.filter(Boolean);
        if (d.length === 0 || l.length === 0 || b.length === 0){
            alert("Enter every meal")
            return
        }
        axios.post("http://localhost:5000/giveFood/add", {b,l,d})
            .then(res => {
                const r = res.data.message;
                switch (r) {
                    case "1":
                        alert("Menu uploaded successfully");
                        break;
                    default:
                        alert("Something went wrong");
                        break;            
                }
            })
            .catch((e) =>{ 
                alert("Error in server");
                console.log("error catch ->" + e)
            })
    }
    return (
        <div>
            <Breakfast setBreakfast={setBreakfast}/>
            <Lunch setLunch={setLunch}/>
            <Dinner setDinner={setDinner}/>
            <button type="button" onClick={giveFood}>Upload</button>
        </div>
    )
}

const Breakfast = ({setBreakfast}) => {
  const [fields, setFields] = useState([""]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i] = event.target.value;
    setFields(values);
    setBreakfast(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push("");
    setFields(values);
    setBreakfast(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    setBreakfast(values);
  }

  return (
    <div className="App">
      <h1>Breakfast</h1>

      <button type="button" onClick={() => handleAdd()}>
        Add Field
      </button>

      {fields.map((field, idx) => {
        return (
          <div key={`${idx}`}>
            <input
              type="text"
              placeholder="Enter breakfast"
              value={fields[idx]}
              onChange={(e) => handleChange(idx, e)}
            />
            <button type="button" onClick={() => handleRemove(idx)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
const Lunch = ({setLunch}) => {
  const [fields, setFields] = useState([""]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i] = event.target.value;
    setFields(values);
    setLunch(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push("");
    setFields(values);
    setLunch(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    setLunch(values);
  }

  return (
    <div className="App">
      <h1>Lunch</h1>

      <button type="button" onClick={() => handleAdd()}>
        Add Field
      </button>

      {fields.map((field, idx) => {
        return (
          <div key={`${idx}`}>
            <input
              type="text"
              placeholder="Enter lunch"
              value={fields[idx]}
              onChange={(e) => handleChange(idx, e)}
            />
            <button type="button" onClick={() => handleRemove(idx)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
const Dinner = ({setDinner}) => {
  const [fields, setFields] = useState([""]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i] = event.target.value;
    setFields(values);
    setDinner(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push("");
    setFields(values);
    setDinner(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    setDinner(values);
  }

  return (
    <div className="App">
      <h1>Dinner</h1>

      <button type="button" onClick={() => handleAdd()}>
        Add Field
      </button>

      {fields.map((field, idx) => {
        return (
          <div key={`${idx}`}>
            <input
              type="text"
              placeholder="Enter dinner"
              value={fields[idx]}
              onChange={(e) => handleChange(idx, e)}
            />
            <button type="button" onClick={() => handleRemove(idx)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default GiveFood
