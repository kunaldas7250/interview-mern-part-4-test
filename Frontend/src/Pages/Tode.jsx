

import React, { useEffect, useState } from "react";

const Tode = () => {
  const [id, setid] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [location, setlocation] = useState("");
  const [PhoneNumber, setphoneNumber] = useState("");
  const [work, setwork] = useState("");
  const [formaction, setformaction] = useState(false);
  const [formdata, setformdata] = useState([]);
  const [Selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setformdata(JSON.parse(saved));
      setformaction(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(formdata));
  }, [formdata]);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (Selected !== null) {
      
      setformdata((prev) =>
        prev.map((item) =>
          item.id === Selected.id
            ? {
                ...item,
                firstname,
                lastname,
                location,
                PhoneNumber,
                work,
              }
            : item
        )
      );
      setSelected(null);
    } else {
      
      const newRecord = {
        id: Number(id),
        firstname,
        lastname,
        location,
        PhoneNumber,
        work,
      };
      setformdata((prev) => [...prev, newRecord]);
      setformaction(true);
    }

    
    setid("");
    setfirstname("");
    setlastname("");
    setlocation("");
    setphoneNumber("");
    setwork("");
  };

  const handleDelete = (item) => {
    setformdata((prev) => prev.filter((ele) => ele.id !== item.id));
    if (Selected && Selected.id === item.id) {
      setSelected(null);
    }
  };

  const handleview = (item) => {
    setSelected(item);
    setid(item.id);
    setfirstname(item.firstname);
    setlastname(item.lastname);
    setlocation(item.location);
    setphoneNumber(item.PhoneNumber);
    setwork(item.work);
  };

  return (
    <div className="TodoParent">
      <form onSubmit={handlesubmit}>
        <fieldset>
          <legend>{Selected ? "Update todo" : "Create todo"}</legend>
          <label>ID:</label>
          <input
            type="number"
            placeholder="Enter your id"
            value={id}
            onChange={(e) => setid(e.target.value)}
          />
          <label>Firstname:</label>
          <input
            type="text"
            placeholder="Enter your Firstname"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
          <label>LastName:</label>
          <input
            type="text"
            placeholder="Enter your Lastname"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
          <label>Location:</label>
          <input
            type="text"
            placeholder="Enter your Location"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
          <label>PhoneNumber:</label>
          <input
            type="number"
            placeholder="Enter your PhoneNumber"
            value={PhoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <label>Work:</label>
          <input
            type="text"
            placeholder="Enter your Work"
            value={work}
            onChange={(e) => setwork(e.target.value)}
          />
          <button type="submit">{Selected ? "Update" : "Create"}</button>
        </fieldset>
      </form>

      {formaction && formdata.length > 0 && (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Location</td>
              <td>PhoneNumber</td>
              <td>Work</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {formdata.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.location}</td>
                <td>{item.PhoneNumber}</td>
                <td>{item.work}</td>
                <td>
                  <button type="button" onClick={() => handleDelete(item)}>
                    Delete
                  </button>
                  <button type="button" onClick={() => handleview(item)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {Selected && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid black",
            padding: "10px",
          }}
        >
          <h3>Selected Record</h3>
          <p><b>ID:</b> {Selected.id}</p>
          <p><b>FirstName:</b> {Selected.firstname}</p>
          <p><b>LastName:</b> {Selected.lastname}</p>
          <p><b>Location:</b> {Selected.location}</p>
          <p><b>PhoneNumber:</b> {Selected.PhoneNumber}</p>
          <p><b>Work:</b> {Selected.work}</p>
        </div>
      )}
    </div>
  );
};

export default Tode;
