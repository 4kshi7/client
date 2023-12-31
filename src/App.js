import { useState, useEffect } from "react";
import Axios from "axios";
function App() {
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [list, setList] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");


  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setList(response.data);
    });
  }, []);

  const addToDB = () => {
    Axios.post("http://localhost:3001/insert", {
      title: title,
      sets: sets,
      reps: reps,
    });

    console.log(title, sets, reps);
  };

  const deleteFromDB = async () => {
    try {
      const response = await Axios.delete(
        `http://localhost:3001/delete/${idToDelete}`
      );
      console.log(response.data); 
    } catch (error) {
      console.error("Error deleting from the database:", error);
      window.location.reload();

    }
  };

  return (
    <div>
      <div id="heading">
        <h1>Simple MERN App</h1>
      </div>
      <div className="App">
        <div id="form-output">
          {list.map((val, index) => (
            <div key={index} id="data-card">
              <h3>
                <span>Exercise: </span>
                {val.title}
              </h3>
              <h3>
                <span>Sets: </span>
                {val.sets}
              </h3>
              <h3>
                <span>Reps: </span>
                {val.reps}
              </h3>
              <h3>
                <span>ID: </span>
                {val._id}
              </h3>
            </div>
          ))}
        </div>
        <div id="form-input">
          <div id="form-container">
            <form>
              <h3>Excercise Name</h3>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <h3>Sets</h3>
              <input
                type="number"
                onChange={(e) => {
                  setSets(e.target.value);
                }}
              />
              <h3>Reps</h3>
              <input
                type="text"
                onChange={(e) => {
                  setReps(e.target.value);
                }}
              />
              <button onClick={addToDB} type="submit">
                Submit
              </button>
            </form>

            <div id="data-Delete">
              <label htmlFor="idToDelete">Enter ID to delete: </label>
              <input
                type="text"
                id="idToDelete"
                value={idToDelete}
                onChange={(e) => setIdToDelete(e.target.value)}
              />
              <button onClick={deleteFromDB}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
