import React, { useState } from 'react'
import axios from 'axios';

const GiveFood = () => {
  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])
  const [extra, setExtra] = useState([])

  const giveFood = () => {
    const b = breakfast.filter(Boolean);
    const l = lunch.filter(Boolean);
    const d = dinner.filter(Boolean);
    const e = extra.filter(Boolean);
    if (d.length === 0 || l.length === 0 || b.length === 0) {
      alert("Enter every meal")
      return
    }
    axios.post("https://nitc-mess-manager.herokuapp.com/giveFood/add", { b, l, d, e })
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
      .catch((e) => {
        alert("Error in server");
        console.log("error catch ->" + e)
      })
  }
  return (
    <div className="col-xl-8 order-xl-1">
      <div className="card bg-secondary shadow">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-8">
              <h2 className="text-muted mb-4">Give Food</h2>
            </div>
          </div>
          <Breakfast setBreakfast={setBreakfast} />
          <Lunch setLunch={setLunch} />
          <Dinner setDinner={setDinner} />
          <Extra setExtra={setExtra} />
          <button style= {{backgroundColor:"#228B22"}} className="btn btn-sm btn-primary" type="button" onClick={giveFood}>Upload</button>
        </div>
      </div>
    </div>
  )
}

const Breakfast = ({ setBreakfast }) => {
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
    <div className="pl-lg-4">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group focused">
      <h2>Breakfast</h2>

            <button className="btn btn-sm btn-primary" type="button" onClick={() => handleAdd()}>
              Add Field
            </button>
            <div><br/></div>

            {fields.map((field, idx) => {
              return (
                <div key={`${idx}`} className="form-group focused">
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    placeholder="Enter breakfast"
                    value={fields[idx]}
                    onChange={(e) => handleChange(idx, e)}
                    className="form-control form-control-alternative"
                  />
                  <button className="btn btn-sm btn-primary" type="button" onClick={() => handleRemove(idx)}>
                    Delete
                  </button>
                  <br/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
const Lunch = ({ setLunch }) => {
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
    <div className="pl-lg-4">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group focused">
            <h2>Lunch</h2>

      <button className="btn btn-sm btn-primary" type="button" onClick={() => handleAdd()}>
        Add Field
      </button>
      <div><br/></div>

      {fields.map((field, idx) => {
        return (
          <div key={`${idx}`} className="form-group focused">
            <input
              type="text"
              placeholder="Enter lunch"
              value={fields[idx]}
              onChange={(e) => handleChange(idx, e)}
              className="form-control form-control-alternative"
            />
            <button className="btn btn-sm btn-primary" type="button" onClick={() => handleRemove(idx)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
    </div>
    </div>
    </div>
  );
}
const Dinner = ({ setDinner }) => {
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
    <div className="pl-lg-4">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group focused">
            <h2>Dinner</h2>
      <button className="btn btn-sm btn-primary" type="button" onClick={() => handleAdd()}>
        Add Field
      </button>
      <div><br/></div>

      {fields.map((field, idx) => {
        return (
          <div key={`${idx}`} className="form-group focused">
            <input
              type="text"
              placeholder="Enter dinner"
              value={fields[idx]}
              onChange={(e) => handleChange(idx, e)}
              className="form-control form-control-alternative"
            />
            <button className="btn btn-sm btn-primary" type="button" onClick={() => handleRemove(idx)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
    </div>
    </div>
    </div>
  );
}
const Extra = ({ setExtra }) => {
  const [fields, setFields] = useState([""]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i] = event.target.value;
    setFields(values);
    setExtra(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push("");
    setFields(values);
    setExtra(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    setExtra(values);
  }

  return (
    <div className="pl-lg-4">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group focused">
            <h2>Extras</h2>
      <button className="btn btn-sm btn-primary" type="button" onClick={() => handleAdd()}>
        Add Field
      </button>
      <div><br/></div>

      {fields.map((field, idx) => {
        return (
          <div key={`${idx}`} className="form-group focused">
            <input
              type="text"
              placeholder="Enter Extra"
              value={fields[idx]}
              onChange={(e) => handleChange(idx, e)}
              className="form-control form-control-alternative"
            />
            <button className="btn btn-sm btn-primary" type="button" onClick={() => handleRemove(idx)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
    </div>
    </div>
    </div>
  );
}

export default GiveFood
