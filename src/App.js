import './App.css';
import { useEffect, useState } from 'react';
import { EData } from './Employeedata';

function App() {
  const [data, setdata] = useState([]);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [age, setage] = useState("");
  const [id, setid] = useState(null);
  const [isupdate, setisupdate] = useState(false);

  useEffect(() => {
    setdata(EData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setid(dt.id);
      setfirstname(dt.firstname);
      setlastname(dt.lastname);
      setage(dt.age);
      setisupdate(true); // Enable update mode
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        setdata(data.filter(item => item.id !== id));
      }
    }
  };

  const handleClear = () => {
    setfirstname("");
    setlastname("");
    setage("");
    setisupdate(false);
    setid(null);
  };

  const handleSave = () => {
    if (firstname && lastname && age) {
      const newEntry = {
        id: data.length + 1, // Assigning new ID
        firstname,
        lastname,
        age
      };
      setdata([...data, newEntry]);
      handleClear();
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleUpdate = () => {
    setdata(data.map(item =>
      item.id === id ? { id, firstname, lastname, age } : item
    ));
    handleClear();
  };

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div>
          <label>First Name:</label>
          <input type='text' placeholder='Enter first name' onChange={(e) => setfirstname(e.target.value)} value={firstname} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type='text' placeholder='Enter last name' onChange={(e) => setlastname(e.target.value)} value={lastname} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" placeholder="Enter the Age" value={age} onChange={(e) => setage(e.target.value)} />
        </div>
        <div>
          {!isupdate ? (
            <button className='btn btn-primary' onClick={handleSave}>Save</button>
          ) : (
            <button className='btn btn-danger' onClick={handleUpdate}>Update</button>
          )}
        </div>
        <button className='btn btn-danger' onClick={handleClear}>Clear</button>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.no</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
